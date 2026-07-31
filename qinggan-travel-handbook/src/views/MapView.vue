<script setup lang="ts">
import { computed, ref } from 'vue'
import { List, Map, RefreshCw } from '@lucide/vue'
import FallbackRouteAtlas from '@/components/map/FallbackRouteAtlas.vue'
import MapPlaceSheet from '@/components/map/MapPlaceSheet.vue'
import RouteMap from '@/components/map/RouteMap.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { placeById } from '@/data/places'
import { resetAMapLoader } from '@/services/amap'
import { useVisitedStore } from '@/stores/visited'

const visited = useVisitedStore()
const hasKey = Boolean(import.meta.env.VITE_AMAP_KEY?.trim())
const mode = ref<'live' | 'atlas'>(hasKey ? 'live' : 'atlas')
const mapVersion = ref(0)
const mapNotice = ref(hasKey ? '' : '真实地图暂未连接，已打开完整路线图文版。')
const selectedId = ref<string | null>(null)
const selectedPlace = computed(() => selectedId.value ? placeById.get(selectedId.value) : undefined)

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

    <section v-if="mode === 'live'" class="live-map-layout">
      <div class="live-map-frame paper-card">
        <RouteMap :key="mapVersion" :visited-ids="visited.visitedIds" @ready="mapNotice = ''" @failed="handleFailure" @select="selectedId = $event" />
      </div>
      <MapPlaceSheet v-if="selectedPlace" :place="selectedPlace" @close="selectedId = null" />
    </section>

    <section v-else>
      <FallbackRouteAtlas :visited-ids="visited.visitedIds" @select="selectedId = $event" />
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
.live-map-layout { display: grid; gap: 18px; margin-top: 24px; }
.live-map-frame { min-height: 560px; overflow: hidden; }
.fallback-sheet { position: fixed; z-index: 55; right: 10px; bottom: 78px; left: 10px; max-height: min(440px, 65vh); overflow-y: auto; }

@media (min-width: 720px) {
  .live-map-layout { grid-template-columns: minmax(0, 1.4fr) minmax(310px, 0.6fr); align-items: start; }
  .live-map-layout :deep(.map-place-sheet) { position: sticky; top: 94px; }
  .fallback-sheet { right: 28px; bottom: 28px; left: auto; width: min(420px, 42vw); }
}
</style>
