import { describe, expect, it } from 'vitest'
import { accommodationHubById, accommodationHubs } from '@/data/accommodationHubs'
import { accommodations } from '@/data/accommodations'
import { places } from '@/data/places'

const remotePlaceIds = new Set([
  'biandukou',
  'son-of-earth',
  'boundless',
  'boluo-zhuanjing',
  'g315-u-road',
])

describe('accommodation content', () => {
  it('maps every existing place to a reusable accommodation hub', () => {
    for (const place of places) {
      expect(place.accommodationHubId, place.name).toBeTruthy()
      expect(accommodationHubById.has(place.accommodationHubId), place.name).toBe(true)
    }

    expect(accommodationHubById.get('xining')?.placeIds).toEqual(
      expect.arrayContaining(['xining', 'kumbum-monastery']),
    )
    expect(accommodationHubById.get('dunhuang')?.placeIds).toEqual(
      expect.arrayContaining(['son-of-earth', 'boundless', 'mogao-grottoes', 'mingsha-crescent']),
    )
  })

  it('keeps each used hub curated to no more than three complete choices', () => {
    expect(accommodationHubs.length).toBeGreaterThanOrEqual(9)

    for (const hub of accommodationHubs) {
      expect(hub.accommodations.length, hub.name).toBeGreaterThan(0)
      expect(hub.accommodations.length, hub.name).toBeLessThanOrEqual(3)
      expect(hub.description.length, hub.name).toBeGreaterThan(10)
    }

    for (const stay of accommodations) {
      expect(stay.name.length).toBeGreaterThan(3)
      expect(stay.address.length).toBeGreaterThan(8)
      expect(stay.proximityText.length).toBeGreaterThan(5)
      expect(stay.reason.length).toBeGreaterThan(12)
      expect(stay.suitableFor.length).toBeGreaterThan(0)
      expect(stay.cautions.length).toBeGreaterThan(0)
      expect(stay.images.length).toBeGreaterThanOrEqual(2)
      expect(stay.images.length).toBeLessThanOrEqual(3)
      expect(stay.images.every((image) => image.src.startsWith('/images/accommodations/'))).toBe(true)
      expect(stay.images.every((image) => image.alt.length > 8)).toBe(true)
      expect(stay.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('uses remote stay advice only for the designated along-the-way stops', () => {
    for (const place of places) {
      if (remotePlaceIds.has(place.id)) {
        expect(place.remoteStayAdvice, place.name).toBeTruthy()
        expect(place.remoteStayAdvice?.suggestedCity.length).toBeGreaterThan(1)
        expect(place.remoteStayAdvice?.travelText.length).toBeGreaterThan(5)
        expect(place.remoteStayAdvice?.reason.length).toBeGreaterThan(10)
      } else {
        expect(place.remoteStayAdvice, place.name).toBeUndefined()
      }
    }
  })

  it('contains no prices, promotions or internal persona labels', () => {
    const serialized = JSON.stringify({ accommodationHubs, accommodations })
    expect(serialized).not.toMatch(/价格|低价|优惠|抢购|促销|折扣|性价比|50.?60|中老年|适老|长辈|领导/i)
  })
})
