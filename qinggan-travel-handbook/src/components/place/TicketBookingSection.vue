<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CalendarClock,
  ChevronDown,
  Clock3,
  Copy,
  ExternalLink,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
} from '@lucide/vue'
import { copyText } from '@/services/clipboard'
import type { OpeningPeriod, Place, ScenicContact } from '@/types/content'

const props = defineProps<{ place: Place }>()
const expanded = ref(false)
const copyStatus = ref('')

const info = computed(() => props.place.ticketBooking)
const hours = computed(() => info.value.operatingHours)
const primaryContact = computed(() => info.value.contacts.find((item) => item.type === 'consultation' || item.type === 'ticket') ?? info.value.contacts[0])
const sourceLabel = computed(() => ({ A: '官方公开信息', B: '公开平台，建议临行复核', C: '来源待进一步核实' })[info.value.sourceLevel])
const hoursSourceLabel = computed(() => ({ A: '官方公开信息', B: '公开平台，建议临行复核', C: '来源待进一步核实' })[hours.value.sourceLevel])
const openingSummary = computed(() => {
  const first = hours.value.periods[0]
  if (hours.value.periods.length > 1) return hours.value.periods.map((item) => `${item.label}${item.openTime ?? '待确认'}`).join(' / ')
  if (first?.openTime) return `${first.openTime}${first.closeTime ? `—${first.closeTime}` : '起'}`
  return hours.value.mode === 'no-fixed-hours' || hours.value.mode === 'access-controlled' ? '无统一时刻' : '临行确认'
})
const lastEntrySummary = computed(() => {
  if (hours.value.periods.length > 1) return '分淡旺季查看'
  const first = hours.value.periods[0]
  const value = first?.lastCheckInTime ?? first?.lastEntryTime
  return value ? `${value}${first?.lastCheckInTime ? '停止检票' : '最晚入园'}` : '临行确认'
})

const fallbackContacts: ScenicContact[] = [
  { label: '非紧急政务求助', number: '12345', type: 'authority', verified: true, sourceLevel: 'A' },
  { label: '报警', number: '110', type: 'authority', verified: true, sourceLevel: 'A' },
  { label: '医疗急救', number: '120', type: 'authority', verified: true, sourceLevel: 'A' },
  { label: '交通事故报警', number: '122', type: 'authority', verified: true, sourceLevel: 'A' },
]

const copyChannel = async (value: string) => {
  const copied = await copyText(value)
  copyStatus.value = copied ? `已复制：${value}` : '复制未成功，请长按文字复制'
}

const fieldRows = (period: OpeningPeriod) => [
  ['开园时间', period.openTime],
  ['开始售票', period.ticketSalesStartTime],
  ['停止售票', period.lastTicketTime],
  ['停止检票 / 入场', period.lastCheckInTime],
  ['最晚入园', period.lastEntryTime],
  ['闭园', period.closeTime],
].filter((row): row is [string, string] => Boolean(row[1]))
</script>

