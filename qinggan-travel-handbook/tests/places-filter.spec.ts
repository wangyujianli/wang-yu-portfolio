import { describe, expect, it } from 'vitest'
import { filterPlaces, places } from '@/data/places'

describe('place filtering', () => {
  it('returns all places for an unknown or all category', () => {
    expect(filterPlaces(places, 'all')).toHaveLength(16)
    expect(filterPlaces(places, '不存在')).toHaveLength(16)
  })

  it('returns only places in the selected category', () => {
    const lakes = filterPlaces(places, '湖泊盐湖')
    expect(lakes.length).toBeGreaterThan(0)
    expect(lakes.every((place) => place.category === '湖泊盐湖')).toBe(true)
  })
})
