import { ref } from 'vue'
import { readJson, writeJson } from '@/services/storage'

export const INTRO_SEEN_KEY = 'westward:v1:intro-seen'

export function useIntroVisibility() {
  const isVisible = ref(readJson<boolean>(INTRO_SEEN_KEY, false) !== true)

  function markPresented() {
    writeJson(INTRO_SEEN_KEY, true)
  }

  function complete() {
    markPresented()
    isVisible.value = false
  }

  return { isVisible, markPresented, complete }
}
