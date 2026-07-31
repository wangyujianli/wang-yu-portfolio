# Qinggan Travel Handbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Vue 3 private travel handbook “向西而行｜2026青甘大环线自由探索手册” with local content, AMap plus local route fallback, place-level weather, a curated photo guide, and device-local visited status.

**Architecture:** A static Vue single-page application renders every page from typed local data. Pinia owns only device-local visited and intro state, service modules isolate AMap and Open-Meteo, and the map always has a local canvas-and-list fallback. CSS uses a magazine grid whose primary review range is 720–1024 CSS pixels, collapsing to one column below 720px.

**Tech Stack:** Vue 3, Vite, TypeScript, Vue Router, Pinia, GSAP, Lucide Vue, AMap JS API 2.0, Open-Meteo Forecast API, Vitest, Vue Test Utils, CSS variables.

## Global Constraints

- Keep all implementation inside `qinggan-travel-handbook/`; preserve unrelated root files and directories.
- No login, registration, backend, permissions, notes, photo upload, photo sync, live location, navigation, payments, fixed day schedule, reminders, or social sharing.
- Persist only `visited`, `intro-seen`, and weather cache under versioned `localStorage` keys.
- Use the supplied photo guide pack as composition examples; show “动作与机位均为构图示意，实际拍摄以现场条件为准” once on the guide page.
- For Mogao content, say that flash is off in indoor areas where photography is available and that the exact range follows on-site guidance.
- Hide age, leader identity, “适老”, and internal persona language from all user-visible copy and data.
- Use respectful, objective wording; do not present common sense as a disciplinary list.
- Primary visual baseline: unfolded foldable/small tablet at 720–1024px, wide travel-magazine layout. Below 720px is a normal one-column phone layout. Do not add hinge, crease, split-screen, or outer-screen features.
- AMap failure must leave a complete local route atlas, route list, place links, route combinations, and visited toggles usable.
- Weather is requested only on place details, cached locally, and never blocks local content.
- Do not fetch or auto-refresh hotspot editorial content; ship the seven supplied highlights as local data.
- Do not deploy or publish externally in this implementation pass; provide static-host deployment instructions in README.

## File Structure

```text
qinggan-travel-handbook/
├─ public/
│  ├─ maps/china-outline.geojson
│  └─ images/photo-guide/*.png
├─ scripts/extract-china-geojson.mjs
├─ src/
│  ├─ assets/base.css
│  ├─ components/common/{AppHeader,BottomNav,SectionHeading,VisitedToggle}.vue
│  ├─ components/intro/IntroJourney.vue
│  ├─ components/map/{FallbackRouteAtlas,MapPlaceSheet,RouteMap}.vue
│  ├─ components/place/{PlaceCard,PlaceFacts,PlaceSections}.vue
│  ├─ components/weather/WeatherPanel.vue
│  ├─ data/{combinations,highlights,photoGuides,places,preparation,route}.ts
│  ├─ router/index.ts
│  ├─ services/{amap,storage,weather}.ts
│  ├─ stores/{intro,visited}.ts
│  ├─ types/content.ts
│  ├─ views/{Footprints,Highlights,Home,Intro,Map,NotFound,PhotoGuide,PlaceDetail,Places,Preparation}View.vue
│  ├─ App.vue
│  └─ main.ts
├─ tests/{content,intro-store,storage,visited-store,weather}.spec.ts
├─ .env.example
├─ index.html
├─ package.json
├─ tsconfig*.json
├─ vite.config.ts
└─ README.md
```

---

### Task 1: Scaffold the Vue application and verification harness

**Files:**
- Create: `qinggan-travel-handbook/package.json`
- Create: `qinggan-travel-handbook/index.html`
- Create: `qinggan-travel-handbook/tsconfig.json`
- Create: `qinggan-travel-handbook/tsconfig.app.json`
- Create: `qinggan-travel-handbook/tsconfig.node.json`
- Create: `qinggan-travel-handbook/vite.config.ts`
- Create: `qinggan-travel-handbook/src/main.ts`
- Create: `qinggan-travel-handbook/src/App.vue`
- Create: `qinggan-travel-handbook/src/router/index.ts`
- Create: `qinggan-travel-handbook/src/assets/base.css`

