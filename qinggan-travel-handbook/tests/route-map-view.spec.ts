import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RouteMap from '@/components/map/RouteMap.vue'
import { journeyRoutes } from '@/data/journeyRoutes'
import { places } from '@/data/places'

const amapState = vi.hoisted(() => ({
  addedKinds: [] as string[],
  fitViewKinds: [] as string[],
  markerContents: [] as HTMLElement[],
  polylineOptions: [] as Array<Record<string, unknown>>,
}))

vi.mock('@/lib/amap', () => ({
  loadAMap: vi.fn(async () => {
    class FakeMap {
      add(overlays: Array<{ kind: string }>): void {
        amapState.addedKinds = overlays.map((overlay) => overlay.kind)
      }

      setFitView(overlays: Array<{ kind: string }> = []): void {
        amapState.fitViewKinds = overlays.map((overlay) => overlay.kind)
      }

      destroy(): void {}
    }

    class FakePolyline {
      kind: string

      constructor(options: Record<string, unknown>) {
        amapState.polylineOptions.push(options)
        this.kind = Array.isArray(options.path) && options.path.length === 2 ? 'flight' : 'route'
      }
    }

    class FakeMarker {
      kind = 'marker'

      constructor(options: Record<string, unknown>) {
        amapState.markerContents.push(options.content as HTMLElement)
      }

      on(): void {}
    }

    class FakePixel {}

    return {
      Map: FakeMap,
      Polyline: FakePolyline,
      Marker: FakeMarker,
      Pixel: FakePixel,
    }
  }),
}))

describe('explore route map default view', () => {
  beforeEach(() => {
    amapState.addedKinds = []
    amapState.fitViewKinds = []
    amapState.markerContents = []
    amapState.polylineOptions = []
  })

  it('keeps the Hangzhou flight visible without using it to fit the default Qinggan loop view', async () => {
    const route = journeyRoutes.find((item) => item.id === 'classic')!
    const routePlaces = places.filter((place) => route.placeIds.includes(place.id))

    mount(RouteMap, {
      props: {
        route,
        places: routePlaces,
        visitedIds: [],
      },
    })
    await flushPromises()

    expect(amapState.addedKinds).toContain('flight')
    expect(amapState.fitViewKinds).not.toContain('flight')
    expect(amapState.fitViewKinds).toContain('route')
    expect(amapState.fitViewKinds).toContain('marker')
  })

  it('renders the place name inside every route marker', async () => {
    const route = journeyRoutes.find((item) => item.id === 'classic')!
    const routePlaces = places.filter((place) => route.placeIds.includes(place.id))

    mount(RouteMap, {
      props: {
        route,
        places: routePlaces,
        visitedIds: [],
      },
    })
    await flushPromises()

    expect(amapState.markerContents.some((element) => element.textContent?.includes('西宁'))).toBe(true)
    expect(amapState.markerContents.every((element) => element.querySelector('.amap-route-marker__label'))).toBe(true)
  })

  it('opens a place from the real button element used as custom marker content', async () => {
    const route = journeyRoutes.find((item) => item.id === 'classic')!
    const routePlaces = places.filter((place) => route.placeIds.includes(place.id))
    const wrapper = mount(RouteMap, {
      props: {
        route,
        places: routePlaces,
        visitedIds: [],
      },
    })
    await flushPromises()

    const qinghaiLakeButton = amapState.markerContents.find((element) => element.textContent?.includes('青海湖'))
    qinghaiLakeButton?.click()

    expect(wrapper.emitted('select')).toContainEqual(['qinghai-lake'])
  })

  it('uses distinct line styles for the main route and both extensions', async () => {
    const cases = [
      ['classic', 'main-route', 'solid', undefined],
      ['mangya-extension', 'lenghu-extension', 'dashed', '10,8'],
      ['golmud-extension', 'golmud-extension', 'dashed', '4,10'],
    ] as const

    for (const [routeId, scope, strokeStyle, dashPattern] of cases) {
      amapState.polylineOptions = []
      const route = journeyRoutes.find((item) => item.id === routeId)!
      const routePlaces = places.filter((place) => route.placeIds.includes(place.id))
      const wrapper = mount(RouteMap, { props: { route, places: routePlaces, visitedIds: [] } })
      await flushPromises()

      const routeLine = amapState.polylineOptions.find((options) => (
        (options.extData as { routeScope?: string } | undefined)?.routeScope === scope
      ))
      expect(routeLine?.strokeStyle).toBe(strokeStyle)
      expect((routeLine?.strokeDasharray as number[] | undefined)?.join(',')).toBe(dashPattern)
      expect(wrapper.get('.route-map').attributes('data-route-scope')).toBe(route.scope)
      wrapper.unmount()
    }
  })

  it('does not draw Tibetan antelope as a fixed map marker', async () => {
    const route = journeyRoutes.find((item) => item.id === 'golmud-extension')!
    const routePlaces = places.filter((place) => route.placeIds.includes(place.id))
    mount(RouteMap, { props: { route, places: routePlaces, visitedIds: [] } })
    await flushPromises()

    expect(amapState.markerContents.some((element) => element.textContent?.includes('藏羚羊'))).toBe(false)
    expect(amapState.markerContents.some((element) => element.textContent?.includes('可可西里'))).toBe(true)
  })
})
