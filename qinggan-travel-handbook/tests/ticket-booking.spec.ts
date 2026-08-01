import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { places } from '@/data/places'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import PreparationView from '@/views/PreparationView.vue'

interface RuntimeTicketBooking {
  ticketStatus: string
  ticketLabel: string
  bookingLevel: string
  bookingLabel: string
  bookingLeadTime: string
  confirmationTiming: string
  address?: string
  officialChannels: Array<{ type: string; label: string; value: string; url?: string }>
  contacts: Array<{ label: string; number: string; type: string; verified: boolean; sourceLevel: string }>
  bookingNotes: string[]
  accessNotes?: string[]
  lastVerifiedAt: string
  sourceLevel: string
  operatingHours: RuntimeOperatingHours
}

interface RuntimeOpeningPeriod {
  label: string
  dateRange: string
  openTime?: string
  lastTicketTime?: string
  lastCheckInTime?: string
  lastEntryTime?: string
  closeTime?: string
  notes?: string[]
}

interface RuntimeOperatingHours {
  mode: string
  summary: string
  displayStatus: string
  periods: RuntimeOpeningPeriod[]
  internalProjects: Array<{ name: string; operatingTime?: string; note: string }>
  conflictDetected?: boolean
  confirmationNote: string
  lastVerifiedAt: string
}

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
const writeText = vi.fn<(value: string) => Promise<void>>()

beforeEach(() => {
  writeText.mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
})

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard)
  else Reflect.deleteProperty(navigator, 'clipboard')
})

function ticketBooking(placeId: string): RuntimeTicketBooking {
  const place = places.find((item) => item.id === placeId) as unknown as { ticketBooking?: RuntimeTicketBooking }
  if (!place?.ticketBooking) throw new Error(`Missing ticketBooking for ${placeId}`)
  return place.ticketBooking
}

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/places/:slug', component: PlaceDetailView },
      { path: '/preparation', component: PreparationView },
    ],
  })
}

