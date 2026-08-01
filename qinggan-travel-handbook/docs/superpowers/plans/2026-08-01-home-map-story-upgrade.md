# 首页地图故事体验升级 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有旅行手册中完成首页地图化首屏、经典／优选双路线切换、六人商务车故事强化和地点访问状态表达，同时只复用当前 30 个地点。

**Architecture:** 新增独立的首页路线配置和地图组件，复用 `places`、`journey`、`visited` 三个既有数据／状态源。首页地图使用真实经纬度投影且完全本地可用；高德地图页继续承担详细地图功能，并继承首页选中的路线。

**Tech Stack:** Vue 3、TypeScript、Pinia、GSAP、Lucide、Canvas 2D、Vitest、Vue Test Utils、Vite。

## Global Constraints

- 不增加任何地点，只能引用现有 30 个地点 ID。
- 不新增日期、照片上传、评价、想去、登录、后台或数据库。
- 不重新初始化工程，不删除现有路线、页面、天气、住宿、拍照、预约和已去功能。
- 展开屏／小平板为主要视觉基准，360px 普通手机无页面级横向溢出。
- 地图无 Key 或加载失败时，所有首页路线和地点交互仍可用。
- 动画尊重 `prefers-reduced-motion`，触控目标不小于 44px。

---

### Task 1: 首页双路线数据合同

**Files:**
- Create: `src/data/homeJourneyRoutes.ts`
- Modify: `src/data/journeyRoutes.ts`
- Modify: `src/types/content.ts`
- Create: `tests/home-journey-routes.spec.ts`

**Interfaces:**
- Produces: `HomeJourneyRoute`、`homeJourneyRoutes`、`homeJourneyRouteById`。
- Extends: `JourneyRouteId` 增加 `'discovery'`，其余 ID 不变。

- [ ] **Step 1: 写失败测试，锁定只使用现有地点**

```ts
expect(homeJourneyRoutes).toHaveLength(2)
expect(homeJourneyRoutes.map((route) => route.id)).toEqual(['classic', 'discovery'])
for (const route of homeJourneyRoutes) {
  expect(route.placeIds.every((id) => placeById.has(id))).toBe(true)
}
expect(new Set(homeJourneyRoutes.flatMap((route) => route.placeIds)).size).toBeLessThanOrEqual(places.length)
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm run test:run -- tests/home-journey-routes.spec.ts`
Expected: FAIL，提示 `homeJourneyRoutes` 模块不存在。

- [ ] **Step 3: 增加数据结构与优选路线**

```ts
export interface HomeJourneyRoute extends JourneyRoute {
  positioning: string
  tagline: string
  tags: readonly [string, string, string]
  tone: 'gold' | 'green'
}
```

优选路线固定引用：`xining`、`riyue-mountain`、`qinghai-lake`、`delingha`、`dachaidan-emerald`、`g315-u-road`、`wusute-yadan`、`black-mountain`、`lenghu-oil-town`、`mingsha-crescent`、`son-of-earth`、`zhangye-danxia`、`qilian-grassland`、`xining`。用户参考图中不存在于当前 30 个地点的数据不加入。

- [ ] **Step 4: 运行数据测试与类型检查**

Run: `npm run test:run -- tests/home-journey-routes.spec.ts tests/journey-content.spec.ts && npm run type-check`
Expected: PASS。

### Task 2: 首页真实坐标路线地图

**Files:**
- Create: `src/components/home/HomeJourneyMap.vue`
- Create: `tests/home-journey-map.spec.ts`

**Interfaces:**
- Consumes: `route: HomeJourneyRoute`、`visitedIds: string[]`。
- Emits: `select-place(placeId)`。
- Produces: 真实经纬度投影路径、可聚焦地点节点、已去状态和商务车动画。

- [ ] **Step 1: 写组件失败测试**

```ts
const wrapper = mount(HomeJourneyMap, { props: { route: homeJourneyRoutes[0]!, visitedIds: ['xining'] } })
expect(wrapper.get('[data-home-route-map]').attributes('aria-label')).toContain('五星经典路线')
expect(wrapper.get('[data-place-id="xining"]').classes()).toContain('is-visited')
expect(wrapper.findAll('[data-place-id]').length).toBeGreaterThan(8)
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npm run test:run -- tests/home-journey-map.spec.ts`
Expected: FAIL，提示组件不存在。

- [ ] **Step 3: 实现投影、路线和节点**

使用当前路线所有经纬度计算边界，留出 8% 安全区映射到 Canvas。节点使用 HTML `RouterLink` 覆盖在 Canvas 上，保证可点击和可访问；相邻节点采用与现有降级地图一致的碰撞偏移。

- [ ] **Step 4: 实现一次性商务车动效**

路线切换后用 GSAP 将 `.home-map__van` 沿采样路径移动一次；reduced motion 下直接放在路线中段，不播放动画。

- [ ] **Step 5: 运行组件测试**

Run: `npm run test:run -- tests/home-journey-map.spec.ts`
Expected: PASS。

