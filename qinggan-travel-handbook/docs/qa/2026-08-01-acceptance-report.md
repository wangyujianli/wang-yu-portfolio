# 《向西而行》完整版内部验收记录

验收日期：2026-08-01  
验证环境：Windows、Node.js 24.15.0、npm 11.12.1、Vite 8.2.0  
视觉基准：390×844、820×1180、1440×1000

## 结论

工程、功能、内容、视觉、发布五个验收关均已执行。除正式高德 JS API Key 未由使用方提供、因此无法对真实账号配额与域名白名单做线上实证外，应用功能完整；无 Key 和加载失败时会进入完整本地路线图文版。高德加载器的已有实例、脚本成功、安全密钥、脚本失败、无 Key 与失败后重试均有自动测试。

## 第一关：工程

结果：通过。

- Vue 3、Vite、TypeScript、Vue Router、Pinia、GSAP、Lucide Vue 已接入。
- 内容、服务、状态、组件和页面分层清晰。
- 中国轮廓为本地 GeoJSON；核心页面不依赖地图服务启动。
- `npm run type-check`：通过。
- `npm run test:run`：14 个测试文件、41 项测试全部通过。
- `npm run build`：通过，生产资源输出到 `dist/`。
- `npm audit --omit=dev`：生产依赖 0 个已知漏洞。

## 第二关：功能

结果：通过。

浏览器实测：

- 首次序章具备“跳过序章”，点击后进入首页；首页保留“重播序章”。
- 地图无 Key 时自动显示本地图文路线；16 个编号点位可打开正确地点卡片。
- 西宁“未去”切换为“已去过”后刷新仍保留，足迹页同步显示 `1 / 16`。
- 地点分类切换到“湖泊盐湖”后，URL 保存 `category` 参数，并只显示 3 处地点。
- 推荐等级切换到“核心必看”后，URL 保存 `priority=core`，只显示 7 处对应地点；与类别筛选可取交集。
- 西宁天气成功返回当前天气与四日预报；刷新后显示“六小时内的本地缓存”。
- Home、Map、Places、PlaceDetail、PhotoGuide、Highlights、Footprints、Preparation、Intro 均可直接访问。
- 浏览器控制台错误与警告：0。

自动测试覆盖：

| 能力 | 成功 | 失败 | 无 Key / 无缓存 | 缓存与恢复 |
| --- | --- | --- | --- | --- |
| 高德地图加载器 | 已有实例与脚本成功 | 脚本错误并可重试 | 缺少 Key 立即降级 | 本地 GeoJSON 与图文路线始终可用 |
| 天气 | Open-Meteo 响应映射 | 请求失败 | 无缓存返回不可用状态 | 六小时新鲜缓存与失败后的旧缓存 |
| localStorage | 状态写入与刷新恢复 | 写入异常不中断页面 | 损坏 JSON 回退 | Intro、足迹、天气分键保存 |

## 第三关：内容

结果：通过。

- 16 个地点均由 `src/data/places.ts` 结构化渲染，必填字段、坐标、id 与 slug 由测试校验。
- 16 个地点均具有 `PlaceValue`：50 至 100 字的停留理由、独特性、适合标签、五档推荐等级与时间紧时的取舍建议；五档均有真实地点分布。
- 游览价值文案扫描未发现“景色优美、值得打卡、不容错过、令人流连忘返、网红必去”等空泛营销措辞。
- 6 组顺路组合、8 类摄影指南、7 项沿途彩蛋与 8 项准备复核内容完整。
- 18 张用户提供的拍照姿势图已筛选并以稳定文件名打包；页面另有结构化动作、镜头与穿搭配色补充。
- 16 个地点均配有独立的本地风景图，地点列表、详情页与地图卡片共用结构化图片字段；文件存在性、唯一性和替代文本由测试校验。
- 地点图片来源、作者与许可说明记录在 `docs/media/place-image-sources.md`。
- 出发前确认中心由 8 张结构化主题卡生成，完整覆盖确认时间、三条摘要、分组清单、第一方官网、可复制微信名称、直拨电话和信息整理时间。
- 莫高窟、鸣沙山和茶卡外链只指向已核对的官方入口；水上雅丹未生成未确认的“官网”按钮。
- 健康危险信号使用独立红棕色边框，并提供 120 直拨和“一般旅行安全信息不能代替医生诊断”说明。
- 内容扫描未发现年龄、内部身份、固定 Day 行程或命令式禁令标签。
- 黑独山、野生动物、宗教场所、无人机和临时开放信息使用事实、现场规定与得体建议表达。
- 不存在登录、后台、笔记、照片上传、照片同步、实时定位、导航、支付或社交分享入口。

