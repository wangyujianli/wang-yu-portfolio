import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import ItineraryView from '@/views/ItineraryView.vue'
import NearbyView from '@/views/NearbyView.vue'
import appRouter from '@/router'

const router = () => createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/places/:slug', component: { template: '<div />' } },
  ],
})

describe('journey reference views', () => {
  it('registers direct links for itinerary and nearby exploration', () => {
    const paths = appRouter.getRoutes().map((route) => route.path)
    expect(paths).toContain('/itinerary')
    expect(paths).toContain('/nearby')
  })

  it('renders all nine days as an explicitly adjustable reference', () => {
    const wrapper = mount(ItineraryView, { global: { plugins: [router()] } })
    expect(wrapper.get('[data-itinerary-notice]').text()).toContain('可根据航班、天气、预约和体力自由调整')
    expect(wrapper.findAll('[data-itinerary-day]')).toHaveLength(9)
    expect(wrapper.text()).toContain('驾驶压力')
    expect(wrapper.text()).toContain('雨天替代')
    expect(wrapper.text()).toContain('拍照主题')
  })

  it('filters nearby ideas by the requested time layers', async () => {
    const wrapper = mount(NearbyView, { global: { plugins: [router()] } })
    expect(wrapper.findAll('[data-nearby-group-filter]')).toHaveLength(5)
    expect(wrapper.text()).toContain('圣泉湾')
    await wrapper.get('[data-nearby-group-filter="half-day"]').trigger('click')
    expect(wrapper.findAll('[data-nearby-card]')).toHaveLength(8)
    expect(wrapper.text()).toContain('卓尔山')
    expect(wrapper.text()).not.toContain('察尔汗盐湖')
  })
})
