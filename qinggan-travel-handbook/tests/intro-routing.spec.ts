import { describe, expect, it } from 'vitest'
import appRouter, { shouldOpenIntro } from '@/router'

describe('intro routing', () => {
  it('opens the intro only before the first visit', () => {
    expect(shouldOpenIntro(false, 'home')).toBe(true)
    expect(shouldOpenIntro(true, 'home')).toBe(false)
    expect(shouldOpenIntro(false, 'intro')).toBe(false)
  })

  it('uses hash URLs so direct refreshes work on static hosting', () => {
    expect(appRouter.resolve('/map').href).toBe('#/map')
    expect(appRouter.resolve('/places/chaka-salt-lake').href).toBe('#/places/chaka-salt-lake')
  })
})
