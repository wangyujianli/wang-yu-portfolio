import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeJourneyMap from '@/components/home/HomeJourneyMap.vue'
import { homeJourneyRoutes } from '@/data/homeJourneyRoutes'

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: vi.fn(() => null),
  })
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => ({ matches: true })),
  })
})

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/places/:slug', component: { template: '<div />' } },
    ],
  })
}

describe('home journey map', () => {
  it('renders real route places as accessible links and shows visited state', () => {
    const route = homeJourneyRoutes[0]!
    const wrapper = mount(HomeJourneyMap, {
      props: { route, visitedIds: ['xining'] },
      global: { plugins: [makeRouter()] },
    })

    expect(wrapper.get('[data-home-route-map]').attributes('aria-label')).toContain('五星经典路线')
    expect(wrapper.get('[data-place-id="xining"]').classes()).toContain('is-visited')
    expect(wrapper.findAll('[data-place-id]')).toHaveLength(new Set(route.placeIds).size)
    expect(wrapper.get('[data-place-id="qinghai-lake"]').attributes('href')).toBe('/places/qinghai-lake')
  })

  it('updates the route identity when the selected route changes', async () => {
    const wrapper = mount(HomeJourneyMap, {
      props: { route: homeJourneyRoutes[0]!, visitedIds: [] },
      global: { plugins: [makeRouter()] },
    })

    await wrapper.setProps({ route: homeJourneyRoutes[1]! })
    expect(wrapper.get('[data-home-route-map]').attributes('data-route-id')).toBe('discovery')
    expect(wrapper.find('[data-place-id="black-mountain"]').exists()).toBe(true)
  })
})
