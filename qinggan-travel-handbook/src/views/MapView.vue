<script setup lang="ts">
import { computed, ref } from 'vue'
import { FilterX, List, Map, RefreshCw, Route as RouteIcon } from '@lucide/vue'
import FallbackRouteAtlas from '@/components/map/FallbackRouteAtlas.vue'
import MapPlaceSheet from '@/components/map/MapPlaceSheet.vue'
import RouteMap from '@/components/map/RouteMap.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { placeById, places } from '@/data/places'
import { filterJourneyPlaces } from '@/data/journeyFilters'
import { journeyRoutes } from '@/data/journeyRoutes'
import { resetAMapLoader } from '@/lib/amap'
import { useJourneyStore } from '@/stores/journey'
import { useVisitedStore } from '@/stores/visited'
import type { ExperienceLevel, TravelPlaceType } from '@/types/content'

const visited = useVisitedStore()
const journey = useJourneyStore()
const hasKey = Boolean(import.meta.env.VITE_AMAP_JS_KEY?.trim() && import.meta.env.VITE_AMAP_SECURITY_CODE?.trim())
const mode = ref<'live' | 'atlas'>(hasKey ? 'live' : 'atlas')
const mapVersion = ref(0)
const mapNotice = ref(hasKey ? '' : '真实地图暂未连接，已打开完整路线图文版。')
const selectedId = ref<string | null>(null)
const selectedPlace = computed(() => selectedId.value ? placeById.get(selectedId.value) : undefined)
const filteredPlaces = computed(() => filterJourneyPlaces(
  places,
  journey.selectedRoute,
  journey.selectedPlaceTypes,
  journey.selectedExperienceLevels,
))
const filterSignature = computed(() => [journey.selectedRouteId, ...journey.selectedPlaceTypes, ...journey.selectedExperienceLevels].join('-'))

const placeTypeOptions: TravelPlaceType[] = ['湖泊', '盐湖', '草原', '雪山', '沙漠', '雅丹', '古建', '博物馆', '公路', '野生动物', '网红地点']
const experienceOptions: Array<{ value: ExperienceLevel; label: string }> = [
  { value: 'must-see', label: '必去' },
  { value: 'along-the-way', label: '顺路' },
  { value: 'half-day', label: '半日' },
  { value: 'add-one-day', label: '增加1天' },
  { value: 'add-two-to-four-days', label: '增加2至4天' },
]

function handleFailure(reason: string): void {
  mapNotice.value = `${reason}，已切换为完整路线图文版。`
  mode.value = 'atlas'
}

function retryMap(): void {
  if (!hasKey) {
    mapNotice.value = '真实地图需要配置服务 Key；图文路线不受影响。'
    return
  }
  resetAMapLoader()
  mapVersion.value += 1
  mapNotice.value = ''
  mode.value = 'live'
}
</script>

<template>
  <main class="map-page page-shell">
    <div class="map-page__head">
      <SectionHeading eyebrow="ROUTE ATLAS" title="探索地图" intro="杭州飞往西宁，再沿门源、河西走廊、敦煌和柴达木回到青海湖。路线是一条建议的线，不是一张必须照做的日程表。" />
      <div class="map-switch" role="group" aria-label="地图显示方式">
        <button type="button" :class="{ active: mode === 'live' }" :disabled="!hasKey" @click="mode = 'live'"><Map :size="18" />真实地图</button>
        <button type="button" :class="{ active: mode === 'atlas' }" @click="mode = 'atlas'"><List :size="18" />图文路线</button>
      </div>
    </div>

    <p v-if="mapNotice" class="map-notice">{{ mapNotice }} <button type="button" @click="retryMap"><RefreshCw :size="16" />重新加载</button></p>

    <section class="map-controls" aria-label="路线与地点筛选">
      <div class="route-options">
        <button
          v-for="routeOption in journeyRoutes"
          :key="routeOption.id"
          type="button"
          :class="{ active: journey.selectedRouteId === routeOption.id }"
          :aria-pressed="journey.selectedRouteId === routeOption.id"
          @click="journey.selectRoute(routeOption.id)"
        >
          <RouteIcon :size="18" />
          <span><strong>{{ routeOption.shortName }}</strong><small>{{ routeOption.durationHint }}</small></span>
        </button>
      </div>

      <div class="filter-row">
        <span>看什么</span>
        <div>
          <button v-for="type in placeTypeOptions" :key="type" type="button" :class="{ active: journey.selectedPlaceTypes.includes(type) }" :aria-pressed="journey.selectedPlaceTypes.includes(type)" @click="journey.togglePlaceType(type)">{{ type }}</button>
        </div>
      </div>
      <div class="filter-row">
        <span>怎么安排</span>
        <div>
          <button v-for="option in experienceOptions" :key="option.value" type="button" :class="{ active: journey.selectedExperienceLevels.includes(option.value) }" :aria-pressed="journey.selectedExperienceLevels.includes(option.value)" @click="journey.toggleExperience(option.value)">{{ option.label }}</button>
        </div>
      </div>
      <footer><span>当前显示 {{ filteredPlaces.length }} 处</span><button v-if="journey.selectedPlaceTypes.length || journey.selectedExperienceLevels.length" type="button" @click="journey.clearFilters"><FilterX :size="17" />清空筛选</button></footer>
    </section>

    <section v-if="mode === 'live'" class="live-map-layout">
      <div class="live-map-frame paper-card">
        <RouteMap :key="`${mapVersion}-${filterSignature}`" :route="journey.selectedRoute" :places="filteredPlaces" :selected-id="selectedId" :visited-ids="visited.visitedIds" @ready="mapNotice = ''" @failed="handleFailure" @select="selectedId = $event" />
      </div>
      <MapPlaceSheet v-if="selectedPlace" class="live-sheet" :place="selectedPlace" @close="selectedId = null" />
    </section>

    <section v-else>
      <FallbackRouteAtlas :route="journey.selectedRoute" :places="filteredPlaces" :selected-id="selectedId" :visited-ids="visited.visitedIds" @select="selectedId = $event" />
      <MapPlaceSheet v-if="selectedPlace" class="fallback-sheet" :place="selectedPlace" @close="selectedId = null" />
    </section>
  </main>
