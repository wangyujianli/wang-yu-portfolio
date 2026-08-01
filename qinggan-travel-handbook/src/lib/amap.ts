import * as AMapLoader from '@amap/amap-jsapi-loader'

export interface AMapInstance {
  add(overlays: unknown | unknown[]): void
  setFitView(overlays?: unknown[], immediately?: boolean, avoid?: number[], maxZoom?: number): void
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

type AMapLoaderWithReset = typeof AMapLoader & {
  reset?: () => void
}

const loader = AMapLoader as AMapLoaderWithReset
let loadingPromise: Promise<AMapNamespace> | undefined

export function resetAMapLoader(): void {
  loadingPromise = undefined
  loader.reset?.()
}

export function loadAMap(): Promise<AMapNamespace> {
  if (window.AMap) return Promise.resolve(window.AMap)
  if (loadingPromise) return loadingPromise

  const key = import.meta.env.VITE_AMAP_JS_KEY ?? ''
  const securityCode = import.meta.env.VITE_AMAP_SECURITY_CODE ?? ''

  if (!key.trim() || !securityCode.trim()) {
    return Promise.reject(new Error('高德地图配置不完整'))
  }

  window._AMapSecurityConfig = {
    ...window._AMapSecurityConfig,
    securityJsCode: securityCode,
  }

  loadingPromise = loader.load({
    key,
    version: '2.0',
  }).then((namespace) => namespace as AMapNamespace).catch(() => {
    loadingPromise = undefined
    throw new Error('高德地图加载失败')
  })

  return loadingPromise
}
