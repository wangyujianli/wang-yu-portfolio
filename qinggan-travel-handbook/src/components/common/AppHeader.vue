<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CalendarRange, Camera, Compass, Footprints, House, ListChecks, Map, Milestone, RotateCcw } from '@lucide/vue'

const navItems = [
  { to: '/', label: '首页', icon: House },
  { to: '/preparation', label: '出发准备', icon: ListChecks },
  { to: '/map', label: '探索地图', icon: Map },
  { to: '/places', label: '地点指南', icon: Compass },
  { to: '/photo-guide', label: '拍照宝典', icon: Camera },
  { to: '/footprints', label: '我的足迹', icon: Footprints },
]

const journeyItems = [
  { to: '/itinerary', label: '九天参考', icon: CalendarRange },
  { to: '/nearby', label: '周边可玩', icon: Milestone },
]
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-brand" aria-label="返回首页">
      <span class="app-brand__mark">西</span>
      <span>
        <strong>向西而行</strong>
        <small>2026 · 青甘自由探索手册</small>
      </span>
    </RouterLink>

    <nav class="top-nav" aria-label="主要导航">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" :aria-label="item.label">
        <component :is="item.icon" :size="18" :stroke-width="1.8" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <nav class="journey-nav" aria-label="参考路线与周边">
      <RouterLink v-for="item in journeyItems" :key="item.to" :to="item.to">
        <component :is="item.icon" :size="17" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <RouterLink class="replay-link" to="/intro?replay=1" aria-label="重播序章">
      <RotateCcw :size="18" />
      <span>重播序章</span>
    </RouterLink>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  z-index: 50;
  top: 0;
  display: flex;
  min-height: 68px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px max(16px, calc((100vw - 1320px) / 2));
  border-bottom: 1px solid var(--line);
  background: rgb(247 240 229 / 88%);
  backdrop-filter: blur(18px);
}

.app-brand {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.app-brand__mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid var(--sunset);
  border-radius: 50%;
  color: var(--sunset);
  font: 700 1rem/1 var(--serif);
  transform: rotate(-7deg);
}

.app-brand strong,
.app-brand small {
  display: block;
}

.app-brand strong {
  font-family: var(--serif);
  letter-spacing: 0.08em;
}

.app-brand small {
  margin-top: 2px;
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
}

.top-nav {
  display: none;
  align-items: center;
  gap: 4px;
}

.journey-nav { display: none; align-items: center; gap: 2px; padding-left: 8px; border-left: 1px solid var(--line); }
.journey-nav a { display: inline-flex; min-height: 44px; align-items: center; gap: 6px; padding: 0 10px; border-radius: 999px; color: var(--muted); font-size: .76rem; text-decoration: none; white-space: nowrap; }
.journey-nav a.router-link-exact-active { color: var(--ink); background: rgb(255 255 255 / 58%); }

.top-nav a,
.replay-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.82rem;
  text-decoration: none;
  white-space: nowrap;
}

.top-nav a.router-link-exact-active {
  color: var(--ink);
  background: rgb(255 255 255 / 58%);
  box-shadow: inset 0 0 0 1px var(--line);
}

.replay-link {
  color: var(--lake);
}

.replay-link span {
  display: none;
}

@media (min-width: 720px) {
  .top-nav {
    display: flex;
  }

  .top-nav a span,
  .app-brand small { display: none; }
  .top-nav a { padding-inline: 10px; }
}

@media (min-width: 980px) {
  .top-nav a span,
  .app-brand small { display: block; }
}

@media (min-width: 1100px) {
  .app-header {
    padding-inline: max(32px, calc((100vw - 1320px) / 2));
  }

  .replay-link span { display: inline; }
  .journey-nav { display: flex; }
}
</style>