</template>

<style scoped>
.map-page__head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 18px; }
.map-page__head :deep(.section-heading) { margin-bottom: 0; }
.map-switch { display: flex; gap: 6px; padding: 5px; border: 1px solid var(--line); border-radius: 999px; background: rgb(255 255 255 / 40%); }
.map-switch button { display: inline-flex; min-height: 44px; align-items: center; gap: 7px; padding: 0 14px; border: 0; border-radius: 999px; color: var(--muted); background: transparent; cursor: pointer; }
.map-switch button.active { color: #fff; background: var(--ink); }
.map-switch button:disabled { cursor: not-allowed; opacity: 0.45; }
.map-notice { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin: 22px 0; padding: 13px 16px; border: 1px solid var(--line); border-radius: 14px; color: var(--muted); background: rgb(255 255 255 / 38%); font-size: 0.82rem; }
.map-notice button { display: inline-flex; min-height: 40px; align-items: center; gap: 6px; padding: 0 12px; border: 0; border-radius: 999px; color: var(--lake); background: rgb(45 127 123 / 10%); cursor: pointer; }
.map-controls { display: grid; gap: 14px; margin: 24px 0; padding: 16px; border: 1px solid var(--line); border-radius: 24px; background: rgb(255 255 255 / 28%); }
.route-options { display: grid; gap: 8px; }
.route-options > button { display: flex; min-height: 58px; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid var(--line); border-radius: 17px; color: var(--muted); text-align: left; background: rgb(255 255 255 / 38%); cursor: pointer; }
.route-options > button.active { border-color: color-mix(in srgb, var(--lake) 45%, var(--line)); color: var(--ink); background: rgb(45 127 123 / 10%); }
.route-options span { display: grid; gap: 2px; }
.route-options strong { font-size: .87rem; }
.route-options small { color: var(--muted); font-size: .68rem; }
.filter-row { display: grid; gap: 7px; }
.filter-row > span { color: var(--sunset); font-size: .7rem; font-weight: 700; letter-spacing: .1em; }
.filter-row > div { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
.filter-row button { min-height: 42px; flex: 0 0 auto; padding: 0 13px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); background: transparent; cursor: pointer; }
.filter-row button.active { color: #fff; background: var(--ink); }
.map-controls footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--muted); font-size: .76rem; }
.map-controls footer button { display: inline-flex; min-height: 42px; align-items: center; gap: 6px; padding: 0 12px; border: 0; border-radius: 999px; color: var(--lake); background: rgb(45 127 123 / 9%); cursor: pointer; }
.live-map-layout { display: grid; gap: 18px; margin-top: 24px; }
.live-map-frame { min-height: 560px; overflow: hidden; }
.fallback-sheet { position: fixed; z-index: 55; right: 10px; bottom: 78px; left: 10px; max-height: min(440px, 65vh); overflow-y: auto; }
.live-sheet { position: fixed; z-index: 55; right: 10px; bottom: 78px; left: 10px; max-height: min(440px, 65vh); overflow-y: auto; }

@media (min-width: 720px) {
  .route-options { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .filter-row { grid-template-columns: 76px minmax(0, 1fr); align-items: center; }
  .live-map-layout { grid-template-columns: minmax(0, 1.4fr) minmax(310px, 0.6fr); align-items: start; }
  .live-map-layout :deep(.map-place-sheet) { position: sticky; top: 94px; right: auto; bottom: auto; left: auto; max-height: none; overflow: visible; }
  .fallback-sheet { right: 28px; bottom: 28px; left: auto; width: min(420px, 42vw); }
}
</style>