<template>
  <section id="ticket-booking" class="ticket-booking" data-ticket-booking>
    <header class="ticket-booking__header">
      <div>
        <p class="eyebrow"><Ticket :size="17" />TRIP DESK</p>
        <h2>开放 · 门票 · 预约 · 联系</h2>
      </div>
      <span class="ticket-booking__badge" :data-level="info.bookingLevel">{{ info.bookingLabel }}</span>
    </header>

    <div class="ticket-booking__summary">
      <article data-opening-summary>
        <CalendarClock :size="20" />
        <span>开放时间</span>
        <strong>{{ openingSummary }}</strong>
      </article>
      <article data-last-entry-summary>
        <Clock3 :size="20" />
        <span>最晚入园</span>
        <strong>{{ lastEntrySummary }}</strong>
      </article>
      <article>
        <ShieldCheck :size="20" />
        <span>预约</span>
        <strong>{{ info.bookingLabel }}</strong>
      </article>
      <article>
        <Phone :size="20" />
        <span>咨询</span>
        <strong>{{ primaryContact?.number ?? '暂无独立电话' }}</strong>
      </article>
    </div>

    <div class="ticket-booking__quick">
      <p><strong>{{ info.ticketLabel }}</strong><span>{{ info.bookingLeadTime }}</span></p>
      <p>{{ info.confirmationTiming }}</p>
      <p v-if="info.address" class="ticket-booking__address"><MapPin :size="17" />{{ info.address }}</p>
      <a v-if="primaryContact" :href="`tel:${primaryContact.number}`"><Phone :size="17" />拨打 {{ primaryContact.number }}</a>
      <p v-else>暂无经可靠来源核实的独立景区电话。</p>
    </div>

    <button
      type="button"
      class="ticket-booking__expand"
      data-ticket-expand
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? '收起完整信息' : '查看完整信息' }}
      <ChevronDown :size="19" :class="{ 'is-open': expanded }" />
    </button>

    <div v-if="expanded" class="ticket-booking__details" data-ticket-details>
      <section data-operating-hours>
        <h3><CalendarClock :size="19" />开放时间</h3>
        <p class="ticket-booking__lead">{{ hours.summary }}</p>
        <div v-if="hours.periods.length" class="ticket-booking__periods">
          <article v-for="period in hours.periods" :key="period.id">
            <header><strong>{{ period.label }}</strong><span>{{ period.dateRange || '适用日期请确认' }}</span></header>
            <dl>
              <div v-for="row in fieldRows(period)" :key="row[0]"><dt>{{ row[0] }}</dt><dd>{{ row[1] }}</dd></div>
            </dl>
            <p v-if="!period.lastCheckInTime && !period.lastEntryTime" class="ticket-booking__missing">停止检票或最晚入园时间未找到可靠公开信息，请通过景区渠道确认。</p>
            <ul v-if="period.notes?.length"><li v-for="note in period.notes" :key="note">{{ note }}</li></ul>
          </article>
        </div>
        <p v-else class="ticket-booking__missing">尚未找到可确认的分项开园、停止入园与闭园时刻，页面保留临行确认，不作推测。</p>

        <div v-if="hours.internalProjects.length" class="ticket-booking__projects">
          <h4>内部交通与体验项目</h4>
          <article v-for="project in hours.internalProjects" :key="project.projectName">
            <strong>{{ project.projectName }}</strong>
            <span v-if="project.firstServiceTime || project.lastServiceTime">{{ project.firstServiceTime || '首班待确认' }}—{{ project.lastServiceTime || '末班待确认' }}</span>
            <p>{{ project.notes?.join('；') }}</p>
          </article>
        </div>

        <div v-if="hours.conflictDetected" class="ticket-booking__conflict"><Info :size="18" /><p><strong>时间信息需复核</strong>{{ hours.conflictNote }}</p></div>
        <a
          v-if="hours.officialSourceUrl"
          class="ticket-booking__source-link"
          :href="hours.officialSourceUrl"
          target="_blank"
          rel="noopener noreferrer"
        ><ExternalLink :size="16" />查看本次核实采用的官方公告或官方转载</a>
        <p class="ticket-booking__meta">开放时间核实日期：2026年8月1日 · 信息来源：{{ hoursSourceLabel }}</p>
      </section>

      <section>
        <h3><Ticket :size="19" />门票与预约</h3>
        <dl class="ticket-booking__facts">
          <div><dt>门票</dt><dd>{{ info.ticketLabel }}</dd></div>
          <div><dt>预约</dt><dd>{{ info.bookingLabel }}</dd></div>
          <div><dt>提前时间</dt><dd>{{ info.bookingLeadTime }}</dd></div>
          <div v-if="info.address"><dt>地址</dt><dd>{{ info.address }}</dd></div>
          <div v-if="info.identityRequired"><dt>证件</dt><dd>需要核对身份证等实名信息</dd></div>
        </dl>
        <ul v-if="info.bookingNotes.length"><li v-for="note in info.bookingNotes" :key="note">{{ note }}</li></ul>
      </section>

      <section v-if="info.officialChannels.length">
        <h3><ExternalLink :size="19" />官方与认证渠道</h3>
        <div class="ticket-booking__actions">
          <template v-for="item in info.officialChannels" :key="`${item.type}-${item.value}`">
            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener noreferrer"><ExternalLink :size="17" />{{ item.label }}</a>
            <button v-else-if="item.copyable" type="button" :data-copy-value="item.value" @click="copyChannel(item.value)"><Copy :size="17" />复制 {{ item.value }}</button>
            <span v-else>{{ item.label }}：{{ item.value }}</span>
          </template>
        </div>
      </section>

      <section>
        <h3><Phone :size="19" />咨询、投诉与救援</h3>
        <p v-if="!info.contacts.length">暂无经可靠来源核实的独立景区电话。</p>
        <div class="ticket-booking__contacts">
          <article v-for="item in (info.contacts.length ? info.contacts : fallbackContacts)" :key="`${item.label}-${item.number}`">
            <span>{{ item.label }}</span><strong>{{ item.number }}</strong><a :href="`tel:${item.number}`"><Phone :size="16" />拨打</a>
          </article>
        </div>
      </section>

      <section v-if="info.accessNotes?.length">
        <h3><ShieldCheck :size="19" />开放边界</h3>
        <ul><li v-for="note in info.accessNotes" :key="note">{{ note }}</li></ul>
      </section>

      <footer>
        <p v-if="info.verificationNote">{{ info.verificationNote }}</p>
        <small>信息核实时间：2026年8月1日 · 信息来源：{{ sourceLabel }}</small>
        <p>{{ hours.confirmationNote }}</p>
      </footer>
      <p class="sr-only" role="status" aria-live="polite">{{ copyStatus }}</p>
    </div>
  </section>
