<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { Aperture, Camera, CheckCircle2, CircleAlert, Expand, Palette, Users, X } from '@lucide/vue'
import type { OutfitAdvice } from '@/types/content'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{
  chapter: string
  title: string
  intro: string
  image: string
  imageAlt: string
  vantage: string
  lens: string
  poses: readonly string[]
  groupComposition: string
  commonMistakes: readonly string[]
  outfit: OutfitAdvice
}>()

const colorMap: Record<string, string> = {
  米白: '#f5efe4', 奶油白: '#f7f0dc', 宝蓝: '#245c91', 牛仔蓝: '#4d6f8e',
  海军蓝: '#203a57', 深蓝: '#273e56', 墨蓝: '#24384d', 雾蓝: '#9ab0bf',
  酒红: '#94433f', 砖红: '#a44b3c', 藏红: '#8f3e39', 暗红: '#6f3432',
  驼色: '#aa8661', 深棕: '#5b4036', 湖水青: '#2f8682', 橙色: '#d9753c', 日落橙: '#db7240', 沙丘金: '#c89a52',
}

const previewOpen = ref(false)
const previewTrigger = ref<HTMLButtonElement | null>(null)
const previewClose = ref<HTMLButtonElement | null>(null)
let previousBodyOverflow = ''

async function openPreview(): Promise<void> {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  previewOpen.value = true
  await nextTick()
  previewClose.value?.focus()
}

async function closePreview(): Promise<void> {
  previewOpen.value = false
  document.body.style.overflow = previousBodyOverflow
  await nextTick()
  previewTrigger.value?.focus()
}