**Interfaces:**
- Produces: `router: Router`, a mounted Pinia instance, global CSS tokens, and scripts `dev`, `build`, `type-check`, `test`, `test:run`.

- [ ] **Step 1: Create the package manifest and TypeScript/Vite configuration**

Use exact dependencies: `vue`, `vue-router`, `pinia`, `gsap`, `lucide-vue-next`; exact dev tools: `vite`, `typescript`, `vue-tsc`, `@vitejs/plugin-vue`, `vitest`, `jsdom`, `@vue/test-utils`, `topojson-client`, `world-atlas`, and `@types/topojson-client`.

- [ ] **Step 2: Add the app entry and route table**

Define named routes for `/intro`, `/`, `/map`, `/places`, `/places/:slug`, `/photo-guide`, `/highlights`, `/footprints`, `/preparation`, and a catch-all. Lazy-load every view except Home.

- [ ] **Step 3: Add the global visual tokens**

Define `--sand-50`, `--sand-100`, `--sky`, `--lake`, `--sunset`, `--ink`, `--muted`, `--paper`, `--line`, `--shadow`, `--serif`, and `--sans`. Set the body to 17px, high contrast, and a subtle paper texture made with CSS gradients.

- [ ] **Step 4: Install and verify the empty shell**

Run: `npm install`

Run: `npm run type-check && npm run build`

Expected: both commands exit 0 and Vite emits `dist/`.

- [ ] **Step 5: Commit**

```powershell
git add -- qinggan-travel-handbook/package.json qinggan-travel-handbook/package-lock.json qinggan-travel-handbook/index.html qinggan-travel-handbook/tsconfig*.json qinggan-travel-handbook/vite.config.ts qinggan-travel-handbook/src
git commit -m "chore: scaffold qinggan travel handbook"
```

### Task 2: Define typed content and all local editorial data

**Files:**
- Create: `qinggan-travel-handbook/src/types/content.ts`
- Create: `qinggan-travel-handbook/src/data/places.ts`
- Create: `qinggan-travel-handbook/src/data/route.ts`
- Create: `qinggan-travel-handbook/src/data/combinations.ts`
- Create: `qinggan-travel-handbook/src/data/highlights.ts`
- Create: `qinggan-travel-handbook/src/data/photoGuides.ts`
- Create: `qinggan-travel-handbook/src/data/preparation.ts`
- Create: `qinggan-travel-handbook/tests/content.spec.ts`

**Interfaces:**
- Produces: `Place`, `RouteStop`, `RouteCombination`, `Highlight`, `PhotoSceneGuide`, `PreparationItem`, `places`, `placeBySlug`, `routeStops`, `routeCombinations`, `highlights`, `photoGuides`, `preparationItems`.

- [ ] **Step 1: Write failing data-integrity tests**

```ts
import { describe, expect, it } from 'vitest'
import { places } from '../src/data/places'

describe('place content', () => {
  it('contains 16 unique complete places', () => {
    expect(places).toHaveLength(16)
    expect(new Set(places.map((place) => place.id)).size).toBe(16)
    expect(new Set(places.map((place) => place.slug)).size).toBe(16)
    for (const place of places) {
      expect(place.name.length).toBeGreaterThan(1)
      expect(place.conventionalPlay.length).toBeGreaterThan(0)
      expect(place.unconventionalPlay.length).toBeGreaterThan(0)
      expect(place.soloPoses).toHaveLength(3)
      expect(place.coordinates[0]).toBeGreaterThanOrEqual(73)
      expect(place.coordinates[0]).toBeLessThanOrEqual(136)
      expect(place.coordinates[1]).toBeGreaterThanOrEqual(18)
      expect(place.coordinates[1]).toBeLessThanOrEqual(54)
    }
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm run test:run -- tests/content.spec.ts`

Expected: FAIL because typed data modules do not exist.

- [ ] **Step 3: Implement the content types**

Define string unions for six categories and A/B/C confidence. `Place` must contain every detail field from the approved spec; arrays remain arrays so sections can render generically.

- [ ] **Step 4: Author all 16 place records and route data**

