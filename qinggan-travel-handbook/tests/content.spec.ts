import { describe, expect, it } from 'vitest'
import { routeCombinations } from '@/data/combinations'
import { highlights } from '@/data/highlights'
import { photoGuides, photoPlaceExamples } from '@/data/photoGuides'
import { places } from '@/data/places'
import { preparationCards } from '@/data/preparation'
import { routeStops } from '@/data/route'
import { accommodationHubs } from '@/data/accommodationHubs'

describe('travel handbook content', () => {
  it('contains 30 unique and complete places', () => {
    expect(places).toHaveLength(30)
    expect(new Set(places.map((place) => place.id)).size).toBe(30)
    expect(new Set(places.map((place) => place.slug)).size).toBe(30)

    for (const place of places) {
      expect(place.name.length).toBeGreaterThan(1)
      expect(place.summary.length).toBeGreaterThan(8)
      if (place.image) expect(place.image).toMatch(/^\/(images\/places\/[a-z0-9-]+\.(jpg|png)|assets\/scenic\/[a-z0-9-]+-1600\.webp)$/)
      expect(place.imageAlt.length).toBeGreaterThan(6)
      expect(place.conventionalPlay.length).toBeGreaterThan(0)
      expect(place.bestSeason.length).toBeGreaterThan(1)
      expect(['低', '中', '高', '很高']).toContain(place.weatherSensitivity)
      expect(place.unconventionalPlay.length).toBeGreaterThan(0)
      expect(place.soloPoses).toHaveLength(3)
      expect(place.groupComposition.length).toBeGreaterThan(8)
      expect(place.coordinates[0]).toBeGreaterThanOrEqual(73)
      expect(place.coordinates[0]).toBeLessThanOrEqual(136)
      expect(place.coordinates[1]).toBeGreaterThanOrEqual(18)
      expect(place.coordinates[1]).toBeLessThanOrEqual(54)
    }
  })

  it('gives every place a concrete visit-value judgment', () => {
    const labels = {
      core: '核心必看',
      priority: '优先安排',
      'en-route': '顺路可看',
      interest: '兴趣加选',
      optional: '时间紧可略',
    } as const
    const vagueMarketing = /景色优美|值得打卡|不容错过|令人流连忘返|网红必去/

    for (const place of places) {
      expect(place.value.reasonToVisit.length).toBeGreaterThanOrEqual(50)
      expect(place.value.reasonToVisit.length).toBeLessThanOrEqual(100)
      expect(place.value.uniqueness.length).toBeGreaterThan(8)
      expect(place.value.bestFor.length).toBeGreaterThan(0)
      expect(place.value.ifTimeIsLimited.length).toBeGreaterThan(8)
      expect(place.value.priorityLabel).toBe(labels[place.classification.priority])
      expect(JSON.stringify(place.value)).not.toMatch(vagueMarketing)
    }

    expect(new Set(places.map((place) => place.classification.priority))).toEqual(new Set(Object.keys(labels)))
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

  it('attaches traceable viral stories only where there is useful context', () => {
    const stories = places.flatMap((place) => place.viralStories)
    expect(stories.length).toBeGreaterThanOrEqual(7)
    expect(stories.every((story) => story.sourceLabel.length > 6)).toBe(true)
    expect(stories.every((story) => ['A', 'B', 'C'].includes(story.confidence))).toBe(true)
    expect(places.find((place) => place.id === 'hoh-xil')?.viralStories[0]?.sourceLabel).toContain('原始出处暂未可靠核实')
  })

  it('does not expose internal persona labels or fixed-day schedules', () => {
    const serialized = JSON.stringify({ places, highlights, photoGuides, routeCombinations, preparationCards, accommodationHubs })
    expect(serialized).not.toMatch(/50.?60|中老年|适老|长辈|领导专属|Day\s*[1-9]/i)
  })
})
