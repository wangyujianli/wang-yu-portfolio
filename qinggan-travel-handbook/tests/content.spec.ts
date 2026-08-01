import { describe, expect, it } from 'vitest'
import { routeCombinations } from '@/data/combinations'
import { highlights } from '@/data/highlights'
import { photoGuides, photoPlaceExamples } from '@/data/photoGuides'
import { places } from '@/data/places'
import { preparationCards } from '@/data/preparation'
import { routeStops } from '@/data/route'

describe('travel handbook content', () => {
  it('contains 16 unique and complete places', () => {
    expect(places).toHaveLength(16)
    expect(new Set(places.map((place) => place.id)).size).toBe(16)
    expect(new Set(places.map((place) => place.slug)).size).toBe(16)

    for (const place of places) {
      expect(place.name.length).toBeGreaterThan(1)
      expect(place.summary.length).toBeGreaterThan(8)
      expect(place.image).toMatch(/^\/images\/places\/[a-z0-9-]+\.(jpg|png)$/)
      expect(place.imageAlt.length).toBeGreaterThan(6)
      expect(place.conventionalPlay.length).toBeGreaterThan(0)
      expect(place.unconventionalPlay.length).toBeGreaterThan(0)
      expect(place.soloPoses).toHaveLength(3)
      expect(place.groupComposition.length).toBeGreaterThan(8)
      expect(place.coordinates[0]).toBeGreaterThanOrEqual(73)
      expect(place.coordinates[0]).toBeLessThanOrEqual(136)
      expect(place.coordinates[1]).toBeGreaterThanOrEqual(18)
      expect(place.coordinates[1]).toBeLessThanOrEqual(54)
    }
  })

  it('keeps route and combination references valid', () => {
    const ids = new Set(places.map((place) => place.id))
    expect(routeStops.at(0)?.name).toBe('杭州')
    expect(routeStops.at(-1)?.placeId).toBe('xining')
    expect(routeStops.filter((stop) => stop.placeId).every((stop) => ids.has(stop.placeId!))).toBe(true)
    expect(
      routeCombinations.every((combination) => combination.placeIds.every((id) => ids.has(id))),
    ).toBe(true)
  })

  it('contains the approved highlights and eight photo scenes', () => {
    expect(highlights).toHaveLength(7)
    expect(photoGuides).toHaveLength(8)
    expect(photoPlaceExamples).toHaveLength(12)
    expect(photoGuides.every((guide) => guide.soloPoses.length === 3)).toBe(true)
  })

  it('does not expose internal persona labels or fixed-day schedules', () => {
    const serialized = JSON.stringify({ places, highlights, photoGuides, routeCombinations, preparationCards })
    expect(serialized).not.toMatch(/50.?60|中老年|适老|长辈|领导专属|Day\s*[1-9]/i)
  })
})
