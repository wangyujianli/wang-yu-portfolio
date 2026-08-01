<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { CircleCheck, CircleHelp, CircleX, ExternalLink, MapPin, X } from '@lucide/vue'
import type { Accommodation, AccommodationFacilities } from '@/types/content'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{ accommodation: Accommodation | null }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)
let previousOverflow = ''
const placeholderUrl = publicAssetUrl('/images/accommodations/stay-placeholder.svg')

const facilityLabels: Array<[keyof AccommodationFacilities, string]> = [
  ['parking', '停车'], ['elevator', '电梯'], ['breakfast', '早餐'], ['airConditioning', '空调'],
  ['oxygen', '供氧'], ['humidifier', '加湿器'], ['laundry', '洗衣'], ['chargingStation', '充电设施'],
]

const labelledFacilities = computed(() => facilityLabels.map(([key, label]) => ({
  key,
  label,
  value: props.accommodation?.facilities[key],
})))

watch(() => props.accommodation, async (item) => {
  if (item) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = previousOverflow
  }
})

onBeforeUnmount(() => { document.body.style.overflow = previousOverflow })

function usePlaceholder(event: Event): void {
  const image = event.currentTarget
  if (!(image instanceof HTMLImageElement)) return
  if (image.src.endsWith('/images/accommodations/stay-placeholder.svg')) return
  image.src = placeholderUrl
}
</script>

<template>
  <Transition name="stay-drawer">
    <div v-if="accommodation" class="stay-overlay" @click.self="emit('close')" @keydown.esc="emit('close')">
      <section
        class="stay-drawer"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`stay-title-${accommodation.id}`"
      >
        <header class="stay-drawer__header">
          <div>
            <p class="eyebrow">{{ accommodation.tag }} · {{ accommodation.area }}</p>
            <h2 :id="`stay-title-${accommodation.id}`">{{ accommodation.name }}</h2>
          </div>
          <button ref="closeButton" type="button" class="stay-drawer__close" aria-label="关闭住宿详情" @click="emit('close')"><X :size="22" /></button>
        </header>

        <div class="stay-drawer__scroll">
          <div class="stay-drawer__gallery" data-accommodation-gallery>
            <figure v-for="image in accommodation.images" :key="image.src + image.alt">
              <img :src="publicAssetUrl(image.src)" :alt="image.alt" loading="lazy" decoding="async" @error="usePlaceholder" />
              <figcaption>{{ image.credit || '环境示意' }}</figcaption>
            </figure>
          </div>

          <p class="stay-drawer__illustration-note">图片为本地环境示意，不代表具体房型；住宿方实时图片可在外部详情查看。</p>

          <div class="stay-drawer__lead">
            <p><MapPin :size="18" /><span><strong>地址</strong>{{ accommodation.address }}</span></p>
            <p><MapPin :size="18" /><span><strong>从当前地点出发</strong>{{ accommodation.proximityText }}</span></p>
          </div>

          <section>
            <p class="eyebrow">完整设施</p>
            <div class="facility-grid">
              <div v-for="item in labelledFacilities" :key="item.key" :data-state="item.value === true ? 'yes' : item.value === false ? 'no' : 'unknown'">
                <CircleCheck v-if="item.value === true" :size="18" />
                <CircleX v-else-if="item.value === false" :size="18" />
                <CircleHelp v-else :size="18" />
                <span>{{ item.label }}</span>
                <small>{{ item.value === true ? '有' : item.value === false ? '未提供' : '待确认' }}</small>
              </div>
            </div>
          </section>

          <div class="stay-drawer__detail-grid">
            <section>
              <p class="eyebrow">适合的住宿需求</p>
              <div class="stay-drawer__tags"><span v-for="item in accommodation.suitableFor" :key="item">{{ item }}</span></div>
              <p class="stay-drawer__quiet"><strong>安静程度</strong>{{ accommodation.quietness || '房间朝向与现场情况待确认' }}</p>
            </section>
            <section>
              <p class="eyebrow">预订前确认</p>
              <ul><li v-for="item in accommodation.cautions" :key="item">{{ item }}</li></ul>
              <p class="stay-drawer__updated">信息整理于 {{ accommodation.updatedAt }}</p>
            </section>
          </div>

          <a
            v-if="accommodation.detailUrl"
            :href="accommodation.detailUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="stay-drawer__external"
            data-external-detail
          >
            打开外部详情，自行核对与安排<ExternalLink :size="18" />
          </a>
        </div>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.stay-overlay {
  position: fixed;
  z-index: 120;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 48px;
  background: rgb(38 31 27 / 58%);
  backdrop-filter: blur(7px);
}

