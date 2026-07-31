<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const isIntro = computed(() => route.name === 'intro')
</script>

<template>
  <div class="app-frame" :class="{ 'app-frame--intro': isIntro }">
    <AppHeader v-if="!isIntro" />
    <RouterView />
    <BottomNav v-if="!isIntro" />
  </div>
</template>
