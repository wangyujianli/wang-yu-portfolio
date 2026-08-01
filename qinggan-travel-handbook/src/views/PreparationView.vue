<script setup lang="ts">
import { ArrowRight, Clock3, ListChecks } from '@lucide/vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import EmergencyDrawer from '@/components/preparation/EmergencyDrawer.vue'
import PreparationCard from '@/components/preparation/PreparationCard.vue'
import PreparationWorkbench from '@/components/preparation/PreparationWorkbench.vue'
import TravelPreparationSections from '@/components/preparation/TravelPreparationSections.vue'
import TicketBookingChecklist from '@/components/preparation/TicketBookingChecklist.vue'
import OpeningHoursChecklist from '@/components/preparation/OpeningHoursChecklist.vue'
import WeatherQuickCheckSection from '@/components/weather/WeatherQuickCheckSection.vue'
import {
  emergencyPreparationCard,
  preparationCards,
  preparationQuickEntries,
  travelPreparationGuides,
} from '@/data/preparation'
</script>

<template>
  <main class="preparation page-shell">
    <SectionHeading
      eyebrow="BEFORE GOING WEST"
      title="出发前确认中心"
      intro="把重要的事情提前想清楚，路上的节奏仍然交给旅人自己。"
    />

    <PreparationWorkbench :entries="preparationQuickEntries" />

    <WeatherQuickCheckSection />

    <section id="ticket-hours" class="preparation-ticket" aria-labelledby="ticket-hours-title">
      <header>
        <span><Clock3 :size="28" :stroke-width="1.5" /></span>
        <div>
          <p class="eyebrow">TICKETS & HOURS · 已核实信息</p>
          <h2 id="ticket-hours-title">门票与开放时间</h2>
          <p>把实名预约、停止入园和内部项目分开看；具体日期仍以官方最新公告为准。</p>
        </div>
      </header>
      <TicketBookingChecklist />
      <OpeningHoursChecklist />
    </section>

    <TravelPreparationSections :guides="travelPreparationGuides" />

    <section class="preparation-focus" aria-labelledby="preparation-focus-title">
      <header>
        <p class="eyebrow"><ListChecks :size="17" />ROUTE-SPECIFIC CHECKS</p>
        <h2 id="preparation-focus-title">沿途重点确认</h2>
        <p>这些是已经整理好的景区与路段专题，按需要展开即可，不把它们变成固定日程。</p>
      </header>
      <div class="preparation-grid" aria-label="沿途重点确认">
        <PreparationCard v-for="card in preparationCards" :key="card.id" :card="card" />
      </div>
    </section>

    <EmergencyDrawer :contacts="emergencyPreparationCard.phones ?? []" />

    <footer class="preparation-next">
      <div><p class="eyebrow">NEXT · MAP</p><h2>接下来，看一眼整条路</h2></div>
      <RouterLink to="/map" class="button-primary" data-preparation-next>
        准备好了，查看沿途地点 <ArrowRight :size="19" />
      </RouterLink>
    </footer>
  </main>
</template>

<style scoped>
.preparation-ticket {
  scroll-margin-top: 92px;
  display: grid;
  gap: 22px;
  margin-bottom: 42px;
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid var(--line);
  border-radius: 30px;
  background: rgb(255 255 255 / 30%);
}

.preparation-ticket > header { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 16px; align-items: start; }
.preparation-ticket > header > span { display: grid; width: 58px; height: 58px; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--lake); }
.preparation-ticket h2,
.preparation-focus h2,
.preparation-next h2 { margin: 7px 0 10px; font-size: clamp(2rem, 4vw, 3.6rem); }
.preparation-ticket header p:last-child,
.preparation-focus header > p:last-child { max-width: 760px; margin: 0; color: var(--muted); line-height: 1.75; }
.preparation-ticket :deep(.ticket-checklist),
.preparation-ticket :deep(.hours-checklist) { margin: 0; }

.preparation-focus { margin-top: 52px; padding-top: 36px; border-top: 1px solid var(--line); }
.preparation-focus > header { margin-bottom: 26px; }
.preparation-focus .eyebrow { display: flex; align-items: center; gap: 7px; }

.preparation-grid {
  display: grid;
  align-items: start;
  gap: 18px;
}

.preparation-next {
  display: grid;
  gap: 22px;
  margin-top: 54px;
  padding: clamp(26px, 5vw, 48px);
  border-radius: 30px;
  color: #f8f0df;
  background: linear-gradient(135deg, #2d596b, #2d7f7b);
}
.preparation-next .eyebrow { color: rgb(248 240 223 / 68%); }
.preparation-next h2 { margin-bottom: 0; color: #fff; }
.preparation-next .button-primary { min-height: 52px; justify-content: center; color: var(--ink); background: #f5e8d0; }

@media (min-width: 720px) {
  .preparation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .preparation-next { grid-template-columns: minmax(0, 1fr) auto; align-items: center; }
}

@media (min-width: 1180px) {
  .preparation-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