onBeforeUnmount(() => {
  if (previewOpen.value) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <article class="photo-spread" data-photo-spread>
    <div class="photo-spread__visual">
      <figure>
        <button
          ref="previewTrigger"
          type="button"
          class="photo-spread__image-button"
          data-photo-preview-trigger
          :aria-label="`查看完整图片：${props.imageAlt}`"
          @click="openPreview"
        >
          <img :src="publicAssetUrl(props.image)" :alt="props.imageAlt" loading="lazy" decoding="async" />
          <span><Expand :size="18" />查看完整图</span>
        </button>
      </figure>
      <div class="photo-spread__pose-strip" aria-label="三个单人动作">
        <div v-for="(pose, index) in props.poses.slice(0, 3)" :key="pose" data-pose-card>
          <span>{{ index + 1 }}</span>
          <p>{{ pose }}</p>
        </div>
      </div>
    </div>

    <div class="photo-spread__content">
      <p class="photo-spread__chapter">{{ props.chapter }}</p>
      <h3>{{ props.title }}</h3>
      <p class="photo-spread__intro">{{ props.intro }}</p>

      <div class="photo-spread__cards">
        <section>
          <Aperture :size="22" :stroke-width="1.6" />
          <div><h4>推荐机位</h4><p>{{ props.vantage }}</p></div>
        </section>
        <section>
          <Camera :size="22" :stroke-width="1.6" />
          <div><h4>镜头倍率</h4><p>{{ props.lens }}</p></div>
        </section>
        <section>
          <Users :size="22" :stroke-width="1.6" />
          <div><h4>六人构图</h4><p>{{ props.groupComposition }}</p></div>
        </section>
        <section>
          <Palette :size="22" :stroke-width="1.6" />
          <div>
            <h4>{{ props.outfit.mainColors.join(' · ') }} · {{ props.outfit.accentColor }}</h4>
            <div class="photo-spread__swatches" aria-hidden="true">
              <i v-for="color in [...props.outfit.mainColors, props.outfit.accentColor]" :key="color" :style="{ background: colorMap[color] ?? '#b18a70' }" />
            </div>
            <p>{{ props.outfit.note }}</p>
          </div>
        </section>
      </div>

      <div class="photo-spread__tips">
        <CircleAlert :size="20" :stroke-width="1.6" />
        <div>
          <strong>画面校对</strong>
          <span v-for="mistake in props.commonMistakes" :key="mistake"><CheckCircle2 :size="16" />{{ mistake }}</span>
        </div>
      </div>
    </div>
  </article>

  <Teleport to="body">
    <div
      v-if="previewOpen"
      class="photo-preview"
      data-photo-preview-dialog
      role="dialog"
      aria-modal="true"
      :aria-label="`${props.imageAlt}完整图片`"
      @click.self="closePreview"
      @keydown.esc.prevent="closePreview"
    >
      <button ref="previewClose" type="button" class="photo-preview__close" aria-label="关闭完整图片" @click="closePreview">
        <X :size="26" />
      </button>
      <img class="photo-preview__image" :src="publicAssetUrl(props.image)" :alt="props.imageAlt" loading="eager" decoding="async" />
      <p>{{ props.imageAlt }}</p>
    </div>
  </Teleport>
</template>

<style scoped>
.photo-spread { display: grid; min-width: 0; gap: 24px; padding: 18px; border: 1px solid var(--line); border-radius: 30px; background: rgb(255 255 255 / 34%); }
.photo-spread__visual { min-width: 0; padding: 10px; border: 1px solid color-mix(in srgb, var(--lake) 24%, var(--line)); border-radius: 24px; background: color-mix(in srgb, var(--paper) 88%, var(--sky)); }
.photo-spread figure { margin: 0; overflow: hidden; border-radius: 18px; background: #ddd4c5; }
.photo-spread__image-button { position: relative; display: block; width: 100%; padding: 0; overflow: hidden; border: 0; color: #fff; background: #ddd4c5; cursor: zoom-in; }
.photo-spread__image-button img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; transition: transform 260ms ease; }
.photo-spread__image-button:hover img { transform: scale(1.018); }
.photo-spread__image-button span { position: absolute; right: 12px; bottom: 12px; display: inline-flex; min-height: 42px; align-items: center; gap: 6px; padding: 0 13px; border-radius: 999px; background: rgb(34 29 26 / 76%); font-size: .75rem; font-weight: 700; backdrop-filter: blur(8px); }
.photo-spread__pose-strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
.photo-spread__pose-strip div { min-width: 0; padding: 11px; border: 1px solid var(--line); border-radius: 13px; background: rgb(255 255 255 / 58%); }
.photo-spread__pose-strip span { display: grid; width: 24px; height: 24px; place-items: center; margin-bottom: 7px; border-radius: 50%; color: #fff; background: var(--lake); font: 700 .72rem/1 var(--serif); }
.photo-spread__pose-strip p { margin: 0; color: var(--muted); font-size: .76rem; line-height: 1.5; }
.photo-spread__content { min-width: 0; align-self: center; }
.photo-spread__chapter { display: inline-flex; margin-bottom: 14px; padding: 7px 13px; border-radius: 999px; color: #fff; background: var(--sunset); font-size: .74rem; font-weight: 700; letter-spacing: .08em; }
.photo-spread h3 { margin-bottom: 12px; font-size: clamp(2rem, 4.4vw, 4rem); }
.photo-spread__intro { color: var(--muted); }
.photo-spread__cards { display: grid; gap: 12px; margin-top: 22px; }
.photo-spread__cards section { display: flex; min-width: 0; gap: 12px; padding: 18px; border: 1px solid var(--line); border-radius: 17px; background: rgb(255 255 255 / 52%); }
.photo-spread__cards section > div { min-width: 0; }
.photo-spread__cards section > svg { flex: 0 0 auto; color: var(--sunset); }
.photo-spread h4 { margin: 0 0 6px; font-family: var(--serif); font-size: 1rem; }
.photo-spread__cards p { margin: 0; color: var(--muted); font-size: .83rem; line-height: 1.65; }
.photo-spread__swatches { display: flex; flex-wrap: wrap; gap: 7px; margin: 10px 0; }
.photo-spread__swatches i { width: 44px; height: 20px; border: 1px solid rgb(53 42 36 / 12%); border-radius: 7px; }
.photo-spread__tips { display: flex; gap: 12px; margin-top: 12px; padding: 16px 18px; border: 1px solid color-mix(in srgb, var(--sunset) 26%, var(--line)); border-radius: 17px; background: color-mix(in srgb, var(--paper) 88%, var(--sunset)); }
.photo-spread__tips > svg { flex: 0 0 auto; color: var(--sunset); }
.photo-spread__tips strong { display: block; margin-bottom: 7px; }
.photo-spread__tips span { display: flex; align-items: flex-start; gap: 7px; color: var(--muted); font-size: .8rem; }
.photo-spread__tips span + span { margin-top: 5px; }
.photo-spread__tips span svg { flex: 0 0 auto; margin-top: 4px; color: var(--lake); }

.photo-preview { position: fixed; z-index: 1400; inset: 0; display: grid; place-items: center; padding: 72px 24px 54px; color: #fff; background: rgb(18 16 15 / 94%); backdrop-filter: blur(12px); }
.photo-preview__image { width: auto; max-width: min(94vw, 1600px); height: auto; max-height: calc(100dvh - 142px); object-fit: contain; filter: drop-shadow(0 20px 50px rgb(0 0 0 / 34%)); }
.photo-preview__close { position: absolute; top: 16px; right: 16px; display: grid; width: 50px; height: 50px; place-items: center; border: 1px solid rgb(255 255 255 / 24%); border-radius: 50%; color: #fff; background: rgb(0 0 0 / 30%); cursor: pointer; }
.photo-preview > p { position: absolute; right: 72px; bottom: 18px; left: 72px; margin: 0; overflow: hidden; color: rgb(255 255 255 / 78%); font-size: .78rem; text-align: center; text-overflow: ellipsis; white-space: nowrap; }

@media (min-width: 760px) {
  .photo-spread { grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr); gap: 28px; padding: 24px; }
  .photo-spread__cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1200px) {
  .photo-spread { grid-template-columns: minmax(0, 52fr) minmax(0, 48fr); gap: 38px; padding: 30px; }
}

@media (min-width: 760px) and (max-width: 1199px) {
  .photo-spread__cards { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .photo-spread { padding: 12px; border-radius: 22px; }
  .photo-spread__visual { padding: 8px; border-radius: 18px; }
  .photo-spread__pose-strip { grid-template-columns: 1fr; }
  .photo-spread__pose-strip div { display: grid; grid-template-columns: 24px 1fr; align-items: center; gap: 9px; }
  .photo-spread__pose-strip span { margin: 0; }
  .photo-preview { padding: 64px 10px 48px; }
  .photo-preview__image { max-width: 96vw; max-height: calc(100dvh - 122px); }
  .photo-preview > p { right: 54px; left: 54px; }
}

@media (prefers-reduced-motion: reduce) {
  .photo-spread__image-button img { transition: none; }
}
</style>
