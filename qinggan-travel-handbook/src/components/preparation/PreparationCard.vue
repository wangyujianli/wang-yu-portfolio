<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Check, ChevronDown, Clock, Copy, ExternalLink, Phone } from '@lucide/vue'
import { copyText } from '@/services/clipboard'
import { preparationChangeNotice } from '@/data/preparation'
import type { PreparationCard } from '@/types/content'

defineProps<{ card: PreparationCard }>()

const expanded = ref(false)
const copiedValue = ref('')
const copySucceeded = ref(false)
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

const urgencyLabels = {
  urgent: '最高优先级',
  important: '重要',
  normal: '常规',
} as const

async function handleCopy(value: string): Promise<void> {
  copySucceeded.value = await copyText(value)
  copiedValue.value = value
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    copiedValue.value = ''
  }, 2400)
}

onBeforeUnmount(() => {
  if (feedbackTimer) clearTimeout(feedbackTimer)
})
</script>

<template>
  <article
    class="preparation-card paper-card"
    :class="{ 'preparation-card--expanded': expanded }"
    :data-card-id="card.id"
    data-preparation-card
  >
    <header class="preparation-card__header">
      <div>
        <p class="eyebrow">{{ card.category }}</p>
        <span class="preparation-card__urgency" :data-urgency="card.urgency">{{ urgencyLabels[card.urgency] }}</span>
      </div>
      <span class="preparation-card__number">{{ card.number }}</span>
    </header>

    <h2>{{ card.title }}</h2>
    <p class="preparation-card__description">{{ card.description }}</p>

    <div class="preparation-card__timing">
      <Clock :size="20" />
      <div>
        <strong>{{ card.timingLabel }}</strong>
        <span>{{ card.confirmTiming }}</span>
      </div>
    </div>

    <ul class="preparation-card__summary">
      <li v-for="item in card.summary" :key="item">{{ item }}</li>
    </ul>

    <button
      type="button"
      class="preparation-card__expand"
      data-expand
      :aria-expanded="expanded"
      :aria-controls="`preparation-details-${card.id}`"
      @click="expanded = !expanded"
    >
      {{ expanded ? '收起详情' : '查看详情' }}
      <ChevronDown :size="19" :class="{ 'is-rotated': expanded }" />
    </button>

    <div
      v-if="expanded"
      :id="`preparation-details-${card.id}`"
      class="preparation-card__details"
      data-card-details
    >
      <div class="preparation-card__sections">
        <section
          v-for="section in card.sections"
          :key="section.title"
          class="preparation-card__section"
          :data-tone="section.tone ?? 'normal'"
        >
          <h3>{{ section.title }}</h3>
          <ul>
            <li v-for="item in section.items" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>

      <section
        v-if="card.officialLinks?.length || card.wechatChannels?.length || card.phones?.length"
        class="preparation-card__contacts"
      >
        <p class="eyebrow">可直接使用</p>
        <div v-if="card.officialLinks?.length" class="preparation-card__actions">
          <a
            v-for="link in card.officialLinks"
            :key="link.url"
            class="preparation-action preparation-action--link"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
            <ExternalLink :size="18" />
          </a>
        </div>

        <div v-if="card.wechatChannels?.length" class="preparation-card__channel-list">
          <div v-for="channel in card.wechatChannels" :key="channel.value" class="preparation-channel">
            <div>
              <span>{{ channel.label }}</span>
              <strong>{{ channel.value }}</strong>
            </div>
            <button
              type="button"
              class="preparation-action"
              :data-copy-value="channel.value"
              @click="handleCopy(channel.value)"
            >
              <Check v-if="copiedValue === channel.value && copySucceeded" :size="18" />
              <Copy v-else :size="18" />
              {{ copiedValue === channel.value && copySucceeded ? '已复制' : '复制名称' }}
            </button>
          </div>
        </div>

        <p v-if="copiedValue" class="preparation-card__copy-status" role="status" aria-live="polite">
          {{ copySucceeded ? `已复制“${copiedValue}”` : `请手动复制：${copiedValue}` }}
        </p>

        <div v-if="card.phones?.length" class="preparation-card__phone-list">
          <a
            v-for="phone in card.phones"
            :key="`${phone.label}-${phone.number}`"
            class="preparation-phone"
            :href="`tel:${phone.number}`"
          >
            <span><small>{{ phone.label }}</small><strong>{{ phone.number }}</strong></span>
            <b><Phone :size="17" />拨打</b>
          </a>
        </div>
      </section>

      <footer class="preparation-card__footer">
        <p>信息整理时间：{{ card.updatedAt }}</p>
        <p v-if="card.timeSensitive">{{ preparationChangeNotice }}</p>
        <p v-if="card.disclaimer" class="preparation-card__disclaimer">{{ card.disclaimer }}</p>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.preparation-card {
  align-self: start;
  padding: 24px;
}

