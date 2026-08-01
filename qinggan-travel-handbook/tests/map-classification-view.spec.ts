import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MapView from '@/views/MapView.vue'

describe('map classification legend', () => {
  it('explains all three route scopes plus supply and ecology markers', () => {
    const wrapper = mount(MapView, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouteMap: { template: '<div />' },
          FallbackRouteAtlas: { template: '<div />' },
          MapPlaceSheet: { template: '<div />' },
        },
      },
    })

    const legend = wrapper.get('[data-map-route-legend]')
    for (const label of ['青甘主线', '冷湖延伸', '格尔木延伸', '城市与补给', '生态观察']) {
      expect(legend.text()).toContain(label)
    }
  })
})
