import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readJson, writeJson } from '@/services/storage'

describe('storage helpers', () => {
  beforeEach(() => localStorage.clear())

  it('reads valid JSON and falls back for corrupt data', () => {
    localStorage.setItem('valid', JSON.stringify({ west: true }))
    localStorage.setItem('broken', '{not-json')

    expect(readJson('valid', {})).toEqual({ west: true })
    expect(readJson('broken', { west: false })).toEqual({ west: false })
  })

  it('keeps the app running when storage writes fail', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('denied')
    })

    expect(writeJson('key', { value: 1 })).toBe(false)
  })
})
