<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; intro?: string }>()
</script>

<template>
  <header class="section-heading">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="intro" class="section-heading__intro">{{ intro }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  max-width: 760px;
  margin-bottom: 28px;
}

.section-heading h2 {
  margin-bottom: 12px;
  font-size: clamp(2rem, 5vw, 3.8rem);
}

.section-heading__intro {
  max-width: 640px;
  color: var(--muted);
}
</style>
