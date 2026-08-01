import { createPinia } from 'pinia'
import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import PlaceCard from '@/components/place/PlaceCard.vue'
import { placeById } from '@/data/places'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import PlacesView from '@/views/PlacesView.vue'

function makeRouter(component: Component = { template: '<div />' }) {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/places', component: PlacesView },
      { path: '/places/:slug', component: PlaceDetailView },
      { path: '/footprints', component },
    ],
  })
}

describe('classification-aware place views', () => {
  it('uses exactly two decision filter rows and intersects priority with route scope', async () => {
    const router = makeRouter(PlacesView)
    await router.push('/places')
    await router.isReady()
    const wrapper = mount(PlacesView, { global: { plugins: [createPinia(), router] } })

    expect(wrapper.findAll('[data-place-filter-row]')).toHaveLength(2)
    expect(wrapper.findAll('[data-place-filter-row]').map((row) => row.get('span').text())).toEqual([
      '按优先级',
      '按线路范围',
    ])
    expect(wrapper.text()).not.toContain('按风景')
    expect(wrapper.findAll('[data-place-card]')).toHaveLength(29)
    expect(wrapper.text()).not.toContain('藏羚羊合法观察区域')

    await wrapper.get('[data-priority-filter="priority"]').trigger('click')
    await flushPromises()
    await wrapper.get('[data-route-scope-filter="golmud-extension"]').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.query).toMatchObject({ priority: 'priority', routeScope: 'golmud-extension' })
    expect(wrapper.findAll('[data-place-card]').map((card) => card.attributes('data-place-id'))).toEqual([
      'qarhan-salt-lake',
      'kunlun-pass',
    ])
  })

  it('shows no more than three classification labels on every place card', () => {
    const router = makeRouter()
    const cases = [
      ['mogao-grottoes', ['核心必看', '青甘主线', '文化核心']],
      ['delingha', ['顺路可看', '青甘主线', '补给节点']],
      ['black-mountain', ['优先安排', '冷湖延伸', '开放边界确认']],
      ['qarhan-salt-lake', ['优先安排', '格尔木延伸', '盐湖与工业地理']],
      ['hoh-xil', ['兴趣加选', '格尔木延伸', '生态观察']],
    ] as const

    for (const [placeId, labels] of cases) {
      const wrapper = mount(PlaceCard, {
        props: { place: placeById.get(placeId)! },
        global: { plugins: [createPinia(), router] },
      })
      expect(wrapper.findAll('[data-classification-tag]').map((tag) => tag.text())).toEqual(labels)
      expect(wrapper.findAll('[data-classification-tag]')).toHaveLength(3)
      expect(wrapper.get('[data-card-recommendation]').text()).toBe(`${placeById.get(placeId)!.recommendation}星推荐`)
    }
  })

  it('explains classification and extension decisions on detail pages', async () => {
    const router = makeRouter(PlaceDetailView)
    await router.push('/places/black-mountain')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div />' }, ScenicGallery: { template: '<div />' } },
      },
    })

    expect(wrapper.get('[data-classification-summary]').text()).toContain('本次分类：优先安排 · 冷湖延伸')
    expect(wrapper.get('[data-classification-reason]').text()).toContain('黑独山是差异化最明显的地貌目标')
    expect(wrapper.get('[data-route-decision-note]').text()).toContain('合法开放区域')
    expect(wrapper.get('[data-extension-notice]').text()).toContain('通常会增加车程或住宿')
  })

  it('embeds retained Tibetan antelope data inside the Hoh Xil detail page', async () => {
    const router = makeRouter(PlaceDetailView)
    await router.push('/places/hoh-xil')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div />' }, ScenicGallery: { template: '<div />' } },
      },
    })

    const ecology = wrapper.get('[data-ecology-observation]')
    expect(ecology.get('h2').text()).toBe('沿途可能出现的生态观察')
    for (const note of ['动物出现与否不可预设', '不提供固定坐标', '不追逐', '不投喂', '不鸣笛驱赶', '不下车靠近', '不使用无人机低空惊扰', '使用长焦远距离拍摄', '没有看到动物也是正常的自然结果']) {
      expect(ecology.text()).toContain(note)
    }
    expect(ecology.text()).toContain(placeById.get('tibetan-antelope')!.classification.priorityReason)
  })
})
