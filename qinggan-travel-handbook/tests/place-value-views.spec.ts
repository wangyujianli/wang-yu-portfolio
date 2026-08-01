import { createPinia } from 'pinia'
import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import MapPlaceSheet from '@/components/map/MapPlaceSheet.vue'
import PlaceCard from '@/components/place/PlaceCard.vue'
import { placeById } from '@/data/places'
import HomeView from '@/views/HomeView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import PlacesView from '@/views/PlacesView.vue'

function makeRouter(component: Component = { template: '<div />' }) {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component },
      { path: '/map', component: { template: '<div />' } },
      { path: '/places', component: PlacesView },
      { path: '/places/:slug', component: PlaceDetailView },
      { path: '/photo-guide', component: { template: '<div />' } },
      { path: '/highlights', component: { template: '<div />' } },
      { path: '/footprints', component: { template: '<div />' } },
      { path: '/preparation', component: { template: '<div />' } },
    ],
  })
}

describe('place visit-value views', () => {
  it('introduces the route through three geographic chapters on home', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [createPinia(), makeRouter(HomeView)] },
    })

    const section = wrapper.get('[data-route-value]')
    expect(section.get('h2').text()).toBe('为什么是青甘大环线')
    expect(section.text()).toContain('从河湟谷地进入河西走廊')
    expect(section.findAll('[data-route-chapter]')).toHaveLength(3)
    expect(section.text()).toContain('文明向西')
    expect(section.text()).toContain('进入荒野')
    expect(section.text()).toContain('回到湖泊')
  })

  it('puts the stop decision before secondary imagery in the map sheet', () => {
    const place = placeById.get('wusute-yadan')!
    const wrapper = mount(MapPlaceSheet, {
      props: { place },
      global: { plugins: [createPinia(), makeRouter()] },
    })

    expect(wrapper.get('h2').text()).toBe('乌素特水上雅丹')
    expect(wrapper.get('[data-map-reason]').text()).toBe(place.value.reasonToVisit)
    expect(wrapper.get('[data-priority]').text()).toContain('核心必看')
    expect(wrapper.text()).toContain(place.suggestedDuration)
    expect(wrapper.get('.button-primary').text()).toContain('查看完整攻略')
    expect(wrapper.find('.visited-toggle').exists()).toBe(true)

    const reason = wrapper.get('[data-map-reason]').element
    const image = wrapper.get('.map-place-sheet__image').element
    expect(reason.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('shows value, priority and suitability tags on every place card', () => {
    const place = placeById.get('mogao-grottoes')!
    const wrapper = mount(PlaceCard, {
      props: { place },
      global: { plugins: [createPinia(), makeRouter()] },
    })

    expect(wrapper.get('[data-card-reason]').text()).toBe(place.value.reasonToVisit)
    expect(wrapper.get('[data-priority]').text()).toContain('核心必看')
    expect(wrapper.findAll('[data-classification-tag]')).toHaveLength(3)
    expect(wrapper.find('.visited-toggle').exists()).toBe(true)
  })

  it('filters the list by priority while preserving route query behavior', async () => {
    const router = makeRouter(PlacesView)
    await router.push('/places?routeScope=main-route')
    await router.isReady()
    const wrapper = mount(PlacesView, { global: { plugins: [createPinia(), router] } })

    await wrapper.get('[data-priority-filter="priority"]').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.query.routeScope).toBe('main-route')
    expect(router.currentRoute.value.query.priority).toBe('priority')
    expect(wrapper.findAll('[data-place-card]')).toHaveLength(4)
    expect(wrapper.findAll('[data-place-card]').every((card) => card.attributes('data-priority') === 'priority')).toBe(true)
  })

  it('orders the detail decision before play and leaves the visited action at the end', async () => {
    const router = makeRouter(PlaceDetailView)
    await router.push('/places/zhangye-danxia')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div data-weather-panel />' } },
      },
    })

    expect(wrapper.find('[data-scenic-gallery]').exists()).toBe(true)
    expect(wrapper.find('[data-photo-spread]').exists()).toBe(true)
    const headings = wrapper.findAll('[data-value-heading]').map((node) => node.text())
    expect(headings).toEqual(['为什么值得去', '这里最特别的是什么', '推荐等级', '适合谁', '时间紧时怎么选择'])
    expect(wrapper.get('[data-place-value]').element.compareDocumentPosition(wrapper.get('.place-sections').element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wrapper.get('.place-sections').element.compareDocumentPosition(wrapper.get('[data-accommodation-section]').element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wrapper.get('[data-accommodation-section]').element.compareDocumentPosition(wrapper.get('.combination-section').element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wrapper.get('.combination-section').element.compareDocumentPosition(wrapper.get('.place-detail__footer').element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wrapper.find('.place-hero .visited-toggle').exists()).toBe(false)
    expect(wrapper.find('.place-detail__footer .visited-toggle').exists()).toBe(true)
  })

})
