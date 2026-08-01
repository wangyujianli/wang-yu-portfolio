import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import ScenicGallery from '@/components/scenic/ScenicGallery.vue'
import type { ScenicImageAsset } from '@/data/scenicImages'

function images(count: number): ScenicImageAsset[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `lake-${index + 1}`,
    placeId: 'lake',
    sourceName: `source-${index + 1}.jpg`,
    alt: `湖泊实景第${index + 1}张`,
    width: 1600,
    height: 1000,
    orientation: 'landscape',
    objectPosition: 'center',
    thumbnail: `/lake-${index + 1}-480.webp`,
    regular: `/lake-${index + 1}-960.webp`,
    large: `/lake-${index + 1}-1600.webp`,
  }))
}

describe('ScenicGallery', () => {
  it('renders a single real image without carousel controls', () => {
    const wrapper = mount(ScenicGallery, { props: { images: images(1), title: '湖泊实景' } })
    expect(wrapper.get('img').attributes('alt')).toBe('湖泊实景第1张')
    expect(wrapper.find('[aria-label="下一张照片"]').exists()).toBe(false)
  })

  it('moves through a two-image carousel with visible controls and keyboard arrows', async () => {
    const wrapper = mount(ScenicGallery, { props: { images: images(2), title: '湖泊实景' } })
    await wrapper.get('[aria-label="下一张照片"]').trigger('click')
    expect(wrapper.get('.scenic-gallery__counter').text()).toContain('2 / 2')
    await wrapper.get('.scenic-gallery').trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.get('.scenic-gallery__counter').text()).toContain('1 / 2')
  })

  it('adds thumbnails and a dismissible lightbox for four or more images', async () => {
    const wrapper = mount(ScenicGallery, { props: { images: images(4), title: '荒原实景' }, attachTo: document.body })
    expect(wrapper.findAll('[data-gallery-thumbnail]')).toHaveLength(4)
    await wrapper.get('[aria-label="打开大图查看"]').trigger('click')
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
    ;(document.body.querySelector('[aria-label="关闭大图"]') as HTMLButtonElement).click()
    await nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    wrapper.unmount()
  })

  it('shows a consistent text fallback when no publishable image exists', () => {
    const wrapper = mount(ScenicGallery, { props: { images: [], title: '胭脂山实景' } })
    expect(wrapper.get('[data-gallery-empty]').text()).toContain('暂无可公开实景图')
  })
})