.preparation-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.preparation-card__header .eyebrow { margin-bottom: 8px; }

.preparation-card__number {
  color: rgb(53 42 36 / 18%);
  font: 700 3rem/0.9 var(--serif);
}

.preparation-card__urgency {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 2px 11px;
  border: 1px solid rgb(45 127 123 / 24%);
  border-radius: 999px;
  color: var(--lake);
  font-size: 0.76rem;
  font-weight: 700;
}

.preparation-card__urgency[data-urgency='urgent'] {
  border-color: rgb(177 76 52 / 34%);
  color: #a44732;
  background: rgb(217 109 59 / 7%);
}

.preparation-card h2 {
  margin-bottom: 10px;
  font-size: clamp(1.8rem, 4vw, 2.45rem);
}

.preparation-card__description {
  margin-bottom: 20px;
  color: var(--muted);
}

.preparation-card__timing {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgb(217 109 59 / 26%);
  border-radius: 16px;
  color: var(--sunset);
  background: rgb(217 109 59 / 6%);
}

.preparation-card__timing svg { flex: 0 0 auto; margin-top: 2px; }
.preparation-card__timing div { display: grid; gap: 2px; }
.preparation-card__timing strong { font-size: 0.92rem; }
.preparation-card__timing span { color: var(--ink); font-size: 0.88rem; line-height: 1.55; }

.preparation-card__summary {
  display: grid;
  gap: 9px;
  margin: 20px 0;
  padding: 0;
  list-style: none;
}

.preparation-card__summary li {
  position: relative;
  padding-left: 20px;
}

.preparation-card__summary li::before {
  position: absolute;
  top: 0.72em;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lake);
  content: '';
}

.preparation-card__expand {
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink);
  background: rgb(255 255 255 / 48%);
  font-weight: 700;
  cursor: pointer;
}

.preparation-card__expand svg { transition: transform 180ms ease; }
.preparation-card__expand svg.is-rotated { transform: rotate(180deg); }

.preparation-card__details {
  padding-top: 26px;
  animation: details-in 220ms ease both;
}

.preparation-card__sections { display: grid; gap: 14px; }

.preparation-card__section {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgb(255 255 255 / 34%);
}

.preparation-card__section[data-tone='warning'] {
  border-color: rgb(217 109 59 / 30%);
  background: rgb(217 109 59 / 5%);
}

.preparation-card__section[data-tone='danger'] {
  border: 2px solid rgb(164 71 50 / 58%);
  background: rgb(164 71 50 / 5%);
}

.preparation-card__section h3 { margin-bottom: 12px; font-size: 1.18rem; }
.preparation-card__section ul { display: grid; gap: 7px; margin: 0; padding-left: 1.2rem; color: var(--muted); }
.preparation-card__section[data-tone='danger'] h3 { color: #913c2c; }

.preparation-card__contacts {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}

.preparation-card__actions,
.preparation-card__channel-list,
.preparation-card__phone-list { display: grid; gap: 10px; }

.preparation-action {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--ink);
  background: rgb(255 255 255 / 56%);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.preparation-action--link { color: #fff; background: var(--lake); }

.preparation-channel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.preparation-channel > div { display: grid; }
.preparation-channel span { color: var(--muted); font-size: 0.76rem; }
.preparation-channel strong { font-size: 0.98rem; }
.preparation-channel .preparation-action { flex: 0 0 auto; }

.preparation-card__copy-status {
  margin: 10px 0 0;
  color: var(--lake);
  font-size: 0.84rem;
  font-weight: 700;
}

.preparation-card__phone-list { margin-top: 14px; }

.preparation-phone {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgb(255 255 255 / 42%);
  text-decoration: none;
}

.preparation-phone span { display: grid; }
.preparation-phone small { color: var(--muted); }
.preparation-phone strong { font-size: 0.98rem; letter-spacing: 0.03em; }
.preparation-phone b { display: inline-flex; align-items: center; gap: 5px; color: var(--lake); font-size: 0.82rem; }

.preparation-card__footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--line);
  color: var(--muted);
  font-size: 0.8rem;
}

.preparation-card__footer p { margin-bottom: 7px; }
.preparation-card__disclaimer { color: var(--ink); font-weight: 700; }

@keyframes details-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 720px) {
  .preparation-card--expanded { grid-column: 1 / -1; }
  .preparation-card__sections { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .preparation-card__actions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .preparation-card__phone-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
