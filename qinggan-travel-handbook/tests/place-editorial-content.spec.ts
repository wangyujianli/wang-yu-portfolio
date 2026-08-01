import { describe, expect, it } from 'vitest'
import { placeById, places } from '@/data/places'

describe('place editorial content', () => {
  it('gives all 30 places a distinct content priority with a real primary and weaker module', () => {
    expect(places).toHaveLength(30)

    for (const place of places) {
      expect(place.contentPriority.primaryModules.length, place.id).toBeGreaterThan(0)
      expect(
        place.contentPriority.compactModules.length + place.contentPriority.hiddenModules.length,
        place.id,
      ).toBeGreaterThan(0)
      expect(place.contentPriority.editorialTheme.length, place.id).toBeGreaterThan(8)
      expect(place.contentPriority.pageMood.length, place.id).toBeGreaterThan(3)
    }
  })

  it('preserves the six representative page priorities instead of a uniform template', () => {
    expect(placeById.get('mogao-grottoes')?.contentPriority.primaryModules).toEqual(['culture', 'booking', 'safety'])
    expect(placeById.get('mingsha-crescent')?.contentPriority.primaryModules).toEqual([
      'photography', 'landscape', 'activities', 'booking', 'weather',
    ])
    expect(placeById.get('g315-u-road')?.contentPriority.primaryModules).toEqual(['road', 'safety', 'photography', 'weather'])
    expect(placeById.get('delingha')?.contentPriority.primaryModules).toEqual(['accommodation', 'food', 'road', 'health'])
    expect(placeById.get('black-mountain')?.contentPriority.primaryModules).toEqual(['safety', 'landscape', 'photography', 'road'])
    expect(placeById.get('hoh-xil')?.contentPriority.primaryModules).toEqual(['ecology', 'health', 'safety', 'road', 'weather'])
  })

  it('connects every place to local flavour or a mature supply hub without restaurant rankings', () => {
    for (const place of places) {
      expect(place.localFood, place.id).toBeDefined()
      expect(
        (place.localFood?.recommendations.length ?? 0) > 0 || Boolean(place.localFood?.nearbyFoodHub),
        place.id,
      ).toBe(true)
    }

    const serialized = JSON.stringify(places.map(({ localFood }) => localFood))
    expect(serialized).not.toMatch(/必吃榜|全网第一|当地人都去|人均|¥|￥|\d+元/)
  })

  it('only offers souvenirs where the place context supports them', () => {
    for (const id of ['xining', 'kumbum-monastery', 'zhangye-danxia', 'jiayuguan-pass', 'mogao-grottoes', 'delingha']) {
      expect(placeById.get(id)?.souvenirs?.recommendations.length, id).toBeGreaterThanOrEqual(2)
    }

    for (const id of ['g315-u-road', 'son-of-earth', 'boundless', 'black-mountain', 'kunlun-pass', 'tibetan-antelope']) {
      expect(placeById.get(id)?.souvenirs, id).toBeUndefined()
    }

    const serialized = JSON.stringify(places.map(({ souvenirs }) => souvenirs))
    expect(serialized).not.toMatch(/野生动物制品|带走盐|带走石头|带走植物|带走沙土|购买链接|¥|￥|\d+元/)
  })

  it('uses three or more photo checkpoints for core visual places and one or two for smaller stops', () => {
    const corePhotoPlaces = [
      'kumbum-monastery', 'menyuan-gangshika', 'zhangye-danxia', 'jiayuguan-pass',
      'mogao-grottoes', 'mingsha-crescent', 'g315-u-road', 'wusute-yadan',
      'dachaidan-emerald', 'chaka-salt-lake', 'qinghai-lake', 'black-mountain',
      'qarhan-salt-lake', 'kunlun-pass', 'hoh-xil',
    ]
    const compactPhotoPlaces = ['biandukou', 'son-of-earth', 'boundless', 'boluo-zhuanjing', 'yanzhi-mountain']

    for (const id of corePhotoPlaces) {
      expect(placeById.get(id)?.photoCheckpoints?.length, id).toBeGreaterThanOrEqual(3)
    }
    for (const id of compactPhotoPlaces) {
      const count = placeById.get(id)?.photoCheckpoints?.length ?? 0
      expect(count, id).toBeGreaterThanOrEqual(1)
      expect(count, id).toBeLessThanOrEqual(2)
    }
  })

  it('keeps road, restricted-area and wildlife photography within objective boundaries', () => {
    const g315 = JSON.stringify(placeById.get('g315-u-road')?.photoCheckpoints)
    expect(g315).toContain('机动车道外')
    expect(g315).not.toMatch(/站在机动车道中央|唯一网红坐标/)

    const blackMountain = JSON.stringify(placeById.get('black-mountain'))
    expect(blackMountain).toContain('仅限合法开放区域')
    expect(blackMountain).not.toMatch(/秘境坐标|越野穿越/)

    const wildlife = JSON.stringify([
      placeById.get('hoh-xil')?.photoCheckpoints,
      placeById.get('tibetan-antelope')?.photoCheckpoints,
    ])
    expect(wildlife).toContain('长焦')
    expect(wildlife).not.toMatch(/固定坐标|下车追逐|近距离自拍|投喂/)
  })
})
