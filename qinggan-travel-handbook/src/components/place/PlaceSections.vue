<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, CalendarDays, CircleAlert, CloudSun, Compass, Sparkles } from '@lucide/vue'
import type { Place, PlaceModule, PlaceModuleLevel } from '@/types/content'
import PhotoAdviceSpread from '@/components/photo/PhotoAdviceSpread.vue'
import TicketBookingSection from '@/components/place/TicketBookingSection.vue'
import LocalFoodSection from '@/components/place/LocalFoodSection.vue'
import SouvenirSection from '@/components/place/SouvenirSection.vue'
import PhotoCheckpointsSection from '@/components/place/PhotoCheckpointsSection.vue'
import { moduleLevelFor } from '@/data/placeContentPriorities'
import { scenicImagesFor } from '@/data/scenicImages'
import { nearbyExplorationById } from '@/data/nearbyExplorations'

const props = defineProps<{ place: Place }>()

const photoFallbacks: Record<Place['category'], string> = {
  '文化遗址': '/images/photo-guide/overview-culture.png',
  '湖泊盐湖': '/images/photo-guide/overview-lake.png',
  '草原雪山': '/images/photo-guide/overview-landform.png',
  '沙漠雅丹': '/images/photo-guide/overview-desert.png',
  '公路风景': '/images/photo-guide/overview-landform.png',
  '沿途彩蛋': '/images/photo-guide/overview-desert.png',
}

const scenic = computed(() => scenicImagesFor(props.place.id))
const photoImage = computed(() => scenic.value[0]?.regular ?? photoFallbacks[props.place.category])
const photoAlt = computed(() => scenic.value[0]?.alt ?? `${props.place.name}拍照构图示意`)
const nearbyOptions = computed(() => props.place.nearbyExplorationIds
  .map((id) => nearbyExplorationById.get(id))
  .filter((item) => item !== undefined))

const narrativeModule = computed<PlaceModule>(() => props.place.contentPriority.primaryModules.find((module) =>
  ['culture', 'landscape', 'geology', 'ecology', 'road', 'health'].includes(module),
) ?? props.place.contentPriority.primaryModules[0] ?? 'landscape')

const moduleLevel = (module: PlaceModule): PlaceModuleLevel => moduleLevelFor(props.place.contentPriority, module)
const shouldShow = (module: PlaceModule): boolean => moduleLevel(module) !== 'hidden'
const visibleLevel = (module: PlaceModule): Exclude<PlaceModuleLevel, 'hidden'> => {
  const level = moduleLevel(module)
  return level === 'hidden' ? 'secondary' : level
}
const moduleOrder = (module: PlaceModule, offset = 0): number => {
  const config = props.place.contentPriority
  const primaryIndex = config.primaryModules.indexOf(module)
  if (primaryIndex >= 0) return 10 + primaryIndex * 10 + offset
  const secondaryIndex = config.secondaryModules.indexOf(module)
  if (secondaryIndex >= 0) return 100 + secondaryIndex * 10 + offset
  const compactIndex = config.compactModules.indexOf(module)
  if (compactIndex >= 0) return 200 + compactIndex * 10 + offset
  return 300 + offset
}
</script>

