<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { loadAMap, type AMapInstance } from '@/lib/amap'

const mapContainer = ref<HTMLElement>()
const status = ref('正在加载高德地图测试页...')
const hasError = ref(false)
const xiningCenter = [101.7782, 36.6171]

let map: AMapInstance | undefined

onMounted(async () => {
  if (!mapContainer.value) return

  try {
    const AMap = await loadAMap()
    if (!AMap.Marker) throw new Error('AMap Marker unavailable')

    map = new AMap.Map(mapContainer.value, {
      center: xiningCenter,
      zoom: 12,
      viewMode: '2D',
      resizeEnable: true,
    })

    const marker = new AMap.Marker({
      position: xiningCenter,
      title: '西宁',
      content: '<div class="amap-minimal-marker">西宁</div>',
      anchor: 'bottom-center',
    })

    map.add(marker)
    status.value = '高德地图测试加载完成。'
  } catch {
    hasError.value = true
    status.value = '高德地图加载失败：请检查本地高德配置或网络状态。'
  }
})

onBeforeUnmount(() => map?.destroy())
</script>

<template>
  <main class="amap-minimal-test">
    <section class="amap-minimal-test__panel">
      <h1>高德地图最小可用测试</h1>
      <p :class="{ 'is-error': hasError }">{{ status }}</p>
      <div ref="mapContainer" class="amap-minimal-test__map" aria-label="西宁市区高德地图测试"></div>
    </section>
  </main>
</template>

<style scoped>
.amap-minimal-test {
  min-height: calc(100vh - 132px);
  padding: 24px;
  background: #f6f2ea;
}

.amap-minimal-test__panel {
  width: min(1080px, 100%);
  margin: 0 auto;
}

.amap-minimal-test h1 {
  margin: 0 0 10px;
  color: #2b2722;
  font-size: 28px;
  line-height: 1.2;
}

.amap-minimal-test p {
  margin: 0 0 16px;
  color: #5c544b;
}

.amap-minimal-test p.is-error {
  color: #a33a2a;
  font-weight: 700;
}

.amap-minimal-test__map {
  width: 100%;
  height: 560px;
  overflow: hidden;
  border: 1px solid rgb(43 39 34 / 16%);
  border-radius: 8px;
  background: #e8e0d5;
}

:global(.amap-minimal-marker) {
  padding: 7px 10px;
  border: 2px solid #fff;
  border-radius: 8px;
  color: #fff;
  background: #2d7f7b;
  box-shadow: 0 8px 18px rgb(0 0 0 / 22%);
  font: 700 14px/1 system-ui, sans-serif;
  white-space: nowrap;
}

@media (max-width: 719px) {
  .amap-minimal-test {
    padding: 16px;
  }

  .amap-minimal-test__map {
    height: 480px;
  }
}
</style>
