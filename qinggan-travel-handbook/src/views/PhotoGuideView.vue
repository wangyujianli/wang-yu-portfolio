<script setup lang="ts">
import { Aperture, Camera, Check, Palette, Users } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { photoGuides, photoMinimumFormula, photoPlaceExamples } from '@/data/photoGuides'
</script>

<template>
  <main class="photo-guide page-shell">
    <section class="photo-hero magazine-grid">
      <div class="photo-hero__copy">
        <SectionHeading eyebrow="SIX PEOPLE · ONE FRAME" title="拍照宝典" intro="动作不需要夸张，六个人也不必穿成同款。把机位、颜色和站位提前想明白，现场就能把更多注意力留给风景。" />
        <p class="photo-guide__notice">动作与机位均为构图示意，实际拍摄以现场条件为准。</p>
      </div>
      <figure class="photo-hero__cover">
        <img src="/images/photo-guide/cover.png" alt="青甘大环线拍照姿势图包封面" />
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
      <figure><img src="/images/photo-guide/six-person.png" alt="六人合影通用构图示意" /></figure>
    </section>

    <section class="scene-guides">
      <header><p class="eyebrow">8 SCENE NOTES</p><h2>八种风景，八套画面语言</h2></header>
      <article v-for="(guide, index) in photoGuides" :key="guide.id" class="scene-guide" :class="{ 'scene-guide--reverse': index % 2 === 1 }">
        <figure><img :src="guide.overviewImage" :alt="`${guide.name}拍照构图总览`" loading="lazy" /></figure>
        <div class="scene-guide__body">
          <p class="eyebrow">{{ String(index + 1).padStart(2, '0') }} · {{ guide.name }}</p>
          <h3>{{ guide.kicker }}</h3>
          <div class="scene-guide__facts">
            <p><Aperture :size="18" /><span><b>推荐机位</b>{{ guide.vantage }}</span></p>
            <p><Camera :size="18" /><span><b>镜头倍率</b>{{ guide.lens }}</span></p>
          </div>
          <div class="scene-guide__poses">
            <span v-for="pose in guide.soloPoses" :key="pose"><Check :size="16" />{{ pose }}</span>
          </div>
          <div class="scene-guide__group"><Users :size="21" /><p><b>六人构图</b>{{ guide.groupComposition }}</p></div>
          <div class="scene-guide__outfit">
            <Palette :size="20" />
            <p><b>{{ guide.outfit.mainColors.join(' · ') }}，点缀 {{ guide.outfit.accentColor }}</b>{{ guide.outfit.note }}</p>
          </div>
          <details>
            <summary>画面校对</summary>
            <ul><li v-for="item in guide.commonMistakes" :key="item">{{ item }}</li></ul>
          </details>
        </div>
      </article>
    </section>

    <section class="place-examples">
      <header><p class="eyebrow">LOCATION POSE CARDS</p><h2>十二处地点，动作尽量不重复</h2><p>这些图保留为最直观的动作参考；镜头倍率与穿衣颜色由手册正文补齐。</p></header>
      <div class="place-examples__grid">
        <article v-for="example in photoPlaceExamples" :key="example.name">
          <img :src="example.image" :alt="`${example.name}拍照动作示意`" loading="lazy" />
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
.scene-guide { display: grid; gap: 22px; margin-bottom: 42px; padding-bottom: 42px; border-bottom: 1px solid var(--line); }
.scene-guide figure { margin: 0; overflow: hidden; border-radius: 26px; background: #ded5c6; }
.scene-guide figure img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.scene-guide__body { align-self: center; }
.scene-guide h3 { font-size: clamp(2rem, 4vw, 3.2rem); }
.scene-guide__facts { display: grid; gap: 12px; margin: 20px 0; }
.scene-guide__facts > p, .scene-guide__group, .scene-guide__outfit { display: flex; align-items: flex-start; gap: 10px; }
.scene-guide__facts p { margin: 0; color: var(--muted); }
.scene-guide__facts b, .scene-guide__group b, .scene-guide__outfit b { display: block; margin-bottom: 4px; color: var(--ink); }
.scene-guide__poses { display: grid; gap: 8px; }
.scene-guide__poses span { display: flex; align-items: start; gap: 8px; padding: 10px 12px; border-radius: 12px; background: rgb(255 255 255 / 36%); font-size: 0.84rem; }
.scene-guide__group, .scene-guide__outfit { margin-top: 14px; padding: 16px; border-radius: 16px; background: rgb(45 127 123 / 9%); }
.scene-guide__outfit { background: rgb(217 109 59 / 9%); }
.scene-guide__group p, .scene-guide__outfit p { margin: 0; color: var(--muted); }
.scene-guide details { margin-top: 14px; padding: 12px 15px; border-top: 1px solid var(--line); color: var(--muted); }
.scene-guide summary { min-height: 38px; cursor: pointer; color: var(--ink); font-weight: 700; }

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
  .scene-guide { grid-template-columns: 1.1fr 0.9fr; gap: 38px; }
  .scene-guide--reverse figure { grid-column: 2; }
  .scene-guide--reverse .scene-guide__body { grid-column: 1; grid-row: 1; }
  .scene-guide__poses { grid-template-columns: repeat(3, 1fr); }
  .place-examples__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}

@media (min-width: 1160px) {
  .place-examples__grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
