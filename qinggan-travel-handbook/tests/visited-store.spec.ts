import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useVisitedStore } from '@/stores/visited'

describe('visited store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('toggles a place and persists the state', () => {
    const store = useVisitedStore()

    expect(store.isVisited('xining')).toBe(false)
    store.toggle('xining')

    expect(store.isVisited('xining')).toBe(true)
    expect(store.count).toBe(1)
    expect(JSON.parse(localStorage.getItem('westward:v1:visited') ?? '{}')).toEqual({ xining: true })
  })

  it('hydrates only boolean true entries', () => {
    localStorage.setItem('westward:v1:visited', JSON.stringify({ xining: true, mogao: false, invalid: 'yes' }))
    setActivePinia(createPinia())

    const store = useVisitedStore()

    expect(store.visitedIds).toEqual(['xining'])
    expect(store.count).toBe(1)
  })
})
