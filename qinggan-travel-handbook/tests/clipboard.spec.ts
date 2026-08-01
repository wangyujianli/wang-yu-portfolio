import { describe, expect, it } from 'vitest'
import { copyText } from '@/services/clipboard'

describe('copyText', () => {
  it('writes the exact channel name through the supplied clipboard', async () => {
    const writes: string[] = []
    const clipboard = {
      writeText: async (value: string) => {
        writes.push(value)
      },
    }

    expect(await copyText('莫高窟参观预约网', clipboard)).toBe(true)
    expect(writes).toEqual(['莫高窟参观预约网'])
  })

  it('returns false when clipboard access is unavailable', async () => {
    expect(await copyText('茶卡盐湖')).toBe(false)
  })

  it('returns false when the browser rejects clipboard access', async () => {
    const clipboard = {
      writeText: async () => Promise.reject(new Error('not allowed')),
    }

    expect(await copyText('智游青海湖', clipboard)).toBe(false)
  })
})
