import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/map', component: { template: '<div />' } },
      { path: '/places', component: { template: '<div />' } },
      { path: '/places/:slug', component: { template: '<div />' } },
      { path: '/itinerary', component: { template: '<div />' } },
      { path: '/nearby', component: { template: '<div />' } },
      { path: '/photo-guide', component: { template: '<div />' } },
      { path: '/highlights', component: { template: '<div />' } },
      { path: '/footprints', component: { template: '<div />' } },
      { path: '/preparation', component: { template: '<div />' } },
    ],
  })
}

describe('home map hero', () => {
  beforeEach(() => localStorage.clear())

  it('presents the map as the primary experience with two route choices', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), makeRouter()] },
    })

    expect(wrapper.find('[data-home-map-stage]').exists()).toBe(true)
    expect(wrapper.findAll('[data-home-route-ticket]')).toHaveLength(2)
    expect(wrapper.text()).toContain('收藏级风景，不错过经典')
    expect(wrapper.text()).toContain('减少同质化，探索更特别的西北')
    expect(wrapper.get('[data-home-route-ticket][data-route-id="classic"]').attributes('aria-pressed')).toBe('true')
  })

  it('places preparation beside the current footprints summary', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), makeRouter()] },
    })

    const tools = wrapper.get('[data-home-hero-tools]')
    expect(tools.get('[data-home-progress]').text()).toContain('此刻足迹')
    expect(tools.get('[data-home-preparation]').attributes('href')).toBe('/preparation')
    expect(tools.get('[data-home-preparation]').text()).toContain('出发准备')
    expect(wrapper.find('.entry-card--prepare').exists()).toBe(false)
  })

  it('counts only standalone destinations while retaining hidden ecology visit data', () => {
    localStorage.setItem('westward:v1:visited', JSON.stringify({ xining: true, 'tibetan-antelope': true }))
    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), makeRouter()] },
    })

    expect(wrapper.get('[data-home-progress]').text()).toContain('1/29')
    expect(wrapper.text()).toContain('29 个地点，另有 1 个生态观察子模块')
    expect(JSON.parse(localStorage.getItem('westward:v1:visited') ?? '{}')).toHaveProperty('tibetan-antelope', true)
  })

  it('switches to the exploration route and persists it for the full map', async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), makeRouter()] },
    })

    await wrapper.get('[data-home-route-ticket][data-route-id="discovery"]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-home-route-map]').attributes('data-route-id')).toBe('discovery')
    expect(localStorage.getItem('westward:v1:selected-route')).toContain('discovery')
  })
})
