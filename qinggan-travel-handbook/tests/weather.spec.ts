import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WeatherPanel from '@/components/weather/WeatherPanel.vue'
import WeatherQuickCheckSection from '@/components/weather/WeatherQuickCheckSection.vue'
import {
  weatherCheckpointForPlace,
  weatherCheckpoints,
  weatherNotice,
} from '@/data/weatherCheckpoints'

describe('static weather quick check', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('provides exactly the eleven approved route checkpoints', () => {
    expect(weatherCheckpoints.map((item) => item.name)).toEqual([
      '西宁',
      '门源',
      '张掖',
      '嘉峪关',
      '敦煌',
      '水上雅丹',
      '大柴旦',
      '茶卡',
      '青海湖',
      '格尔木',
      '昆仑山口',
    ])

    for (const checkpoint of weatherCheckpoints) {
      expect(checkpoint.impact.length, checkpoint.name).toBeGreaterThan(12)
      expect(checkpoint.clothing.length, checkpoint.name).toBeGreaterThan(8)
      expect(checkpoint.protection.length, checkpoint.name).toBeGreaterThan(8)
      expect(checkpoint.weatherUrl, checkpoint.name).toMatch(/^https:\/\/www\.weather\.com\.cn\//)
    }
  })

  it('renders impact guidance and a safe external link without requesting an API', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    const checkpoint = weatherCheckpointForPlace('qinghai-lake')
    expect(checkpoint).toBeDefined()

    const wrapper = mount(WeatherPanel, {
      props: { checkpoint: checkpoint! },
    })

    expect(wrapper.text()).toContain('天气速查与影响提醒')
    expect(wrapper.text()).toContain('青海湖')
    expect(wrapper.text()).toContain('穿衣提醒')
    expect(wrapper.text()).toContain('建议出发前一天再次确认')
    expect(wrapper.text()).toContain(weatherNotice)
    expect(wrapper.text()).not.toMatch(/\b-?\d{1,2}\s*°/)
    expect(wrapper.find('[data-weather-link]').attributes()).toMatchObject({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('shows all route checkpoints in the preparation quick-check section', () => {
    const wrapper = mount(WeatherQuickCheckSection)

    expect(wrapper.findAll('[data-weather-checkpoint]')).toHaveLength(11)
    expect(wrapper.text()).toContain(weatherNotice)
    expect(wrapper.findAll('[data-weather-link]')).toHaveLength(11)
  })

  it('maps route places to a relevant approved checkpoint without inventing extra nodes', () => {
    expect(weatherCheckpointForPlace('xining')?.name).toBe('西宁')
    expect(weatherCheckpointForPlace('mogao-grottoes')?.name).toBe('敦煌')
    expect(weatherCheckpointForPlace('g315-u-road')?.name).toBe('水上雅丹')
    expect(weatherCheckpointForPlace('qinghai-lake')?.name).toBe('青海湖')
    expect(weatherCheckpointForPlace('kunlun-pass')?.name).toBe('昆仑山口')
    expect(weatherCheckpointForPlace('delingha')).toBeUndefined()
  })
})
