# 地点分类增量调整验收报告

验收日期：2026-08-01
项目：《向西而行｜青甘大环线自由探索手册》

## 1. 本次修改文件

### 数据与类型

- `src/types/content.ts`
- `src/data/placeClassifications.ts`
- `src/data/places.ts`
- `src/data/extendedPlaces.ts`
- `src/data/journeyRoutes.ts`
- `src/data/journeyFilters.ts`

### 页面与组件

- `src/views/PlacesView.vue`
- `src/views/PlaceDetailView.vue`
- `src/views/MapView.vue`
- `src/views/FootprintsView.vue`
- `src/views/HomeView.vue`
- `src/components/place/PlaceCard.vue`
- `src/components/place/PlaceValueOverview.vue`
- `src/components/place/EcologyObservationSection.vue`
- `src/components/map/RouteMap.vue`
- `src/components/map/FallbackRouteAtlas.vue`
- `src/components/scenic/ScenicGallery.vue`

### 测试

- `tests/place-classification.spec.ts`
- `tests/place-classification-views.spec.ts`
- `tests/map-classification-view.spec.ts`
- `tests/footprints-classification.spec.ts`
- `tests/journey-map.spec.ts`
- `tests/route-map-view.spec.ts`
- 兼容更新：`tests/content.spec.ts`、`tests/places-filter.spec.ts`、`tests/place-value-views.spec.ts`

## 2. 新增字段

所有地点继续从原地点主数据渲染，仅新增 `classification`，没有建立第二套地点主数据：

- `priority`：地点保留优先级。
- `routeScope`：青甘主线、冷湖延伸或格尔木延伸。
- `placeRole`：地点在路线中的实际作用。
- `priorityReason`：为什么列为当前优先级。
- `routeReason`：为什么归入当前线路范围。
- `routeDecisionNote`：需要额外判断的线路条件。
- `seasonalNote`：受季节影响的补充说明。
- `isStandalone`：是否作为独立地点卡展示。
- `parentPlaceId`：生态观察子模块所归属的父地点。

## 3. 旧优先级迁移

旧字段保留供既有页面兼容，新分类通过单一映射转换，用户可见文案已同步：

| 旧值 | 新值 | 新文案 |
| --- | --- | --- |
| `core` | `core` | 核心必看 |
| `recommended` | `priority` | 优先安排 |
| `along-the-way` | `en-route` | 顺路可看 |
| `interest` | `interest` | 兴趣加选 |
| `optional` | `optional` | 时间紧可略 |

已去状态仍使用原地点 ID 作为 localStorage 键，不迁移、不清空；藏羚羊原状态也继续保留。

## 4. 30 个地点最终分类表

| 序号 | 地点（ID） | 优先级 | 线路范围 | 地点作用 | 独立显示 |
| ---: | --- | --- | --- | --- | --- |
| 01 | 西宁（`xining`） | 顺路可看 | 青甘主线 | 城市起点 | 是 |
| 02 | 塔尔寺（`kumbum-monastery`） | 优先安排 | 青甘主线 | 文化核心 | 是 |
| 03 | 门源油菜花与岗什卡雪峰（`menyuan-gangshika`） | 顺路可看 | 青甘主线 | 风景停留 | 是 |
| 04 | 扁都口（`biandukou`） | 顺路可看 | 青甘主线 | 路线体验 | 是 |
| 05 | 张掖七彩丹霞（`zhangye-danxia`） | 核心必看 | 青甘主线 | 核心景区 | 是 |
| 06 | 嘉峪关关城（`jiayuguan-pass`） | 核心必看 | 青甘主线 | 文化核心 | 是 |
| 07 | 瓜州大地之子（`son-of-earth`） | 顺路可看 | 青甘主线 | 沿途艺术 | 是 |
| 08 | 瓜州无界（`boundless`） | 时间紧可略 | 青甘主线 | 沿途艺术 | 是 |
| 09 | 莫高窟（`mogao-grottoes`） | 核心必看 | 青甘主线 | 文化核心 | 是 |
| 10 | 鸣沙山月牙泉（`mingsha-crescent`） | 核心必看 | 青甘主线 | 核心景区 | 是 |
| 11 | 博罗转井石油小镇（`boluo-zhuanjing`） | 兴趣加选 | 青甘主线 | 工业遗产 | 是 |
| 12 | G315 U形公路（`g315-u-road`） | 顺路可看 | 青甘主线 | 路线体验 | 是 |
| 13 | 乌素特水上雅丹（`wusute-yadan`） | 核心必看 | 青甘主线 | 核心景区 | 是 |
| 14 | 大柴旦翡翠湖（`dachaidan-emerald`） | 优先安排 | 青甘主线 | 核心景区 | 是 |
| 15 | 茶卡盐湖（`chaka-salt-lake`） | 优先安排 | 青甘主线 | 核心景区 | 是 |
| 16 | 青海湖（`qinghai-lake`） | 核心必看 | 青甘主线 | 核心景区 | 是 |
| 17 | 青海藏文化博物院（`tibetan-culture-museum`） | 兴趣加选 | 青甘主线 | 文化核心 | 是 |
| 18 | 日月山（`riyue-mountain`） | 顺路可看 | 青甘主线 | 风景停留 | 是 |
| 19 | 黑马河（`heimahe`） | 兴趣加选 | 青甘主线 | 风景停留 | 是 |
| 20 | 祁连山草原（`qilian-grassland`） | 优先安排 | 青甘主线 | 路线体验 | 是 |
| 21 | 卓尔山（`zhuoer-mountain`） | 兴趣加选 | 青甘主线 | 风景停留 | 是 |
| 22 | 德令哈（`delingha`） | 顺路可看 | 青甘主线 | 补给节点 | 是 |
| 23 | 冷湖石油小镇（`lenghu-oil-town`） | 兴趣加选 | 冷湖延伸 | 工业遗产 | 是 |
| 24 | 黑独山（`black-mountain`） | 优先安排 | 冷湖延伸 | 开放边界确认 | 是 |
| 25 | 胭脂山（`yanzhi-mountain`） | 时间紧可略 | 冷湖延伸 | 延伸探索 | 是 |
| 26 | 察尔汗盐湖（`qarhan-salt-lake`） | 优先安排 | 格尔木延伸 | 盐湖与工业地理 | 是 |
| 27 | 西王母瑶池（`queen-mother-lake`） | 兴趣加选 | 格尔木延伸 | 延伸探索 | 是 |
| 28 | 昆仑山口（`kunlun-pass`） | 优先安排 | 格尔木延伸 | 延伸探索 | 是 |
| 29 | 可可西里（`hoh-xil`） | 兴趣加选 | 格尔木延伸 | 生态观察 | 是 |
| 30 | 藏羚羊合法观察区域（`tibetan-antelope`） | 兴趣加选 | 格尔木延伸 | 生态观察 | 否，归入可可西里 |

