<script setup lang="ts">
import { Camera, ChevronDown, Focus, Shirt, Users } from '@lucide/vue'
import type { Place, PlaceModuleLevel } from '@/types/content'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = defineProps<{ place: Place; level: Exclude<PlaceModuleLevel, 'hidden'> }>()

const visibleCheckpoints = () => props.level === 'compact'
  ? (props.place.photoCheckpoints ?? []).slice(0, 2)
  : props.place.photoCheckpoints ?? []
</script>

<template>
  <section class="checkpoints editorial-module" data-module="photography" :data-module-level="level">
    <header class="checkpoints__header">
      <div>
        <p class="eyebrow"><Camera :size="17" />PHOTO CHECKPOINTS · 现场画面</p>
        <h2>旅拍打卡点</h2>
      </div>
      <p>推荐的是画面关系，不是要求站在危险位置复刻同一张照片。</p>
    </header>

    <div class="checkpoints__grid">
      <article
        v-for="(checkpoint, index) in visibleCheckpoints()"
        :key="checkpoint.id"
        :class="{ 'checkpoints__card--hero': index === 0 && level === 'primary' }"
        data-photo-checkpoint
      >
        <figure v-if="checkpoint.imageReferences[0]">
          <img :src="publicAssetUrl(checkpoint.imageReferences[0].src)" :alt="checkpoint.imageReferences[0].alt" loading="lazy" decoding="async" />
          <figcaption>{{ checkpoint.sceneType }} · {{ checkpoint.bestLight }}</figcaption>
        </figure>
        <div v-else class="checkpoints__placeholder" aria-hidden="true"><Focus :size="34" :stroke-width="1.25" /><span>现场构图参考</span></div>
        <div class="checkpoints__copy">
          <span>{{ checkpoint.sceneType }}</span>
          <h3>{{ checkpoint.name }}</h3>
          <p class="checkpoints__location">{{ checkpoint.locationDescription }}</p>
          <p>{{ checkpoint.whyItWorks }}</p>
          <dl>
            <div><dt>光线</dt><dd>{{ checkpoint.bestLight }}</dd></div>
            <div><dt>镜头</dt><dd>{{ checkpoint.recommendedLens }}</dd></div>
          </dl>
          <div class="checkpoints__poses"><strong><Camera :size="15" />动作</strong><span>{{ checkpoint.poseIdeas.join(' · ') }}</span></div>
          <div v-if="checkpoint.groupPose" class="checkpoints__poses"><strong><Users :size="15" />六人</strong><span>{{ checkpoint.groupPose }}</span></div>
          <div v-if="checkpoint.clothingColors?.length" class="checkpoints__colors"><strong><Shirt :size="15" />穿搭</strong><span v-for="color in checkpoint.clothingColors" :key="color">{{ color }}</span></div>
          <ul><li v-for="boundary in checkpoint.safetyBoundary" :key="boundary">{{ boundary }}</li></ul>
          <small v-if="checkpoint.accessNote">{{ checkpoint.accessNote }}</small>
        </div>
      </article>
    </div>

    <details v-if="level === 'compact' && (place.photoCheckpoints?.length ?? 0) > 2" data-compact-expand>
      <summary>展开其余拍摄建议 <ChevronDown :size="17" /></summary>
      <article v-for="checkpoint in place.photoCheckpoints?.slice(2)" :key="checkpoint.id">
        <strong>{{ checkpoint.name }}</strong><span>{{ checkpoint.locationDescription }} · {{ checkpoint.recommendedLens }}</span>
      </article>
    </details>
  </section>
</template>

