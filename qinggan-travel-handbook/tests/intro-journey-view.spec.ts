import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import IntroJourney from '@/components/intro/IntroJourney.vue'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/intro', name: 'intro', component: IntroJourney },
      { path: '/map', component: { template: '<div />' } },
    ],
  })
}

describe('intro journey desk scene', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
  })

  it('frames the real map with quiet travel desk objects that stay decorative', () => {
    const wrapper = mount(IntroJourney, {
      global: { plugins: [createPinia(), makeRouter()] },
    })

    const desk = wrapper.get('[data-intro-desk]')
    expect(desk.attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('[data-intro-object]')).toHaveLength(4)
    expect(wrapper.get('canvas').attributes('aria-label')).toContain('中国轮廓')
    expect(wrapper.get('.intro-skip').text()).toContain('跳过序章')
  })
})