### Task 3: 路线票券与首页首屏重排

**Files:**
- Create: `src/components/home/HomeRouteTicket.vue`
- Modify: `src/views/HomeView.vue`
- Create: `tests/home-map-hero.spec.ts`

**Interfaces:**
- `HomeRouteTicket` consumes `route` 与 `selected`，emits `select`。
- `HomeView` 调用 `journey.selectRoute(route.id)` 并将当前路线传给地图。

- [ ] **Step 1: 写路线票券和首页结构失败测试**

```ts
expect(wrapper.get('[data-home-map-stage]').exists()).toBe(true)
expect(wrapper.findAll('[data-home-route-ticket]')).toHaveLength(2)
expect(wrapper.text()).toContain('收藏级风景，不错过经典')
expect(wrapper.text()).toContain('减少同质化，看更多西北变化')
```

- [ ] **Step 2: 实现两张票券**

票券显示路线定位、说明、三个标签、时长提示与选择状态；当前路线使用 `aria-pressed="true"`，金色和绿色只用于路径、细边框与小面积强调。

- [ ] **Step 3: 重排首页首屏**

把地图舞台放在标题之后，展开屏为 7／5 双栏，普通手机为标题、地图、票券单栏。路线票券借鉴用户“路线对比”参考图的金／绿区分、横向节点阅读和纸张信息层级，但不照搬图中文字或新增地点。保留“为什么是青甘大环线”、原功能入口与精选地点。

- [ ] **Step 4: 运行首页测试和响应式合同检查**

Run: `npm run test:run -- tests/home-map-hero.spec.ts tests/place-value-views.spec.ts`
Expected: PASS。

### Task 4: 地图页继承优选路线

**Files:**
- Modify: `src/views/MapView.vue`
- Modify: `src/components/map/RouteMap.vue`
- Modify: `src/components/map/FallbackRouteAtlas.vue`
- Modify: `src/stores/journey.ts`
- Modify: `tests/journey-map.spec.ts`

**Interfaces:**
- Consumes: 新的 `JourneyRouteId = 'discovery'`。
- Keeps: 经典、格尔木延伸、冷湖与茫崖延伸全部可选。

- [ ] **Step 1: 扩展失败测试**

```ts
store.selectRoute('discovery')
expect(store.selectedRouteId).toBe('discovery')
expect(readJson('westward:v1:selected-route', '')).toBe('discovery')
```

- [ ] **Step 2: 让高德地图和图文地图消费优选路线**

路线切换后重新创建地图组件并清空旧地点面板；图文地图使用相同地点序列和颜色，不复制筛选逻辑。

- [ ] **Step 3: 运行地图测试**

Run: `npm run test:run -- tests/journey-map.spec.ts tests/storage.spec.ts`
Expected: PASS。

### Task 5: Intro 手账桌面氛围强化

**Files:**
- Modify: `src/components/intro/IntroJourney.vue`
- Modify: `tests/intro.spec.ts`

**Interfaces:**
- Keeps: 本地中国 GeoJSON、六人插画、蓝色商务车、跳过／重播和首次访问逻辑。
- Adds: Lucide 相机／指南针图标、车票与笔记纸张边缘装饰。

- [ ] **Step 1: 写装饰语义与 reduced-motion 测试**

只给地图和人物提供有意义的文本；桌面装饰全部 `aria-hidden="true"`，避免读屏噪音。

- [ ] **Step 2: 实现木质桌面与克制手账边缘**

通过背景材质、现有图标组件和纸张层次实现，不生成带中文字的图片，不遮挡地图和操作按钮。

- [ ] **Step 3: 运行 Intro 测试**

Run: `npm run test:run -- tests/intro.spec.ts`
Expected: PASS。

### Task 6: 视觉、响应式与发布验收

**Files:**
- Modify: `README.md`
- Modify: `design-qa.md`
- Create: `docs/qa/20-home-map-desktop.png`
- Create: `docs/qa/21-home-map-foldable-1024.png`
- Create: `docs/qa/22-home-map-mobile-390.png`
- Create: `docs/qa/23-intro-desk-desktop.png`

**Interfaces:**
- Produces: 可复核的桌面、展开屏、普通手机和 Intro 截图证据。

- [ ] **Step 1: 全新安装与自动化检查**

Run: `npm install && npm run lint && npm run type-check && npm run test:run && npm run build`
Expected: 全部通过，0 vulnerabilities，生产构建生成 `dist/`。

- [ ] **Step 2: 浏览器验证关键交互**

检查经典／优选切换、地图继承、地点节点、已去切换刷新保持、重播 Intro、有 Key、无 Key与降级状态；控制台无 error／warning。

- [ ] **Step 3: 响应式截图与视觉修正**

在 1440、1024、390、360 像素检查文字换行、地图节点、票券、触控区和页面级横向溢出；发现问题立即修复并重拍。

- [ ] **Step 4: 更新文档**

README 说明双路线数据位置和修改方法；`design-qa.md` 记录本轮视觉检查，最终保持 `final result: passed`。
