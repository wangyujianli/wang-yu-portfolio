import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { filterJourneyPlaces } from '@/data/journeyFilters'
import { journeyRouteById } from '@/data/journeyRoutes'
import { places } from '@/data/places'
import { useJourneyStore } from '@/stores/journey'

describe('journey map route and filters', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('persists the selected route without affecting visited state', () => {
    const store = useJourneyStore()
    expect(store.selectedRouteId).toBe('classic')
    store.selectRoute('golmud-extension')
    expect(store.selectedRouteId).toBe('golmud-extension')
    expect(localStorage.getItem('westward:v1:selected-route')).toContain('golmud-extension')
  })

  it('filters within the chosen route by place type and experience level', () => {
    const route = journeyRouteById.get('golmud-extension')!
    const saltLakes = filterJourneyPlaces(places, route, ['盐湖'], [])
    expect(saltLakes.map((place) => place.id)).toEqual(['qarhan-salt-lake'])

    const longerIdeas = filterJourneyPlaces(places, route, [], ['add-two-to-four-days'])
    expect(longerIdeas.map((place) => place.id)).toEqual(['hoh-xil'])
  })

  it('maps existing route choices to main, Lenghu and Golmud scopes without changing their IDs', () => {
    expect(journeyRouteById.get('classic')).toMatchObject({ scope: 'main-route' })
    expect(journeyRouteById.get('discovery')).toMatchObject({ scope: 'main-route' })
    expect(journeyRouteById.get('mangya-extension')).toMatchObject({ scope: 'lenghu-extension', shortName: '冷湖延伸' })
    expect(journeyRouteById.get('golmud-extension')).toMatchObject({ scope: 'golmud-extension', shortName: '格尔木延伸' })
  })
})
