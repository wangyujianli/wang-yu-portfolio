import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PreparationView from '@/views/PreparationView.vue'

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
const writeText = vi.fn<(value: string) => Promise<void>>()

beforeEach(() => {
  writeText.mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
})

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, 'clipboard', originalClipboard)
  } else {
    Reflect.deleteProperty(navigator, 'clipboard')
  }
})

describe('PreparationView', () => {
  it('renders eight collapsed cards and expands complete actionable content', async () => {
    const wrapper = mount(PreparationView)

    expect(wrapper.get('h2').text()).toBe('出发前确认中心')
    expect(wrapper.findAll('[data-preparation-card]')).toHaveLength(8)

    const mogaoCard = wrapper.get('[data-card-id="mogao-ticket"]')
    const expandButton = mogaoCard.get('[data-expand]')
    expect(expandButton.attributes('aria-expanded')).toBe('false')
    expect(mogaoCard.find('[data-card-details]').exists()).toBe(false)

    await expandButton.trigger('click')

    expect(expandButton.attributes('aria-expanded')).toBe('true')
    expect(mogaoCard.get('[data-card-details]').text()).toContain('身份证原件')
    const officialLink = mogaoCard.get('a[href="https://www.mgk.org.cn/"]')
    expect(officialLink.attributes('target')).toBe('_blank')
    expect(officialLink.attributes('rel')).toBe('noopener noreferrer')
    expect(mogaoCard.get('a[href="tel:400-833-3715"]').text()).toContain('拨打')
  })

  it('copies a WeChat channel and shows a local success message', async () => {
    const wrapper = mount(PreparationView)
    const mogaoCard = wrapper.get('[data-card-id="mogao-ticket"]')
    await mogaoCard.get('[data-expand]').trigger('click')

    await mogaoCard.get('[data-copy-value="莫高窟参观预约网"]').trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledWith('莫高窟参观预约网')
    expect(mogaoCard.get('[role="status"]').text()).toContain('已复制')
  })

  it('opens and closes the emergency drawer with direct dial links', async () => {
    const wrapper = mount(PreparationView)

    await wrapper.get('[data-emergency-trigger]').trigger('click')

    const drawer = wrapper.get('[role="dialog"]')
    expect(drawer.text()).toContain('紧急情况')
    expect(drawer.text()).toContain('景区咨询')
    expect(drawer.get('a[href="tel:110"]').text()).toContain('拨打')
    expect(drawer.get('a[href="tel:120"]').text()).toContain('拨打')
    expect(drawer.get('a[href="tel:0977-8246699"]').text()).toContain('拨打')

    await drawer.get('[data-emergency-close]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })
})