.stay-drawer {
  width: min(100%, 980px);
  max-height: calc(100dvh - 40px);
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 34%);
  border-radius: 28px 28px 0 0;
  background: #f5eddf;
  box-shadow: 0 -18px 70px rgb(31 24 20 / 28%);
}

.stay-drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 21px 22px 17px;
  border-bottom: 1px solid var(--line);
  background: rgb(248 242 231 / 95%);
}

.stay-drawer__header h2 { margin: 5px 0 0; font-size: clamp(1.65rem, 5.5vw, 2.5rem); }
.stay-drawer__close { display: grid; min-width: 46px; min-height: 46px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); background: #fffaf0; cursor: pointer; }
.stay-drawer__scroll { max-height: calc(100dvh - 150px); overflow-y: auto; padding: 20px 22px 34px; overscroll-behavior: contain; }

.stay-drawer__gallery {
  display: grid;
  grid-auto-columns: min(82vw, 390px);
  grid-auto-flow: column;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 6px;
  scroll-snap-type: x mandatory;
}

.stay-drawer__gallery figure { position: relative; min-height: 190px; margin: 0; overflow: hidden; scroll-snap-align: start; border-radius: 18px; background: #d9cbb5; }
.stay-drawer__gallery img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.stay-drawer__gallery figcaption { position: absolute; right: 10px; bottom: 8px; padding: 4px 7px; border-radius: 7px; color: #fff; background: rgb(43 34 29 / 55%); font-size: 0.65rem; }
.stay-drawer__illustration-note { margin: 10px 0 22px; color: var(--muted); font-size: 0.72rem; }

.stay-drawer__lead { display: grid; gap: 10px; margin-bottom: 25px; }
.stay-drawer__lead p { display: flex; align-items: flex-start; gap: 10px; margin: 0; padding: 14px; border-radius: 14px; background: rgb(255 255 255 / 52%); color: var(--muted); }
.stay-drawer__lead svg { flex: 0 0 auto; margin-top: 3px; color: var(--sunset); }
.stay-drawer__lead span { display: grid; gap: 3px; }
.stay-drawer__lead strong { color: var(--ink); font-size: 0.78rem; }

.facility-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 12px 0 26px; }
.facility-grid > div { display: grid; grid-template-columns: 24px 1fr; align-items: center; padding: 12px; border: 1px solid var(--line); border-radius: 13px; background: rgb(255 255 255 / 42%); }
.facility-grid svg { grid-row: 1 / span 2; color: var(--lake); }
.facility-grid small { color: var(--muted); font-size: 0.68rem; }
.facility-grid [data-state='unknown'] svg { color: #9b7f64; }
.facility-grid [data-state='no'] svg { color: #9a7666; }

.stay-drawer__detail-grid { display: grid; gap: 14px; }
.stay-drawer__detail-grid > section { padding: 18px; border: 1px solid var(--line); border-radius: 18px; background: rgb(255 255 255 / 38%); }
.stay-drawer__detail-grid ul { margin: 12px 0 0; padding-left: 1.2rem; color: var(--muted); }
.stay-drawer__tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 12px 0 18px; }
.stay-drawer__tags span { padding: 6px 9px; border-radius: 999px; background: #e7d8bf; font-size: 0.75rem; }
.stay-drawer__quiet { display: grid; gap: 5px; margin: 0; color: var(--muted); }
.stay-drawer__quiet strong { color: var(--ink); font-size: 0.8rem; }
.stay-drawer__updated { margin: 13px 0 0; color: var(--sunset); font-size: 0.72rem; }

.stay-drawer__external {
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 18px;
  padding: 0 18px;
  border-radius: 15px;
  color: #fff;
  background: var(--lake);
  text-decoration: none;
  font-weight: 700;
}

.stay-drawer-enter-active, .stay-drawer-leave-active { transition: opacity 200ms ease; }
.stay-drawer-enter-active .stay-drawer, .stay-drawer-leave-active .stay-drawer { transition: transform 260ms ease; }
.stay-drawer-enter-from, .stay-drawer-leave-to { opacity: 0; }
.stay-drawer-enter-from .stay-drawer, .stay-drawer-leave-to .stay-drawer { transform: translateY(40px); }

@media (min-width: 720px) {
  .stay-overlay { padding-inline: 24px; }
  .stay-drawer { border-radius: 28px 28px 0 0; }
  .stay-drawer__header, .stay-drawer__scroll { padding-inline: 32px; }
  .stay-drawer__gallery { grid-template-columns: 1.35fr 0.825fr 0.825fr; grid-auto-flow: initial; overflow: visible; }
  .stay-drawer__gallery figure { min-height: 230px; }
  .facility-grid { grid-template-columns: repeat(4, 1fr); }
  .stay-drawer__detail-grid { grid-template-columns: 1fr 1fr; }
}
</style>
