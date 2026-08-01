# 向西而行｜青甘大环线旅行地图

一份为固定六人同行准备的私人数字旅行手册。网站以地点探索为主，九天路线只作为可切换参考；不提供登录、后台、笔记、照片上传、实时定位、站内预订、支付或社交功能。

## 本地启动

建议使用 Node.js 24。

```bash
npm install
npm run dev
```

终端会显示本地访问地址，通常为 `http://localhost:5173`。首次访问会播放约 9 秒的旅行序章，并在首次展示时立即记录；同一浏览器后续访问直接进入主内容，不提供重播入口。系统开启“减少动态效果”时会直接显示静态祝福与进入按钮。

完整检查命令：

```bash
npm run lint
npm run type-check
npm run test:run
npm run images:verify
npm run build
```

生产文件生成在 `dist/`。

## 配置高德地图

1. 复制 `.env.example` 为 `.env.local`。
2. 在高德开放平台创建 Web 端（JS API）应用。
3. 填入 Key 和安全密钥：

```ini
VITE_AMAP_JS_KEY=你的_JS_API_Key
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

4. 重新启动开发服务器。

未填写 Key、加载超时或高德服务暂不可用时，地图页会自动打开完整的本地图文路线。全部地点、四条参考路线、筛选、顺路组合、地点攻略和“已去过”切换仍可使用。序章使用本地日月山静态实景图，不依赖高德地图加载。

真实地图会同时保留杭州到西宁的航线与青甘路线，但默认取景只按当前青甘路线的地点和线路计算，不会为了显示杭州而把地图缩到全国范围。路线点会直接显示编号与地点名称；点击后仍打开地点价值卡片。

## 天气速查与影响提醒

天气模块不在前端请求高德天气、中国天气网接口或其他天气 API，也不显示温度、实时状态和伪造预报。页面只提供 11 个沿途节点的游览影响、穿衣、防晒防风提醒，以及前往中国天气网的查询入口：

- 西宁、门源、张掖、嘉峪关、敦煌。
- 水上雅丹、大柴旦、茶卡、青海湖。
- 格尔木、昆仑山口。

所有外部查询都在新窗口打开，并使用 `rel="noopener noreferrer"`。青海湖、水上雅丹和昆仑山口等无法用单一县城代表的地点，会明确说明外链采用的查询锚点及其局限。天气数据、地点映射和影响文案统一维护在 `src/data/weatherCheckpoints.ts`；展示组件位于 `src/components/weather/`。

本项目不需要也不接受 `VITE_WEATHER_KEY`、高德 Web 服务 Key或其他天气密钥。`VITE_AMAP_JS_KEY` 与 `VITE_AMAP_SECURITY_CODE` 仅供现有高德地图展示使用，天气模块不会读取。

## 地点、路线与行程内容

内容和界面已解耦，主要数据位于：

- `src/data/places.ts`：原有核心地点及统一补充字段。
- `src/data/extendedPlaces.ts`：青海藏文化博物院、日月山、德令哈、格尔木南线等新增地点。
- `src/data/journeyRoutes.ts`：经典环线、优选探索、格尔木延伸、茫崖延伸四条路线。
- `src/data/homeJourneyRoutes.ts`：首页两张主路线票券的定位、标签与重点景观。
- `src/data/nineDayItinerary.ts`：D1 至 D9 的参考路线与天气替代方案。
- `src/data/nearbyExplorations.ts`：按额外时间分组的周边可玩内容。
- `src/data/combinations.ts`：顺路组合建议。
- `src/data/photoGuides.ts`：八类摄影场景、动作与穿衣配色。
- `src/data/highlights.ts`：沿途热点和彩蛋。
- `src/data/preparation.ts`：出发前确认中心的主题卡、官方入口、联系电话与信息整理时间。
- `src/data/ticketBookings.ts`：30个地点的门票状态、预约等级、官方渠道、分类型电话、开园/停止售票/停止检票/最晚入园/闭园和内部项目时刻。
- `src/data/ticketChecklists.ts`：出发前确认中心的四组预约清单与正式景区开放时间速查范围。
- `src/data/placeContentPriorities.ts`：30个地点的编辑主题、页面气质，以及主讲/辅助/收起/隐藏模块。
- `src/data/localFood.ts`：按成熟补给节点复用的地方饮食与偏远地点补给提示。
- `src/data/souvenirs.ts`：只在合适地点出现的文化纪念与携带建议。
- `src/data/photoCheckpoints.ts`：每个地点的安全拍照点、构图、镜头、动作、穿衣配色与现场边界。

字段类型统一在 `src/types/content.ts`。新增地点时需要保持 `id` 与 `slug` 唯一，补齐合法坐标、`routeIds`、`placeTypes`、`experienceLevel`、`accommodationHubId`、天气替代、季节活动和信息复核日期。`npm run test:run` 会检查引用关系与内容完整性。

开放时间与票务没有使用固定价格，也不会显示“当前营业中”。明确核实到的时刻会拆分为开园、停止售票、停止检票或最晚入园、闭园；没有可靠时刻、按日落调整或官方页面存在冲突时，会保留“临行确认”。资料来源和仍待确认字段见 `docs/sources/ticket-opening-hours.md`。

## 出发前确认与地点内容权重

首页的主要入口顺序是 `/` → `/preparation` → `/map`。出发前确认中心先给出10个快速入口，再展开证件、衣物、防晒、饮食补给、健康与高海拔、车辆道路、摄影电子设备、天气预案和应急信息；页面底部回到探索地图，不把这些内容做成固定日程。

维护位置：

- `src/data/preparation.ts`：快速入口、详细准备指南和原有沿途重点确认卡。
- `src/components/preparation/`：确认工作台与杂志式分组呈现。
- `src/data/placeContentPriorities.ts`：地点页内容权重。`primary` 是本地点主叙事，`secondary` 保持完整，`compact` 默认显示摘要并可展开，`hidden` 不渲染也不预留空白。
- `src/data/localFood.ts`、`src/data/souvenirs.ts`、`src/data/photoCheckpoints.ts`：分别维护饮食补给、伴手礼和拍照点。
- `src/data/places.ts`：统一汇总上述数据，页面组件不直接写地点专属内容。

新增地点时，除原有字段外，还需在 `placeContentPriorities.ts` 建立唯一配置，在 `localFood.ts` 指定直接餐饮或相邻补给节点，在 `photoCheckpoints.ts` 至少设置一个合法、安全的拍照视角；只有确有地域文化对应时才在 `souvenirs.ts` 增加内容。资料口径见 `docs/sources/food-souvenir-photo.md`。

## 导入本地实景图片

导入脚本默认读取：

```text
C:\Users\81421\Desktop\青甘格尔木延伸线_实景图片参考包\青甘大环线_全部景点实景图片参考包
```

执行：

```bash
npm run images:import
```

脚本会递归扫描目录，根据文件夹与文件名映射地点，并生成：

- `public/assets/scenic/`：480、960、1600 三档 WebP。
- `src/data/scenicImages.ts`：自动生成的图片清单与 alt。
- `public/assets/scenic-import-report.json`：导入和排除记录。

当前还会从补充参考包读取顶层 `德令哈.png`：

```text
C:\Users\81421\Desktop\青甘\reference-assetsall-images\青甘大环线_全部景点实景图片参考包
```

补充路径可通过 `QINGGAN_SCENIC_SUPPLEMENTAL_SOURCE` 调整；脚本只合并白名单文件，不会把补充包中的其他旧图重复导入。

导入使用 Sharp 自动旋转、等比缩放并清除 EXIF 与定位信息，不改动、覆盖或重命名原始文件。目录中出现“来源、版权、授权、license、copyright、README”等说明时，整个对应目录只作为内部参考，不复制到公开资源。经使用者明确批准的单张图片可在 `scripts/lib/scenic-import.mjs` 的 `explicitlyApprovedFiles` 白名单中单独放行；不会因此放开同目录的其他来源图片。重新运行脚本只会重建项目内部的 `public/assets/scenic/`。

图片展示规则由 `src/components/scenic/ScenicGallery.vue` 自动判断：1 张为大图，2 至 3 张为手动轮播，4 张及以上增加缩略图与灯箱；轮播支持箭头、触摸滑动、键盘和圆点导航。

地点详情通过 `src/data/placeGalleryImages.ts` 统一取图：优先展示导入后的实景图集；暂未导入实景图集的地点会使用 `src/data/places.ts` 中已有的本地 `image` 封面作为主图，因此不会因为图片清单暂缺而出现空白画廊。

文件夹名称与顶层单图名称的映射维护在 `scripts/lib/scenic-import.mjs`。例如顶层的 `西宁.png`、`卓尔山.jpg`、`黑马河.png` 会直接归入相应地点；新增命名方式时只需补充映射，不需要修改页面组件。

拍照宝典素材位于 `public/images/photo-guide/`，页面由 `PhotoAdviceSpread.vue` 以宽幅旅行杂志版式展示。点击图片或“查看完整图”会打开全屏灯箱，以 `object-fit: contain` 完整显示原图，支持关闭按钮与 Esc。核心说明与可操作内容均以 HTML 重复呈现；素材图中的原有说明只作为构图示意，不承担唯一信息载体。

## 住宿数据与地点映射

住宿没有独立页面或全局入口，而是嵌在地点详情的预约与现场信息之后、顺路组合之前：

- `src/data/accommodations.ts`：住宿名称、位置、设施、注意事项、外部了解入口与更新时间。
- `src/data/accommodationHubs.ts`：西宁、门源、张掖、敦煌、大柴旦、德令哈、格尔木等复用节点。
- 地点通过 `accommodationHubId` 读取对应节点，每个节点最多显示 3 个侧重点不同的选择。
- 沿途停留点通过 `remoteStayAdvice` 说明更合适的住宿城市和原因。

页面不显示价格、促销、评分或站内支付。住宿图片使用 `loading="lazy"`，首屏只加载封面，展开抽屉后再加载其余图片。设施、门牌和运营状态变化后，应同步更新对应记录的 `updatedAt`。

## 页面与路由

- `/`：首页与路线价值说明。
- `/map`：真实地图、本地图文降级、四条参考路线和双维度筛选。
- `/places`、`/places/:slug`：地点列表与结构化攻略。
- `/photo-guide`：八类拍照宝典。
- `/itinerary`：九天参考路线。
- `/nearby`：周边可玩。
- `/highlights`：沿途彩蛋。
- `/footprints`：只显示已去过地点。
- `/preparation`：出发前确认中心。

`/amap-minimal-test` 仅用于地图成功、失败、无 Key 和缓存状态的开发检查，不出现在导航中。

## 本地状态

所有个人状态只存在当前浏览器的 `localStorage`：

- `westward:v1:visited`：各地点“已去过 / 未去”。
- `westward:v1:intro-seen`：序章首次展示时立即保存；同一浏览器后续访问不再自动出现。
- `westward:v1:selected-route`：地图上次选择的参考路线。
- 天气模块不写入 localStorage，也不会读取旧天气缓存。

没有账号和云端同步。换浏览器、清理站点数据或使用另一台设备后，这些状态不会自动带过去；应用不会读取或写入个人相册。

## 部署

这是一个纯静态 Vue 单页应用：

```bash
npm install
npm run build
```

将 `dist/` 上传到任意静态托管平台即可。平台需要把未知路径回退到 `index.html`，否则直接刷新详情路由会返回 404。

当前仓库在根目录的 `.github/workflows/deploy-pages.yml` 中配置了 GitHub Pages。推送到 `main` 后，GitHub Actions 会依次运行代码检查、测试、图片校验和生产构建；发布产物会保留原作品集首页，并把本手册部署到 `https://wangyujianli.github.io/wang-yu-portfolio/qinggan-travel-handbook/`。线上使用 Hash 路由，直接刷新详情页不依赖服务器回退。

- Nginx：`try_files $uri $uri/ /index.html;`
- Netlify：`/* /index.html 200`
- Vercel、Cloudflare Pages：配置 SPA fallback/rewrite 到 `/index.html`。

若配置高德地图，请在高德控制台加入正式域名白名单，并在部署环境填写 `VITE_AMAP_JS_KEY` 与 `VITE_AMAP_SECURITY_CODE` 后重新构建。

## 目录概览

```text
public/
├─ assets/scenic/          Web 优化实景图与导入报告
├─ assets/intro/           首次访问序章专用背景
├─ images/accommodations/  住宿环境示意与缺图占位
└─ images/photo-guide/     拍照宝典素材

scripts/
└─ import-scenic-images.mjs

src/
├─ components/             通用、地图、地点、摄影、住宿与天气组件
├─ data/                   结构化旅行内容与图片清单
├─ router/                 页面路由
├─ services/               剪贴板与本地存储
├─ stores/                 足迹、序章与参考路线状态
├─ types/                  内容和外部服务类型
└─ views/                  全部页面
```

浏览器截图与验收记录位于 `docs/qa/`，设计对照结论位于项目根目录 `design-qa.md`。
