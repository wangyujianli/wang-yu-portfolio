<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, CalendarClock, Phone } from '@lucide/vue'
import { placeById } from '@/data/places'
import { formalAttractionPlaceIds } from '@/data/ticketChecklists'
import type { OpeningPeriod, Place } from '@/types/content'

const attractions = computed(() => formalAttractionPlaceIds.map((id) => placeById.get(id)).filter((item): item is Place => Boolean(item)))

const periodValue = (place: Place, field: keyof OpeningPeriod) => {
  const periods = place.ticketBooking.operatingHours.periods
  if (!periods.length) return '临行确认'
  return periods.map((period) => `${period.label} ${String(period[field] ?? '待确认')}`).join(' / ')
}

const dateValue = (place: Place) => {
  const periods = place.ticketBooking.operatingHours.periods
  return periods.length ? periods.map((period) => `${period.label}：${period.dateRange ?? '日期待确认'}`).join('；') : '依公告、季节或现场运营调整'
}

const contactFor = (place: Place) => place.ticketBooking.contacts.find((item) => item.type === 'consultation' || item.type === 'ticket')
</script>

<template>
  <section class="hours-checklist" data-opening-hours-checklist>
    <header>
      <p class="eyebrow"><CalendarClock :size="17" />OPENING HOURS</p>
      <h2>开放时间速查</h2>
      <p>已按你们的出行窗口（2026年8月3日至9日）核对。先看最晚还能不能进去，再看闭园时间；没有找到当月官方数字的地点会明确保留“临行确认”。</p>
    </header>

    <div class="hours-checklist__rows">
      <article v-for="place in attractions" :key="place.id">
        <header>
          <div><strong>{{ place.name }}</strong><span v-if="place.ticketBooking.operatingHours.displayStatus !== 'verified'">临行确认</span></div>
          <RouterLink :to="`/places/${place.slug}#ticket-booking`" :aria-label="`查看${place.name}开放详情`"><ArrowUpRight :size="18" /></RouterLink>
        </header>
        <p>{{ place.ticketBooking.operatingHours.summary }}</p>
        <dl>
          <div><dt>开园</dt><dd>{{ periodValue(place, 'openTime') }}</dd></div>
          <div><dt>最晚入园 / 检票</dt><dd>{{ periodValue(place, place.ticketBooking.operatingHours.periods.some((item) => item.lastCheckInTime) ? 'lastCheckInTime' : 'lastEntryTime') }}</dd></div>
          <div><dt>闭园</dt><dd>{{ periodValue(place, 'closeTime') }}</dd></div>
          <div><dt>适用日期</dt><dd>{{ dateValue(place) }}</dd></div>
        </dl>
        <a v-if="contactFor(place)" :href="`tel:${contactFor(place)?.number}`"><Phone :size="16" />{{ contactFor(place)?.number }}</a>
        <span v-else class="hours-checklist__no-phone">暂无经核实的独立景区电话</span>
      </article>
    </div>

    <footer>
      <strong>本页面不是实时营业状态查询。</strong>
      <p>页面只呈现截至2026年8月1日已核实或明确标为待确认的信息。季节、天气、客流、活动和道路情况都可能带来临时变化。</p>
    </footer>
  </section>
</template>

<style scoped>
.hours-checklist { margin-top: clamp(42px, 7vw, 80px); }
.hours-checklist > header { max-width: 800px; }
.hours-checklist > header h2 { margin: 0; font-size: clamp(2rem, 4vw, 3.4rem); }
.hours-checklist > header p:last-child { color: var(--muted); }
.hours-checklist__rows { display: grid; margin-top: 24px; border-top: 1px solid var(--line); }
.hours-checklist__rows > article { display: grid; gap: 12px; padding: 20px 2px; border-bottom: 1px dashed var(--line); }
.hours-checklist__rows article > header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hours-checklist__rows article > header div { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; }
.hours-checklist__rows article > header strong { font-size: 1.08rem; }
.hours-checklist__rows article > header span { padding: 4px 8px; border-radius: 999px; background: rgb(195 121 49 / 11%); color: #8b5c29; font-size: .7rem; font-weight: 700; }
.hours-checklist__rows article > header a { display: grid; width: 44px; height: 44px; flex: 0 0 auto; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--ink); }
.hours-checklist__rows article > p { margin: 0; font-weight: 700; }
.hours-checklist__rows dl { display: grid; gap: 8px; margin: 0; }
.hours-checklist__rows dl > div { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 10px; }
.hours-checklist__rows dt { color: var(--muted); }
.hours-checklist__rows dd { margin: 0; overflow-wrap: anywhere; }
.hours-checklist__rows article > a { display: inline-flex; min-height: 44px; align-items: center; gap: 7px; justify-self: start; color: var(--lake); font-weight: 700; text-decoration: none; }
.hours-checklist__no-phone { color: var(--muted); font-size: .86rem; }
.hours-checklist footer { margin-top: 22px; padding: 20px; border-left: 2px solid var(--sunset); background: rgb(255 255 255 / 30%); }
.hours-checklist footer p { margin: 5px 0 0; color: var(--muted); }

@media (min-width: 780px) {
  .hours-checklist__rows { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 28px; }
}

@media (min-width: 1180px) {
  .hours-checklist__rows { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
