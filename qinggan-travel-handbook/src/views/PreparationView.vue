<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import EmergencyDrawer from '@/components/preparation/EmergencyDrawer.vue'
import PreparationCard from '@/components/preparation/PreparationCard.vue'
import { emergencyPreparationCard, preparationCards } from '@/data/preparation'
</script>

<template>
  <main class="preparation page-shell">
    <SectionHeading
      eyebrow="BEFORE GOING WEST"
      title="出发前确认中心"
      intro="重要信息提前核实，行程保持自由，遇到变化也能从容调整。"
    />

    <div class="preparation__lead paper-card">
      <p class="eyebrow">8 CHECKPOINTS</p>
      <p>从票务、天气到车辆和联络方式，只保留真正值得出发前看一眼的信息。可以按需要展开，不形成固定日程。</p>
    </div>

    <section class="preparation-grid" aria-label="出发前八项确认">
      <PreparationCard v-for="card in preparationCards" :key="card.id" :card="card" />
    </section>

    <EmergencyDrawer :contacts="emergencyPreparationCard.phones ?? []" />
  </main>
</template>

<style scoped>
.preparation__lead {
  display: grid;
  gap: 4px;
  margin-bottom: 22px;
  padding: 18px 20px;
  box-shadow: none;
}

.preparation__lead p { margin-bottom: 0; }
.preparation__lead p:last-child { max-width: 780px; color: var(--muted); }

.preparation-grid {
  display: grid;
  align-items: start;
  gap: 18px;
}

@media (min-width: 720px) {
  .preparation__lead {
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 24px;
    padding: 20px 24px;
  }

  .preparation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1180px) {
  .preparation-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
