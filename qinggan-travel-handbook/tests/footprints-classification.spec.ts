import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'
import FootprintsView from '@/views/FootprintsView.vue'

describe('non-standalone visit compatibility', () => {
  beforeEach(() => localStorage.clear())

  it('keeps a stored Tibetan antelope visit without rendering it as a standalone footprint', async () => {
    localStorage.setItem('westward:v1:visited', JSON.stringify({ xining: true, 'tibetan-antelope': true }))
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/footprints', component: FootprintsView },
        { path: '/map', component: { template: '<div />' } },
        { path: '/places', component: { template: '<div />' } },
        { path: '/places/:slug', component: { template: '<div />' } },
      ],
    })
    await router.push('/footprints')
    await router.isReady()
    const wrapper = mount(FootprintsView, { global: { plugins: [createPinia(), router] } })

    expect(wrapper.text()).toContain('西宁')
    expect(wrapper.text()).not.toContain('藏羚羊合法观察区域')
    expect(wrapper.get('.footprint-stamp').text()).toContain('1/ 29 PLACES')
    expect(JSON.parse(localStorage.getItem('westward:v1:visited') ?? '{}')).toEqual({
      xining: true,
      'tibetan-antelope': true,
    })
  })
})
