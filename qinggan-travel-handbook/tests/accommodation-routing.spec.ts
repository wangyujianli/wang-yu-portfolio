import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import AppHeader from '@/components/common/AppHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const routes = [
  { path: '/', component: { template: '<div />' } },
  { path: '/map', component: { template: '<div />' } },
  { path: '/places', component: { template: '<div />' } },
  { path: '/photo-guide', component: { template: '<div />' } },
  { path: '/footprints', component: { template: '<div />' } },
]

describe('accommodation navigation boundary', () => {
  it('keeps accommodation out of the global header and bottom navigation', () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    const header = mount(AppHeader, { global: { plugins: [router] } })
    const bottom = mount(BottomNav, { global: { plugins: [router] } })

    expect(`${header.text()}${bottom.text()}`).not.toContain('住哪里')
    expect([...header.findAll('a'), ...bottom.findAll('a')].some((link) => link.attributes('href') === '/stay')).toBe(false)
  })
})
