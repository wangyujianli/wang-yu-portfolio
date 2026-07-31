import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { readJson, writeJson } from '@/services/storage'

const STORAGE_KEY = 'westward:v1:visited'

function readVisited(): Record<string, true> {
  const raw = readJson<unknown>(STORAGE_KEY, {})
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}

  return Object.fromEntries(
    Object.entries(raw).filter((entry): entry is [string, true] => entry[1] === true),
  )
}

export const useVisitedStore = defineStore('visited', () => {
  const visited = ref<Record<string, true>>(readVisited())
  const canPersist = ref(true)
  const visitedIds = computed(() => Object.keys(visited.value))
  const count = computed(() => visitedIds.value.length)

  function isVisited(placeId: string): boolean {
    return visited.value[placeId] === true
  }

  function toggle(placeId: string): void {
    const next = { ...visited.value }
    if (next[placeId]) delete next[placeId]
    else next[placeId] = true
    visited.value = next
    canPersist.value = writeJson(STORAGE_KEY, next)
  }

  return { visited, visitedIds, count, canPersist, isVisited, toggle }
})
