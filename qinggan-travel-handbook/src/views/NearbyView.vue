<script setup lang="ts">
import { computed, ref } from 'vue'
import { Milestone } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import NearbyExplorationCard from '@/components/journey/NearbyExplorationCard.vue'
import { nearbyExplorationGroups } from '@/data/nearbyExplorations'
import type { NearbyTimeGroup } from '@/types/content'

const selected = ref<'all' | NearbyTimeGroup>('all')
const filters = [
  { id: 'all' as const, label: '全部' },
  ...nearbyExplorationGroups.map((group) => ({ id: group.id, label: group.label })),
]
const activeGroups = computed(() => selected.value === 'all' ? nearbyExplorationGroups : nearbyExplorationGroups.filter((group) => group.id === selected.value))
</script>

<template>
  <main class="nearby page-shell">
    <section class="nearby__hero">
      <SectionHeading eyebrow="OPTIONAL SIDE NOTES" title="周边可玩" intro="不是为了把地图填满，而是让临时多出来的半天、一天或几天有更清楚的选择。时间紧时，舍弃也很自然。" />
      <div class="nearby__legend"><Milestone :size="22" /><p>不提供虚假的精确公里数和分钟表；未核实的动态信息统一提醒出发前查看官方公告。</p></div>
    </section>

    <div class="nearby__filters" role="toolbar" aria-label="按增加时间筛选">
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        :data-nearby-group-filter="filter.id"
        :class="{ active: selected === filter.id }"
        @click="selected = filter.id"
      >{{ filter.label }}</button>
    </div>

    <section v-for="group in activeGroups" :key="group.id" class="nearby__group">
      <header><p class="eyebrow">{{ group.id }}</p><h2>{{ group.label }}</h2><p>{{ group.note }}</p></header>
      <NearbyExplorationCard v-for="(item, index) in group.items" :key="item.id" :item="item" :index="index" />
    </section>
  </main>
</template>

<style scoped>
.nearby__hero { display: grid; gap: 22px; }
.nearby__legend { display: flex; max-width: 720px; gap: 10px; padding: 16px; border: 1px solid var(--line); border-radius: 18px; color: var(--lake); background: rgb(45 127 123 / 7%); }
.nearby__legend svg { flex: 0 0 auto; }
.nearby__legend p { margin: 0; color: var(--muted); font-size: .82rem; }
.nearby__filters { position: sticky; z-index: 20; top: 68px; display: flex; gap: 8px; margin: 34px 0 52px; padding: 10px; overflow-x: auto; border-block: 1px solid var(--line); background: rgb(242 234 220 / 94%); backdrop-filter: blur(16px); scrollbar-width: none; }
.nearby__filters button { min-height: 44px; flex: 0 0 auto; padding: 0 16px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); background: rgb(255 255 255 / 38%); cursor: pointer; }
.nearby__filters button.active { color: #fff; background: var(--ink); }
.nearby__group { max-width: 1040px; margin: 0 auto 72px; }
.nearby__group > header { max-width: 720px; margin-bottom: 18px; }
.nearby__group > header h2 { margin: 7px 0 10px; font-size: clamp(2.3rem, 5vw, 4.4rem); }
.nearby__group > header > p:last-child { color: var(--muted); }
</style>
