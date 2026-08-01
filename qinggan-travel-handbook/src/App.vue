<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import IntroExperience from '@/components/intro/IntroExperience.vue'
import { useIntroVisibility } from '@/stores/intro'

const intro = useIntroVisibility()

if (intro.isVisible.value) intro.markPresented()
</script>

<template>
  <div class="app-frame">
    <AppHeader />
    <RouterView />
    <BottomNav />
    <Transition name="intro-leave">
      <IntroExperience v-if="intro.isVisible.value" @complete="intro.complete" />
    </Transition>
  </div>
</template>

<style scoped>
.intro-leave-leave-active { transition: opacity .65s ease, transform .75s cubic-bezier(.22,.75,.3,1); }
.intro-leave-leave-to { opacity: 0; transform: translateY(-18px); }

@media (prefers-reduced-motion: reduce) {
  .intro-leave-leave-active { transition: none; }
}
</style>
