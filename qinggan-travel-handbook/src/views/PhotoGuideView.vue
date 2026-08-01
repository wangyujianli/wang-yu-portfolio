<script setup lang="ts">
import { Camera } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import PhotoAdviceSpread from '@/components/photo/PhotoAdviceSpread.vue'
import { photoGuides, photoMinimumFormula, photoPlaceExamples } from '@/data/photoGuides'
import { publicAssetUrl } from '@/lib/publicAssets'
</script>

<template>
  <main class="photo-guide page-shell">
    <section class="photo-hero magazine-grid">
      <div class="photo-hero__copy">
        <SectionHeading eyebrow="SIX PEOPLE · ONE FRAME" title="拍照宝典" intro="动作不需要夸张，六个人也不必穿成同款。把机位、颜色和站位提前想明白，现场就能把更多注意力留给风景。" />
        <p class="photo-guide__notice">动作与机位均为构图示意，实际拍摄以现场条件为准。</p>
      </div>
      <figure class="photo-hero__cover">
        <img :src="publicAssetUrl('/images/photo-guide/cover.png')" alt="青甘大环线拍照姿势图包封面" />
      </figure>
    </section>

    <section class="minimum-formula paper-card magazine-grid">
      <div class="minimum-formula__copy">
        <p class="eyebrow"><Camera :size="17" />六人素材最小公式</p>
        <h2>每处风景，带回三样就够了</h2>
        <ol>
          <li v-for="(item, index) in photoMinimumFormula" :key="item"><span>{{ index + 1 }}</span>{{ item }}</li>
        </ol>
        <p>这三样能在回看时组成一个完整段落：有环境、有行走，也有六个人都在场的证据。</p>
      </div>
      <figure><img :src="publicAssetUrl('/images/photo-guide/six-person.png')" alt="六人合影通用构图示意" /></figure>
    </section>

    <section class="scene-guides">
      <header><p class="eyebrow">8 SCENE NOTES</p><h2>八种风景，八套画面语言</h2></header>
      <PhotoAdviceSpread
        v-for="(guide, index) in photoGuides"
        :key="guide.id"
        :chapter="`${String(index + 1).padStart(2, '0')} · ${guide.name}`"
        :title="guide.kicker"
        :intro="`${guide.name}有自己的空间尺度，先确定机位与人物关系，再选择动作。`"
        :image="guide.overviewImage"
        :image-alt="`${guide.name}拍照构图总览`"
        :vantage="guide.vantage"
        :lens="guide.lens"
        :poses="guide.soloPoses"
        :group-composition="guide.groupComposition"
        :common-mistakes="guide.commonMistakes"
        :outfit="guide.outfit"
      />
    </section>

    <section class="place-examples">
      <header><p class="eyebrow">LOCATION POSE CARDS</p><h2>十二处地点，动作尽量不重复</h2><p>这些图保留为最直观的动作参考；镜头倍率与穿衣颜色由手册正文补齐。</p></header>
      <div class="place-examples__grid">
        <article v-for="example in photoPlaceExamples" :key="example.name">
          <img :src="publicAssetUrl(example.image)" :alt="`${example.name}拍照动作示意`" loading="lazy" />
          <div><h3>{{ example.name }}</h3><p>{{ example.note }}</p><small>{{ example.colors }}</small></div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.photo-hero { align-items: center; }
.photo-hero__copy { grid-column: 1 / -1; }
.photo-hero__cover { grid-column: 1 / -1; margin: 0; overflow: hidden; border-radius: 30px; box-shadow: var(--shadow); }
.photo-hero__cover img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; object-position: center 36%; }
.photo-guide__notice { display: inline-block; padding: 10px 14px; border-left: 3px solid var(--sunset); color: var(--muted); background: rgb(255 255 255 / 34%); font-size: 0.78rem; }

.minimum-formula { margin: 44px 0 68px; padding: 24px; overflow: hidden; }
.minimum-formula__copy { grid-column: 1 / -1; }
.minimum-formula h2, .scene-guides > header h2, .place-examples > header h2 { font-size: clamp(2rem, 5vw, 4rem); }
.minimum-formula ol { display: grid; gap: 10px; margin: 24px 0; padding: 0; list-style: none; }
.minimum-formula li { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.minimum-formula li span { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; color: #fff; background: var(--sunset); font-size: 0.76rem; }
.minimum-formula__copy > p:last-child { color: var(--muted); }
.minimum-formula figure { grid-column: 1 / -1; margin: 0; overflow: hidden; border-radius: 20px; }

.scene-guides > header, .place-examples > header { max-width: 820px; margin-bottom: 30px; }
.scene-guides { display: grid; gap: 34px; }
.scene-guides > header { margin-bottom: 0; }

.place-examples { margin-top: 70px; }
.place-examples > header > p:last-child { color: var(--muted); }
.place-examples__grid { display: grid; gap: 18px; }
.place-examples article { overflow: hidden; border: 1px solid var(--line); border-radius: 22px; background: rgb(255 255 255 / 40%); }
.place-examples article img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.place-examples article div { padding: 18px; }
.place-examples h3 { margin-bottom: 7px; }
.place-examples p { margin-bottom: 8px; color: var(--muted); font-size: 0.85rem; }
.place-examples small { color: var(--sunset); }

@media (min-width: 720px) {
  .photo-hero__copy { grid-column: 1 / span 5; }
  .photo-hero__cover { grid-column: 6 / -1; }
  .photo-hero__cover img { aspect-ratio: 4 / 3; }
  .minimum-formula { padding: 32px; }
  .minimum-formula__copy { grid-column: 1 / span 5; align-self: center; }
  .minimum-formula figure { grid-column: 6 / -1; }
  .place-examples__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}

@media (min-width: 1160px) {
  .place-examples__grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
