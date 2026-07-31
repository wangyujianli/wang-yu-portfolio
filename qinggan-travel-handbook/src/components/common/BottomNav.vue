<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Camera, Compass, Footprints, House, Map } from '@lucide/vue'

const navItems = [
  { to: '/', label: '首页', icon: House },
  { to: '/map', label: '地图', icon: Map },
  { to: '/places', label: '地点', icon: Compass },
  { to: '/photo-guide', label: '拍照', icon: Camera },
  { to: '/footprints', label: '足迹', icon: Footprints },
]
</script>

<template>
  <nav class="bottom-nav" aria-label="移动端主要导航">
    <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
      <component :is="item.icon" :size="21" :stroke-width="1.8" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  z-index: 60;
  right: 10px;
  bottom: max(10px, env(safe-area-inset-bottom));
  left: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 6px;
  border: 1px solid rgb(53 42 36 / 12%);
  border-radius: 22px;
  background: rgb(247 240 229 / 94%);
  box-shadow: 0 16px 40px rgb(53 42 36 / 18%);
  backdrop-filter: blur(20px);
}

.bottom-nav a {
  display: flex;
  min-height: 52px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 17px;
  color: var(--muted);
  font-size: 0.68rem;
  text-decoration: none;
}

.bottom-nav a.router-link-exact-active {
  color: var(--ink);
  background: rgb(255 255 255 / 64%);
}

@media (min-width: 720px) {
  .bottom-nav {
    display: none;
  }
}
</style>
