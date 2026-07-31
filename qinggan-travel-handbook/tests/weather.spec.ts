import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getPlaceWeather } from '@/services/weather'

const payload = {
  timezone: 'Asia/Shanghai',
  current: {
    time: '2026-08-01T10:00',
    temperature_2m: 18.6,
    apparent_temperature: 17.1,
    precipitation_probability: 12,
    weather_code: 2,
    wind_speed_10m: 8.4,
  },
  daily: {
    time: ['2026-08-01', '2026-08-02'],
    temperature_2m_max: [24, 23],
    temperature_2m_min: [11, 10],
    precipitation_probability_max: [18, 22],
    weather_code: [2, 3],
    sunrise: ['2026-08-01T06:20', '2026-08-02T06:21'],
    sunset: ['2026-08-01T20:18', '2026-08-02T20:17'],
  },
}

const okFetch = vi.fn<typeof fetch>(async () => new Response(JSON.stringify(payload), { status: 200 }))

describe('weather service', () => {
  beforeEach(() => {
    localStorage.clear()
    okFetch.mockClear()
  })

  it('maps a successful Open-Meteo response', async () => {
    const result = await getPlaceWeather('xining', [101.7782, 36.6171], {
      fetcher: okFetch,
      now: () => new Date('2026-08-01T02:30:00.000Z').getTime(),
    })

    expect(result.status).toBe('ready')
    expect(result.current?.temperature).toBe(19)
    expect(result.daily).toHaveLength(2)
    expect(result.daily[0]?.high).toBe(24)
    expect(String(okFetch.mock.calls[0]?.[0])).toContain('latitude=36.6171')
  })

  it('reuses a fresh six-hour cache without another request', async () => {
    const now = new Date('2026-08-01T02:30:00.000Z').getTime()
    await getPlaceWeather('xining', [101.7782, 36.6171], { fetcher: okFetch, now: () => now })
    const result = await getPlaceWeather('xining', [101.7782, 36.6171], {
      fetcher: okFetch,
      now: () => now + 60_000,
    })

    expect(okFetch).toHaveBeenCalledTimes(1)
    expect(result.isCached).toBe(true)
  })

  it('falls back to stale cached data after a request failure', async () => {
    const now = new Date('2026-08-01T02:30:00.000Z').getTime()
    await getPlaceWeather('xining', [101.7782, 36.6171], { fetcher: okFetch, now: () => now })
    const failedFetch = vi.fn(async () => { throw new Error('offline') })

    const result = await getPlaceWeather('xining', [101.7782, 36.6171], {
      fetcher: failedFetch,
      now: () => now + 7 * 60 * 60 * 1000,
    })

    expect(result.status).toBe('ready')
    expect(result.isCached).toBe(true)
    expect(result.notice).toContain('上次更新')
  })

  it('returns an unavailable state when no cache exists', async () => {
    const failedFetch = vi.fn(async () => { throw new Error('offline') })
    const result = await getPlaceWeather('xining', [101.7782, 36.6171], { fetcher: failedFetch })

    expect(result.status).toBe('unavailable')
    expect(result.daily).toEqual([])
  })
})
