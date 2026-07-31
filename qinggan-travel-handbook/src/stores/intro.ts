import { ref } from 'vue'
import { defineStore } from 'pinia'
import { readJson, writeJson } from '@/services/storage'

const STORAGE_KEY = 'westward:v1:intro-seen'

export const useIntroStore = defineStore('intro', () => {
  const hasSeenIntro = ref(readJson<boolean>(STORAGE_KEY, false) === true)

  function complete(): void {
    hasSeenIntro.value = true
    writeJson(STORAGE_KEY, true)
  }

  function reset(): void {
    hasSeenIntro.value = false
    writeJson(STORAGE_KEY, false)
  }

  return { hasSeenIntro, complete, reset }
})