</template>

<style scoped>
.ticket-booking {
  padding: clamp(22px, 4vw, 36px) !important;
  border: 1px solid color-mix(in srgb, var(--lake) 24%, var(--line)) !important;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 54%), rgb(111 160 164 / 8%)),
    var(--paper);
}

.ticket-booking__header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 16px; }
.ticket-booking__header h2 { margin: 0; }
.ticket-booking__badge { padding: 7px 12px; border: 1px solid rgb(65 111 126 / 24%); border-radius: 999px; background: rgb(65 111 126 / 9%); color: var(--lake); font-size: .82rem; font-weight: 700; }
.ticket-booking__badge[data-level="mandatory"] { border-color: rgb(160 62 48 / 25%); background: rgb(160 62 48 / 8%); color: #8b352a; }
.ticket-booking__badge[data-level="strongly-recommended"] { border-color: rgb(195 121 49 / 28%); background: rgb(195 121 49 / 10%); color: #945d25; }

.ticket-booking__summary { display: grid; gap: 10px; margin-top: 22px; }
.ticket-booking__summary article { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 3px 10px; min-width: 0; padding: 16px; border: 1px solid rgb(91 73 52 / 12%); border-radius: 17px; background: rgb(255 255 255 / 46%); }
.ticket-booking__summary svg { grid-row: span 2; color: var(--sunset); }
.ticket-booking__summary span { color: var(--muted); font-size: .74rem; letter-spacing: .04em; }
.ticket-booking__summary strong { overflow-wrap: anywhere; font-size: .95rem; }

.ticket-booking__quick { display: grid; gap: 10px; margin-top: 16px; padding: 16px 0; border-block: 1px dashed var(--line); }
.ticket-booking__quick p { display: flex; flex-wrap: wrap; gap: 7px 16px; margin: 0; color: var(--muted); }
.ticket-booking__quick p strong { color: var(--ink); }
.ticket-booking__address { align-items: center; color: var(--ink) !important; }
.ticket-booking__address svg { flex: 0 0 auto; color: var(--sunset); }
.ticket-booking__quick a, .ticket-booking__expand, .ticket-booking__actions a, .ticket-booking__actions button, .ticket-booking__contacts a { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: 7px; border-radius: 13px; font: inherit; font-weight: 700; text-decoration: none; }
.ticket-booking__quick a { justify-self: start; padding: 0 15px; border: 1px solid var(--line); color: var(--ink); background: rgb(255 255 255 / 42%); }
.ticket-booking__expand { width: 100%; margin-top: 12px; border: 0; color: var(--ink); background: transparent; cursor: pointer; }
.ticket-booking__expand svg { transition: transform .2s ease; }
.ticket-booking__expand svg.is-open { transform: rotate(180deg); }

.ticket-booking__details { display: grid; gap: 26px; margin-top: 18px; padding-top: 24px; border-top: 1px solid var(--line); }
.ticket-booking__details > section { min-width: 0; }
.ticket-booking__details h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 14px; font-size: 1.12rem; }
.ticket-booking__lead { color: var(--ink); font-weight: 700; }
.ticket-booking__periods { display: grid; gap: 12px; }
.ticket-booking__periods > article { padding: 16px; border-left: 2px solid var(--lake); background: rgb(255 255 255 / 36%); }
.ticket-booking__periods header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 14px; }
.ticket-booking__periods header span { color: var(--muted); font-size: .82rem; }
.ticket-booking__periods dl, .ticket-booking__facts { display: grid; gap: 8px; margin: 14px 0 0; }
.ticket-booking__periods dl div, .ticket-booking__facts div { display: grid; grid-template-columns: minmax(92px, .38fr) minmax(0, 1fr); gap: 10px; }
.ticket-booking__periods dt, .ticket-booking__facts dt { color: var(--muted); }
.ticket-booking__periods dd, .ticket-booking__facts dd { margin: 0; font-weight: 700; }
.ticket-booking__missing { margin: 12px 0 0; color: var(--muted); font-size: .88rem; }
.ticket-booking__projects { display: grid; gap: 10px; margin-top: 18px; padding-top: 18px; border-top: 1px dashed var(--line); }
.ticket-booking__projects h4 { margin: 0 0 2px; }
.ticket-booking__projects article { display: grid; grid-template-columns: minmax(120px, .55fr) minmax(0, 1fr); gap: 4px 12px; padding: 12px 0; border-bottom: 1px solid rgb(91 73 52 / 10%); }
.ticket-booking__projects p { grid-column: 1 / -1; margin: 0; color: var(--muted); }
.ticket-booking__conflict { display: flex; gap: 10px; margin-top: 16px; padding: 14px; border-radius: 15px; background: rgb(196 121 49 / 9%); color: #785027; }
.ticket-booking__conflict p { display: grid; gap: 3px; margin: 0; }
.ticket-booking__source-link { display: inline-flex; min-height: 44px; align-items: center; gap: 7px; margin-top: 14px; color: var(--lake); font-weight: 700; text-decoration: none; }
.ticket-booking__meta { color: var(--muted); font-size: .78rem; }
.ticket-booking__actions { display: grid; gap: 9px; }
.ticket-booking__actions a, .ticket-booking__actions button { width: 100%; padding: 0 14px; border: 1px solid var(--line); color: var(--ink); background: rgb(255 255 255 / 46%); cursor: pointer; }
.ticket-booking__actions span { padding: 12px 14px; border-radius: 13px; background: rgb(255 255 255 / 32%); }
.ticket-booking__contacts { display: grid; gap: 9px; }
.ticket-booking__contacts article { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 10px; padding: 10px 10px 10px 14px; border: 1px solid var(--line); border-radius: 15px; }
.ticket-booking__contacts span { color: var(--muted); }
.ticket-booking__contacts a { min-width: 72px; padding: 0 12px; color: white; background: var(--lake); }
.ticket-booking__details ul { color: var(--muted); }
.ticket-booking__details footer { padding-top: 16px; border-top: 1px dashed var(--line); color: var(--muted); font-size: .86rem; }
.ticket-booking__details footer p { margin: 5px 0; }

@media (min-width: 720px) {
  .ticket-booking__summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ticket-booking__details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ticket-booking__details > section:first-child, .ticket-booking__details footer, .ticket-booking__details > .sr-only { grid-column: 1 / -1; }
  .ticket-booking__periods { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1180px) {
  .ticket-booking__summary { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 520px) {
  .ticket-booking__contacts article { grid-template-columns: minmax(0, 1fr) auto; }
  .ticket-booking__contacts a { grid-column: 1 / -1; width: 100%; }
}
</style>