<template>
  <div class="place-sections">
    <section :data-module="narrativeModule" :data-module-level="moduleLevel(narrativeModule)" :style="{ order: moduleOrder(narrativeModule) }">
      <p class="eyebrow"><Compass :size="16" />常规玩法</p>
      <h2>先看懂，再慢慢玩</h2>
      <ul><li v-for="item in place.conventionalPlay" :key="item">{{ item }}</li></ul>
    </section>

    <section class="place-sections__tint" :data-module="narrativeModule" :data-module-level="moduleLevel(narrativeModule)" :style="{ order: moduleOrder(narrativeModule, 1) }">
      <p class="eyebrow"><Sparkles :size="16" />换个角度</p>
      <h2>不赶路的另一种打开方式</h2>
      <ul><li v-for="item in place.unconventionalPlay" :key="item">{{ item }}</li></ul>
    </section>

    <section v-if="shouldShow('activities')" class="season-weather" data-module="activities" :data-module-level="moduleLevel('activities')" :style="{ order: moduleOrder('activities') }">
      <div>
        <p class="eyebrow"><CalendarDays :size="16" />季节与现场活动</p>
        <article v-for="activity in place.seasonalActivities" :key="activity.title">
          <h3>{{ activity.title }}</h3>
          <strong>{{ activity.season }}</strong>
          <p>{{ activity.note }}</p>
        </article>
      </div>
    </section>

    <section v-if="shouldShow('weather')" class="season-weather" data-module="weather" :data-module-level="moduleLevel('weather')" :style="{ order: moduleOrder('weather') }">
      <div>
        <p class="eyebrow"><CloudSun :size="16" />天气换一种看法</p>
        <dl>
          <div><dt>遇雨</dt><dd>{{ place.weatherAlternatives.rain }}</dd></div>
          <div><dt>风大</dt><dd>{{ place.weatherAlternatives.wind }}</dd></div>
          <div v-if="place.weatherAlternatives.heat"><dt>日照强</dt><dd>{{ place.weatherAlternatives.heat }}</dd></div>
        </dl>
      </div>
    </section>

    <PhotoCheckpointsSection
      v-if="place.photoCheckpoints?.length && shouldShow('photography')"
      :place="place"
      :level="visibleLevel('photography')"
      :style="{ order: moduleOrder('photography') }"
    />

    <section v-if="shouldShow('photography')" class="photo-section" data-module="photography" :data-module-level="moduleLevel('photography')" :style="{ order: moduleOrder('photography', 1) }">
      <PhotoAdviceSpread
        chapter="拍照建议 · PHOTO NOTES"
        :title="`${place.name}，把人和风景都放舒服`"
        :intro="place.photoGuide.join('；')"
        :image="photoImage"
        :image-alt="photoAlt"
        :vantage="place.photoGuide[0] ?? '先找主景和人物都舒展的位置。'"
        :lens="place.photoGuide[1] ?? '1×保留环境，2×整理远景层次。'"
        :poses="place.soloPoses"
        :group-composition="place.groupComposition"
        :common-mistakes="['人物挡住主景最有辨识度的轮廓', '六人站成一条直线，画面缺少前后层次']"
        :outfit="place.outfitAdvice"
      />
    </section>

    <TicketBookingSection
      v-if="shouldShow('booking')"
      :place="place"
      data-module="booking"
      :data-module-level="moduleLevel('booking')"
      :style="{ order: moduleOrder('booking') }"
    />

    <LocalFoodSection
      v-if="place.localFood && shouldShow('food')"
      :place="place"
      :level="visibleLevel('food')"
      :style="{ order: moduleOrder('food') }"
    />

    <SouvenirSection
      v-if="place.souvenirs && shouldShow('souvenir')"
      :place="place"
      :level="visibleLevel('souvenir')"
      :style="{ order: moduleOrder('souvenir') }"
    />

    <section v-if="shouldShow('safety')" class="details-grid" data-module="safety" :data-module-level="moduleLevel('safety')" :style="{ order: moduleOrder('safety') }">
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

    <section v-if="nearbyOptions.length" class="nearby-preview" style="order: 410">
      <div>
        <p class="eyebrow">顺势多看一点</p>
        <h2>附近还有这些选择</h2>
      </div>
      <div class="nearby-preview__items">
        <article v-for="item in nearbyOptions" :key="item.id">
          <strong>{{ item.name }}</strong>
          <p>{{ item.reason }}</p>
          <small>{{ item.extraTime }} · {{ item.detourNote }}</small>
        </article>
      </div>
      <RouterLink to="/nearby" class="nearby-preview__link">查看完整周边可玩清单<ArrowUpRight :size="18" /></RouterLink>
    </section>

    <section v-if="place.viralStories.length" class="story-notes" style="order: 420">
      <div>
        <p class="eyebrow">沿途话题</p>
        <h2>视频里见过，现场这样看</h2>
      </div>
      <article v-for="story in place.viralStories" :key="story.title">
        <header><span :data-confidence="story.confidence">{{ story.confidence }}</span><h3>{{ story.title }}</h3></header>
        <p>{{ story.context }}</p>
        <dl>
          <div><dt>信息线索</dt><dd>{{ story.sourceLabel }}</dd></div>
          <div><dt>是否适合照着体验</dt><dd>{{ story.imitable }}</dd></div>
        </dl>
        <small>{{ story.note }}</small>
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

