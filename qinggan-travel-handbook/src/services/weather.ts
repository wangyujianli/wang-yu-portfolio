import { readJson, writeJson } from '@/services/storage'
import type { Coordinates } from '@/types/content'

const CACHE_KEY = 'westward:v1:weather-cache'
const CACHE_TTL = 6 * 60 * 60 * 1000

export interface WeatherCurrent {
  temperature: number
  apparentTemperature: number
  precipitationProbability: number
  weatherCode: number
  windSpeed: number
}

export interface WeatherDay {
  date: string
  high: number
  low: number
  precipitationProbability: number
  weatherCode: number
  sunrise: string
  sunset: string
}

export interface WeatherResult {
  status: 'ready' | 'unavailable'
  updatedAt: string | null
  current: WeatherCurrent | null
  daily: WeatherDay[]
  isCached: boolean
  notice: string
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    apparent_temperature: number
    precipitation_probability: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
    weather_code: number[]
    sunrise: string[]
    sunset: string[]
  }
}

interface CacheEntry {
  savedAt: number
  data: WeatherResult
}

interface WeatherOptions {
  fetcher?: typeof fetch
  now?: () => number
  timeoutMs?: number
}

function readCache(): Record<string, CacheEntry> {
  const cache = readJson<unknown>(CACHE_KEY, {})
  return cache && typeof cache === 'object' && !Array.isArray(cache)
    ? cache as Record<string, CacheEntry>
    : {}
}

function mapResponse(payload: OpenMeteoResponse, timestamp: number): WeatherResult {
  const daily = payload.daily.time.map((date, index) => ({
    date,
    high: Math.round(payload.daily.temperature_2m_max[index] ?? 0),
    low: Math.round(payload.daily.temperature_2m_min[index] ?? 0),
    precipitationProbability: Math.round(payload.daily.precipitation_probability_max[index] ?? 0),
    weatherCode: payload.daily.weather_code[index] ?? 0,
    sunrise: payload.daily.sunrise[index] ?? '',
    sunset: payload.daily.sunset[index] ?? '',
  }))

  return {
    status: 'ready',
    updatedAt: new Date(timestamp).toISOString(),
    current: {
      temperature: Math.round(payload.current.temperature_2m),
      apparentTemperature: Math.round(payload.current.apparent_temperature),
      precipitationProbability: Math.round(payload.current.precipitation_probability),
      weatherCode: payload.current.weather_code,
      windSpeed: Math.round(payload.current.wind_speed_10m),
    },
    daily,
    isCached: false,
    notice: '天气数据刚刚更新',
  }
}

export async function getPlaceWeather(
  placeId: string,
  [longitude, latitude]: Coordinates,
  options: WeatherOptions = {},
): Promise<WeatherResult> {
  const now = options.now?.() ?? Date.now()
  const cache = readCache()
  const cached = cache[placeId]

  if (cached && now - cached.savedAt < CACHE_TTL) {
    return { ...cached.data, isCached: true, notice: '显示六小时内的本地缓存' }
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 8_000)
  const fetcher = options.fetcher ?? fetch
  const query = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '4',
  })

  try {
    const response = await fetcher(`https://api.open-meteo.com/v1/forecast?${query}`, {
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`)
    const result = mapResponse(await response.json() as OpenMeteoResponse, now)
    cache[placeId] = { savedAt: now, data: result }
    writeJson(CACHE_KEY, cache)
    return result
  } catch {
    if (cached) {
      return { ...cached.data, isCached: true, notice: '网络暂不可用，显示上次更新的天气' }
    }
    return {
      status: 'unavailable',
      updatedAt: null,
      current: null,
      daily: [],
      isCached: false,
      notice: '天气暂时没有连上，地点攻略仍可正常查看',
    }
  } finally {
    window.clearTimeout(timeout)
  }
}

export function weatherLabel(code: number): string {
  if (code === 0) return '晴朗'
  if (code <= 3) return '多云'
  if (code <= 48) return '雾'
  if (code <= 67) return '有雨'
  if (code <= 77) return '有雪'
  if (code <= 82) return '阵雨'
  if (code <= 86) return '阵雪'
  return '雷雨'
}
