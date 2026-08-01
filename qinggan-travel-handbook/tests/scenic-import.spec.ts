import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { buildPublicImageRecord, discoverScenicImages, mergeScenicDiscoveries, resolvePlaceId } from '../scripts/lib/scenic-import.mjs'

const tempRoots: string[] = []

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })))
})

async function createTempRoot(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'qinggan-scenic-'))
  tempRoots.push(root)
  return root
}

describe('scenic image import discovery', () => {
  it('excludes every image in a directory carrying a rights marker', async () => {
    const root = await createTempRoot()
    const publishable = join(root, '12_青海湖')
    const restricted = join(root, '14_胭脂山')
    await mkdir(publishable)
    await mkdir(restricted)
    await writeFile(join(publishable, '湖面.jpg'), 'image')
    await writeFile(join(restricted, '来源与版权说明.txt'), '仅供内部参考')
    await writeFile(join(restricted, '山景.webp'), 'image')

    const result = await discoverScenicImages(root)

    expect(result.included.map((image) => image.fileName)).toEqual(['湖面.jpg'])
    expect(result.excluded).toEqual([
      expect.objectContaining({ fileName: '山景.webp', reason: 'rights-marker' }),
    ])
  })

  it('maps the supplied folder names to stable place identifiers', () => {
    expect(resolvePlaceId('01_塔尔寺')).toBe('kumbum-monastery')
    expect(resolvePlaceId('11_茶卡盐湖')).toBe('chaka-salt-lake')
    expect(resolvePlaceId('18_可可西里景观')).toBe('hoh-xil')
    expect(resolvePlaceId('19_可可西里藏羚羊')).toBe('tibetan-antelope')
    expect(resolvePlaceId('00_总览')).toBe('route-overview')
  })

  it('maps top-level named image files when the source pack does not use a folder', () => {
    expect(resolvePlaceId('青甘大环线_全部景点实景图片参考包', '西宁.png')).toBe('xining')
    expect(resolvePlaceId('青甘大环线_全部景点实景图片参考包', '卓尔山.jpg')).toBe('zhuoer-mountain')
    expect(resolvePlaceId('青甘大环线_全部景点实景图片参考包', '黑马河.png')).toBe('heimahe')
    expect(resolvePlaceId('青甘大环线_全部景点实景图片参考包', '德令哈.webp')).toBe('delingha')
    expect(resolvePlaceId('青甘大环线_全部景点实景图片参考包', '祁连山草原.png')).toBe('qilian-grassland')
  })

  it('ignores videos and text files from the public image manifest', async () => {
    const root = await createTempRoot()
    const folder = join(root, '日月山')
    await mkdir(folder)
    await writeFile(join(folder, '日月山.mp4'), 'video')
    await writeFile(join(folder, '说明.txt'), 'text')

    const result = await discoverScenicImages(root)

    expect(result.included).toEqual([])
    expect(result.excluded).toEqual([])
  })

  it('keeps specifically rejected content out of the public image manifest', async () => {
    const root = await createTempRoot()
    const folder = join(root, '18_可可西里景观')
    await mkdir(folder)
    await writeFile(join(folder, '999a68c6a37198579cb6f7bb45cf9cd3.jpg'), 'image')

    const result = await discoverScenicImages(root)

    expect(result.included).toEqual([])
    expect(result.excluded).toEqual([
      expect.objectContaining({
        fileName: '999a68c6a37198579cb6f7bb45cf9cd3.jpg',
        reason: 'unsuitable-wildlife-feeding',
      }),
    ])
  })

  it('treats social-platform source markers in image names as reference-only', async () => {
    const root = await createTempRoot()
    const folder = join(root, '01_塔尔寺')
    await mkdir(folder)
    await writeFile(join(folder, '塔尔寺_来自小红书网页版.jpg'), 'image')

    const result = await discoverScenicImages(root)

    expect(result.included).toEqual([])
    expect(result.excluded).toEqual([
      expect.objectContaining({ fileName: '塔尔寺_来自小红书网页版.jpg', reason: 'rights-marker' }),
    ])
  })

  it('allows the specifically approved Taer Temple source image', async () => {
    const root = await createTempRoot()
    const folder = join(root, '01_塔尔寺')
    await mkdir(folder)
    await writeFile(join(folder, '塔尔寺～信仰发芽的地方_1_DODO_来自小红书网页版.jpg'), 'image')

    const result = await discoverScenicImages(root)

    expect(result.excluded).toEqual([])
    expect(result.included).toEqual([
      expect.objectContaining({
        fileName: '塔尔寺～信仰发芽的地方_1_DODO_来自小红书网页版.jpg',
        placeId: 'kumbum-monastery',
      }),
    ])
  })

  it('merges only named files from a supplemental source pack', () => {
    const primary = {
      included: [{ absolutePath: 'C:/primary/西宁.png', directory: 'C:/primary', folderName: 'primary', fileName: '西宁.png', placeId: 'xining' }],
      excluded: [],
    }
    const supplemental = {
      included: [
        { absolutePath: 'C:/supplemental/德令哈.png', directory: 'C:/supplemental', folderName: 'supplemental', fileName: '德令哈.png', placeId: 'delingha' },
        { absolutePath: 'C:/supplemental/祁连山.jpg', directory: 'C:/supplemental', folderName: 'supplemental', fileName: '祁连山.jpg', placeId: null },
      ],
      excluded: [],
    }

    const merged = mergeScenicDiscoveries(primary, supplemental, ['德令哈.png'])

    expect(merged.included.map((image) => image.fileName)).toEqual(['西宁.png', '德令哈.png'])
    expect(merged.included.find((image) => image.fileName === '德令哈.png')?.placeId).toBe('delingha')
  })

  it('builds stable responsive image names and public paths', () => {
    expect(buildPublicImageRecord({
      placeId: 'qinghai-lake',
      index: 2,
      width: 4032,
      height: 3024,
      sourceName: '湖畔合影.jpg',
    })).toEqual({
      id: 'qinghai-lake-02',
      placeId: 'qinghai-lake',
      sourceName: '湖畔合影.jpg',
      alt: '青海湖实景照片，第2张',
      width: 4032,
      height: 3024,
      orientation: 'landscape',
      objectPosition: 'center',
      thumbnail: '/assets/scenic/qinghai-lake-02-480.webp',
      regular: '/assets/scenic/qinghai-lake-02-960.webp',
      large: '/assets/scenic/qinghai-lake-02-1600.webp',
    })
  })
})