Include Xining, Kumbum Monastery, Menyuan/Gangshika, Biandukou, Zhangye Danxia, Jiayuguan Pass, Son of the Earth, Boundless, Mogao, Mingsha/Crescent Spring, Boluo Zhuanjing, G315 U-road, Wusute Water Yadan, Dachaidan Emerald Lake, Chaka Salt Lake, and Qinghai Lake. Use non-commanding route-combination language and no fixed day labels.

- [ ] **Step 5: Author the seven highlights, eight photo scenes, and preparation list**

Keep every record local. Include the fixed six-person minimum formula and two-main-colors-plus-one-accent clothing palettes.

- [ ] **Step 6: Run the integrity tests**

Run: `npm run test:run -- tests/content.spec.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add -- qinggan-travel-handbook/src/types qinggan-travel-handbook/src/data qinggan-travel-handbook/tests/content.spec.ts
git commit -m "feat: add structured qinggan travel content"
```

### Task 3: Build resilient browser storage and Pinia state

**Files:**
- Create: `qinggan-travel-handbook/src/services/storage.ts`
- Create: `qinggan-travel-handbook/src/stores/visited.ts`
- Create: `qinggan-travel-handbook/src/stores/intro.ts`
- Create: `qinggan-travel-handbook/tests/storage.spec.ts`
- Create: `qinggan-travel-handbook/tests/visited-store.spec.ts`
- Create: `qinggan-travel-handbook/tests/intro-store.spec.ts`

**Interfaces:**
- Produces: `readJson<T>(key, fallback): T`, `writeJson(key, value): boolean`, `useVisitedStore()` with `visitedIds`, `count`, `isVisited`, `toggle`, `useIntroStore()` with `hasSeenIntro`, `complete`, `reset`.

- [ ] **Step 1: Write failing storage and store tests**

Test valid JSON, corrupt JSON fallback, write failure, visited toggle persistence, refresh hydration, intro completion, and replay reset. Use `setActivePinia(createPinia())` per test.

- [ ] **Step 2: Run and verify failure**

Run: `npm run test:run -- tests/storage.spec.ts tests/visited-store.spec.ts tests/intro-store.spec.ts`

Expected: FAIL because services and stores are absent.

- [ ] **Step 3: Implement tolerant storage helpers**

Wrap both `localStorage.getItem` and `setItem` in `try/catch`; return the fallback or `false` without throwing.

- [ ] **Step 4: Implement versioned stores**

Use `westward:v1:visited` and `westward:v1:intro-seen`. Keep an in-memory state even if persistence fails.

- [ ] **Step 5: Run tests and commit**

Run: `npm run test:run -- tests/storage.spec.ts tests/visited-store.spec.ts tests/intro-store.spec.ts`

Expected: PASS.

```powershell
git add -- qinggan-travel-handbook/src/services/storage.ts qinggan-travel-handbook/src/stores qinggan-travel-handbook/tests
git commit -m "feat: persist intro and visited status locally"
```

### Task 4: Build the shell, intro journey, and responsive navigation

**Files:**
- Create: `qinggan-travel-handbook/src/components/common/AppHeader.vue`
- Create: `qinggan-travel-handbook/src/components/common/BottomNav.vue`
- Create: `qinggan-travel-handbook/src/components/common/VisitedToggle.vue`
- Create: `qinggan-travel-handbook/src/components/common/SectionHeading.vue`
- Create: `qinggan-travel-handbook/src/components/intro/IntroJourney.vue`
- Create: `qinggan-travel-handbook/src/views/IntroView.vue`
- Create: `qinggan-travel-handbook/src/views/NotFoundView.vue`
- Modify: `qinggan-travel-handbook/src/App.vue`
- Modify: `qinggan-travel-handbook/src/router/index.ts`
- Create: `qinggan-travel-handbook/scripts/extract-china-geojson.mjs`
- Create: `qinggan-travel-handbook/public/maps/china-outline.geojson`

**Interfaces:**
- Consumes: `useIntroStore`, `useVisitedStore`.
- Produces: reusable navigation, `VisitedToggle` with props `{ placeId: string; compact?: boolean }`, intro replay through query `?replay=1`.

- [ ] **Step 1: Generate the local China outline**

Use `world-atlas/countries-110m.json` plus `topojson-client.feature`, select ISO numeric id `156`, write one GeoJSON Feature to `public/maps/china-outline.geojson`, and commit the generated local file.

