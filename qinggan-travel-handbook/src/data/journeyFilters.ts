import type { ExperienceLevel, JourneyRoute, Place, TravelPlaceType } from '@/types/content'

export function filterJourneyPlaces(
  source: Place[],
  route: JourneyRoute,
  placeTypes: TravelPlaceType[],
  experienceLevels: ExperienceLevel[],
): Place[] {
  const byId = new Map(source.map((place) => [place.id, place]))
  const routePlaces = route.placeIds
    .filter((placeId, index, ids) => ids.indexOf(placeId) === index)
    .map((placeId) => byId.get(placeId))
    .filter((place): place is Place => Boolean(place))

  return routePlaces.filter((place) => {
    if (!place.classification.isStandalone) return false
    const typeMatch = placeTypes.length === 0 || placeTypes.some((type) => place.placeTypes.includes(type))
    const experienceMatch = experienceLevels.length === 0 || experienceLevels.includes(place.experienceLevel)
    return typeMatch && experienceMatch
  })
}
