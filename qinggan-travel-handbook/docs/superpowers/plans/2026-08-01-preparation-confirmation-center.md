# Preparation Confirmation Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 `/preparation` 摘要页升级为八主题、数据驱动、可展开并可直接打开官网、复制微信和拨打电话的出发前确认中心。

**Architecture:** 保留现有路由和全局布局，扩展内容类型和 `src/data/preparation.ts`，由独立卡片与紧急抽屉组件消费同一数据。交互只发生在浏览器本地，不写入 localStorage，不请求后台。

**Tech Stack:** Vue 3、TypeScript、Vite、Vitest、Vue Test Utils、Lucide Vue、现有 CSS 变量系统。

## Global Constraints

- 只修改 `qinggan-travel-handbook`，不重新初始化，不改变现有路由、地图、地点数据与整体视觉。
- 不显示年龄、内部身份或管教式安全文案。
- 不新增登录、后台、提醒、照片、文字记录或个人信息收集。
- 所有外链新窗口打开，电话使用 `tel:`，微信名称可以复制。
- 未确认官方主体的入口不标记为官网。
- 390px 单列，820px 以双列旅行杂志布局为主要视觉基准。

---

### Task 1: Preparation data contract and complete content

**Files:**
- Modify: `src/types/content.ts`
- Replace: `src/data/preparation.ts`
- Create: `tests/preparation-data.spec.ts`

**Interfaces:**
- Produces: `PreparationCard`, `PreparationSection`, `OfficialLink`, `CopyableChannel`, `PhoneContact`, `preparationCards`, `emergencyPreparationCard`.
- Consumes: no application services.

- [ ] **Step 1: Write the failing data-contract test**

```ts
import { emergencyPreparationCard, preparationCards } from '@/data/preparation'

expect(preparationCards).toHaveLength(8)
expect(preparationCards.map((card) => card.number)).toEqual(['01', '02', '03', '04', '05', '06', '07', '08'])
expect(preparationCards.every((card) => card.summary.length === 3)).toBe(true)
expect(emergencyPreparationCard.phones?.some((phone) => phone.number === '120')).toBe(true)
```

- [ ] **Step 2: Run the targeted test and confirm RED**

Run: `npm run test:run -- tests/preparation-data.spec.ts`

Expected: FAIL because `preparationCards` and the new structured fields do not exist.

- [ ] **Step 3: Add the content types and eight complete cards**

Define literal unions for urgency, section tone, official link type and phone type. Populate all eight approved topics, using `timeSensitive: true` for cards 01–05, official links only for verified first-party domains, and no website link for water Yadan/G315.

- [ ] **Step 4: Run the targeted test and confirm GREEN**

Run: `npm run test:run -- tests/preparation-data.spec.ts`

Expected: one test file passes with eight cards, unique ids/numbers, valid links and complete emergency contacts.

### Task 2: Clipboard behavior

**Files:**
- Create: `src/services/clipboard.ts`
- Create: `tests/clipboard.spec.ts`

**Interfaces:**
- Produces: `copyText(text: string, clipboard?: Pick<Clipboard, 'writeText'>): Promise<boolean>`.
- Consumes: browser `navigator.clipboard` only when an injected clipboard is not supplied.

- [ ] **Step 1: Write failing success and unavailable tests**

```ts
expect(await copyText('莫高窟参观预约网', { writeText: async () => undefined })).toBe(true)
expect(await copyText('茶卡盐湖', undefined)).toBe(false)
```

- [ ] **Step 2: Run the targeted test and confirm RED**

Run: `npm run test:run -- tests/clipboard.spec.ts`

Expected: FAIL because the service does not exist.

- [ ] **Step 3: Implement the minimal clipboard adapter**

Return `true` after a successful `writeText`; return `false` for unavailable clipboard or rejected writes. Do not persist or transmit copied values.

- [ ] **Step 4: Run the targeted test and confirm GREEN**

Run: `npm run test:run -- tests/clipboard.spec.ts`

Expected: success and failure branches both pass.

### Task 3: Expandable card and emergency drawer

**Files:**
- Create: `src/components/preparation/PreparationCard.vue`
- Create: `src/components/preparation/EmergencyDrawer.vue`
- Modify: `src/views/PreparationView.vue`
- Create: `tests/preparation-view.spec.ts`