- [ ] **Step 2: Implement the intro canvas and GSAP timeline**

Load local GeoJSON, project its coordinates into a canvas, then animate Hangzhou stamp, flight arc, Xining arrival, six abstract traveler figures, minivan, route glow, title, and CTA. Keep skip visible throughout; respect `prefers-reduced-motion` with a short fade.

- [ ] **Step 3: Add route guard behavior**

On first app visit redirect `/` to `/intro`; after complete/skip return Home. A replay link explicitly opens `/intro?replay=1` without clearing visited state.

- [ ] **Step 4: Implement navigation and responsive shell**

Phone: fixed five-item bottom navigation. At 720px and above: compact top navigation and magazine canvas. All controls have 44px minimum target size and clear focus states.

- [ ] **Step 5: Type-check and commit**

Run: `npm run type-check`

Expected: exit 0.

```powershell
git add -- qinggan-travel-handbook/public/maps qinggan-travel-handbook/scripts qinggan-travel-handbook/src/components qinggan-travel-handbook/src/views/IntroView.vue qinggan-travel-handbook/src/views/NotFoundView.vue qinggan-travel-handbook/src/App.vue qinggan-travel-handbook/src/router
git commit -m "feat: add animated travel prologue and app shell"
```

### Task 5: Build Home, Places, and Place Detail from local data

**Files:**
- Create: `qinggan-travel-handbook/src/components/place/PlaceCard.vue`
- Create: `qinggan-travel-handbook/src/components/place/PlaceFacts.vue`
- Create: `qinggan-travel-handbook/src/components/place/PlaceSections.vue`
- Create: `qinggan-travel-handbook/src/views/HomeView.vue`
- Create: `qinggan-travel-handbook/src/views/PlacesView.vue`
- Create: `qinggan-travel-handbook/src/views/PlaceDetailView.vue`

**Interfaces:**
- Consumes: `places`, `placeBySlug`, `routeCombinations`, `VisitedToggle`, `WeatherPanel` once Task 6 supplies it.
- Produces: URL filter `?category=<PlaceCategory|all>`, generic detail renderer, internal place links.

- [ ] **Step 1: Implement the magazine Home composition**

Use a large title spread, horizontal route folio, visited count stamp, primary map entry, and editorial links to guide, photo guide, highlights, footprints, and preparation. Do not show weather or a calendar on Home.

- [ ] **Step 2: Implement filtered Places**

Render all places from data, sync category filter with URL query, preserve keyboard access, and use a two-column editorial grid at 720–1024px with deliberate variation in card spans.

- [ ] **Step 3: Implement Place Detail**

Render all required sections generically, use a facts rail beside narrative content on unfolded screens, and one column on phones. Place the visited toggle near the headline and at the end of long content.

- [ ] **Step 4: Verify navigation and commit**

Run: `npm run type-check && npm run build`

Expected: exit 0.

```powershell
git add -- qinggan-travel-handbook/src/components/place qinggan-travel-handbook/src/views/HomeView.vue qinggan-travel-handbook/src/views/PlacesView.vue qinggan-travel-handbook/src/views/PlaceDetailView.vue
git commit -m "feat: add magazine home and place guides"
```

### Task 6: Add live place weather with local cache and graceful failure

**Files:**
- Create: `qinggan-travel-handbook/src/services/weather.ts`
- Create: `qinggan-travel-handbook/src/components/weather/WeatherPanel.vue`
- Create: `qinggan-travel-handbook/tests/weather.spec.ts`
- Modify: `qinggan-travel-handbook/src/views/PlaceDetailView.vue`

**Interfaces:**
- Produces: `getPlaceWeather(placeId, coordinates, options?): Promise<WeatherResult>`, `WeatherResult` with `status`, `updatedAt`, `current`, `daily`, and `isCached`.

- [ ] **Step 1: Write failing weather tests**

Cover a successful Open-Meteo response, six-hour cache reuse, timeout with cache fallback, and failure without cache. Mock `fetch`, fake timers, and `localStorage`.

- [ ] **Step 2: Run and verify failure**

Run: `npm run test:run -- tests/weather.spec.ts`

Expected: FAIL because `getPlaceWeather` is absent.

