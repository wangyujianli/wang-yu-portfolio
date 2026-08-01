<script setup lang="ts">
import { computed, ref } from 'vue'
import { Phone, Siren, X } from '@lucide/vue'
import type { PhoneContact } from '@/types/content'

const props = defineProps<{ contacts: PhoneContact[] }>()

const open = ref(false)
const nationalContacts = computed(() => props.contacts.filter((contact) => contact.group === 'national'))
const scenicContacts = computed(() => props.contacts.filter((contact) => contact.group === 'scenic'))
</script>

<template>
  <button type="button" class="emergency-trigger" aria-label="打开紧急电话" title="紧急电话" data-emergency-trigger @click="open = true">
    <Siren :size="20" />
    紧急电话
  </button>

  <Transition name="emergency-drawer">
    <div v-if="open" class="emergency-layer" @click.self="open = false">
      <section class="emergency-drawer" role="dialog" aria-modal="true" aria-labelledby="emergency-drawer-title">
        <header>
          <div>
            <p class="eyebrow">QUICK CONTACTS</p>
            <h2 id="emergency-drawer-title">紧急电话</h2>
          </div>
          <button type="button" class="emergency-drawer__close" aria-label="关闭紧急电话" data-emergency-close @click="open = false">
            <X :size="21" />
          </button>
        </header>

        <p class="emergency-drawer__notice">人身危险、火灾、严重疾病和交通事故，请优先拨打110、119、120或122，不要先拨景区咨询电话。</p>

        <div class="emergency-drawer__group">
          <h3>紧急情况与公共服务</h3>
          <div class="emergency-drawer__phones">
            <a v-for="phone in nationalContacts" :key="phone.number" :href="`tel:${phone.number}`">
              <span><small>{{ phone.label }}</small><strong>{{ phone.number }}</strong></span>
              <b><Phone :size="17" />拨打</b>
            </a>
          </div>
        </div>

        <div class="emergency-drawer__group">
          <h3>景区咨询</h3>
          <div class="emergency-drawer__phones">
            <a v-for="phone in scenicContacts" :key="`${phone.label}-${phone.number}`" :href="`tel:${phone.number}`">
              <span><small>{{ phone.label }}</small><strong>{{ phone.number }}</strong></span>
              <b><Phone :size="17" />拨打</b>
            </a>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.emergency-trigger {
  position: fixed;
  z-index: 58;
  right: 18px;
  bottom: calc(max(10px, env(safe-area-inset-bottom)) + 74px);
  display: inline-flex;
  width: 52px;
  min-height: 52px;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 0;
  border: 1px solid rgb(164 71 50 / 28%);
  border-radius: 999px;
  color: #fff;
  background: #a44732;
  box-shadow: 0 14px 34px rgb(88 40 28 / 28%);
  font-size: 0;
  font-weight: 700;
  cursor: pointer;
}

.emergency-layer {
  position: fixed;
  z-index: 90;
  inset: 0;
  display: grid;
  align-items: end;
  padding: 18px 12px max(12px, env(safe-area-inset-bottom));
  background: rgb(42 31 25 / 42%);
  backdrop-filter: blur(8px);
}

.emergency-drawer {
  width: min(100%, 720px);
  max-height: min(82vh, 760px);
  margin-inline: auto;
  padding: 22px;
  overflow-y: auto;
  border: 1px solid rgb(255 255 255 / 40%);
  border-radius: 26px;
  color: var(--ink);
  background: var(--sand-50);
  box-shadow: 0 28px 70px rgb(39 25 18 / 34%);
}

.emergency-drawer header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.emergency-drawer h2 { margin-bottom: 12px; font-size: 2rem; }

.emergency-drawer__close {
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  background: rgb(255 255 255 / 56%);
  cursor: pointer;
}

.emergency-drawer__notice {
  padding: 14px 16px;
  border-left: 4px solid #a44732;
  border-radius: 12px;
  background: rgb(164 71 50 / 7%);
}

.emergency-drawer__group { margin-top: 20px; }
.emergency-drawer__group h3 { margin-bottom: 10px; font-size: 1.12rem; }
.emergency-drawer__phones { display: grid; gap: 8px; }

.emergency-drawer__phones a {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgb(255 255 255 / 58%);
  text-decoration: none;
}

.emergency-drawer__phones span { display: grid; }
.emergency-drawer__phones small { color: var(--muted); }
.emergency-drawer__phones strong { font-size: 1rem; letter-spacing: 0.03em; }
.emergency-drawer__phones b { display: inline-flex; align-items: center; gap: 5px; color: var(--lake); font-size: 0.84rem; }

.emergency-drawer-enter-active,
.emergency-drawer-leave-active { transition: opacity 180ms ease; }
.emergency-drawer-enter-active .emergency-drawer,
.emergency-drawer-leave-active .emergency-drawer { transition: transform 220ms ease; }
.emergency-drawer-enter-from,
.emergency-drawer-leave-to { opacity: 0; }
.emergency-drawer-enter-from .emergency-drawer,
.emergency-drawer-leave-to .emergency-drawer { transform: translateY(24px); }

@media (min-width: 720px) {
  .emergency-trigger { display: none; }
  .emergency-drawer__phones { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
