import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { scenicImageSets, scenicImagesFor } from '@/data/scenicImages'
import { placeGalleryImages } from '@/data/placeGalleryImages'
import { placeById } from '@/data/places'

describe('place scenic images', () => {
  it('publishes every approved original as three local WebP variants', () => {
    const images = Object.values(scenicImageSets).flat()
    const report = JSON.parse(readFileSync(resolve(process.cwd(), 'public', 'assets', 'scenic-import-report.json'), 'utf8')) as { included: number }
    expect(images).toHaveLength(report.included)
    expect(images.length).toBeGreaterThan(0)

    for (const image of images) {
      for (const assetPath of [image.thumbnail, image.regular, image.large]) {
        expect(assetPath).toMatch(/^\/assets\/scenic\/[a-z0-9-]+-(480|960|1600)\.webp$/)
        expect(existsSync(resolve(process.cwd(), 'public', assetPath.replace(/^\//, '')))).toBe(true)
      }
    }
  })

  it('keeps source-marked images out while allowing newly supplied unmarked originals', () => {
    const report = JSON.parse(readFileSync(resolve(process.cwd(), 'public', 'assets', 'scenic-import-report.json'), 'utf8')) as {
      excluded: Array<{ fileName: string; reason: string }>
    }
    const publishedSourceNames = Object.values(scenicImageSets).flat().map((image) => image.sourceName)

    for (const image of report.excluded.filter((item) => item.reason === 'rights-marker')) {
      expect(publishedSourceNames).not.toContain(image.fileName)
    }

    expect(scenicImagesFor('yanzhi-mountain')).toHaveLength(1)
    expect(scenicImagesFor('lenghu-oil-town')).toHaveLength(1)
  })

  it('keeps gallery counts for the single, carousel and lightbox states', () => {
    expect(scenicImagesFor('dachaidan-emerald')).toHaveLength(1)
    expect(scenicImagesFor('son-of-earth')).toHaveLength(2)
    expect(scenicImagesFor('qinghai-lake')).toHaveLength(3)
    expect(scenicImagesFor('hoh-xil')).toHaveLength(4)
  })

  it('uses the existing local place cover when no imported scenic image exists', () => {
    const biandukou = placeById.get('biandukou')!

    expect(scenicImagesFor('biandukou')).toHaveLength(0)
    expect(placeGalleryImages(biandukou)).toEqual([
      expect.objectContaining({
        placeId: 'biandukou',
        regular: '/images/places/biandukou.jpg',
        alt: '蓝天下扁都口的油菜花与祁连山地',
      }),
    ])
  })
})
