# 向西而行｜2026 青甘大环线自由探索手册

一份为六人同行准备的私人数字旅行手册。它以地点、路线、拍照与沿途信息为主，不绑定固定日期，也不提供登录、后台、笔记、照片上传、导航或支付功能。

## 本地启动

建议使用 Node.js 24；最低请使用 Vite 8 支持的 Node.js 版本。

```bash
npm install
npm run dev
```

终端会显示本地访问地址，通常为 `http://localhost:5173`。首次访问会播放旅行序章；播放完成或跳过后，浏览器会记住该状态。首页右上角可随时重播。

常用检查命令：

```bash
npm run type-check
npm run test:run
npm run build
```

生产文件生成在 `dist/`。

## 配置高德地图

1. 复制 `.env.example` 为 `.env.local`。
2. 在高德开放平台创建 Web 端（JS API）应用。
3. 填入 Key 和安全密钥：

```ini
VITE_AMAP_KEY=你的_JS_API_Key
VITE_AMAP_SECURITY_CODE=你的安全密钥
```

4. 重新启动开发服务器。

没有填写 Key、脚本超时或高德服务暂不可用时，页面会自动打开完整的本地路线图文版。16 个地点、顺路组合、地点卡片和“已去过”切换都可继续使用。Intro 的中国轮廓来自 `public/maps/china-outline.geojson`，不依赖高德先加载。

## 天气更新

地点详情页会由浏览器直接请求 Open-Meteo 的当前天气与四日预报，不需要后台或私密令牌。成功数据在浏览器本地缓存六小时：

- 缓存有效时直接显示本地缓存，减少重复请求。
- 网络失败但有历史缓存时，显示上次成功数据与更新时间。
- 网络失败且没有缓存时，只显示克制的不可用提示，地点攻略仍可完整阅读。

## 修改地点与手册内容

内容和界面已经解耦，主要数据位于：

- `src/data/places.ts`：16 个地点的详情、经纬度、穿搭与预约信息。
- `src/data/route.ts`：杭州—西宁关系与青甘环线路线顺序。
- `src/data/combinations.ts`：顺路组合建议。
- `src/data/photoGuides.ts`：八类摄影方法、动作与配色。
- `src/data/highlights.ts`：沿途热点和彩蛋。
- `src/data/preparation.ts`：出发前建议复核。

字段类型统一定义在 `src/types/content.ts`。新增地点时，请同时保证 `id`、`slug` 唯一，并补齐合法坐标和路线引用；`npm run test:run` 会检查内容完整性。

拍照宝典图片位于 `public/images/photo-guide/`。替换时建议保持现有文件名，或同步修改 `src/data/photoGuides.ts` 中的路径。图片是随项目发布的参考素材，不包含用户照片上传或同步能力。

16 个地点的风景图位于 `public/images/places/`，来源与使用说明见 `docs/media/place-image-sources.md`。替换地点图时可保持原文件名；如果修改文件名，请同步调整 `src/data/places.ts` 中对应地点的 `image` 路径。

## 部署

这是一个纯静态 Vue 单页应用：

```bash
npm install
npm run build
```

将 `dist/` 上传到任意静态托管平台即可。部署平台需要把未知路径回退到 `index.html`，否则直接刷新 `/map` 或 `/places/xining` 会返回 404。

- Nginx：使用 `try_files $uri $uri/ /index.html;`。
- Netlify：增加重写规则 `/* /index.html 200`。
- Vercel、Cloudflare Pages 等平台：配置 SPA fallback/rewrite 到 `/index.html`。

若配置了高德地图，请同时在高德控制台加入正式域名白名单，并在部署平台设置 `VITE_AMAP_KEY` 与 `VITE_AMAP_SECURITY_CODE` 后重新构建。

## 本地状态如何保存

所有个人状态只存在当前浏览器的 `localStorage`：

- `westward:v1:visited`：各地点“已去过 / 未去”。
- `westward:v1:intro-seen`：序章是否已经看过。
- `westward:v1:weather-cache`：各地点天气缓存。

没有账号和云端同步。换浏览器、清理站点数据或使用另一台设备后，这些状态不会自动带过去；照片素材是应用内置内容，不会写入个人照片。

## 目录概览

```text
src/
├─ components/    通用、地图、地点、摄影与天气组件
├─ data/          全部结构化旅行内容
├─ router/        页面路由与首次序章逻辑
├─ services/      高德加载、天气和本地存储
├─ stores/        足迹与序章状态
├─ styles/        色彩、排版与响应式基础
├─ types/         内容与外部服务类型
└─ views/         Intro、Home、Map 等完整页面

public/
├─ images/photo-guide/  拍照宝典素材
├─ images/places/       16 个地点的风景图
└─ maps/                本地中国轮廓与地图素材
```

项目验收记录与浏览器截图位于 `docs/qa/`。
