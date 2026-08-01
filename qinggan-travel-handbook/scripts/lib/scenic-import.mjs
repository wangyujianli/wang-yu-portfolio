import { readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const rightsMarkerPattern = /(来源|来自|版权|授权|小红书|网页预览|license|copyright|readme)/i
const explicitlyApprovedFiles = new Set([
  '塔尔寺～信仰发芽的地方_1_DODO_来自小红书网页版.jpg',
])
const contentExclusions = new Map([
  ['999a68c6a37198579cb6f7bb45cf9cd3.jpg', 'unsuitable-wildlife-feeding'],
])

const folderToPlaceId = new Map([
  ['00_总览', 'route-overview'],
  ['01_塔尔寺', 'kumbum-monastery'],
  ['02_门源油菜花', 'menyuan-gangshika'],
  ['03_张掖七彩丹霞', 'zhangye-danxia'],
  ['04_嘉峪关', 'jiayuguan-pass'],
  ['05_瓜州大地之子', 'son-of-earth'],
  ['06_莫高窟', 'mogao-grottoes'],
  ['07_鸣沙山月牙泉', 'mingsha-crescent'],
  ['08_G315_U型公路', 'g315-u-road'],
  ['09_水上雅丹', 'wusute-yadan'],
  ['10_大柴旦翡翠湖', 'dachaidan-emerald'],
  ['11_茶卡盐湖', 'chaka-salt-lake'],
  ['12_青海湖', 'qinghai-lake'],
  ['13_黑独山', 'black-mountain'],
  ['14_胭脂山', 'yanzhi-mountain'],
  ['15_冷湖石油小镇', 'lenghu-oil-town'],
  ['16_西王母瑶池', 'queen-mother-lake'],
  ['17_昆仑山口', 'kunlun-pass'],
  ['18_可可西里景观', 'hoh-xil'],
  ['19_可可西里藏羚羊', 'tibetan-antelope'],
  ['20_察尔汗盐湖', 'qarhan-salt-lake'],
  ['日月山', 'riyue-mountain'],
  ['臧文化博物馆', 'tibetan-culture-museum'],
  ['藏文化博物馆', 'tibetan-culture-museum'],
])

const fileToPlaceId = new Map([
  ['西宁', 'xining'],
  ['卓尔山', 'zhuoer-mountain'],
  ['黑马河', 'heimahe'],
  ['德令哈', 'delingha'],
  ['祁连山草原', 'qilian-grassland'],
])

const placeLabels = new Map([
  ['route-overview', '青甘大环线总览'], ['kumbum-monastery', '塔尔寺'],
  ['menyuan-gangshika', '门源油菜花'], ['zhangye-danxia', '张掖七彩丹霞'],
  ['jiayuguan-pass', '嘉峪关关城'], ['son-of-earth', '瓜州大地之子'],
  ['mogao-grottoes', '莫高窟'], ['mingsha-crescent', '鸣沙山月牙泉'],
  ['g315-u-road', 'G315 U形公路'], ['wusute-yadan', '乌素特水上雅丹'],
  ['dachaidan-emerald', '大柴旦翡翠湖'], ['chaka-salt-lake', '茶卡盐湖'],
  ['qinghai-lake', '青海湖'], ['black-mountain', '黑独山'],
  ['yanzhi-mountain', '胭脂山'], ['lenghu-oil-town', '冷湖石油小镇'],
  ['queen-mother-lake', '西王母瑶池'], ['kunlun-pass', '昆仑山口'],
  ['hoh-xil', '可可西里'], ['tibetan-antelope', '藏羚羊观察区域'],
  ['qarhan-salt-lake', '察尔汗盐湖'], ['riyue-mountain', '日月山'],
  ['tibetan-culture-museum', '青海藏文化博物院'], ['zhuoer-mountain', '卓尔山'],
  ['heimahe', '黑马河'], ['delingha', '德令哈'], ['xining', '西宁'],
  ['qilian-grassland', '祁连山草原'],
])

export function resolvePlaceId(folderName, fileName = '') {
  const fileStem = basename(fileName, extname(fileName))
  return folderToPlaceId.get(folderName) ?? fileToPlaceId.get(fileStem) ?? null
}

async function walkDirectory(directory, inheritedRestriction, output) {
  const entries = await readdir(directory, { withFileTypes: true })
  const hasLocalRightsMarker = entries.some((entry) => entry.isFile() && rightsMarkerPattern.test(entry.name))
  const restricted = inheritedRestriction || hasLocalRightsMarker

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name)
    if (entry.isDirectory()) {
      await walkDirectory(absolutePath, restricted, output)
      continue
    }

    if (!entry.isFile() || !imageExtensions.has(extname(entry.name).toLowerCase())) continue

    const image = {
      absolutePath,
      directory,
      folderName: basename(directory),
      fileName: entry.name,
      placeId: resolvePlaceId(basename(directory), entry.name),
    }

    const explicitlyApproved = explicitlyApprovedFiles.has(entry.name)
    if ((restricted || rightsMarkerPattern.test(entry.name)) && !explicitlyApproved) output.excluded.push({ ...image, reason: 'rights-marker' })
    else if (contentExclusions.has(entry.name)) {
      output.excluded.push({ ...image, reason: contentExclusions.get(entry.name) })
    } else output.included.push(image)
  }
}

export async function discoverScenicImages(sourceRoot) {
  const output = { included: [], excluded: [] }
  await walkDirectory(sourceRoot, false, output)
  output.included.sort((a, b) => a.absolutePath.localeCompare(b.absolutePath, 'zh-CN'))
  output.excluded.sort((a, b) => a.absolutePath.localeCompare(b.absolutePath, 'zh-CN'))
  return output
}

export function mergeScenicDiscoveries(primary, supplemental, allowedFileNames) {
  const allowed = new Set(allowedFileNames)
  const uniqueByPath = (images) => [...new Map(images.map((image) => [image.absolutePath, image])).values()]
    .sort((a, b) => a.absolutePath.localeCompare(b.absolutePath, 'zh-CN'))

  return {
    included: uniqueByPath([
      ...primary.included,
      ...supplemental.included.filter((image) => allowed.has(image.fileName)),
    ]),
    excluded: uniqueByPath([
      ...primary.excluded,
      ...supplemental.excluded.filter((image) => allowed.has(image.fileName)),
    ]),
  }
}

export function buildPublicImageRecord({ placeId, index, width, height, sourceName }) {
  const serial = String(index).padStart(2, '0')
  const id = `${placeId}-${serial}`
  const label = placeLabels.get(placeId) ?? placeId
  return {
    id,
    placeId,
    sourceName,
    alt: `${label}实景照片，第${index}张`,
    width,
    height,
    orientation: width === height ? 'square' : width > height ? 'landscape' : 'portrait',
    objectPosition: 'center',
    thumbnail: `/assets/scenic/${id}-480.webp`,
    regular: `/assets/scenic/${id}-960.webp`,
    large: `/assets/scenic/${id}-1600.webp`,
  }
}

export const scenicFolderMappings = Object.freeze(Object.fromEntries(folderToPlaceId))
