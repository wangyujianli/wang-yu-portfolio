import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const publicRoot = resolve('public', 'assets', 'scenic')
const files = (await readdir(publicRoot)).filter((file) => file.endsWith('.webp')).sort()
const report = JSON.parse(await readFile(resolve('public', 'assets', 'scenic-import-report.json'), 'utf8'))
const expectedVariants = report.included * 3

if (files.length !== expectedVariants) {
  throw new Error(`实景图数量异常：期望 ${expectedVariants} 个 WebP，实际 ${files.length} 个。`)
}

for (const file of files) {
  const metadata = await sharp(resolve(publicRoot, file)).metadata()
  if (metadata.format !== 'webp' || !metadata.width || !metadata.height) {
    throw new Error(`图片格式或尺寸异常：${file}`)
  }
  if (metadata.exif || metadata.xmp) {
    throw new Error(`图片仍携带 EXIF/XMP 元数据：${file}`)
  }
}

console.log(`已验证 ${files.length} 个 WebP：尺寸有效，且未携带 EXIF/XMP 元数据。`)
