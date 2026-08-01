import { describe, expect, it } from 'vitest'
import { publicAssetUrl } from '@/lib/publicAssets'

describe('public asset URLs', () => {
  it('places root-relative public assets under the configured deployment base', () => {
    expect(publicAssetUrl('/assets/scenic/xining.webp', '/qinggan-travel-handbook/'))
      .toBe('/qinggan-travel-handbook/assets/scenic/xining.webp')
    expect(publicAssetUrl('/images/photo-guide/cover.png', '/qinggan-travel-handbook/'))
      .toBe('/qinggan-travel-handbook/images/photo-guide/cover.png')
    expect(publicAssetUrl('/assets/intro/riyueshan-prayer-flags.webp', '/qinggan-travel-handbook/'))
      .toBe('/qinggan-travel-handbook/assets/intro/riyueshan-prayer-flags.webp')
  })

  it('keeps external and data URLs unchanged', () => {
    expect(publicAssetUrl('https://example.com/image.webp', '/guide/')).toBe('https://example.com/image.webp')
    expect(publicAssetUrl('data:image/svg+xml;base64,abc', '/guide/')).toBe('data:image/svg+xml;base64,abc')
  })
})
