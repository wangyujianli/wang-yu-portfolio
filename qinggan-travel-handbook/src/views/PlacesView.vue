<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlaceCard from '@/components/place/PlaceCard.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { filterPlaces, placeCategories, places } from '@/data/places'

const route = useRoute()
const router = useRouter()
const selected = computed(() => typeof route.query.category === 'string' ? route.query.category : 'all')
const filtered = computed(() => filterPlaces(places, selected.value))

function chooseCategory(category: string): void {
  void router.replace({ query: category === 'all' ? {} : { category } })
}
</script>

<template>
  <main class="places page-shell">
    <SectionHeading eyebrow="16 PLACE FILES" title="地点指南" intro="没有固定的第几天，只有此刻更想靠近的风景。按地貌翻阅，也可以从地图进入。" />

    <div class="category-filter" role="toolbar" aria-label="地点分类">
      <button type="button" :class="{ active: selected === 'all' }" @click="chooseCategory('all')">全部 · 16</button>
      <button v-for="category in placeCategories" :key="category" type="button" :class="{ active: selected === category }" @click="chooseCategory(category)">
        {{ category }}
      </button>
    </div>

    <p class="places__count">正在翻阅 {{ filtered.length }} 处地点</p>
    <section class="places-grid">
      <PlaceCard v-for="(place, index) in filtered" :key="place.id" :place="place" :featured="index % 7 === 0" />
    </section>
  </main>
</template>

<style scoped>
.category-filter {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 2px 12px;
}

.category-filter button {
  min-height: 46px;
  flex: 0 0 auto;
  padding: 0 17px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: rgb(255 255 255 / 40%);
  cursor: pointer;
}

.category-filter button.active {
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
  .places-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
  .places-grid :deep(.place-card--featured) { grid-column: 1 / -1; }
}

@media (min-width: 1180px) {
  .places-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .places-grid :deep(.place-card--featured) { grid-column: span 2; }
}
</style>