.place-sections__tint {
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

.detail-panel p {
  margin: 0;
  color: var(--muted);
}

.photo-section { margin-inline: min(0px, 0px); }
.photo-section :deep(.photo-spread) { margin-inline: 0; }

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

.place-sections > [data-module-level='primary'] { position: relative; }
.place-sections > [data-module-level='primary']::before {
  position: absolute;
  top: 16px;
  right: 18px;
  color: rgb(45 127 123 / 42%);
  font: 700 .66rem/1 var(--serif);
  letter-spacing: .12em;
  content: 'THIS PLACE · 重点';
}
.place-sections > [data-module-level='compact'] { padding-block: 20px; }
.place-sections > [data-module-level='compact'] h2 { font-size: clamp(1.55rem, 2.5vw, 2.2rem); }
.details-grid[data-module-level='primary'] { padding: 24px !important; border: 1px solid rgb(169 68 58 / 24%) !important; border-radius: 24px; background: rgb(169 68 58 / 5%); }

.detail-panel__dynamic { margin-top: 12px !important; padding-top: 12px; border-top: 1px dashed var(--line); }
.detail-panel small { display: block; margin-top: 10px; color: var(--muted); }

.season-weather {
  display: grid;
  gap: 24px;
  padding: 26px !important;
  border: 1px solid var(--line) !important;
  border-radius: 24px;
  background: linear-gradient(135deg, rgb(255 255 255 / 46%), rgb(111 160 164 / 9%));
}

.season-weather article h3 { margin: 0 0 5px; }
.season-weather article strong { color: var(--sunset); font-size: 0.78rem; }
.season-weather article p { margin: 8px 0 0; color: var(--muted); }
.season-weather dl { display: grid; gap: 12px; margin: 0; }
.season-weather dl > div { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 10px; }
.season-weather dt { color: var(--sunset); font-weight: 700; }
.season-weather dd { margin: 0; color: var(--muted); }

.nearby-preview { display: grid; gap: 18px; }
.nearby-preview h2 { margin: 0; }
.nearby-preview__items { display: grid; gap: 12px; }
.nearby-preview__items article { padding: 18px; border-left: 2px solid var(--lake); background: rgb(255 255 255 / 30%); }
.nearby-preview__items p { margin: 7px 0; color: var(--muted); }
.nearby-preview__items small { color: var(--sunset); }
.nearby-preview__link { display: inline-flex; min-height: 44px; align-items: center; gap: 7px; justify-self: start; color: var(--ink); font-weight: 700; text-decoration: none; }

.story-notes { display: grid; gap: 18px; }
.story-notes article { padding: 20px 0 20px 20px; border-left: 1px dashed var(--sunset); }
.story-notes header { display: flex; align-items: center; gap: 10px; }
.story-notes header span { display: grid; width: 32px; height: 32px; flex: 0 0 auto; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--sunset); font-weight: 700; }
.story-notes h3 { margin: 0; }
.story-notes article > p { margin: 12px 0; color: var(--muted); }
.story-notes dl { display: grid; gap: 10px; margin: 0; }
.story-notes dl > div { display: grid; gap: 3px; }
.story-notes dt { color: var(--sunset); font-size: .72rem; }
.story-notes dd { margin: 0; }
.story-notes small { display: block; margin-top: 12px; color: var(--muted); }

@media (min-width: 720px) {
  .details-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .season-weather { grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); }

  .nearby-preview { grid-template-columns: minmax(210px, .6fr) minmax(0, 1.4fr); align-items: start; }
  .nearby-preview__link { grid-column: 2; }

  .story-notes { grid-template-columns: minmax(210px, .6fr) minmax(0, 1.4fr); }
  .story-notes article { grid-column: 2; }
}
</style>
