<script setup lang="ts">
import type { IntroStageId } from '@/data/intro'

defineProps<{ stage: IntroStageId }>()
</script>

<template>
  <svg
    class="intro-route"
    :class="`intro-route--${stage}`"
    viewBox="0 0 1440 390"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path class="intro-route__base" d="M-40 318 C130 272 234 337 376 276 S630 212 770 264 S1034 344 1480 204" />
    <path class="intro-route__line" d="M-40 318 C130 272 234 337 376 276 S630 212 770 264 S1034 344 1480 204" />
    <path class="intro-route__branch intro-route__branch--gold" d="M376 276 C486 182 614 158 742 236" />
    <path class="intro-route__branch intro-route__branch--green" d="M376 276 C520 344 648 342 770 264" />
    <g class="intro-route__nodes">
      <circle cx="376" cy="276" r="7" />
      <circle cx="770" cy="264" r="7" />
      <circle cx="1116" cy="301" r="7" />
    </g>
    <circle class="intro-route__ring" cx="1248" cy="257" r="55" />
  </svg>
</template>

<style scoped>
.intro-route {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 42vh;
  pointer-events: none;
}

.intro-route__base,
.intro-route__line,
.intro-route__branch,
.intro-route__ring {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.intro-route__base { stroke: rgba(244, 231, 207, .15); stroke-width: 1.4; }
.intro-route__line {
  stroke: rgba(244, 231, 207, .72);
  stroke-width: 2;
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
  transition: stroke-dashoffset 1.5s cubic-bezier(.22,.8,.3,1);
}
.intro-route__branch {
  stroke-width: 2;
  stroke-dasharray: 520;
  stroke-dashoffset: 520;
  opacity: 0;
  transition: stroke-dashoffset 1.1s ease, opacity .6s ease;
}
.intro-route__branch--gold { stroke: #dfb46e; }
.intro-route__branch--green { stroke: #88aa8c; }
.intro-route__nodes { fill: #f5e7cf; stroke: rgba(12,33,51,.72); stroke-width: 3; opacity: 0; transition: opacity .7s ease; }
.intro-route__ring { stroke: #dfb46e; stroke-width: 1.5; stroke-dasharray: 360; stroke-dashoffset: 360; opacity: 0; transition: stroke-dashoffset 1.2s ease, opacity .7s ease; }

.intro-route--route-choice .intro-route__line { stroke-dashoffset: 940; }
.intro-route--route-choice .intro-route__branch,
.intro-route--travel-content .intro-route__branch,
.intro-route--footprint .intro-route__branch,
.intro-route--blessing .intro-route__branch { stroke-dashoffset: 0; opacity: 1; }
.intro-route--travel-content .intro-route__line { stroke-dashoffset: 460; }
.intro-route--travel-content .intro-route__nodes,
.intro-route--footprint .intro-route__nodes,
.intro-route--blessing .intro-route__nodes { opacity: 1; }
.intro-route--footprint .intro-route__line,
.intro-route--blessing .intro-route__line { stroke-dashoffset: 0; }
.intro-route--blessing .intro-route__ring { stroke-dashoffset: 0; opacity: .85; }

@media (max-width: 680px) {
  .intro-route { height: 36vh; }
}

@media (prefers-reduced-motion: reduce) {
  .intro-route * { transition: none !important; }
  .intro-route__line,
  .intro-route__branch,
  .intro-route__ring { stroke-dashoffset: 0; opacity: .7; }
  .intro-route__nodes { opacity: 1; }
}
</style>