## 5. 动态统计

统计由结构化数据计算，不在页面重复硬编码：

| 线路范围 | 核心必看 | 优先安排 | 顺路可看 | 兴趣加选 | 时间紧可略 | 生态子模块 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 青甘主线 | 6 | 4 | 7 | 4 | 1 | 0 |
| 冷湖延伸 | 0 | 1 | 0 | 1 | 1 | 0 |
| 格尔木延伸 | 0 | 2 | 0 | 2 | 0 | 1 |

独立地点卡共 29 张，另有 1 个生态观察子模块。

## 6. 藏羚羊处理

- 保留 `tibetan-antelope` 原地点记录与原 ID。
- 设置 `isStandalone: false`、`parentPlaceId: 'hoh-xil'`。
- 地点列表、地图固定图钉和足迹独立统计均不显示该记录。
- 原 localStorage 到访键不删除。
- 可可西里详情页新增“沿途可能出现的生态观察”，完整说明动物出现不确定、不提供固定坐标及远距离观察边界。

## 7. 筛选交互验证

- 全部线路：29 张独立地点卡。
- 青甘主线 + 核心必看：6 张，且恰为张掖丹霞、嘉峪关、莫高窟、鸣沙山、水上雅丹、青海湖。
- 冷湖延伸：3 张。
- 格尔木延伸：4 张独立地点卡，不含藏羚羊独立卡。
- 优先安排 + 格尔木延伸：2 张，为察尔汗盐湖和昆仑山口。
- URL 查询参数随筛选同步，刷新后筛选状态可复现。
- 390 × 844 普通手机宽度下两排按钮可横向滑动，页面无横向溢出。

## 8. 地图同步

- 青甘主线沿用实线。
- 冷湖延伸使用长虚线。
- 格尔木延伸使用较浅点线。
- 图例显示青甘主线、冷湖延伸、格尔木延伸、城市与补给、生态观察。
- 不为藏羚羊绘制固定图钉；生态信息归入可可西里。
- 真实地图与图文降级地图共用同一线路范围配置。

## 9. 截图证据

- [地点列表全部线路](./51-place-classification-all-routes.png)
- [青甘主线 + 核心必看](./52-place-classification-main-core.png)
- [冷湖延伸](./53-place-classification-lenghu-extension.png)
- [格尔木延伸](./54-place-classification-golmud-extension.png)
- [德令哈卡片](./55-place-card-delingha.png)
- [黑独山卡片](./56-place-card-black-mountain.png)
- [可可西里生态观察模块](./57-hoh-xil-ecology-observation.png)
- [普通手机地点筛选](./58-place-classification-mobile.png)
- [地图分类同步](./59-map-classification-sync.png)
- [普通手机详情画廊](./60-hoh-xil-mobile-detail.png)

## 10. 最终验证

最终命令结果：

- `npm run lint`：通过，0 warning。
- `npm run type-check`：通过。
- `npm run test:run`：36 个测试文件、127 项测试全部通过。
- `npm run build`：通过，Vite 成功生成生产包。
- `git diff --check`（本次相关受版本管理文件）：通过。
- 浏览器控制台：0 error。
- localStorage：实测切换“未去 → 已去”、刷新后仍为“已去”，再次切换后恢复原状态。
- 交叉筛选：桌面与手机均通过。
- 地图图例、三种线型与藏羚羊无固定图钉：通过。
- 1280 × 900 桌面、390 × 844 普通手机：通过；手机详情页无横向溢出。
