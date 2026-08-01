<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ChevronLeft, ChevronRight, Expand, ImageOff, X } from '@lucide/vue'
import type { ScenicImageAsset } from '@/data/scenicImages'
import ScenicImage from '@/components/scenic/ScenicImage.vue'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{
  images: readonly ScenicImageAsset[]
  title: string
}>()

const activeIndex = ref(0)
const lightboxOpen = ref(false)
const stageButton = ref<HTMLButtonElement | null>(null)
const touchStartX = ref<number | null>(null)
const activeImage = computed(() => props.images[activeIndex.value])
const isCarousel = computed(() => props.images.length > 1)
const hasThumbnails = computed(() => props.images.length >= 4)

function show(index: number): void {
  if (!props.images.length) return
  activeIndex.value = (index + props.images.length) % props.images.length
}

const previous = () => show(activeIndex.value - 1)
const next = () => show(activeIndex.value + 1)

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowLeft') previous()
  if (event.key === 'ArrowRight') next()
  if (event.key === 'Escape' && lightboxOpen.value) closeLightbox()
}

function handleTouchStart(event: TouchEvent): void {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

function handleTouchEnd(event: TouchEvent): void {
  if (touchStartX.value === null) return
  const end = event.changedTouches[0]?.clientX ?? touchStartX.value
  const distance = end - touchStartX.value
  if (Math.abs(distance) > 48) {
    if (distance > 0) previous()
    else next()
  }
  touchStartX.value = null
}

function openLightbox(): void {
  if (!hasThumbnails.value) return
  lightboxOpen.value = true
}

async function closeLightbox(): Promise<void> {
  lightboxOpen.value = false
  await nextTick()
  stageButton.value?.focus()
}
</script>

<template>
  <section
    class="scenic-gallery"
    data-scenic-gallery
    :aria-label="title"
    tabindex="0"
    @keydown="handleKeydown"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div v-if="!activeImage" class="scenic-gallery__empty" data-gallery-empty>
      <ImageOff :size="28" :stroke-width="1.5" />
      <strong>暂无可公开实景图</strong>
      <p>地点攻略仍可完整查看，后续可以继续补充本人拍摄素材。</p>
    </div>

    <template v-else>
      <button
        v-if="hasThumbnails"
        ref="stageButton"
        type="button"
        class="scenic-gallery__stage scenic-gallery__stage--button"
        aria-label="打开大图查看"
        @click="openLightbox"
      >
        <ScenicImage :key="activeImage.id" :image="activeImage" loading="eager" />
        <span class="scenic-gallery__expand"><Expand :size="18" />查看大图</span>
      </button>
      <div v-else class="scenic-gallery__stage">
        <ScenicImage :key="activeImage.id" :image="activeImage" loading="eager" />
      </div>

      <div v-if="isCarousel" class="scenic-gallery__toolbar">
        <button type="button" aria-label="上一张照片" @click="previous"><ChevronLeft :size="22" /></button>
        <span class="scenic-gallery__counter" aria-live="polite">{{ activeIndex + 1 }} / {{ images.length }}</span>
        <div class="scenic-gallery__dots" aria-label="照片位置">
          <button
            v-for="(image, index) in images"
            :key="image.id"
            type="button"
            :aria-label="`查看第${index + 1}张照片`"
            :aria-current="index === activeIndex ? 'true' : undefined"
            :class="{ active: index === activeIndex }"
            @click="show(index)"
          />
        </div>
        <button type="button" aria-label="下一张照片" @click="next"><ChevronRight :size="22" /></button>
      </div>

      <div v-if="hasThumbnails" class="scenic-gallery__thumbnails" aria-label="照片缩略图">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          type="button"
          data-gallery-thumbnail
          :aria-label="`查看第${index + 1}张照片`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          :class="{ active: index === activeIndex }"
          @click="show(index)"
        >
          <img :src="publicAssetUrl(image.thumbnail)" :alt="image.alt" loading="lazy" :width="image.width" :height="image.height" />
        </button>
      </div>
    </template>

    <Teleport to="body">
      <div v-if="lightboxOpen && activeImage" class="scenic-lightbox" role="dialog" aria-modal="true" :aria-label="`${title}大图`" @keydown="handleKeydown">
        <button type="button" class="scenic-lightbox__close" aria-label="关闭大图" @click="closeLightbox"><X :size="24" /></button>
        <button type="button" class="scenic-lightbox__nav scenic-lightbox__nav--prev" aria-label="上一张照片" @click="previous"><ChevronLeft :size="30" /></button>
        <ScenicImage :image="activeImage" loading="eager" sizes="96vw" />
        <button type="button" class="scenic-lightbox__nav scenic-lightbox__nav--next" aria-label="下一张照片" @click="next"><ChevronRight :size="30" /></button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.scenic-gallery {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 30px;
  background: rgb(250 246 237 / 76%);
  box-shadow: var(--shadow);
}

.scenic-gallery__stage {
  position: relative;
  display: block;
  width: 100%;
  height: clamp(320px, 54vw, 650px);
  padding: 0;
  overflow: hidden;
  border: 0;
  color: inherit;
  background: #ded5c7;
}

.scenic-gallery__stage--button { cursor: zoom-in; }
.scenic-gallery__expand { position: absolute; right: 16px; bottom: 16px; display: inline-flex; min-height: 44px; align-items: center; gap: 7px; padding: 0 14px; border-radius: 999px; color: #fff; background: rgb(35 30 27 / 74%); font-size: .8rem; }

.scenic-gallery__toolbar { display: grid; min-width: 0; grid-template-columns: 44px auto minmax(0, 1fr) 44px; align-items: center; gap: 10px; padding: 12px 14px; }
.scenic-gallery__toolbar > button, .scenic-gallery__dots button { border: 0; cursor: pointer; }
.scenic-gallery__toolbar > button { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 50%; color: var(--ink); background: rgb(255 255 255 / 58%); }
.scenic-gallery__counter { min-width: 46px; color: var(--muted); font: 700 .76rem/1 var(--serif); }
.scenic-gallery__dots { display: flex; min-width: 0; justify-content: center; gap: 7px; }
.scenic-gallery__dots button { width: 9px; height: 9px; padding: 0; border-radius: 999px; background: color-mix(in srgb, var(--muted) 30%, transparent); transition: width 180ms ease, background 180ms ease; }
.scenic-gallery__dots button.active { width: 24px; background: var(--sunset); }

.scenic-gallery__thumbnails { display: flex; gap: 10px; overflow-x: auto; padding: 0 14px 16px; scrollbar-width: thin; }
.scenic-gallery__thumbnails button { width: 104px; height: 72px; flex: 0 0 auto; padding: 3px; overflow: hidden; border: 1px solid transparent; border-radius: 13px; background: transparent; cursor: pointer; }
.scenic-gallery__thumbnails button.active { border-color: var(--sunset); }
.scenic-gallery__thumbnails img { width: 100%; height: 100%; border-radius: 9px; object-fit: cover; }

.scenic-gallery__empty { display: grid; min-height: 360px; place-items: center; align-content: center; gap: 10px; padding: 34px; text-align: center; color: var(--muted); background: radial-gradient(circle at 50% 42%, rgb(45 127 123 / 10%), transparent 15rem); }
.scenic-gallery__empty strong { color: var(--ink); font-family: var(--serif); font-size: 1.35rem; }
.scenic-gallery__empty p { max-width: 380px; margin: 0; }

.scenic-lightbox { position: fixed; z-index: 1200; inset: 0; display: grid; grid-template-columns: 54px minmax(0, 1fr) 54px; align-items: center; gap: 8px; padding: 72px 14px 22px; color: #fff; background: rgb(20 17 15 / 92%); }
.scenic-lightbox :deep(.scenic-image) { min-height: 0; max-height: calc(100dvh - 96px); background: transparent; }
.scenic-lightbox :deep(img) { max-height: calc(100dvh - 96px); object-fit: contain; }
.scenic-lightbox button { display: grid; width: 48px; height: 48px; place-items: center; border: 1px solid rgb(255 255 255 / 22%); border-radius: 50%; color: #fff; background: rgb(0 0 0 / 28%); cursor: pointer; }
.scenic-lightbox__close { position: absolute; top: 14px; right: 14px; }

@media (max-width: 480px) {
  .scenic-gallery__stage { height: 390px; }
  .scenic-gallery__toolbar { grid-template-columns: 44px auto minmax(0, 1fr) 44px; }
  .scenic-gallery__dots { overflow: hidden; }
  .scenic-lightbox { grid-template-columns: 46px minmax(0, 1fr) 46px; padding-inline: 4px; }
}

@media (prefers-reduced-motion: reduce) {
  .scenic-gallery__dots button { transition: none; }
}
</style>
