<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Phone, Ticket } from '@lucide/vue'
import { placeById } from '@/data/places'
import { ticketChecklistGroups } from '@/data/ticketChecklists'
import type { Place } from '@/types/content'

type FilterId = 'all' | 'mandatory' | 'ticket-required' | 'partially-ticketed' | 'boundary' | 'not-required'

const activeFilter = ref<FilterId>('all')
const filters: Array<{ id: FilterId; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'mandatory', label: '必须预约' },
  { id: 'ticket-required', label: '建议提前购票' },
  { id: 'partially-ticketed', label: '部分区域收费' },
  { id: 'boundary', label: '确认开放边界' },
  { id: 'not-required', label: '无需预约' },
]

const matches = (place: Place) => {
  if (activeFilter.value === 'all') return true
  if (activeFilter.value === 'mandatory') return place.ticketBooking.bookingLevel === 'mandatory'
  if (activeFilter.value === 'ticket-required') return place.ticketBooking.ticketStatus === 'ticket-required' && place.ticketBooking.bookingLevel !== 'mandatory'
  if (activeFilter.value === 'partially-ticketed') return place.ticketBooking.ticketStatus === 'partially-ticketed'
  if (activeFilter.value === 'boundary') return place.ticketBooking.ticketStatus === 'access-control' || place.ticketBooking.ticketStatus === 'confirm-before-visit'
  return place.ticketBooking.bookingLevel === 'not-required'
}

const groups = computed(() => ticketChecklistGroups.map((group) => ({
  ...group,
  places: group.placeIds
    .map((id) => placeById.get(id))
    .filter((item): item is Place => Boolean(item))
    .filter((item) => activeFilter.value === 'partially-ticketed' ? group.id === 'partial' && matches(item) : matches(item)),
})).filter((group) => group.places.length))

const primaryChannel = (place: Place) => place.ticketBooking.officialChannels[0]?.value ?? '属地公告或现场游客中心'
const primaryContact = (place: Place) => place.ticketBooking.contacts.find((item) => item.type === 'consultation' || item.type === 'ticket')
</script>

<template>
  <section class="ticket-checklist" data-ticket-checklist>
    <header>
      <p class="eyebrow"><Ticket :size="17" />BOOKING CHECKLIST</p>
      <h2>门票与预约清单</h2>
      <p>只列出需要提前处理的事项，游览顺序仍由旅人自由决定。</p>
    </header>

    <div class="ticket-checklist__filters" aria-label="门票与预约筛选">
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        :data-ticket-filter="filter.id"
        :aria-pressed="activeFilter === filter.id"
        @click="activeFilter = filter.id"
      >{{ filter.label }}</button>
    </div>

    <div class="ticket-checklist__groups">
      <section v-for="group in groups" :key="group.id" data-ticket-group>
        <header><h3>{{ group.title }}</h3><p>{{ group.note }}</p></header>
        <div class="ticket-checklist__rows">
          <article v-for="place in group.places" :key="place.id" data-ticket-row>
            <div class="ticket-checklist__place">
              <strong>{{ place.name }}</strong>
              <span>{{ place.ticketBooking.ticketLabel }}</span>
            </div>
            <div><small>提前时间</small><span>{{ place.ticketBooking.bookingLeadTime }}</span></div>
            <div><small>主要渠道</small><span>{{ primaryChannel(place) }}</span></div>
            <div class="ticket-checklist__contact">
              <template v-if="primaryContact(place)">
                <small>咨询</small>
                <a :href="`tel:${primaryContact(place)?.number}`"><Phone :size="15" />{{ primaryContact(place)?.number }}</a>
              </template>
              <template v-else><small>咨询</small><span>暂无独立电话</span></template>
            </div>
            <RouterLink :to="`/places/${place.slug}#ticket-booking`">查看详情<ArrowUpRight :size="16" /></RouterLink>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.ticket-checklist { margin-top: clamp(40px, 7vw, 76px); }
.ticket-checklist > header { display: grid; max-width: 780px; gap: 4px; }
.ticket-checklist > header h2 { margin: 0; font-size: clamp(2rem, 4vw, 3.4rem); }
.ticket-checklist > header p:last-child { color: var(--muted); }
.ticket-checklist__filters { display: flex; overflow-x: auto; gap: 8px; margin: 22px 0 28px; padding-bottom: 4px; scrollbar-width: none; }
.ticket-checklist__filters::-webkit-scrollbar { display: none; }
.ticket-checklist__filters button { min-height: 44px; flex: 0 0 auto; padding: 0 15px; border: 1px solid var(--line); border-radius: 999px; background: rgb(255 255 255 / 36%); color: var(--ink); font: inherit; cursor: pointer; }
.ticket-checklist__filters button[aria-pressed="true"] { border-color: var(--lake); color: white; background: var(--lake); }
.ticket-checklist__groups { display: grid; gap: 30px; }
.ticket-checklist__groups > section > header { display: grid; grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 0 0 12px; border-bottom: 1px solid var(--line); }
.ticket-checklist__groups h3 { margin: 0; font-size: 1.25rem; }
.ticket-checklist__groups header p { margin: 0; color: var(--muted); }
.ticket-checklist__rows { display: grid; }
.ticket-checklist__rows article { display: grid; gap: 12px; padding: 18px 2px; border-bottom: 1px dashed var(--line); }
.ticket-checklist__place { display: grid; gap: 4px; }
.ticket-checklist__place strong { font-size: 1.08rem; }
.ticket-checklist__place span, .ticket-checklist__rows article > div:not(.ticket-checklist__place) span { color: var(--muted); }
.ticket-checklist__rows small { display: block; margin-bottom: 3px; color: var(--sunset); }
.ticket-checklist__contact a, .ticket-checklist__rows article > a { display: inline-flex; min-height: 44px; align-items: center; gap: 6px; color: var(--ink); font-weight: 700; text-decoration: none; }
.ticket-checklist__rows article > a { justify-self: start; }

@media (min-width: 820px) {
  .ticket-checklist__groups > section > header { grid-template-columns: minmax(220px, .55fr) minmax(0, 1fr); align-items: end; }
  .ticket-checklist__rows article { grid-template-columns: minmax(170px, 1.25fr) minmax(130px, .9fr) minmax(160px, 1fr) minmax(128px, .75fr) auto; align-items: center; gap: 20px; }
  .ticket-checklist__rows article > a { justify-self: end; }
}
</style>
