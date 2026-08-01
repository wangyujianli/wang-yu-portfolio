<script setup lang="ts">
import { Binoculars, Camera } from '@lucide/vue'
import type { Place } from '@/types/content'

defineProps<{ observationPlace: Place }>()

const observationBoundaries = [
  '动物出现与否不可预设',
  '不提供固定坐标',
  '不追逐',
  '不投喂',
  '不鸣笛驱赶',
  '不下车靠近',
  '不使用无人机低空惊扰',
  '使用长焦远距离拍摄',
  '没有看到动物也是正常的自然结果',
]
</script>

<template>
  <section class="ecology-observation" data-ecology-observation>
    <div class="ecology-observation__intro">
      <p class="eyebrow"><Binoculars :size="18" />ECOLOGY NOTE · 自然出现时再看</p>
      <h2>沿途可能出现的生态观察</h2>
      <p>{{ observationPlace.classification.priorityReason }}</p>
      <small>{{ observationPlace.value.uniqueness }}</small>
    </div>
    <div class="ecology-observation__notes">
      <header><Camera :size="20" /><strong>观察与记录的分寸</strong></header>
      <ul>
        <li v-for="note in observationBoundaries" :key="note">{{ note }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ecology-observation {
  display: grid;
  gap: 18px;
  margin: 30px 0;
  padding: clamp(22px, 4vw, 36px);
  border: 1px solid color-mix(in srgb, var(--lake) 28%, var(--line));
  border-radius: 28px;
  background:
    radial-gradient(circle at 92% 8%, rgb(45 127 123 / 12%), transparent 32%),
    rgb(255 255 255 / 28%);
}
.ecology-observation__intro .eyebrow { display: flex; align-items: center; gap: 7px; }
.ecology-observation h2 { margin: 9px 0 14px; font-size: clamp(2rem, 5vw, 3.7rem); }
.ecology-observation__intro > p:not(.eyebrow) { max-width: 760px; margin: 0; font: 600 1rem/1.8 var(--serif); }
.ecology-observation__intro small { display: block; margin-top: 12px; color: var(--muted); line-height: 1.65; }
.ecology-observation__notes { padding: 19px; border-radius: 20px; background: rgb(247 240 229 / 72%); }
.ecology-observation__notes header { display: flex; align-items: center; gap: 8px; color: var(--lake); }
.ecology-observation__notes ul { display: grid; gap: 9px; margin: 16px 0 0; padding-left: 1.2rem; color: var(--muted); }

@media (min-width: 820px) {
  .ecology-observation { grid-template-columns: minmax(0, 1.05fr) minmax(300px, .95fr); align-items: start; }
}
</style>
