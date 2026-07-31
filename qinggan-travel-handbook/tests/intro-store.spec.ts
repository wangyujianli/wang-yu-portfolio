import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useIntroStore } from '@/stores/intro'

describe('intro store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('completes and resets intro without touching travel footprints', () => {
    localStorage.setItem('westward:v1:visited', JSON.stringify({ xining: true }))
    const store = useIntroStore()

    store.complete()
    expect(store.hasSeenIntro).toBe(true)
    expect(JSON.parse(localStorage.getItem('westward:v1:intro-seen') ?? 'false')).toBe(true)

    store.reset()
    expect(store.hasSeenIntro).toBe(false)
    expect(localStorage.getItem('westward:v1:visited')).toBe(JSON.stringify({ xining: true }))
  })
})
