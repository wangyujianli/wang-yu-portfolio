import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import PreparationView from '@/views/PreparationView.vue'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/preparation', component: PreparationView },
      { path: '/map', component: { template: '<div />' } },
      { path: '/places', component: { template: '<div />' } },
      { path: '/itinerary', component: { template: '<div />' } },
      { path: '/nearby', component: { template: '<div />' } },
      { path: '/photo-guide', component: { template: '<div />' } },
      { path: '/highlights', component: { template: '<div />' } },
      { path: '/footprints', component: { template: '<div />' } },
    ],
  })
}

describe('preparation workbench', () => {
  it('makes preparation the home page primary next step', () => {
    const wrapper = mount(HomeView, { global: { plugins: [createPinia(), makeRouter()] } })
    const action = wrapper.get('[data-start-exploring]')

    expect(action.attributes('href')).toBe('/preparation')
    expect(action.text()).toContain('开始探索')
  })

  it('opens with ten concise preparation entries and links each to a real section', () => {
    const wrapper = mount(PreparationView, { global: { plugins: [createPinia(), makeRouter()] } })
    const entries = wrapper.findAll('[data-preparation-entry]')

    expect(entries).toHaveLength(10)
    expect(wrapper.text()).toContain('把重要的事情提前想清楚，路上的节奏仍然交给旅人自己。')
    expect(wrapper.text()).toContain('门票与开放时间')
    expect(wrapper.text()).toContain('服装与温差')
    expect(wrapper.text()).toContain('摄影与电子设备')
    expect(wrapper.text()).toContain('紧急联系')

    for (const entry of entries) {
      const href = entry.attributes('href') ?? ''
      expect(href).toMatch(/^#\/preparation#.+/)
      const targetId = href.split('#').pop() ?? ''
      expect(wrapper.find(`#${targetId}`).exists(), href).toBe(true)
    }
  })

  it('adds clothing, sunscreen and food guidance while preserving ticket and hours checklists', () => {
    const wrapper = mount(PreparationView, { global: { plugins: [createPinia(), makeRouter()] } })

    expect(wrapper.get('#clothing').text()).toContain('怎么穿更舒服')
    expect(wrapper.get('#sun-protection').text()).toContain('高原防晒，不只是一瓶防晒霜')
    expect(wrapper.get('#food-hydration').text()).toContain('路上怎么吃更舒服')
    expect(wrapper.find('[data-ticket-checklist]').exists()).toBe(true)
    expect(wrapper.find('[data-opening-hours-checklist]').exists()).toBe(true)
  })

  it('ends with a direct but non-scheduling route to the map', () => {
    const wrapper = mount(PreparationView, { global: { plugins: [createPinia(), makeRouter()] } })
    const action = wrapper.get('[data-preparation-next]')

    expect(action.attributes('href')).toBe('/map')
    expect(action.text()).toContain('准备好了，查看沿途地点')
  })
})
