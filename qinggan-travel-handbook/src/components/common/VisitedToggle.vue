<script setup lang="ts">
import { computed } from 'vue'
import { Check, MapPin } from '@lucide/vue'
import { useVisitedStore } from '@/stores/visited'

const props = withDefaults(defineProps<{ placeId: string; compact?: boolean }>(), {
  compact: false,
})

const store = useVisitedStore()
const visited = computed(() => store.isVisited(props.placeId))
</script>

<template>
  <button
    type="button"
    class="visited-toggle"
    :class="{ 'visited-toggle--active': visited, 'visited-toggle--compact': compact }"
    :aria-pressed="visited"
    @click.stop="store.toggle(placeId)"
  >
    <Check v-if="visited" :size="18" :stroke-width="2.2" />
    <MapPin v-else :size="18" :stroke-width="1.8" />
    <span>{{ visited ? '已去过' : '未去 · 点此记录' }}</span>
  </button>
</template>

<style scoped>
.visited-toggle {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink);
  background: rgb(255 255 255 / 62%);
  cursor: pointer;
}

.visited-toggle--active {
  border-color: rgb(45 127 123 / 30%);
  color: #fff;
  background: var(--lake);
}

.visited-toggle--compact {
  min-height: 42px;
  padding-inline: 12px;
  font-size: 0.8rem;
}
</style>
