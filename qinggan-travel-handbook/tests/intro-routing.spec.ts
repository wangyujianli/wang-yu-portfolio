import { describe, expect, it } from 'vitest'
import { shouldOpenIntro } from '@/router'

describe('intro routing', () => {
  it('opens the intro only before the first visit', () => {
    expect(shouldOpenIntro(false, 'home')).toBe(true)
    expect(shouldOpenIntro(true, 'home')).toBe(false)
    expect(shouldOpenIntro(false, 'intro')).toBe(false)
  })
})
