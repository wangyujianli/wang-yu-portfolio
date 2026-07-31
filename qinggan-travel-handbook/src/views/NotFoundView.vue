<template>
  <main class="page-shell not-found">
    <p class="eyebrow">404 · LOST & FOUND</p>
    <h1>这条岔路不在手册里</h1>
    <p>回到环线，下一处风景还在前面。</p>
    <RouterLink to="/" class="button-primary">返回首页</RouterLink>
  </main>
</template>

<style scoped>
.not-found { display: grid; align-content: center; justify-items: start; }
.not-found h1 { max-width: 700px; font-size: clamp(3rem, 9vw, 7rem); }
.not-found p:not(.eyebrow) { color: var(--muted); }
</style>
