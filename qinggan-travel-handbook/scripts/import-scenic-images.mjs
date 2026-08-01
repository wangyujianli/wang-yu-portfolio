import { access, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { buildPublicImageRecord, discoverScenicImages, mergeScenicDiscoveries } from './lib/scenic-import.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, '..')
const defaultSource = 'C:\\Users\\81421\\Desktop\\青甘格尔木延伸线_实景图片参考包\\青甘大环线_全部景点实景图片参考包'
const defaultSupplementalSource = 'C:\\Users\\81421\\Desktop\\青甘\\reference-assetsall-images\\青甘大环线_全部景点实景图片参考包'
const sourceRoot = resolve(process.argv[2] || process.env.QINGGAN_SCENIC_SOURCE || defaultSource)
const supplementalSourceRoot = resolve(process.env.QINGGAN_SCENIC_SUPPLEMENTAL_SOURCE || defaultSupplementalSource)
const supplementalFileNames = ['德令哈.png']
const publicRoot = resolve(projectRoot, 'public', 'assets', 'scenic')
const manifestPath = resolve(projectRoot, 'src', 'data', 'scenicImages.ts')
const reportPath = resolve(projectRoot, 'public', 'assets', 'scenic-import-report.json')
const variantWidths = [480, 960, 1600]

if (!publicRoot.startsWith(resolve(projectRoot, 'public'))) {
  throw new Error(`拒绝清理项目 public 目录之外的路径：${publicRoot}`)
}

await rm(publicRoot, { recursive: true, force: true })
await mkdir(publicRoot, { recursive: true })

let discovery = await discoverScenicImages(sourceRoot)
let supplementalSourceUsed = false
try {
  await access(supplementalSourceRoot)
  const supplementalDiscovery = await discoverScenicImages(supplementalSourceRoot)
  discovery = mergeScenicDiscoveries(discovery, supplementalDiscovery, supplementalFileNames)
  supplementalSourceUsed = true
} catch {
  // The supplemental desktop pack is optional on other machines.
}
const records = []
const counters = new Map()

for (const source of discovery.included) {
  if (!source.placeId) continue
  const index = (counters.get(source.placeId) ?? 0) + 1
  counters.set(source.placeId, index)

  const input = sharp(source.absolutePath, { failOn: 'warning' }).rotate()
  const metadata = await input.metadata()
  const width = metadata.autoOrient?.width ?? metadata.width
  const height = metadata.autoOrient?.height ?? metadata.height
  if (!width || !height) throw new Error(`无法读取图片尺寸：${source.absolutePath}`)

  const record = buildPublicImageRecord({
    placeId: source.placeId,
    index,
    width,
    height,
    sourceName: source.fileName,
  })

  for (const variantWidth of variantWidths) {
    const outputPath = resolve(publicRoot, `${record.id}-${variantWidth}.webp`)
    await sharp(source.absolutePath, { failOn: 'warning' })
      .rotate()
      .resize({ width: variantWidth, withoutEnlargement: true })
      .webp({ quality: variantWidth === 1600 ? 84 : 80, effort: 5 })
      .toFile(outputPath)
  }

  records.push(record)
}

const grouped = Object.fromEntries(
  [...new Set(records.map((record) => record.placeId))]
    .sort()
    .map((placeId) => [placeId, records.filter((record) => record.placeId === placeId)]),
)

const manifest = `/* 此文件由 scripts/import-scenic-images.mjs 自动生成，请勿手工编辑。 */
export type ScenicImageOrientation = 'landscape' | 'portrait' | 'square'

export interface ScenicImageAsset {
  id: string
  placeId: string
  sourceName: string
  alt: string
  width: number
  height: number
  orientation: ScenicImageOrientation
  objectPosition: string
  thumbnail: string
  regular: string
  large: string
}

export const scenicImageSets = ${JSON.stringify(grouped, null, 2)} as const satisfies Record<string, readonly ScenicImageAsset[]>

export function scenicImagesFor(placeId: string): readonly ScenicImageAsset[] {
  if (placeId === 'hoh-xil') {
    return [
      ...(scenicImageSets['hoh-xil'] ?? []),
      ...(scenicImageSets['tibetan-antelope'] ?? []),
    ]
  }
  return scenicImageSets[placeId as keyof typeof scenicImageSets] ?? []
}
`

await writeFile(manifestPath, manifest, 'utf8')
await writeFile(reportPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  sourceRoot,
  supplementalSourceRoot: supplementalSourceUsed ? supplementalSourceRoot : null,
  included: records.length,
  excluded: discovery.excluded.map((image) => ({
    fileName: image.fileName,
    folderName: image.folderName,
    reason: image.reason,
  })),
  skippedUnmapped: discovery.included
    .filter((image) => !image.placeId)
    .map((image) => relative(sourceRoot, image.absolutePath)),
}, null, 2)}\n`, 'utf8')

console.log(`已生成 ${records.length} 张图片的 ${variantWidths.length} 档 WebP，共 ${records.length * variantWidths.length} 个文件。`)
console.log(`已排除 ${discovery.excluded.length} 张带版权/来源标记或内容不适合公开展示的图片。`)
console.log(`图片清单：${manifestPath}`)
console.log(`导入报告：${reportPath}`)
