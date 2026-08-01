import { scenicImagesFor, type ScenicImageAsset } from '@/data/scenicImages'
import type { Place } from '@/types/content'

/**
 * Prefer the imported scenic gallery. When a place has no imported set yet,
 * keep its existing local cover available as the detail-page main image.
 */
export function placeGalleryImages(place: Place): readonly ScenicImageAsset[] {
  const importedImages = scenicImagesFor(place.id)

  if (importedImages.length > 0) {
    return importedImages
  }

  if (!place.image) {
    return []
  }

  return [
    {
      id: `${place.id}-fallback`,
      placeId: place.id,
      sourceName: place.image.split('/').at(-1) ?? `${place.id}.jpg`,
      alt: place.imageAlt,
      width: 900,
      height: 597,
      orientation: 'landscape',
      objectPosition: 'center',
      thumbnail: place.image,
      regular: place.image,
      large: place.image,
    },
  ]
}
