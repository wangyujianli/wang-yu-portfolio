export interface AMapInstance {
  add(overlays: unknown | unknown[]): void
  setFitView(overlays?: unknown[]): void
  destroy(): void
}

export interface AMapMarker {
  on(event: string, handler: () => void): void
}

export interface AMapNamespace {
  Map: new (container: HTMLElement, options: Record<string, unknown>) => AMapInstance
  Polyline?: new (options: Record<string, unknown>) => unknown
  Marker?: new (options: Record<string, unknown>) => AMapMarker
  Pixel?: new (x: number, y: number) => unknown
}

interface LoaderOptions {
  key: string
  securityCode?: string
  timeoutMs?: number
}

let loadingPromise: Promise<AMapNamespace> | undefined

export function resetAMapLoader(): void {
  loadingPromise = undefined
  document.querySelector('#amap-js-api')?.remove()
}

export function loadAMap({ key, securityCode, timeoutMs = 10_000 }: LoaderOptions): Promise<AMapNamespace> {
  if (window.AMap) return Promise.resolve(window.AMap)
  if (!key.trim()) return Promise.reject(new Error('未配置高德地图 Key'))
  if (loadingPromise) return loadingPromise

  if (securityCode) window._AMapSecurityConfig = { securityJsCode: securityCode }

  loadingPromise = new Promise<AMapNamespace>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = 'amap-js-api'
    script.async = true
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`

    const finishWithError = (message: string): void => {
      window.clearTimeout(timeout)
      script.remove()
      reject(new Error(message))
    }

    const timeout = window.setTimeout(() => finishWithError('高德地图加载超时'), timeoutMs)
    script.addEventListener('load', () => {
      window.clearTimeout(timeout)
      if (window.AMap) resolve(window.AMap)
      else finishWithError('高德地图脚本未返回可用实例')
    }, { once: true })
    script.addEventListener('error', () => finishWithError('高德地图脚本加载失败'), { once: true })
    document.head.appendChild(script)
  }).catch((error: unknown) => {
    loadingPromise = undefined
    throw error
  })

  return loadingPromise
}
