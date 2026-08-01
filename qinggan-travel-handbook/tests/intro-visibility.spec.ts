import { beforeEach, describe, expect, it } from 'vitest'
import { INTRO_SEEN_KEY, useIntroVisibility } from '@/stores/intro'

describe('intro visibility', () => {
  beforeEach(() => localStorage.clear())

  it('shows on the first visit and stays hidden after completion', () => {
    const intro = useIntroVisibility()

    expect(intro.isVisible.value).toBe(true)

    intro.complete()

    expect(intro.isVisible.value).toBe(false)
    expect(JSON.parse(localStorage.getItem(INTRO_SEEN_KEY) ?? 'false')).toBe(true)
    expect(useIntroVisibility().isVisible.value).toBe(false)
  })

  it('starts hidden when the browser has already seen the intro', () => {
    localStorage.setItem(INTRO_SEEN_KEY, JSON.stringify(true))

    expect(useIntroVisibility().isVisible.value).toBe(false)
  })

  it('records the first presentation without closing the current intro', () => {
    const intro = useIntroVisibility()

    intro.markPresented()

    expect(intro.isVisible.value).toBe(true)
    expect(useIntroVisibility().isVisible.value).toBe(false)
  })
})
