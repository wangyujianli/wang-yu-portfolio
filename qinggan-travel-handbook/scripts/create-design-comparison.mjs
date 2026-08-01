import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const referencePath = process.argv[2]
const implementationPath = process.argv[3]
const outputPath = process.argv[4]

if (!referencePath || !implementationPath || !outputPath) {
  throw new Error('用法：node scripts/create-design-comparison.mjs <参考图> <实现截图> <输出图>')
}

// Keep the combined QA sheet below 2048px so visual-review tools display both
// panels in full instead of clipping the implementation half.
const width = 1000
const height = 561
const gap = 20
const paper = { r: 243, g: 237, b: 222, alpha: 1 }

const prepare = (path) => sharp(resolve(path))
  .resize(width, height, { fit: 'contain', background: paper })
  .flatten({ background: paper })
  .png()
  .toBuffer()

const [reference, implementation] = await Promise.all([
  prepare(referencePath),
  prepare(implementationPath),
])

const target = resolve(outputPath)
await mkdir(dirname(target), { recursive: true })
await sharp({
  create: {
    width: width * 2 + gap,
    height,
    channels: 4,
    background: paper,
  },
})
  .composite([
    { input: reference, left: 0, top: 0 },
    { input: implementation, left: width + gap, top: 0 },
  ])
  .png()
  .toFile(target)

console.log(`已生成设计对照图：${target}`)
