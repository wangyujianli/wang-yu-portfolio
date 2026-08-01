export function publicAssetUrl(path: string, base = import.meta.env.BASE_URL): string {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
    return path
  }

  const normalizedBase = `/${base.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/')
  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) return path

  return `${normalizedBase}${path.replace(/^\/+/, '')}`
}
