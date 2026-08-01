<script setup lang="ts">
import { BedDouble, CarFront, ChevronRight, MapPin } from '@lucide/vue'
import type { Accommodation, AccommodationFacilities } from '@/types/content'
import { publicAssetUrl } from '@/lib/publicAssets'

defineProps<{ accommodation: Accommodation }>()
defineEmits<{ select: [accommodation: Accommodation] }>()

const facilityLabels: Array<[keyof AccommodationFacilities, string]> = [
  ['parking', '停车'], ['elevator', '电梯'], ['breakfast', '早餐'], ['airConditioning', '空调'],
  ['oxygen', '供氧'], ['humidifier', '加湿器'], ['laundry', '洗衣'], ['chargingStation', '充电设施'],
]
const placeholderUrl = publicAssetUrl('/images/accommodations/stay-placeholder.svg')

function usePlaceholder(event: Event): void {
  const image = event.currentTarget
  if (!(image instanceof HTMLImageElement)) return
  if (image.src.endsWith('/images/accommodations/stay-placeholder.svg')) return
  image.src = placeholderUrl
}

function status(value: boolean | undefined): string {
  if (value === true) return '有'
  if (value === false) return '未提供'
  return '待确认'
}
</script>

<template>
  <article class="accommodation-card" data-accommodation-card>
    <figure class="accommodation-card__cover">
      <img
        :src="publicAssetUrl(accommodation.images[0]?.src || '/images/accommodations/stay-placeholder.svg')"
        :alt="accommodation.images[0]?.alt || `${accommodation.name}图片暂缺`"
        loading="lazy"
        decoding="async"
        @error="usePlaceholder"
      />
      <figcaption>环境示意 · 实际房型请在外部详情核对</figcaption>
      <span>{{ accommodation.tag }}</span>
    </figure>

    <div class="accommodation-card__body">
      <p class="accommodation-card__area"><MapPin :size="15" />{{ accommodation.area }}</p>
      <h3>{{ accommodation.name }}</h3>
      <p class="accommodation-card__address">{{ accommodation.address }}</p>
      <p class="accommodation-card__proximity"><CarFront :size="17" />{{ accommodation.proximityText }}</p>
      <p class="accommodation-card__reason">{{ accommodation.reason }}</p>

      <div class="accommodation-card__needs" aria-label="适合的住宿需求">
        <span v-for="item in accommodation.suitableFor.slice(0, 3)" :key="item">{{ item }}</span>
      </div>

      <dl class="accommodation-card__facilities">
        <div v-for="([key, label]) in facilityLabels" :key="key">
          <dt>{{ label }}</dt><dd>{{ status(accommodation.facilities[key]) }}</dd>
        </div>
      </dl>

      <div class="accommodation-card__notes">
        <p><strong>安静程度</strong>{{ accommodation.quietness || '房间朝向需确认' }}</p>
        <p><strong>预订前确认</strong>{{ accommodation.cautions[0] }}</p>
        <small>信息整理于 {{ accommodation.updatedAt }}</small>
      </div>

      <button type="button" data-accommodation-details @click="$emit('select', accommodation)">
        <BedDouble :size="18" />查看住宿详情<ChevronRight :size="17" />
      </button>
    </div>
  </article>
</template>

<style scoped>
.accommodation-card {
  display: grid;
  flex: 0 0 min(84vw, 350px);
  overflow: hidden;
  scroll-snap-align: start;
  border: 1px solid rgb(89 68 53 / 16%);
  border-radius: 24px;
  background: rgb(255 253 248 / 78%);
  box-shadow: 0 18px 48px rgb(74 55 42 / 9%);
}

.accommodation-card__cover {
  position: relative;
  min-height: 188px;
  margin: 0;
  overflow: hidden;
  background: #ddd1bc;
}

.accommodation-card__cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.accommodation-card:hover .accommodation-card__cover img { transform: scale(1.025); }

.accommodation-card__cover::after {
  position: absolute;
  inset: 50% 0 0;
  background: linear-gradient(180deg, transparent, rgb(43 34 29 / 56%));
  content: '';
}

