// @vitest-environment node
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const assets = [
  'cover.png',
  'overview-culture.png',
  'overview-landform.png',
  'overview-lake.png',
  'overview-desert.png',
  'place-taer.png',
  'place-mogao.png',
  'place-jiayuguan.png',
  'place-menyuan.png',
  'place-zhangye.png',
  'place-son-of-earth.png',
  'place-g315.png',
  'place-water-yadan.png',
  'place-emerald-lake.png',
  'place-chaka.png',
  'place-qinghai-lake.png',
  'place-mingsha.png',
  'six-person.png',
]

describe('photo guide assets', () => {
  it('ships the full supplied pose pack with stable file names', () => {
    for (const file of assets) {
      expect(existsSync(resolve('public/images/photo-guide', file)), file).toBe(true)
    }
  })
})