## 第四关：视觉

结果：通过。

- 390px：普通手机单栏、底部五入口导航、地点卡和路线图正常滚动。
- 820px：展开屏/小平板采用杂志双栏、宽幅封面、地图与路线索引并排。
- 1440px：桌面端延续跨页杂志感，地图、拍照素材和长内容充分展开。
- 12 个页面/尺寸组合检查 `scrollWidth <= clientWidth`，无横向溢出。
- 地图密集点位经实测增加视觉偏移；桌面地点名改为悬停/聚焦显示，编号和右侧路线索引常驻。
- 首屏、序章、地图、地点天气和拍照宝典均有真实浏览器截图，不以代码判断代替视觉检查。
- 新增风景图在 820px 展开屏和 390px 普通手机实拍通过，详情主图读取到 1024×576 原图，控制台错误为 0。
- 出发前确认中心在 390px、820px、1440px 分别呈现一列、两列、三列；三个尺寸均满足 `scrollWidth <= clientWidth`。
- 移动端紧急按钮与底部导航保留 8px 间隔；紧急抽屉实际渲染 12 个 `tel:` 链接，微信复制在浏览器显示“已复制”，控制台错误与警告为 0。
- 首页路线价值模块在 820px 为三篇章卡，在 1440px 为“路线说明 + 三篇章”宽幅杂志布局；两种尺寸均无横向溢出。
- 地图底部卡片在 390px 先显示停留理由、推荐等级、停留时间与操作，再显示辅助图片；卡片关键操作在首屏可见。
- 地点列表在 390px 为单栏、820px 为双栏；两组横向筛选保留触摸滚动且隐藏视觉滚动条。
- 地点详情价值总览在 390px 为单栏、820px 为 12 栏拼版，五项判断顺序与数据一致，已去按钮保留在页面末尾。

关键截图：

- `screenshots/intro-820.png`
- `screenshots/home-820.png`
- `screenshots/map-fallback-820.png`
- `screenshots/place-detail-weather-820.png`
- `screenshots/home-390.png`
- `screenshots/home-1440.png`
- `screenshots/photo-guide-1440.png`
- `screenshots/places-scenic-820.png`
- `screenshots/places-scenic-390.png`
- `screenshots/place-scenic-detail-820.png`
- `screenshots/preparation-center-390.png`
- `screenshots/preparation-emergency-390.png`
- `screenshots/preparation-center-820.png`
- `screenshots/preparation-center-detail-820.png`
- `screenshots/preparation-center-1440.png`
- `screenshots/home-value-820.png`
- `screenshots/home-value-1440.png`
- `screenshots/map-value-sheet-390.png`
- `screenshots/places-priority-820.png`
- `screenshots/place-value-detail-820.png`

## 第五关：发布

结果：通过（高德正式 Key 为部署时可选配置）。

- `.env.example` 已提供 Key 与安全密钥变量。
- README 已说明启动、地图 Key、天气、内容修改、静态部署与 localStorage。
- SPA 的未知路径需要回退到 `index.html`，README 提供 Nginx、Netlify 等配置提示。
- 生产构建通过；构建产物不依赖后台服务。
- 正式目录此前已从无 `node_modules`、无旧 `dist` 的状态执行全新 `npm install`；本次增量修改后再次通过类型检查、41 项测试与生产构建，未增加依赖。

## 截图索引

| 页面 | 390px | 820px | 1440px |
| --- | --- | --- | --- |
| 首页 | `home-390.png` | `home-820.png`、`home-value-820.png` | `home-1440.png`、`home-value-1440.png` |
| 本地路线 | `map-fallback-390.png`、`map-value-sheet-390.png` | `map-fallback-820.png` | `map-fallback-1440.png` |
| 地点列表 | `places-scenic-390.png` | `places-scenic-820.png`、`places-priority-820.png` | — |
| 地点详情 | `place-detail-390.png` | `place-detail-weather-820.png`、`place-scenic-detail-820.png`、`place-value-detail-820.png` | — |
| 拍照宝典 | `photo-guide-390.png` | — | `photo-guide-1440.png` |
| 出发前确认中心 | `preparation-center-390.png`、`preparation-emergency-390.png` | `preparation-center-820.png`、`preparation-center-detail-820.png` | `preparation-center-1440.png` |
| 旅行序章 | — | `intro-820.png`、`intro-final-820.png` | — |
