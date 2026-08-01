import { describe, expect, it } from 'vitest'
import { filterPlaces, places } from '@/data/places'

describe('place filtering', () => {
  it('returns all places for an unknown or all category', () => {
    expect(filterPlaces(places, 'all')).toHaveLength(29)
    expect(filterPlaces(places, '不存在')).toHaveLength(29)
  })

  it('returns only places in the selected category', () => {
    const lakes = filterPlaces(places, '湖泊盐湖')
    expect(lakes.length).toBeGreaterThan(0)
    expect(lakes.every((place) => place.category === '湖泊盐湖')).toBe(true)
  })

  it('returns only places in the selected priority', () => {
    const corePlaces = filterPlaces(places, 'all', 'core')
    expect(corePlaces.length).toBeGreaterThan(0)
    expect(corePlaces.length).toBeLessThan(places.length)
    expect(corePlaces.every((place) => place.classification.priority === 'core')).toBe(true)
  })

  it('combines category and priority filters', () => {
    const recommendedLakes = filterPlaces(places, '湖泊盐湖', 'priority')
    expect(recommendedLakes.map((place) => place.id)).toEqual(['dachaidan-emerald', 'chaka-salt-lake', 'qarhan-salt-lake'])
  })

  it('treats an unknown priority as all priorities', () => {
    expect(filterPlaces(places, 'all', 'unknown')).toHaveLength(29)
  })
})
