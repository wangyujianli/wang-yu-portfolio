import { describe, expect, it } from 'vitest'
import { filterPlaces, placeById, places } from '@/data/places'

type ClassificationProbe = {
  priority: string
  routeScope: string
  placeRole: string
  priorityReason: string
  routeReason: string
  isStandalone: boolean
  parentPlaceId?: string
}

const classificationOf = (placeId: string): ClassificationProbe => (
  (placeById.get(placeId) as unknown as { classification: ClassificationProbe }).classification
)

describe('three-dimensional place classification', () => {
  it('classifies every retained place without changing the 30 place IDs', () => {
    expect(places).toHaveLength(30)
    expect(new Set(places.map((place) => place.id))).toHaveProperty('size', 30)

    for (const place of places) {
      const classification = (place as unknown as { classification?: ClassificationProbe }).classification
      expect(classification, `${place.id} classification`).toBeDefined()
      expect(classification?.priorityReason.length).toBeGreaterThan(20)
      expect(classification?.routeReason.length).toBeGreaterThan(10)
    }
  })

  it('keeps exactly the six requested places as main-route core stops', () => {
    const mainCoreIds = places
      .filter((place) => {
        const classification = (place as unknown as { classification?: ClassificationProbe }).classification
        return classification?.routeScope === 'main-route' && classification.priority === 'core'
      })
      .map((place) => place.id)

    expect(mainCoreIds).toEqual([
      'zhangye-danxia',
      'jiayuguan-pass',
      'mogao-grottoes',
      'mingsha-crescent',
      'wusute-yadan',
      'qinghai-lake',
    ])
  })

  it('separates main, Lenghu and Golmud counts and excludes the ecology child from card totals', () => {
    const standalone = places.filter((place) => classificationOf(place.id).isStandalone)
    const count = (scope: string, priority: string) => standalone.filter((place) => {
      const classification = classificationOf(place.id)
      return classification.routeScope === scope && classification.priority === priority
    }).length

    expect({
      core: count('main-route', 'core'),
      priority: count('main-route', 'priority'),
      enRoute: count('main-route', 'en-route'),
      interest: count('main-route', 'interest'),
      optional: count('main-route', 'optional'),
    }).toEqual({ core: 6, priority: 4, enRoute: 7, interest: 4, optional: 1 })
    expect({
      priority: count('lenghu-extension', 'priority'),
      interest: count('lenghu-extension', 'interest'),
      optional: count('lenghu-extension', 'optional'),
    }).toEqual({ priority: 1, interest: 1, optional: 1 })
    expect({
      priority: count('golmud-extension', 'priority'),
      interest: count('golmud-extension', 'interest'),
    }).toEqual({ priority: 2, interest: 2 })
  })

  it('retains Tibetan antelope data as a Hoh Xil child instead of a standalone destination', () => {
    const antelope = placeById.get('tibetan-antelope')
    expect(antelope).toBeDefined()
    expect(classificationOf('tibetan-antelope')).toMatchObject({
      routeScope: 'golmud-extension',
      priority: 'interest',
      placeRole: 'ecology-observation',
      isStandalone: false,
      parentPlaceId: 'hoh-xil',
    })
  })

  it('combines priority and route-scope filters using intersection logic', () => {
    expect(filterPlaces(places, 'all', 'priority', 'golmud-extension').map((place) => place.id)).toEqual([
      'qarhan-salt-lake',
      'kunlun-pass',
    ])
    expect(filterPlaces(places, 'all', 'all', 'all')).toHaveLength(29)
    expect(filterPlaces(places, 'all', 'interest', 'golmud-extension').map((place) => place.id)).toEqual([
      'queen-mother-lake',
      'hoh-xil',
    ])
  })
})