**Interfaces:**
- `PreparationCard` consumes `{ card: PreparationCard }` and manages only its expanded/copy-feedback state.
- `EmergencyDrawer` consumes `{ contacts: PhoneContact[] }` and exposes no global state.
- `PreparationView` consumes `preparationCards` and `emergencyPreparationCard`.

- [ ] **Step 1: Write failing view behavior tests**

```ts
const wrapper = mount(PreparationView)
expect(wrapper.findAll('[data-preparation-card]')).toHaveLength(8)
await wrapper.get('[data-card-id="mogao-ticket"] [data-expand]').trigger('click')
expect(wrapper.get('[data-card-id="mogao-ticket"]').text()).toContain('身份证原件')
expect(wrapper.get('a[href="https://www.mgk.org.cn/"]').attributes('target')).toBe('_blank')
await wrapper.get('[data-copy-value="莫高窟参观预约网"]').trigger('click')
expect(wrapper.text()).toContain('已复制')
```

Add a second test that clicks `[data-emergency-trigger]`, observes the dialog, verifies `tel:110` and `tel:120`, and closes the drawer.

- [ ] **Step 2: Run the targeted test and confirm RED**

Run: `npm run test:run -- tests/preparation-view.spec.ts`

Expected: FAIL because the new cards, selectors and drawer do not exist.

- [ ] **Step 3: Implement the minimal components and page composition**

Use `aria-expanded`, `aria-controls`, `role="status"`, `role="dialog"` and `aria-modal="true"`. Render external links with `target="_blank" rel="noopener noreferrer"`; render every contact as `<a :href="`tel:${phone.number}`">`.

- [ ] **Step 4: Add scoped responsive styling**

Keep existing card radius/shadow/tokens; use one column below 720px, two columns from 720px, three from 1180px. Place the mobile emergency button above `BottomNav`; hide it at 720px and above. Danger sections receive a thin red-brown border and pale neutral background.

- [ ] **Step 5: Run the targeted test and confirm GREEN**

Run: `npm run test:run -- tests/preparation-view.spec.ts`

Expected: card count, expansion, external-link contract, copy feedback and drawer behavior pass.

### Task 4: Documentation and regression guard

**Files:**
- Modify: `README.md`
- Modify: `docs/qa/2026-08-01-acceptance-report.md`
- Modify: `tests/content.spec.ts`

**Interfaces:**
- Consumes: exported preparation data for the existing internal-persona scan.
- Produces: documented content-maintenance path and current QA evidence.

- [ ] **Step 1: Extend the content regression test**

Include `preparationCards` in the serialization scanned for internal persona labels and fixed-day schedules. Run `npm run test:run -- tests/content.spec.ts` and confirm it passes only with user-facing-safe copy.

- [ ] **Step 2: Update README**

Document `src/data/preparation.ts` as the single location for confirmation cards, official links, WeChat names, phone contacts and `updatedAt` values.

- [ ] **Step 3: Record acceptance evidence**

Add preparation-center screenshots and test counts to the QA report without changing historical evidence for other pages.

### Task 5: Full verification and visual QA

**Files:**
- Create: `docs/qa/screenshots/preparation-center-390.png`
- Create: `docs/qa/screenshots/preparation-center-820.png`
- Create: `docs/qa/screenshots/preparation-center-detail-820.png`

**Interfaces:**
- Consumes: the running local Vite app at `http://127.0.0.1:4173/preparation`.
- Produces: responsive and interaction evidence.

- [ ] **Step 1: Run automated verification**

Run: `npm run type-check && npm run test:run && npm run build`

Expected: exit code 0, no failed test files, production bundle created.

- [ ] **Step 2: Verify 820px layout in the browser**

Capture the two-column overview and an expanded card. Confirm no horizontal overflow, official links have the correct attributes, and no console errors are present.

- [ ] **Step 3: Verify 390px interactions in the browser**

Capture the single-column page, open the emergency drawer, confirm `tel:` links and copy feedback, and ensure the floating button does not overlap the existing bottom navigation.

- [ ] **Step 4: Review scope and commit**

Run `git diff --check`, confirm map/place/route files are unchanged, stage only `qinggan-travel-handbook`, and commit with `feat: upgrade preparation confirmation center`.
