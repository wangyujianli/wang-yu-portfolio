import { describe, expect, it } from 'vitest'
import * as preparationModule from '@/data/preparation'

interface TestPreparationCard {
  id: string
  number: string
  title: string
  urgency: string
  timingLabel: string
  confirmTiming: string
  summary: string[]
  sections: Array<{ title: string; items: string[]; tone?: string }>
  officialLinks?: Array<{ label: string; url: string; type: string }>
  wechatChannels?: Array<{ label: string; value: string }>
  phones?: Array<{ label: string; number: string; type: string }>
  updatedAt: string
  timeSensitive?: boolean
  disclaimer?: string
}

function preparationCards(): TestPreparationCard[] | undefined {
  return (preparationModule as unknown as { preparationCards?: TestPreparationCard[] }).preparationCards
}

describe('preparation confirmation content', () => {
  it('provides eight ordered and fully structured confirmation cards', () => {
    const cards = preparationCards()
    expect(Array.isArray(cards)).toBe(true)
    if (!cards) return

    expect(cards).toHaveLength(8)
    expect(cards.map((card) => card.number)).toEqual(['01', '02', '03', '04', '05', '06', '07', '08'])
    expect(new Set(cards.map((card) => card.id)).size).toBe(8)

    for (const card of cards) {
      expect(card.summary).toHaveLength(3)
      expect(card.summary.every((item) => item.length >= 6)).toBe(true)
      expect(card.sections.length).toBeGreaterThan(0)
      expect(card.sections.every((section) => section.title.length > 0 && section.items.length > 0)).toBe(true)
      expect(card.confirmTiming.length).toBeGreaterThan(6)
      expect(card.timingLabel.length).toBeGreaterThan(1)
      expect(card.updatedAt).toBe('2026年8月')
    }
  })

  it('uses only verified first-party domains for official links', () => {
    const cards = preparationCards()
    expect(Array.isArray(cards)).toBe(true)
    if (!cards) return

    const officialUrls = cards.flatMap((card) => card.officialLinks?.map((link) => link.url) ?? [])
    expect(officialUrls).toEqual([
      'https://www.mgk.org.cn/',
      'https://www.mssyyq.com/',
      'https://www.chakasl.com/',
      'https://www.chakasl.com/ticket.html',
    ])
    expect(cards.find((card) => card.id === 'yadan-g315')?.officialLinks).toBeUndefined()
  })

  it('contains direct emergency contacts and a distinct danger section', () => {
    const cards = preparationCards()
    expect(Array.isArray(cards)).toBe(true)
    if (!cards) return

    const emergency = cards.find((card) => card.id === 'emergency-contacts')
    expect(emergency?.phones?.filter((phone) => phone.type === 'emergency').map((phone) => phone.number)).toEqual([
      '110',
      '119',
      '120',
      '122',
    ])
    expect(emergency?.phones?.some((phone) => phone.number === '12328')).toBe(true)
    expect(emergency?.phones?.some((phone) => phone.number === '12345')).toBe(true)

    const health = cards.find((card) => card.id === 'altitude-health')
    expect(health?.sections.some((section) => section.tone === 'danger')).toBe(true)
    expect(health?.phones?.some((phone) => phone.number === '120')).toBe(true)
    expect(health?.disclaimer).toBe('本页面只提供一般旅行安全信息，不能代替医生诊断。')
  })

  it('keeps internal profile labels and fixed schedules out of user-facing content', () => {
    const serialized = JSON.stringify(preparationCards() ?? [])
    expect(serialized).not.toMatch(/50.?60|中老年|适老|长辈|领导专属|Day\s*[1-9]/i)
  })
})