describe('ticket and booking data', () => {
  it('covers all 30 places with complete time-stamped information', () => {
    expect(places).toHaveLength(30)

    for (const place of places) {
      const info = ticketBooking(place.id)
      expect(['free', 'ticket-required', 'partially-ticketed', 'access-control', 'confirm-before-visit']).toContain(info.ticketStatus)
      expect(['mandatory', 'strongly-recommended', 'recommended', 'not-required']).toContain(info.bookingLevel)
      expect(info.ticketLabel.length).toBeGreaterThan(4)
      expect(info.bookingLabel.length).toBeGreaterThan(3)
      expect(info.bookingLeadTime.length).toBeGreaterThan(3)
      expect(info.confirmationTiming.length).toBeGreaterThan(5)
      expect(info.lastVerifiedAt).toBe('2026-08-01')
      expect(['A', 'B', 'C']).toContain(info.sourceLevel)
      expect(info.contacts.every((contact) => /^(?:\d{3,5}|\d{3,4}-?\d{7,8}|400-\d{3}-\d{4}|1\d{10})$/.test(contact.number))).toBe(true)
      expect(info.contacts.every((contact) => contact.verified === (contact.sourceLevel === 'A'))).toBe(true)
      expect(['fixed', 'seasonal', 'monthly', 'daylight-dependent', 'no-fixed-hours', 'access-controlled', 'confirm-before-visit']).toContain(info.operatingHours.mode)
      expect(info.operatingHours.summary.length).toBeGreaterThan(5)
      expect(info.operatingHours.displayStatus.length).toBeGreaterThan(3)
      expect(info.operatingHours.confirmationNote.length).toBeGreaterThan(5)
      expect(info.operatingHours.lastVerifiedAt).toBe('2026-08-01')
    }
  })

  it('keeps operating-hour fields separate and uses the notices covering the August trip window', () => {
    const kumbum = ticketBooking('kumbum-monastery')
    expect(kumbum.address).toBe('青海省西宁市湟中区鲁沙尔镇金塔路56号')
    expect(kumbum.contacts.map((item) => item.number)).toEqual(['0971-2210188', '0971-2232357'])
    expect(kumbum.operatingHours.mode).toBe('seasonal')
    expect(kumbum.operatingHours.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '4月1日至10月31日', openTime: '07:30', lastEntryTime: '17:30', closeTime: '17:30' }),
      expect.objectContaining({ dateRange: '11月1日至次年3月31日', openTime: '08:00', lastEntryTime: '16:30', closeTime: '16:30' }),
    ]))

    const mogao = ticketBooking('mogao-grottoes').operatingHours
    expect(mogao.mode).toBe('seasonal')
    expect(mogao.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '4月1日至11月30日', openTime: '08:00', lastCheckInTime: '16:10', closeTime: '18:00' }),
      expect.objectContaining({ dateRange: '12月1日至次年3月31日', openTime: '09:00', lastCheckInTime: '15:10', closeTime: '17:00' }),
    ]))

    const jiayuguan = ticketBooking('jiayuguan-pass').operatingHours
    expect(jiayuguan.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '5月1日至10月31日', openTime: '08:00', lastTicketTime: '18:00', lastEntryTime: '18:30', closeTime: '18:30' }),
      expect.objectContaining({ dateRange: '11月1日至次年4月30日', openTime: '09:00', lastTicketTime: '17:30', lastEntryTime: '18:00', closeTime: '18:00' }),
    ]))

    const chaka = ticketBooking('chaka-salt-lake').operatingHours
    expect(chaka.mode).toBe('seasonal')
    expect(chaka.conflictDetected).not.toBe(true)
    expect(chaka.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '2026年7月22日起', openTime: '07:20', lastTicketTime: '19:50', lastCheckInTime: '20:00', closeTime: '21:30' }),
    ]))
    expect(chaka.summary).toContain('8月3日至9日适用')

    const dachaidan = ticketBooking('dachaidan-emerald')
    expect(dachaidan.operatingHours.mode).toBe('seasonal')
    expect(dachaidan.operatingHours.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '5月1日至10月31日', openTime: '08:00', closeTime: '19:30' }),
      expect.objectContaining({ dateRange: '11月1日至次年4月30日', openTime: '09:00', closeTime: '18:30' }),
    ]))
    expect(dachaidan.bookingNotes.join('')).toContain('核心湖区间距较远')

    const zhangye = ticketBooking('zhangye-danxia').operatingHours
    expect(zhangye.mode).toBe('seasonal')
    expect(zhangye.periods).toEqual(expect.arrayContaining([
      expect.objectContaining({ dateRange: '2026年4月28日至8月31日', openTime: '05:30', lastTicketTime: '19:00', closeTime: '19:00' }),
    ]))

    expect(ticketBooking('qinghai-lake').operatingHours.mode).toBe('monthly')
    expect(ticketBooking('qinghai-lake').operatingHours.summary).toContain('官方公众号')
    expect(ticketBooking('wusute-yadan').operatingHours.internalProjects).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ firstServiceTime: '08:15', lastServiceTime: '20:00' }),
    ]))
    expect(ticketBooking('g315-u-road').operatingHours.summary).not.toContain('全天开放')
  })

  it('keeps the critical booking and access distinctions accurate', () => {
    expect(ticketBooking('mogao-grottoes')).toMatchObject({
      ticketStatus: 'ticket-required',
      bookingLevel: 'mandatory',
      bookingLabel: '必须提前预约',
      identityRequired: true,
      sourceLevel: 'A',
    })
    expect(ticketBooking('mogao-grottoes').officialChannels).toContainEqual(expect.objectContaining({
      type: 'official-site',
      url: 'https://www.mgk.org.cn/',
    }))
    expect(ticketBooking('g315-u-road')).toMatchObject({ ticketStatus: 'free', bookingLevel: 'not-required' })
    expect(ticketBooking('black-mountain')).toMatchObject({ ticketStatus: 'access-control' })
    expect(ticketBooking('black-mountain').accessNotes?.join('')).toContain('合法开放区域')
    expect(ticketBooking('hoh-xil').accessNotes?.join('')).not.toMatch(/固定坐标|固定出没点/)
  })

  it('does not expose prices or disguise non-official channels as websites', () => {
    const serialized = JSON.stringify(places.map((place) => ticketBooking(place.id)))
    expect(serialized).not.toMatch(/票价|¥|￥|\d+元/)

    const officialUrls = places.flatMap((place) => ticketBooking(place.id).officialChannels)
      .filter((channel) => channel.type === 'official-site' || channel.type === 'official-ticket')
      .map((channel) => channel.url)

    expect(officialUrls).toEqual([
      'https://www.mgk.org.cn/',
      'https://www.mssyyq.com/',
      'https://www.wusuteyadan.com/',
      'https://www.chakasl.com/',
      'https://www.chakasl.com/ticket.html',
      'https://www.tibetanculturemuseum.com.cn/',
    ])
  })
})

