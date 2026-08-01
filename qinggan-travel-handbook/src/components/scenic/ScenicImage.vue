<script setup lang="ts">
import { ref } from 'vue'
import type { ScenicImageAsset } from '@/data/scenicImages'
import { publicAssetUrl } from '@/lib/publicAssets'

const props = withDefaults(defineProps<{
  image: ScenicImageAsset
  loading?: 'eager' | 'lazy'
  sizes?: string
}>(), {
  loading: 'lazy',
  sizes: '(max-width: 767px) 100vw, 60vw',
})

const failed = ref(false)
</script>

<template>
  <picture v-if="!failed" class="scenic-image">
    <source
      type="image/webp"
      :srcset="`${publicAssetUrl(props.image.thumbnail)} 480w, ${publicAssetUrl(props.image.regular)} 960w, ${publicAssetUrl(props.image.large)} 1600w`"
      :sizes="props.sizes"
    />
    <img
      :src="publicAssetUrl(props.image.regular)"
      :alt="props.image.alt"
      :width="props.image.width"
      :height="props.image.height"
      :loading="props.loading"
      decoding="async"
      :style="{ objectPosition: props.image.objectPosition }"
      @error="failed = true"
    />
  </picture>
  <div v-else class="scenic-image scenic-image--failed" role="img" :aria-label="`${props.image.alt}，图片暂时无法显示`">
    <span>图片暂时无法显示</span>
  </div>
</template>

<style scoped>
.scenic-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: color-mix(in srgb, var(--paper) 82%, var(--lake));
}

.scenic-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scenic-image--failed {
  display: grid;
  min-height: 260px;
  place-items: center;
  color: var(--muted);
}
</style>
