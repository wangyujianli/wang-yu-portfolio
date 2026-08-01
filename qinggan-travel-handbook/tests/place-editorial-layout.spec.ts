import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import PlaceDetailView from '@/views/PlaceDetailView.vue'

async function mountPlace(slug: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/places', component: { template: '<div />' } },
      { path: '/places/:slug', component: PlaceDetailView },
      { path: '/nearby', component: { template: '<div />' } },
    ],
  })
  await router.push(`/places/${slug}`)
  await router.isReady()
  return mount(PlaceDetailView, {
    global: {
      plugins: [createPinia(), router],
      stubs: { WeatherPanel: { template: '<div data-weather-panel />' } },
    },
  })
}

describe('place editorial layout', () => {
  it('turns the place theme and primary modules into a visible editorial masthead', async () => {
    const wrapper = await mountPlace('mogao-grottoes')
    const masthead = wrapper.get('[data-editorial-theme]')

    expect(masthead.text()).toContain('用有限的参观时间，理解千年丝路文明')
    expect(masthead.attributes('data-primary-module')).toBe('culture')
    expect(masthead.text()).toContain('文化')
    expect(masthead.text()).toContain('预约')
    expect(masthead.text()).toContain('现场边界')
  })

  it('renders food, souvenir and photo modules with the configured levels', async () => {
    const wrapper = await mountPlace('chaka-salt-lake')

    expect(wrapper.get('[data-module="photography"]').attributes('data-module-level')).toBe('primary')
    expect(wrapper.get('[data-module="food"]').attributes('data-module-level')).toBe('compact')
    expect(wrapper.get('[data-module="souvenir"]').attributes('data-module-level')).toBe('secondary')
    expect(wrapper.findAll('[data-photo-checkpoint]')).toHaveLength(4)
    expect(wrapper.find('[data-compact-expand]').exists()).toBe(true)
  })

  it('does not leave headings or whitespace for explicitly hidden modules', async () => {
    const g315 = await mountPlace('g315-u-road')
    expect(g315.find('[data-module="souvenir"]').exists()).toBe(false)
    expect(g315.get('[data-module="food"]').attributes('data-module-level')).toBe('compact')

    const sculpture = await mountPlace('son-of-earth')
    expect(sculpture.find('[data-module="food"]').exists()).toBe(false)
    expect(sculpture.find('[data-module="souvenir"]').exists()).toBe(false)
    expect(sculpture.find('[data-accommodation-section]').exists()).toBe(false)
  })

  it('gives Delingha rest and supply priority while keeping Black Mountain boundary first-class', async () => {
    const delingha = await mountPlace('delingha')
    expect(delingha.get('[data-module="food"]').attributes('data-module-level')).toBe('primary')
    expect(delingha.get('[data-accommodation-shell]').attributes('data-module-level')).toBe('primary')

    const blackMountain = await mountPlace('black-mountain')
    expect(blackMountain.get('[data-editorial-alert]').text()).toContain('以当日合法开放区域为游览范围')
    expect(blackMountain.get('[data-module="photography"]').attributes('data-module-level')).toBe('primary')
  })

  it('keeps the Hoh Xil page ecological and long-lens led', async () => {
    const wrapper = await mountPlace('hoh-xil')

    expect(wrapper.get('[data-editorial-theme]').attributes('data-primary-module')).toBe('ecology')
    expect(wrapper.get('[data-module="photography"]').text()).toContain('长焦')
    expect(wrapper.find('[data-module="food"]').exists()).toBe(false)
    expect(wrapper.find('[data-accommodation-section]').exists()).toBe(false)
  })
})
