import { describe, expect, it } from 'vitest'
import { homeJourneyRoutes } from '@/data/homeJourneyRoutes'
import { placeById, places } from '@/data/places'

describe('home journey routes', () => {
  it('offers exactly the classic and discovery choices without inventing places', () => {
    expect(homeJourneyRoutes.map((route) => route.id)).toEqual(['classic', 'discovery'])
    for (const route of homeJourneyRoutes) {
      expect(route.placeIds.length, route.name).toBeGreaterThan(8)
      for (const placeId of route.placeIds) {
        expect(placeById.has(placeId), `${route.name}:${placeId}`).toBe(true)
      }
    }
    expect(new Set(homeJourneyRoutes.flatMap((route) => route.placeIds)).size).toBeLessThanOrEqual(places.length)
  })

  it('keeps the exploration route focused on contrasting existing landscapes', () => {
    const discovery = homeJourneyRoutes.find((route) => route.id === 'discovery')!
    expect(discovery.placeIds).toEqual([
      'xining', 'riyue-mountain', 'qinghai-lake', 'delingha', 'dachaidan-emerald',
      'g315-u-road', 'wusute-yadan', 'black-mountain', 'lenghu-oil-town',
      'mingsha-crescent', 'son-of-earth', 'zhangye-danxia', 'qilian-grassland', 'xining',
    ])
    expect(discovery.tags).toEqual(['地貌反差', '相对清静', '摄影变化'])
  })
})
