<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlaceCard from '@/components/place/PlaceCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import {
  filterPlaces,
  placeClassificationStats,
  placePriorityOptions,
  routeScopeOptions,
  standalonePlaces,
} from '@/data/places'

const route = useRoute()
const router = useRouter()
const selectedPriority = computed(() => typeof route.query.priority === 'string' ? route.query.priority : 'all')
const selectedRouteScope = computed(() => typeof route.query.routeScope === 'string' ? route.query.routeScope : 'all')
const filtered = computed(() => filterPlaces(standalonePlaces, 'all', selectedPriority.value, selectedRouteScope.value))

async function choosePriority(priority: string): Promise<void> {
  const query = { ...route.query }
  if (priority === 'all') delete query.priority
  else query.priority = priority
  await router.replace({ query })
}

async function chooseRouteScope(routeScope: string): Promise<void> {
  const query = { ...route.query }
  if (routeScope === 'all') delete query.routeScope
  else query.routeScope = routeScope
  await router.replace({ query })
}
</script>

<template>
  <main class="places page-shell">
    <SectionHeading :eyebrow="`${standalonePlaces.length} PLACE FILES · 1 ECOLOGY NOTE`" title="地点指南" intro="先看一站在整条路线中的分量，再决定它属于主线还是延伸探索。这里没有固定日程，只有清楚的取舍依据。" />

    <div class="places-filters">
      <div class="filter-group filter-group--priority" data-place-filter-row>
        <span>按优先级</span>
        <div class="filter-scroll" role="toolbar" aria-label="推荐等级">
          <button type="button" :class="{ active: selectedPriority === 'all' }" :aria-pressed="selectedPriority === 'all'" data-priority-filter="all" @click="choosePriority('all')">全部</button>
          <button
            v-for="option in placePriorityOptions"
            :key="option.value"
            type="button"
            :class="{ active: selectedPriority === option.value }"
            :aria-pressed="selectedPriority === option.value"
            :data-priority-filter="option.value"
            @click="choosePriority(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="filter-group filter-group--scope" data-place-filter-row>
        <span>按线路范围</span>
        <div class="filter-scroll" role="toolbar" aria-label="线路范围">
          <button type="button" :class="{ active: selectedRouteScope === 'all' }" :aria-pressed="selectedRouteScope === 'all'" data-route-scope-filter="all" @click="chooseRouteScope('all')">全部线路</button>
          <button
            v-for="option in routeScopeOptions"
            :key="option.value"
            type="button"
            :class="{ active: selectedRouteScope === option.value }"
            :aria-pressed="selectedRouteScope === option.value"
            :data-route-scope-filter="option.value"
            @click="chooseRouteScope(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <section class="scope-summary" aria-label="线路分类统计">
      <article v-for="summary in placeClassificationStats" :key="summary.routeScope" :data-scope-summary="summary.routeScope">
        <strong>{{ summary.label }}</strong>
        <span>{{ summary.total }} 处地点</span>
        <small v-if="summary.childCount">另有 {{ summary.childCount }} 个生态观察子模块</small>
      </article>
    </section>

    <p class="places__count">正在翻阅 {{ filtered.length }} 处地点</p>
    <section class="places-grid">
      <PlaceCard v-for="(place, index) in filtered" :key="place.id" :place="place" :featured="index % 7 === 0" />
    </section>
  </main>
</template>

<style scoped>
.places-filters {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgb(255 255 255 / 30%);
}

.filter-group {
  display: grid;
  gap: 8px;
}

.filter-group > span {
  color: var(--sunset);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px 2px 8px;
  scrollbar-width: none;
}

.filter-scroll::-webkit-scrollbar { display: none; }

.filter-scroll button {
  min-height: 46px;
  flex: 0 0 auto;
  padding: 0 17px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: rgb(255 255 255 / 40%);
  cursor: pointer;
  white-space: nowrap;
}

.filter-scroll button.active {
  color: #fff;
  background: var(--ink);
}

.places__count {
  margin: 18px 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.scope-summary {
  display: grid;
  grid-auto-columns: minmax(170px, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  margin-top: 14px;
  overflow-x: auto;
  padding: 2px 2px 8px;
  scrollbar-width: none;
}

.scope-summary::-webkit-scrollbar { display: none; }

.scope-summary article {
  display: grid;
  min-height: 86px;
  align-content: center;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgb(255 255 255 / 25%);
}

.scope-summary strong { font-family: var(--serif); }
.scope-summary span,
.scope-summary small { color: var(--muted); font-size: .72rem; }

.places-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 720px) {
  .places-filters { padding: 20px; }
  .filter-group { grid-template-columns: 72px minmax(0, 1fr); align-items: center; }
  .filter-scroll { padding-bottom: 2px; }
  .places-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
  .scope-summary { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-flow: row; overflow: visible; }
  .places-grid :deep(.place-card--featured) { grid-column: 1 / -1; }
}

@media (min-width: 1180px) {
  .places-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .places-grid :deep(.place-card--featured) { grid-column: span 2; }
}
</style>