- [ ] **Step 3: Implement the weather adapter**

Request current temperature, apparent temperature, precipitation probability, weather code, wind speed, daily high/low, sunrise, and sunset from Open-Meteo with `timezone=auto`. Abort after 8 seconds. Store successful results in `westward:v1:weather-cache`.

- [ ] **Step 4: Build the compact WeatherPanel**

Show today plus the next three days, update time, cached badge when relevant, and a quiet unavailable state. Use Chinese labels and no recommendation that forces itinerary order.

- [ ] **Step 5: Run tests and commit**

Run: `npm run test:run -- tests/weather.spec.ts && npm run type-check`

Expected: PASS and exit 0.

```powershell
git add -- qinggan-travel-handbook/src/services/weather.ts qinggan-travel-handbook/src/components/weather qinggan-travel-handbook/src/views/PlaceDetailView.vue qinggan-travel-handbook/tests/weather.spec.ts
git commit -m "feat: add cached place weather"
```

### Task 7: Add AMap route view and complete local fallback atlas

**Files:**
- Create: `qinggan-travel-handbook/src/services/amap.ts`
- Create: `qinggan-travel-handbook/src/components/map/RouteMap.vue`
- Create: `qinggan-travel-handbook/src/components/map/FallbackRouteAtlas.vue`
- Create: `qinggan-travel-handbook/src/components/map/MapPlaceSheet.vue`
- Create: `qinggan-travel-handbook/src/views/MapView.vue`
- Create: `qinggan-travel-handbook/.env.example`

**Interfaces:**
- Produces: `loadAMap({ key, securityCode, timeoutMs }): Promise<AMapNamespace>`, `RouteMap` events `select(placeId)` and `failed`, fallback props `{ places, routeStops, visitedIds }`.

- [ ] **Step 1: Implement the AMap loader**

Set `_AMapSecurityConfig.securityJsCode` before appending the v2 loader script. Deduplicate concurrent loads, reject missing keys immediately, and reject after 10 seconds.

- [ ] **Step 2: Render the real map route**

Draw Hangzhou–Xining flight relation, the Qinggan loop polyline, visited/unvisited markers, and highlight markers. Selecting a marker opens `MapPlaceSheet` with detail and toggle actions.

- [ ] **Step 3: Build the full fallback route atlas**

Use a CSS/canvas geographic panel derived from route coordinates, clickable numbered markers, the full ordered route list, all six route combinations, and visited toggles. Label it “路线示意，非导航地图” and add “重新加载真实地图”.

- [ ] **Step 4: Add environment documentation and verify missing-key fallback**

Set `.env.example` keys `VITE_AMAP_KEY=` and `VITE_AMAP_SECURITY_CODE=`. Run the app without them and confirm Map renders the fallback without console exceptions.

- [ ] **Step 5: Build and commit**

Run: `npm run type-check && npm run build`

Expected: exit 0.

```powershell
git add -- qinggan-travel-handbook/src/services/amap.ts qinggan-travel-handbook/src/components/map qinggan-travel-handbook/src/views/MapView.vue qinggan-travel-handbook/.env.example
git commit -m "feat: add amap route and local atlas fallback"
```

### Task 8: Integrate the supplied photo pack and supporting editorial pages

**Files:**
- Create: `qinggan-travel-handbook/public/images/photo-guide/*.png`
- Create: `qinggan-travel-handbook/src/views/PhotoGuideView.vue`
- Create: `qinggan-travel-handbook/src/views/HighlightsView.vue`
- Create: `qinggan-travel-handbook/src/views/PreparationView.vue`

**Interfaces:**
- Consumes: `photoGuides`, `highlights`, `preparationItems`.
- Produces: image path mapping keyed by `cover`, four category overviews, twelve place examples, and `six-person`.

- [ ] **Step 1: Copy the complete supplied pack into publishable assets**

Copy all PNG files from `C:\Users\81421\Desktop\青甘大环线_拍照姿势图包_01-16完整版\青甘大环线_拍照姿势图包_01-16完整版` into `public/images/photo-guide/` with stable ASCII filenames. Preserve the source images without editing.

- [ ] **Step 2: Build PhotoGuide**

