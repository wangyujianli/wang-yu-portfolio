import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { feature } from 'topojson-client'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const atlasPath = resolve(root, 'node_modules/world-atlas/countries-110m.json')
const outputPath = resolve(root, 'public/maps/china-outline.geojson')
const topology = JSON.parse(await readFile(atlasPath, 'utf8'))
const countries = feature(topology, topology.objects.countries)
const china = countries.features.find((item) => String(item.id) === '156')

if (!china) throw new Error('China feature 156 was not found in world-atlas')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(china)}\n`, 'utf8')
console.log(`Created ${outputPath}`)
