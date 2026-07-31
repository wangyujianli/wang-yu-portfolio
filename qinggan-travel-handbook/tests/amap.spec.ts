import { beforeEach, describe, expect, it } from 'vitest'
import { loadAMap, resetAMapLoader } from '@/services/amap'

class FakeMap {
  add(): void {}
  setFitView(): void {}
  destroy(): void {}
}

describe('AMap loader', () => {
  beforeEach(() => {
    resetAMapLoader()
    document.querySelector('#amap-js-api')?.remove()
    delete window.AMap
    delete window._AMapSecurityConfig
  })

  it('rejects immediately when the key is missing', async () => {
    await expect(loadAMap({ key: '' })).rejects.toThrow('未配置高德地图 Key')
    expect(document.querySelector('#amap-js-api')).toBeNull()
  })

  it('returns an existing AMap namespace without adding a script', async () => {
    const namespace = { Map: FakeMap }
    window.AMap = namespace

    await expect(loadAMap({ key: 'demo' })).resolves.toBe(namespace)
    expect(document.querySelector('#amap-js-api')).toBeNull()
  })

  it('sets the security code and resolves after the script loads', async () => {
    const loading = loadAMap({ key: 'demo', securityCode: 'secure', timeoutMs: 1_000 })
    const script = document.querySelector<HTMLScriptElement>('#amap-js-api')
    expect(script?.src).toContain('key=demo')
    expect(window._AMapSecurityConfig?.securityJsCode).toBe('secure')

    const namespace = { Map: FakeMap }
    window.AMap = namespace
    script?.dispatchEvent(new Event('load'))

    await expect(loading).resolves.toBe(namespace)
  })

  it('rejects and can be retried after a script error', async () => {
    const loading = loadAMap({ key: 'demo', timeoutMs: 1_000 })
    document.querySelector<HTMLScriptElement>('#amap-js-api')?.dispatchEvent(new Event('error'))

    await expect(loading).rejects.toThrow('高德地图脚本加载失败')
    expect(document.querySelector('#amap-js-api')).toBeNull()
  })
})
