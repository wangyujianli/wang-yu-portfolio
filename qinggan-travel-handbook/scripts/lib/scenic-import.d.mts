export interface DiscoveredScenicImage {
  absolutePath: string
  directory: string
  folderName: string
  fileName: string
  placeId: string | null
}

export interface ExcludedScenicImage extends DiscoveredScenicImage {
  reason: 'rights-marker'
}

export interface ScenicDiscoveryResult {
  included: DiscoveredScenicImage[]
  excluded: ExcludedScenicImage[]
}

export interface PublicImageRecordInput {
  placeId: string
  index: number
  width: number
  height: number
  sourceName: string
}

export interface PublicImageRecord extends PublicImageRecordInput {
  id: string
  alt: string
  orientation: 'landscape' | 'portrait' | 'square'
  objectPosition: string
  thumbnail: string
  regular: string
  large: string
}

export function resolvePlaceId(folderName: string, fileName?: string): string | null
export function discoverScenicImages(sourceRoot: string): Promise<ScenicDiscoveryResult>
export function mergeScenicDiscoveries(primary: ScenicDiscoveryResult, supplemental: ScenicDiscoveryResult, allowedFileNames: string[]): ScenicDiscoveryResult
export function buildPublicImageRecord(input: PublicImageRecordInput): PublicImageRecord
export const scenicFolderMappings: Readonly<Record<string, string>>
