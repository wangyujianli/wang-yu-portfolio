import { describe, expect, it } from 'vitest'
import { places } from '@/data/places'
import { journeyRoutes } from '@/data/journeyRoutes'
import { nineDayItinerary } from '@/data/nineDayItinerary'
import { nearbyExplorationGroups } from '@/data/nearbyExplorations'

describe('expanded journey content', () => {
  it('keeps every required destination as a unique, explorable place', () => {
    const requiredNames = [
      '西宁', '青海藏文化博物院', '塔尔寺', '日月山', '青海湖', '黑马河', '茶卡盐湖',
      '门源油菜花与岗什卡雪峰', '祁连山草原', '卓尔山', '张掖七彩丹霞', '嘉峪关关城',
      '瓜州大地之子', '莫高窟', '鸣沙山月牙泉', '博罗转井石油小镇', '大柴旦翡翠湖',
      'G315 U形公路', '乌素特水上雅丹', '德令哈', '冷湖石油小镇', '黑独山', '胭脂山',
      '察尔汗盐湖', '西王母瑶池', '昆仑山口', '可可西里', '藏羚羊合法观察区域',
    ]

    expect(new Set(places.map((place) => place.id)).size).toBe(places.length)
    expect(places.length).toBeGreaterThanOrEqual(28)
    for (const name of requiredNames) expect(places.some((place) => place.name === name), name).toBe(true)
  })

  it('gives every place explorable route, type, weather and personality metadata', () => {
    for (const place of places) {
      expect(place.placeTypes.length, place.name).toBeGreaterThan(0)
      expect(place.routeIds.length, place.name).toBeGreaterThan(0)
      expect(place.experienceLevel, place.name).toBeTruthy()
      expect(place.weatherAlternatives.rain, place.name).toBeTruthy()
      expect(place.weatherAlternatives.wind, place.name).toBeTruthy()
      expect(place.lightNote, place.name).toBeTruthy()
      expect(place.informationUpdatedAt, place.name).toMatch(/^2026-/)
    }
  })

  it('defines four selectable routes using only known place identifiers', () => {
    expect(journeyRoutes.map((route) => route.id)).toEqual(['classic', 'discovery', 'golmud-extension', 'mangya-extension'])
    const ids = new Set(places.map((place) => place.id))
    for (const route of journeyRoutes) {
      expect(route.placeIds.length, route.name).toBeGreaterThan(5)
      for (const placeId of route.placeIds) expect(ids.has(placeId), `${route.name}:${placeId}`).toBe(true)
    }
  })

  it('provides nine adjustable reference days with the complete decision fields', () => {
    expect(nineDayItinerary).toHaveLength(9)
    expect(nineDayItinerary[0]?.mainLine).toContain('飞抵西宁')
    expect(nineDayItinerary[8]?.mainLine).toContain('返回西宁')
    for (const day of nineDayItinerary) {
      expect(day.corePlaces.length, day.id).toBeGreaterThan(0)
      expect(day.weatherAlternatives.rain, day.id).toBeTruthy()
      expect(day.weatherAlternatives.wind, day.id).toBeTruthy()
      expect(day.weatherAlternatives.heat, day.id).toBeTruthy()
      expect(day.photoTheme, day.id).toBeTruthy()
      expect(day.lightTip, day.id).toBeTruthy()
    }
  })

  it('organizes nearby explorations into the four requested time layers', () => {
    expect(nearbyExplorationGroups.map((group) => group.id)).toEqual(['along-the-way', 'half-day', 'one-two-days', 'two-four-days'])
    expect(nearbyExplorationGroups.flatMap((group) => group.items).map((item) => item.name)).toContain('圣泉湾')
    for (const item of nearbyExplorationGroups.flatMap((group) => group.items)) {
      expect(item.reason, item.name).toBeTruthy()
      expect(item.extraTime, item.name).toBeTruthy()
      expect(item.bestStartingPoint, item.name).toBeTruthy()
      expect(item.reservationNote, item.name).toBeTruthy()
      expect(item.boundaryNote, item.name).toBeTruthy()
    }
  })
})
