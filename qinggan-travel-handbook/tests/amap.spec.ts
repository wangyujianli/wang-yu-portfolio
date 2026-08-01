import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadAMap, resetAMapLoader } from '@/lib/amap'

const amapLoaderMock = vi.hoisted(() => ({
  load: vi.fn(),
  reset: vi.fn(),
}))

vi.mock('@amap/amap-jsapi-loader', () => amapLoaderMock)

class FakeMap {
  add(): void {}
  setFitView(): void {}
  destroy(): void {}
}

describe('AMap loader', () => {
  beforeEach(() => {
    resetAMapLoader()
    vi.unstubAllEnvs()
    amapLoaderMock.load.mockReset()
    amapLoaderMock.reset.mockReset()
    delete window.AMap
    delete window._AMapSecurityConfig
  })

  it('rejects immediately when local AMap config is incomplete', async () => {
    vi.stubEnv('VITE_AMAP_JS_KEY', '')
    vi.stubEnv('VITE_AMAP_SECURITY_CODE', '')

    await expect(loadAMap()).rejects.toThrow('高德地图配置不完整')
    expect(amapLoaderMock.load).not.toHaveBeenCalled()
  })

  it('returns an existing AMap namespace without calling the loader', async () => {
    const namespace = { Map: FakeMap }
    window.AMap = namespace

    await expect(loadAMap()).resolves.toBe(namespace)
    expect(amapLoaderMock.load).not.toHaveBeenCalled()
  })

  it('sets the security code before loading the JS API', async () => {
    vi.stubEnv('VITE_AMAP_JS_KEY', 'test-js-key')
    vi.stubEnv('VITE_AMAP_SECURITY_CODE', 'test-security-code')
    const namespace = { Map: FakeMap }
    amapLoaderMock.load.mockImplementation(() => {
      expect(window._AMapSecurityConfig?.securityJsCode).toBe('test-security-code')
      return Promise.resolve(namespace)
    })

    await expect(loadAMap()).resolves.toBe(namespace)
    expect(amapLoaderMock.load).toHaveBeenCalledWith({
      key: 'test-js-key',
      version: '2.0',
    })
  })

  it('normalizes loader failures and can be retried', async () => {
    vi.stubEnv('VITE_AMAP_JS_KEY', 'test-js-key')
    vi.stubEnv('VITE_AMAP_SECURITY_CODE', 'test-security-code')
    amapLoaderMock.load.mockRejectedValueOnce(new Error('network failed'))
    amapLoaderMock.load.mockResolvedValueOnce({ Map: FakeMap })

    await expect(loadAMap()).rejects.toThrow('高德地图加载失败')
    await expect(loadAMap()).resolves.toEqual({ Map: FakeMap })
    expect(amapLoaderMock.load).toHaveBeenCalledTimes(2)
  })
})
