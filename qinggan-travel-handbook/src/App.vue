<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
</script>

<template>
  <div class="app-frame">
    <AppHeader />
    <RouterView />
    <BottomNav />
  </div>
</template>