Use the cover as the opening folio, overview images as category dividers, place images as swipeable editorial plates, and the six-person image beside the minimum formula. Show each scene’s lens, three poses, group composition, common errors, and clothing colors from data.

- [ ] **Step 3: Build Highlights and Preparation**

Render all seven supplied highlights with A/B/C confidence and restrained notes. Render the preparation checklist as read-only editorial sections; do not add checkbox persistence or reminders.

- [ ] **Step 4: Verify layout and commit**

Run: `npm run type-check && npm run build`

Expected: exit 0.

```powershell
git add -- qinggan-travel-handbook/public/images/photo-guide qinggan-travel-handbook/src/views/PhotoGuideView.vue qinggan-travel-handbook/src/views/HighlightsView.vue qinggan-travel-handbook/src/views/PreparationView.vue
git commit -m "feat: add photo guide and route extras"
```

### Task 9: Build Footprints and complete cross-page interaction

**Files:**
- Create: `qinggan-travel-handbook/src/views/FootprintsView.vue`
- Modify: `qinggan-travel-handbook/src/components/common/VisitedToggle.vue`
- Modify: `qinggan-travel-handbook/src/views/HomeView.vue`
- Modify: `qinggan-travel-handbook/src/views/MapView.vue`
- Modify: `qinggan-travel-handbook/src/views/PlacesView.vue`

**Interfaces:**
- Consumes: `useVisitedStore`, `places`.
- Produces: computed `visitedPlaces` in route order and an empty state linking to Map and Places.

- [ ] **Step 1: Implement Footprints**

Show only visited places, explored count, a stamped mini route, and no date, note, photo, score, or timeline.

- [ ] **Step 2: Verify toggles from every surface**

Toggle a place on Map, Places, and Place Detail; confirm Home count and Footprints update immediately and survive a refresh.

- [ ] **Step 3: Run tests and commit**

Run: `npm run test:run && npm run type-check`

Expected: all tests pass and type-check exits 0.

```powershell
git add -- qinggan-travel-handbook/src/views/FootprintsView.vue qinggan-travel-handbook/src/views/HomeView.vue qinggan-travel-handbook/src/views/MapView.vue qinggan-travel-handbook/src/views/PlacesView.vue qinggan-travel-handbook/src/components/common/VisitedToggle.vue
git commit -m "feat: complete local travel footprints"
```

### Task 10: Responsive polish, documentation, and final verification

**Files:**
- Modify: `qinggan-travel-handbook/src/assets/base.css`
- Modify: responsive styles in all view and component files
- Create: `qinggan-travel-handbook/README.md`

**Interfaces:**
- Produces: final production build and operator documentation.

- [ ] **Step 1: Complete the three responsive states**

Check 390px phone, 820px unfolded/small-tablet primary layout, and 1440px desktop. At 820px ensure Home, Map, Places, PhotoGuide, and Place Detail use deliberate wide-magazine compositions instead of merely enlarged phone cards.

- [ ] **Step 2: Complete interaction and accessibility states**

Verify keyboard focus, 44px targets, color contrast, reduced motion, safe-area padding, image aspect-ratio reservation, route focus visibility, and no horizontal overflow.

- [ ] **Step 3: Scan forbidden scope and hidden persona terms**

Run:

```powershell
rg -n "登录|注册|上传|同步照片|旅行笔记|评分|Day [0-9]|50.?60|中老年|适老|领导专属" src
```

Expected: no matches in user-visible implementation.

- [ ] **Step 4: Write README**

Document install/start, AMap key and security code, local fallback behavior, place-content editing, photo asset replacement, Open-Meteo behavior, deployment to static SPA hosting with history fallback, and `localStorage` keys. State that photos are bundled viewing assets and no user photos are uploaded or synchronized.

- [ ] **Step 5: Run the full release checks**

Run: `npm run test:run`

Run: `npm run type-check`

Run: `npm run build`

Run: `git diff --check`

Expected: all exit 0.

- [ ] **Step 6: Commit**

```powershell
git add -- qinggan-travel-handbook
git commit -m "docs: finish qinggan handbook delivery"
```

## Execution Mode

The user explicitly asked to continue without further scope questions, so this plan will be executed inline in the current task using `superpowers:executing-plans` with milestone verification after data/state, map/weather, and final UI phases.
