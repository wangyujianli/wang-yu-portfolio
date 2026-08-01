# Place Visit Value Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 16 个地点增加结构化游览价值判断，并让首页、地图、列表和详情页优先展示这些判断。

**Architecture:** 在 `Place.value` 中集中维护 `PlaceValue`，由现有本地数据驱动所有页面。分类和推荐等级使用同一个纯函数取交集；新价值总览组件只负责地点详情的前五项判断，既有玩法与服务信息组件继续负责后续内容。

**Tech Stack:** Vue 3、TypeScript、Vue Router、Vitest、Vue Test Utils、现有 CSS 变量系统、Lucide Vue。

## Global Constraints

- 只修改 `qinggan-travel-handbook`，不重做项目，不改变现有路由、地图、地点数量和整体视觉风格。
- 不删除预约、拍照、安全、天气、顺路组合与 localStorage 已去功能。
- 不使用“景色优美、值得打卡、不容错过、令人流连忘返、网红必去”。
- 不暴露内部用户画像，不新增固定日程，不使用命令或管教式口吻。
- 普通手机单栏；展开屏/小平板为主要宽幅视觉基准。

---

### Task 1: PlaceValue 数据契约与 16 个地点内容

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/data/places.ts`
- Modify: `tests/content.spec.ts`

**Interfaces:**
- Produces: `PlacePriority`、`PlaceValue`、`Place.value`
- Consumes: 现有 `Place` 和 `places`

- [ ] **Step 1: 写失败测试**

在 `tests/content.spec.ts` 中断言 16 个地点均有 50–100 字 `reasonToVisit`、非空 `uniqueness/bestFor/ifTimeIsLimited`、五档之一的 `priority`、与映射一致的 `priorityLabel`，并对全部 value 文案执行营销禁词检查。

- [ ] **Step 2: 运行红灯**

Run: `npm run test:run -- tests/content.spec.ts`

Expected: 因 `place.value` 尚不存在而失败。

- [ ] **Step 3: 最小实现类型与内容**

在 `content.ts` 增加：

```ts
export type PlacePriority = 'core' | 'recommended' | 'along-the-way' | 'interest' | 'optional'
export interface PlaceValue {
  reasonToVisit: string
  uniqueness: string
  bestFor: string[]
  priority: PlacePriority
  priorityLabel: string
  ifTimeIsLimited: string
  contrastWithNearby?: string
}
```

在每个地点加入 `value`，确保五档有真实区分。

- [ ] **Step 4: 运行绿灯**

Run: `npm run test:run -- tests/content.spec.ts`

Expected: PASS。

### Task 2: 推荐等级筛选

**Files:**
- Modify: `src/data/places.ts`
- Modify: `src/views/PlacesView.vue`
- Modify: `tests/places-filter.spec.ts`

**Interfaces:**
- Produces: `placePriorityOptions` 与 `filterPlaces(items, category, priority)`
- Consumes: `Place.value.priority`

- [ ] **Step 1: 写失败测试**

断言 `filterPlaces(places, 'all', 'core')` 只返回核心地点；分类与等级同时传入时返回交集；未知等级按全部处理。

- [ ] **Step 2: 运行红灯**

Run: `npm run test:run -- tests/places-filter.spec.ts`

Expected: 旧函数忽略第三参数，核心筛选断言失败。

- [ ] **Step 3: 实现纯函数与 URL 双筛选**

`PlacesView.vue` 从 `category`、`priority` 两个 query 读取状态，更新其中一个时保留另一个；页面增加五档横向筛选条。

- [ ] **Step 4: 运行绿灯**

Run: `npm run test:run -- tests/places-filter.spec.ts`

Expected: PASS。

### Task 3: 四个入口的价值展示

**Files:**
- Create: `src/components/place/PlaceValueOverview.vue`
- Modify: `src/views/HomeView.vue`
- Modify: `src/components/map/MapPlaceSheet.vue`
- Modify: `src/components/place/PlaceCard.vue`
- Modify: `src/views/PlaceDetailView.vue`
- Modify: `src/components/place/PlaceSections.vue`
- Test: `tests/place-value-views.spec.ts`

**Interfaces:**
- `PlaceValueOverview` consumes `{ place: Place }`
- `PlaceCard` 与 `MapPlaceSheet` 继续只接收 `{ place: Place }`

- [ ] **Step 1: 写失败组件测试**

挂载真实组件并断言首页有三个篇章；地图卡片以 `reasonToVisit` 和等级替代摘要首屏；地点卡有等级与 `bestFor`；详情价值总览按五个标题出现，且顶部不再出现已去按钮。

- [ ] **Step 2: 运行红灯**

Run: `npm run test:run -- tests/place-value-views.spec.ts`

Expected: 新文案和组件不存在，测试失败。

- [ ] **Step 3: 实现页面与组件**

沿现有纸张、杂志栅格和暖色体系增加轻量卡片；详情页把 `VisitedToggle` 留在页尾，并让新价值总览位于玩法内容之前。地图卡片把图片移到判断区之后。

- [ ] **Step 4: 运行绿灯并回归**

Run: `npm run test:run -- tests/place-value-views.spec.ts`

Expected: PASS。

### Task 4: 全量与视觉验收

**Files:**
- Modify: `docs/qa/2026-08-01-acceptance-report.md`
- Create: `docs/qa/screenshots/home-value-820.png`
- Create: `docs/qa/screenshots/map-value-sheet-390.png`
- Create: `docs/qa/screenshots/places-priority-820.png`
- Create: `docs/qa/screenshots/place-value-detail-820.png`

**Interfaces:**
- Consumes: 完整应用与本地预览服务
- Produces: 可复核截图和验收记录

- [ ] **Step 1: 自动化验证**

Run: `npm run type-check && npm run test:run && npm run build`

Expected: 全部命令 exit 0，测试 0 failures。

- [ ] **Step 2: 浏览器验证**

在 390、820、1440 宽度检查首页、地图降级卡片、地点列表筛选与详情；确认无横向溢出、核心按钮可点、推荐筛选刷新后保留、已去状态仍能切换。

- [ ] **Step 3: 保存截图并更新验收记录**

把四张代表性截图写入 `docs/qa/screenshots/`，在验收报告记录页面、宽度、交互和控制台结果。

- [ ] **Step 4: 提交**

```powershell
git add qinggan-travel-handbook/src qinggan-travel-handbook/tests qinggan-travel-handbook/docs
git commit -m "feat: add place visit value guidance"
```
