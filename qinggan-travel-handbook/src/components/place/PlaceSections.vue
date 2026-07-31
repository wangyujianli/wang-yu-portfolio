<script setup lang="ts">
import { Camera, CircleAlert, Compass, Palette, Sparkles, Ticket, Users } from '@lucide/vue'
import { combinationById } from '@/data/combinations'
import type { Place } from '@/types/content'

defineProps<{ place: Place }>()
</script>

<template>
  <div class="place-sections">
    <section>
      <p class="eyebrow"><Compass :size="16" />常规玩法</p>
      <h2>先看懂，再慢慢玩</h2>
      <ul><li v-for="item in place.conventionalPlay" :key="item">{{ item }}</li></ul>
    </section>

    <section class="place-sections__tint">
      <p class="eyebrow"><Sparkles :size="16" />换个角度</p>
      <h2>不赶路的另一种打开方式</h2>
      <ul><li v-for="item in place.unconventionalPlay" :key="item">{{ item }}</li></ul>
    </section>

    <section>
      <p class="eyebrow"><Camera :size="16" />拍照指南</p>
      <h2>把人和风景都放舒服</h2>
      <ul><li v-for="item in place.photoGuide" :key="item">{{ item }}</li></ul>
      <div class="pose-grid">
        <div v-for="(pose, index) in place.soloPoses" :key="pose">
          <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ pose }}</p>
        </div>
      </div>
      <div class="group-note"><Users :size="22" /><div><strong>六人合影</strong><p>{{ place.groupComposition }}</p></div></div>
    </section>

    <section class="outfit-section">
      <p class="eyebrow"><Palette :size="16" />穿搭色盘</p>
      <h2>{{ place.outfitAdvice.mainColors.join(' · ') }}，点一点{{ place.outfitAdvice.accentColor }}</h2>
      <div class="swatches" aria-hidden="true"><i></i><i></i><i></i></div>
      <p>{{ place.outfitAdvice.note }}</p>
    </section>

    <section class="details-grid">
      <div class="detail-panel">
        <p class="eyebrow"><Ticket :size="16" />预约信息</p>
        <h3>{{ place.reservation.channel }}</h3>
        <strong>{{ place.reservation.timing }}</strong>
        <p>{{ place.reservation.note }}</p>
      </div>
      <div class="detail-panel">
        <p class="eyebrow"><CircleAlert :size="16" />到访前知道</p>
        <ul><li v-for="item in place.pitfalls" :key="item">{{ item }}</li></ul>
      </div>
      <div class="detail-panel">
        <p class="eyebrow">现场信息</p>
        <ul><li v-for="item in place.siteNotes" :key="item">{{ item }}</li></ul>
      </div>
      <div class="detail-panel">
        <p class="eyebrow">环境与步行</p>
        <ul><li v-for="item in place.physicalNotes" :key="item">{{ item }}</li></ul>
      </div>
    </section>

    <section v-if="place.nearbyCombinationIds.length" class="combination-section">
      <p class="eyebrow">可以顺路安排</p>
      <h2>把相邻风景连成一段</h2>
      <article v-for="id in place.nearbyCombinationIds" :key="id">
        <template v-if="combinationById.get(id)">
          <h3>{{ combinationById.get(id)!.title }}</h3>
          <p>{{ combinationById.get(id)!.note }}</p>
          <small>{{ combinationById.get(id)!.pacing }}</small>
        </template>
      </article>
    </section>
  </div>
</template>

<style scoped>
.place-sections {
  display: grid;
  gap: 28px;
}

.place-sections > section {
  padding: 28px 0;
  border-top: 1px solid var(--line);
}

.place-sections__tint,
.outfit-section,
.combination-section {
  padding: 28px !important;
  border: 1px solid var(--line) !important;
  border-radius: 28px;
  background: rgb(255 255 255 / 36%);
}

.place-sections h2 {
  max-width: 760px;
  margin-bottom: 22px;
  font-size: clamp(1.8rem, 3.2vw, 3rem);
}

.place-sections ul {
  display: grid;
  max-width: 760px;
  margin: 0;
  padding-left: 1.25rem;
  gap: 10px;
  color: var(--muted);
}

.place-sections .eyebrow {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pose-grid {
  display: grid;
  gap: 12px;
  margin: 26px 0;
}

.pose-grid > div {
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: start;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 16px;
}

.pose-grid span {
  color: var(--sunset);
  font: 700 0.85rem/1.7 var(--serif);
}

.pose-grid p,
.group-note p,
.outfit-section p,
.detail-panel p,
.combination-section p {
  margin: 0;
  color: var(--muted);
}

.group-note {
  display: flex;
  max-width: 760px;
  gap: 14px;
  padding: 20px;
  border-radius: 18px;
  color: #fff;
  background: var(--lake);
}

.group-note p {
  color: rgb(255 255 255 / 78%);
}

.swatches {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.swatches i {
  width: 48px;
  height: 18px;
  border-radius: 999px;
  background: #f1eadc;
  box-shadow: inset 0 0 0 1px var(--line);
}

.swatches i:nth-child(2) { background: #355a72; }
.swatches i:nth-child(3) { background: var(--sunset); }

.details-grid {
  display: grid;
  gap: 14px;
}

.detail-panel {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 18px;
}

.detail-panel h3 {
  margin-bottom: 8px;
}

.detail-panel strong {
  display: block;
  margin-bottom: 8px;
  color: var(--lake);
}

.combination-section article {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.combination-section small {
  display: block;
  margin-top: 8px;
  color: var(--sunset);
}

@media (min-width: 720px) {
  .pose-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .details-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
