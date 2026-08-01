import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { journeyRouteById, journeyRoutes } from '@/data/journeyRoutes'
import { readJson, writeJson } from '@/services/storage'
import type { ExperienceLevel, JourneyRouteId, TravelPlaceType } from '@/types/content'

const selectedRouteKey = 'westward:v1:selected-route'

export const useJourneyStore = defineStore('journey', () => {
  const storedRoute = readJson<JourneyRouteId>(selectedRouteKey, 'classic')
  const selectedRouteId = ref<JourneyRouteId>(journeyRouteById.has(storedRoute) ? storedRoute : 'classic')
  const selectedPlaceTypes = ref<TravelPlaceType[]>([])
  const selectedExperienceLevels = ref<ExperienceLevel[]>([])

  const selectedRoute = computed(() => journeyRouteById.get(selectedRouteId.value) ?? journeyRoutes[0]!)

  function selectRoute(routeId: JourneyRouteId): void {
    if (!journeyRouteById.has(routeId)) return
    selectedRouteId.value = routeId
    selectedPlaceTypes.value = []
    selectedExperienceLevels.value = []
    writeJson(selectedRouteKey, routeId)
  }

  function togglePlaceType(type: TravelPlaceType): void {
    selectedPlaceTypes.value = selectedPlaceTypes.value.includes(type)
      ? selectedPlaceTypes.value.filter((item) => item !== type)
      : [...selectedPlaceTypes.value, type]
  }

  function toggleExperience(level: ExperienceLevel): void {
    selectedExperienceLevels.value = selectedExperienceLevels.value.includes(level)
      ? selectedExperienceLevels.value.filter((item) => item !== level)
      : [...selectedExperienceLevels.value, level]
  }

  function clearFilters(): void {
    selectedPlaceTypes.value = []
    selectedExperienceLevels.value = []
  }

  return {
    selectedRouteId,
    selectedRoute,
    selectedPlaceTypes,
    selectedExperienceLevels,
    selectRoute,
    togglePlaceType,
    toggleExperience,
    clearFilters,
  }
})
