# Cinematic Intro Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, reviewable intro preview that uses the supplied Riyue Mountain MP4 as a muted cinematic background and presents route choice, along-route content, footprints, and blessing in one continuous frame.

**Architecture:** The preview stays isolated in `intro-preview.html` and does not alter Vue routing or application state. A copied MP4 under `public/assets/video/` supplies the background; semantic HTML, inline SVG, CSS state selectors, and a small timeline controller drive the 11-second sequence.

**Tech Stack:** HTML5 video, inline SVG, CSS transitions, vanilla JavaScript, existing local scenic media.

## Global Constraints

- Do not modify or overwrite the source MP4.
- Keep the video muted, looping, autoplaying, and `playsinline`.
- Use one continuous composition; no large floating card grid.
- Preview only; do not change Vue routes, stores, home page, map, or footprints.
- Represent only existing product capabilities: two routes, along-route content, and visited/unvisited state.
- Validate desktop and 390×844 without horizontal overflow.

---

### Task 1: Import and verify the video asset

**Files:**
- Create: `public/assets/video/intro-riyueshan.mp4`
- Preserve: `C:/Users/81421/Desktop/青甘格尔木延伸线_实景图片参考包/青甘大环线_全部景点实景图片参考包/日月山/85cd3a27c17a7b51643d5216843903ad.mp4`

**Interfaces:**
- Produces: `/assets/video/intro-riyueshan.mp4`, H.264 video usable by the preview `<video>` element.

- [ ] **Step 1: Create the destination directory and copy the source unchanged**

```powershell
New-Item -ItemType Directory -Force public/assets/video
Copy-Item -LiteralPath $source -Destination public/assets/video/intro-riyueshan.mp4
```

- [ ] **Step 2: Verify byte identity and browser-compatible codec**

```powershell
Get-FileHash $source
Get-FileHash public/assets/video/intro-riyueshan.mp4
ffprobe -v error -show_entries stream=codec_name,width,height -of json public/assets/video/intro-riyueshan.mp4
```

Expected: hashes match; video stream is H.264 at 568×320.

### Task 2: Rebuild the standalone single-frame preview

**Files:**
- Modify: `intro-preview.html`

**Interfaces:**
- Consumes: `public/assets/video/intro-riyueshan.mp4`.
- Produces: stages `opening`, `route-choice`, `travel-content`, `footprint`, and `blessing`; functions `renderStage(index)`, `advanceStage()`, `restartPreview()`.

- [ ] **Step 1: Replace the illustrated background and card layout**

Use a full-viewport `<video>` plus layered vignette, navy/gold color wash, grain, and a single inline SVG narrative route. Maintain one left-aligned editorial text column and one bottom route rail.

- [ ] **Step 2: Add the exact stage content**

```js
const stages = [
  { id: 'opening', duration: 1800 },
  { id: 'route-choice', duration: 2200 },
  { id: 'travel-content', duration: 3000 },
  { id: 'footprint', duration: 1800 },
  { id: 'blessing', duration: Number.POSITIVE_INFINITY },
]
```

Route choice shows gold “五星热门路线” and green “优选探索路线”. Travel content lights five inline icons and cycles three short explanations. Footprint changes one marker from gray to green and count from `12/30` to `13/30`.

- [ ] **Step 3: Add interaction and fallback behavior**

Blank-area click accelerates only the active stage. Controls stop propagation. `prefers-reduced-motion` displays the final static composition. Video failure leaves the color-wash background and all text usable.

- [ ] **Step 4: Validate inline script syntax**

```powershell
node -e "const fs=require('fs');const h=fs.readFileSync('intro-preview.html','utf8');const s=[...h.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)].at(-1)[1];new Function(s);console.log('OK')"
```

Expected: `OK`.

### Task 3: Review the preview visually

**Files:**
- Inspect: `intro-preview.html`
- Inspect: `public/assets/video/intro-riyueshan.mp4`

**Interfaces:**
- Produces: a user-visible local preview tab and a small verification record in the handoff message.

- [ ] **Step 1: Open the preview in a local browser**

Serve the project directory and open `/intro-preview.html`.

- [ ] **Step 2: Inspect the desktop sequence**

Check each stage in order, video crop, text contrast, route visibility, replay, skip, and console warnings/errors.

- [ ] **Step 3: Inspect 390×844**

Confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth`, title uses no more than two lines, body text is at least 14px, and the primary button remains inside the safe area.

- [ ] **Step 4: Leave the preview open for review**

Keep only the preview tab as the deliverable. Do not replace the production intro until the user approves the preview.