<style scoped>
.checkpoints { padding: clamp(24px, 4vw, 38px) !important; border: 1px solid var(--line) !important; border-radius: 30px; background: linear-gradient(140deg, rgb(59 130 160 / 9%), rgb(255 255 255 / 42%)); }
.checkpoints__header { display: grid; gap: 12px; margin-bottom: 22px; }
.checkpoints__header .eyebrow { display: flex; align-items: center; gap: 7px; }
.checkpoints__header h2 { margin: 7px 0 0; }
.checkpoints__header > p { max-width: 560px; margin: 0; color: var(--muted); }
.checkpoints__grid { display: grid; gap: 16px; }
.checkpoints__grid > article { min-width: 0; overflow: hidden; border: 1px solid rgb(59 130 160 / 18%); border-radius: 22px; background: rgb(255 255 255 / 38%); }
.checkpoints figure { position: relative; aspect-ratio: 16 / 10; margin: 0; overflow: hidden; background: #d8cdbb; }
.checkpoints figure img { width: 100%; height: 100%; object-fit: cover; }
.checkpoints figcaption { position: absolute; right: 10px; bottom: 10px; padding: 5px 9px; border-radius: 999px; color: #fff; background: rgb(27 38 42 / 64%); font-size: .68rem; }
.checkpoints__placeholder { display: grid; aspect-ratio: 16 / 10; place-items: center; align-content: center; gap: 8px; color: var(--lake); background: repeating-linear-gradient(-45deg, rgb(59 130 160 / 6%) 0 10px, transparent 10px 20px); }
.checkpoints__placeholder span { font-size: .72rem; letter-spacing: .08em; }
.checkpoints__copy { padding: 20px; }
.checkpoints__copy > span { color: var(--sunset); font-size: .7rem; font-weight: 700; letter-spacing: .08em; }
.checkpoints__copy h3 { margin: 7px 0 8px; font-size: 1.38rem; }
.checkpoints__copy > p { color: var(--muted); }
.checkpoints__location { color: var(--ink) !important; font-weight: 700; }
.checkpoints__copy dl { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0; }
.checkpoints__copy dl div { display: grid; gap: 2px; padding: 10px; border-radius: 12px; background: rgb(59 130 160 / 7%); }
.checkpoints__copy dt { color: var(--lake); font-size: .7rem; }
.checkpoints__copy dd { margin: 0; font-size: .82rem; }
.checkpoints__poses { display: grid; gap: 4px; margin-top: 9px; }
.checkpoints__poses strong,
.checkpoints__colors strong { display: inline-flex; align-items: center; gap: 5px; color: var(--sunset); font-size: .72rem; }
.checkpoints__poses span { color: var(--muted); font-size: .83rem; }
.checkpoints__colors { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; margin-top: 12px; }
.checkpoints__colors span { padding: 4px 8px; border-radius: 999px; background: rgb(216 155 53 / 12%); font-size: .72rem; }
.checkpoints__copy ul { margin: 16px 0 0; padding: 13px 13px 13px 30px; border-radius: 13px; color: var(--ink); background: rgb(169 68 58 / 7%); font-size: .8rem; }
.checkpoints__copy small { display: block; margin-top: 12px; color: var(--muted); }
.checkpoints details { margin-top: 16px; }
.checkpoints summary { display: flex; min-height: 44px; align-items: center; justify-content: space-between; padding: 0 14px; border: 1px solid var(--line); border-radius: 13px; cursor: pointer; }
.checkpoints details > article { display: grid; gap: 4px; padding: 12px 14px; }
.checkpoints details > article span { color: var(--muted); font-size: .82rem; }
.checkpoints[data-module-level='primary'] h2 { font-size: clamp(2.7rem, 6vw, 5rem); }

@media (min-width: 720px) {
  .checkpoints__header { grid-template-columns: minmax(0, 1fr) minmax(260px, .6fr); align-items: end; }
  .checkpoints__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .checkpoints[data-module-level='primary'] .checkpoints__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .checkpoints[data-module-level='primary'] .checkpoints__card--hero { grid-column: span 2; display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(280px, .88fr); }
  .checkpoints[data-module-level='primary'] .checkpoints__card--hero figure,
  .checkpoints[data-module-level='primary'] .checkpoints__card--hero .checkpoints__placeholder { aspect-ratio: auto; min-height: 100%; }
}
</style>
