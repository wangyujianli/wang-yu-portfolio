<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlaceCard from '@/components/place/PlaceCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { filterPlaces, placeCategories, placePriorityOptions, places } from '@/data/places'

const route = useRoute()
const router = useRouter()
const selectedCategory = computed(() => typeof route.query.category === 'string' ? route.query.category : 'all')
const selectedPriority = computed(() => typeof route.query.priority === 'string' ? route.query.priority : 'all')
const filtered = computed(() => filterPlaces(places, selectedCategory.value, selectedPriority.value))

async function chooseCategory(category: string): Promise<void> {
  const query = { ...route.query }
  if (category === 'all') delete query.category
  else query.category = category
  await router.replace({ query })
}

async function choosePriority(priority: string): Promise<void> {
  const query = { ...route.query }
  if (priority === 'all') delete query.priority
  else query.priority = priority
  await router.replace({ query })
}
</script>

<template>
  <main class="places page-shell">
    <SectionHeading eyebrow="16 PLACE FILES" title="地点指南" intro="没有固定的第几天，只有此刻更想靠近的风景。按地貌翻阅，也可以从地图进入。" />

    <div class="places-filters">
      <div class="filter-group">
        <span>按风景</span>
        <div class="filter-scroll" role="toolbar" aria-label="地点分类">
          <button type="button" :class="{ active: selectedCategory === 'all' }" @click="chooseCategory('all')">全部 · 16</button>
          <button v-for="category in placeCategories" :key="category" type="button" :class="{ active: selectedCategory === category }" @click="chooseCategory(category)">
            {{ category }}
          </button>
        </div>
      </div>

      <div class="filter-group filter-group--priority">
        <span>按取舍</span>
        <div class="filter-scroll" role="toolbar" aria-label="推荐等级">
          <button type="button" :class="{ active: selectedPriority === 'all' }" data-priority-filter="all" @click="choosePriority('all')">全部等级</button>
          <button
            v-for="option in placePriorityOptions"
            :key="option.value"
            type="button"
            :class="{ active: selectedPriority === option.value }"
            :data-priority-filter="option.value"
            @click="choosePriority(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

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

.places-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 720px) {
  .places-filters { padding: 20px; }
  .filter-group { grid-template-columns: 72px minmax(0, 1fr); align-items: center; }
  .filter-scroll { padding-bottom: 2px; }
  .places-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
  .places-grid :deep(.place-card--featured) { grid-column: 1 / -1; }
}

@media (min-width: 1180px) {
  .places-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .places-grid :deep(.place-card--featured) { grid-column: span 2; }
}
</style>
