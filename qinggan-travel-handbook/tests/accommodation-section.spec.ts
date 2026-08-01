import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AccommodationSection from '@/components/accommodation/AccommodationSection.vue'
import { placeById } from '@/data/places'

describe('accommodation section', () => {
  it('shows three concise cards and defers gallery images until the drawer opens', async () => {
    const place = placeById.get('xining')!
    const wrapper = mount(AccommodationSection, { props: { place } })

    expect(wrapper.get('h2').text()).toBe('附近住哪里更合适')
    expect(wrapper.text()).toContain('只比较位置、舒适度与自驾便利')
    expect(wrapper.findAll('[data-accommodation-card]')).toHaveLength(3)
    expect(wrapper.findAll('[data-accommodation-card] img')).toHaveLength(3)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-accommodation-card]').map((card) => card.text()).join('')).not.toMatch(/价格|低价|优惠|抢购|促销|折扣/)
    const firstCard = wrapper.findAll('[data-accommodation-card]')[0]!
    expect(firstCard.text()).toContain('青海省西宁市城东区互助西路145号')
    expect(firstCard.text()).toContain('停车')
    expect(firstCard.text()).toContain('电梯')
    expect(firstCard.text()).toContain('早餐')
    expect(firstCard.text()).toContain('空调')
    expect(firstCard.text()).toContain('供氧')
    expect(firstCard.text()).toContain('加湿器')
    expect(firstCard.text()).toContain('洗衣')
    expect(firstCard.text()).toContain('充电设施')
    expect(firstCard.text()).toContain('预订前确认')
    expect(firstCard.text()).toContain('2026-08-01')

    await wrapper.findAll('[data-accommodation-details]')[0]!.trigger('click')
    await nextTick()

    const drawer = wrapper.get('[role="dialog"]')
    expect(drawer.attributes('aria-modal')).toBe('true')
    expect(drawer.text()).toContain('青海省西宁市城东区互助西路145号')
    expect(drawer.text()).toContain('完整设施')
    expect(drawer.findAll('[data-accommodation-gallery] img')).toHaveLength(3)
    expect(drawer.findAll('img').every((image) => image.attributes('loading') === 'lazy')).toBe(true)
    expect(drawer.get('a[data-external-detail]').attributes('target')).toBe('_blank')
    expect(drawer.get('a[data-external-detail]').attributes('rel')).toContain('noopener')
  })

  it('explains the mature stay node for an along-the-way stop', () => {
    const place = placeById.get('biandukou')!
    const wrapper = mount(AccommodationSection, { props: { place } })

    const notice = wrapper.get('[data-remote-stay-notice]')
    expect(notice.text()).toContain('这里更适合作为沿途游览点')
    expect(notice.text()).toContain('张掖市区或临泽丹霞片区')
    expect(notice.text()).toContain(place.remoteStayAdvice!.travelText)
    expect(notice.text()).toContain(place.remoteStayAdvice!.reason)
  })

  it('uses the unified local placeholder when an image fails', async () => {
    const wrapper = mount(AccommodationSection, { props: { place: placeById.get('xining')! } })
    const image = wrapper.get('[data-accommodation-card] img')

    await image.trigger('error')

    expect(image.attributes('src')).toBe('/images/accommodations/stay-placeholder.svg')
  })
})
