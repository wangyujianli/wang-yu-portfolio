/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMAP_JS_KEY?: string
  readonly VITE_AMAP_KEY?: string
  readonly VITE_AMAP_SECURITY_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  AMap?: import('./src/lib/amap').AMapNamespace
  AMapUI?: unknown
  Loca?: unknown
  _AMapSecurityConfig?: { securityJsCode?: string }
}
