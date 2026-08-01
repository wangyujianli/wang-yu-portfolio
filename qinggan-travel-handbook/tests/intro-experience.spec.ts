import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import IntroExperience from '@/components/intro/IntroExperience.vue'

describe('IntroExperience', () => {
  it('uses the approved local image and lets the visitor skip', async () => {
    const wrapper = mount(IntroExperience)

    expect(wrapper.get('img.intro-backdrop__image').attributes('src')).toContain(
      'intro-riyueshan-prayer-flags.webp',
    )

    await wrapper.get('button.intro-skip').trigger('click')

    expect(wrapper.emitted('complete')).toHaveLength(1)
  })
})