.accommodation-card__cover > span {
  position: absolute;
  z-index: 1;
  top: 14px;
  left: 14px;
  padding: 7px 11px;
  border-radius: 999px;
  color: #fff;
  background: rgb(51 91 94 / 90%);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.accommodation-card__cover figcaption {
  position: absolute;
  z-index: 1;
  right: 12px;
  bottom: 10px;
  left: 12px;
  color: rgb(255 255 255 / 78%);
  font-size: 0.68rem;
  text-align: right;
}

.accommodation-card__body { display: grid; align-content: start; padding: 22px; gap: 13px; }
.accommodation-card__area { display: flex; align-items: center; gap: 6px; margin: 0; color: var(--sunset); font-size: 0.78rem; }
.accommodation-card h3 { margin: 0; font-size: 1.38rem; }
.accommodation-card__address { min-height: 42px; margin: -6px 0 0; color: var(--muted); font-size: 0.76rem; line-height: 1.55; }

.accommodation-card__proximity {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  min-height: 48px;
  margin: 0;
  color: var(--ink);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.55;
}

.accommodation-card__proximity svg { flex: 0 0 auto; margin-top: 3px; color: var(--lake); }
.accommodation-card__reason { min-height: 69px; margin: 0; color: var(--muted); font-size: 0.9rem; line-height: 1.7; }
.accommodation-card__needs { display: flex; flex-wrap: wrap; gap: 7px; }
.accommodation-card__needs span { padding: 5px 9px; border-radius: 999px; color: #5f5248; background: #efe4d1; font-size: 0.72rem; }

.accommodation-card__facilities {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 2px 0 0;
  padding: 12px 0;
  border-block: 1px solid var(--line);
}

.accommodation-card__facilities div { display: grid; gap: 3px; text-align: center; }
.accommodation-card__facilities div:nth-child(n + 5) { margin-top: 9px; padding-top: 9px; border-top: 1px solid var(--line); }
.accommodation-card__facilities dt { color: var(--muted); font-size: 0.68rem; }
.accommodation-card__facilities dd { margin: 0; color: var(--lake); font-size: 0.82rem; font-weight: 700; }

.accommodation-card__notes { display: grid; gap: 7px; }
.accommodation-card__notes p { display: grid; gap: 2px; margin: 0; color: var(--muted); font-size: 0.74rem; line-height: 1.55; }
.accommodation-card__notes strong { color: var(--ink); font-size: 0.7rem; }
.accommodation-card__notes small { color: var(--sunset); font-size: 0.68rem; }

.accommodation-card button {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 15px;
  border: 0;
  border-radius: 15px;
  color: #fff;
  background: var(--ink);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.accommodation-card button svg:last-child { margin-left: auto; }

@media (min-width: 720px) {
  .accommodation-card { min-width: 0; }
}

@media (min-width: 720px) and (max-width: 1000px) {
  .accommodation-card__body { padding: 17px; gap: 11px; }
  .accommodation-card h3 { font-size: 1.14rem; }
  .accommodation-card__address { font-size: 0.7rem; }
  .accommodation-card__proximity { min-height: 44px; font-size: 0.8rem; }
  .accommodation-card__reason { min-height: 78px; font-size: 0.8rem; }
  .accommodation-card__needs span { padding: 4px 7px; font-size: 0.66rem; }
  .accommodation-card__facilities { grid-template-columns: repeat(2, 1fr); }
  .accommodation-card__facilities div { grid-template-columns: 1fr auto; align-items: center; gap: 6px; padding: 5px 7px; text-align: left; }
  .accommodation-card__facilities div:nth-child(n + 3) { margin-top: 0; border-top: 1px solid var(--line); }
  .accommodation-card__facilities dt { font-size: 0.65rem; }
  .accommodation-card__facilities dd { font-size: 0.7rem; }
  .accommodation-card__notes p { font-size: 0.69rem; }
}
</style>
