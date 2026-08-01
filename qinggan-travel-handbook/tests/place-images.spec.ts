import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { places } from '@/data/places'

describe('place scenic images', () => {
  it('provides one local image for every place', () => {
    expect(new Set(places.map((place) => place.image)).size).toBe(places.length)

    for (const place of places) {
      const relativePath = place.image.replace(/^\//, '')
      expect(existsSync(resolve(process.cwd(), 'public', relativePath))).toBe(true)
    }
  })
})