describe('ticket and booking views', () => {
  it('shows the confirmed Kumbum Monastery seasonal hours, contacts, and address', async () => {
    const router = makeRouter()
    await router.push('/places/taer-temple')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div data-weather-panel />' } },
      },
    })

    const section = wrapper.get('[data-ticket-booking]')
    expect(section.get('[data-opening-summary]').text()).toContain('旺季07:30 / 淡季08:00')
    expect(section.text()).toContain('青海省西宁市湟中区鲁沙尔镇金塔路56号')
    expect(section.text()).toContain('0971-2210188')

    await section.get('[data-ticket-expand]').trigger('click')
    const details = section.get('[data-ticket-details]').text()
    expect(details).toContain('4月1日至10月31日')
    expect(details).toContain('07:30')
    expect(details).toContain('17:30')
    expect(details).toContain('11月1日至次年3月31日')
    expect(details).toContain('08:00')
    expect(details).toContain('16:30')
    expect(details).toContain('0971-2232357')
  })

  it('shows a compact summary first, then expands official channels and direct dial contacts', async () => {
    const router = makeRouter()
    await router.push('/places/mogao-grottoes')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div data-weather-panel />' } },
      },
    })

    const section = wrapper.get('[data-ticket-booking]')
    expect(section.text()).toContain('开放 · 门票 · 预约 · 联系')
    expect(section.text()).toContain('必须提前预约')
    expect(section.text()).toContain('行程确定后立即查询')
    expect(section.text()).toContain('400-833-3715')
    expect(section.find('[data-ticket-details]').exists()).toBe(false)
    expect(section.get('[data-opening-summary]').text()).toContain('08:00')
    expect(section.get('[data-last-entry-summary]').text()).toContain('分淡旺季查看')

    await section.get('[data-ticket-expand]').trigger('click')
    expect(section.get('[data-ticket-details]').text()).toContain('身份证')
    expect(section.get('[data-operating-hours]').text()).toContain('停止检票 / 入场')
    expect(section.get('[data-operating-hours]').text()).toContain('闭园')
    const officialSite = section.get('a[href="https://www.mgk.org.cn/"]')
    expect(officialSite.attributes('target')).toBe('_blank')
    expect(officialSite.attributes('rel')).toBe('noopener noreferrer')
    expect(section.get('a[href="tel:400-833-3715"]').text()).toContain('拨打')

    await section.get('[data-copy-value="莫高窟参观预约网"]').trigger('click')
    await flushPromises()
    expect(writeText).toHaveBeenCalledWith('莫高窟参观预约网')
    expect(section.get('[role="status"]').text()).toContain('已复制')
  })

  it('shows reliable fallback contacts when a place has no independent scenic phone', async () => {
    const router = makeRouter()
    await router.push('/places/biandukou')
    await router.isReady()
    const wrapper = mount(PlaceDetailView, {
      global: {
        plugins: [createPinia(), router],
        stubs: { WeatherPanel: { template: '<div data-weather-panel />' } },
      },
    })

    const section = wrapper.get('[data-ticket-booking]')
    expect(section.text()).toContain('暂无经可靠来源核实的独立景区电话')
    await section.get('[data-ticket-expand]').trigger('click')
    expect(section.get('a[href="tel:12345"]')).toBeTruthy()
    expect(section.get('a[href="tel:110"]')).toBeTruthy()
    expect(section.get('a[href="tel:120"]')).toBeTruthy()
    expect(section.get('a[href="tel:122"]')).toBeTruthy()
  })

  it('adds the grouped booking checklist and filters the real place rows', async () => {
    const router = makeRouter()
    await router.push('/preparation')
    await router.isReady()
    const wrapper = mount(PreparationView, { global: { plugins: [createPinia(), router] } })

    const checklist = wrapper.get('[data-ticket-checklist]')
    expect(checklist.text()).toContain('门票与预约清单')
    expect(checklist.findAll('[data-ticket-group]')).toHaveLength(4)
    expect(checklist.findAll('[data-ticket-row]')).toHaveLength(25)

    await checklist.get('[data-ticket-filter="mandatory"]').trigger('click')
    expect(checklist.findAll('[data-ticket-row]')).toHaveLength(1)
    expect(checklist.text()).toContain('莫高窟')

    await checklist.get('[data-ticket-filter="partially-ticketed"]').trigger('click')
    expect(checklist.findAll('[data-ticket-row]')).toHaveLength(5)
    expect(checklist.text()).toContain('扁都口')
  })

  it('adds a formal-attraction opening-hours quick view without pretending it is live status', async () => {
    const router = makeRouter()
    await router.push('/preparation')
    await router.isReady()
    const wrapper = mount(PreparationView, { global: { plugins: [createPinia(), router] } })

    const hours = wrapper.get('[data-opening-hours-checklist]')
    expect(hours.text()).toContain('开放时间速查')
    expect(hours.text()).toContain('本页面不是实时营业状态查询')
    expect(hours.text()).toContain('莫高窟')
    expect(hours.text()).toContain('嘉峪关关城')
    expect(hours.text()).toContain('茶卡盐湖')
    expect(hours.text()).not.toContain('G315 U形公路')
  })
})
