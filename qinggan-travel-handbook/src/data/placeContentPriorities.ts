import type { PlaceContentPriority, PlaceModule, PlaceModuleLevel } from '@/types/content'

const priority = (
  editorialTheme: string,
  pageMood: string,
  primaryModules: PlaceModule[],
  secondaryModules: PlaceModule[],
  compactModules: PlaceModule[] = [],
  hiddenModules: PlaceModule[] = [],
  editorialIntro?: string,
): PlaceContentPriority => ({
  editorialTheme,
  pageMood,
  primaryModules,
  secondaryModules,
  compactModules,
  hiddenModules,
  editorialIntro,
})

export const placeContentPriorities: Record<string, PlaceContentPriority> = {
  xining: priority('进入高原之前，先读懂河湟生活。', '河湟城市札记', ['culture', 'food', 'health', 'accommodation'], ['photography', 'souvenir', 'booking'], ['weather']),
  'kumbum-monastery': priority('仍在延续的宗教与生活秩序。', '克制的寺院卷页', ['culture', 'booking', 'safety'], ['photography', 'souvenir'], ['food', 'accommodation']),
  'menyuan-gangshika': priority('季节、雪山与高原农业共同构成的风景。', '明亮的雪山花田', ['landscape', 'photography', 'weather'], ['road', 'safety'], ['food', 'accommodation'], ['souvenir']),
  biandukou: priority('从祁连山进入河西走廊的地理转场。', '公路地理折页', ['landscape', 'road', 'photography'], ['safety'], ['food'], ['souvenir', 'accommodation', 'activities']),
  'zhangye-danxia': priority('看见大地的层理和漫长地质尺度。', '大地层理画册', ['geology', 'photography', 'booking', 'weather'], ['activities', 'food', 'accommodation'], ['souvenir', 'safety']),
  'jiayuguan-pass': priority('将河西走廊和边塞防御变成可以行走的空间。', '边塞建筑专刊', ['culture', 'photography', 'booking'], ['food', 'souvenir', 'accommodation'], ['safety']),
  'son-of-earth': priority('公共艺术与戈壁尺度的反差。', '戈壁公共艺术页', ['photography', 'landscape', 'safety'], ['road'], [], ['food', 'souvenir', 'accommodation', 'booking']),
  boundless: priority('让阳光、风和戈壁穿过建筑。', '几何光影小品', ['photography', 'landscape'], ['road', 'safety'], [], ['food', 'souvenir', 'accommodation', 'booking']),
  'mogao-grottoes': priority('用有限的参观时间，理解千年丝路文明。', '丝路文明专刊', ['culture', 'booking', 'safety'], ['souvenir', 'photography'], ['food', 'accommodation'], ['activities']),
  'mingsha-crescent': priority('沙丘、绿洲与敦煌暮色共同完成的风景。', '暮色沙丘大片', ['photography', 'landscape', 'activities', 'booking', 'weather'], ['safety', 'food', 'accommodation'], ['souvenir', 'health']),
  'boluo-zhuanjing': priority('荒废空间里的电影与工业记忆。', '旧城电影分镜', ['culture', 'photography', 'safety'], ['booking', 'road'], [], ['food', 'souvenir', 'accommodation', 'activities']),
  'g315-u-road': priority('公路与荒原，而不是危险的网红机位。', '公路安全图册', ['road', 'safety', 'photography', 'weather'], ['health'], ['food', 'accommodation'], ['souvenir', 'activities']),
  'wusute-yadan': priority('水面让雅丹拥有了另一种表情。', '水岸雅丹画卷', ['geology', 'photography', 'booking', 'safety', 'accommodation'], ['weather', 'road'], ['food'], ['souvenir']),
  'dachaidan-emerald': priority('柴达木荒原里的天然色块。', '盐池色彩研究', ['landscape', 'photography', 'safety'], ['booking', 'accommodation', 'weather'], ['food'], ['souvenir']),
  'chaka-salt-lake': priority('天气和风决定天空是否落入盐湖。', '天空之镜摄影页', ['photography', 'weather', 'booking', 'safety'], ['activities', 'accommodation', 'souvenir'], ['food', 'health']),
  'qinghai-lake': priority('不是一个机位，而是一整段不断变化的高原湖岸。', '高原湖岸长卷', ['landscape', 'ecology', 'photography', 'safety'], ['booking', 'accommodation', 'weather', 'food'], ['souvenir', 'health']),
  'tibetan-culture-museum': priority('在进入藏区风景前，先补上一张文化底图。', '文化索引册', ['culture', 'booking', 'souvenir'], ['photography'], ['food', 'accommodation'], ['activities']),
  'riyue-mountain': priority('翻过山口，就进入另一种地理。', '山口转场页', ['landscape', 'culture', 'road', 'weather'], ['photography', 'booking'], [], ['souvenir', 'accommodation']),
  heimahe: priority('把宏大的青海湖变成具体的湖岸与清晨。', '湖岸晨光札记', ['landscape', 'photography', 'weather', 'accommodation'], ['safety', 'road'], ['food'], ['souvenir']),
  'qilian-grassland': priority('雪山、草地与公路持续展开的沿途体验。', '草原公路长卷', ['landscape', 'photography', 'road', 'weather'], ['safety'], ['food', 'accommodation'], ['souvenir']),
  'zhuoer-mountain': priority('从高处读懂祁连盆地。', '盆地全景画页', ['landscape', 'geology', 'photography', 'weather'], ['health', 'booking', 'accommodation'], ['food'], ['souvenir']),
  delingha: priority('长途路线中的城市停顿与恢复。', '城市休整手记', ['accommodation', 'food', 'road', 'health'], ['culture', 'weather'], ['photography', 'souvenir']),
  'lenghu-oil-town': priority('荒漠中被保留下来的工业年代。', '工业遗址档案', ['culture', 'photography', 'safety'], ['road', 'accommodation', 'booking'], [], ['food', 'souvenir', 'activities']),
  'black-mountain': priority('极简黑灰地貌，开放边界也是现场的一部分。', '黑灰极简边界页', ['safety', 'landscape', 'photography', 'road'], ['weather', 'accommodation'], ['health'], ['food', 'souvenir', 'activities'], '以当日合法开放区域为游览范围。比起复刻某个网络机位，更适合观察黑灰山体和戈壁之间的层次。'),
  'yanzhi-mountain': priority('与黑独山形成黑与红的地貌对照。', '红黑地貌对照页', ['landscape', 'photography', 'road'], ['safety', 'weather'], [], ['food', 'souvenir', 'accommodation', 'activities']),
  'qarhan-salt-lake': priority('盐湖、矿物生产与柴达木工业地理。', '工业盐湖观察册', ['geology', 'landscape', 'booking', 'photography', 'safety'], ['accommodation', 'road', 'souvenir'], ['food']),
  'queen-mother-lake': priority('昆仑山水与传统文化想象的相遇。', '昆仑山水古意页', ['culture', 'landscape', 'health', 'road'], ['photography', 'weather', 'accommodation'], ['booking'], ['souvenir', 'activities']),
  'kunlun-pass': priority('真实感受地势抬升和高原尺度。', '高海拔地理节点', ['health', 'road', 'safety', 'landscape'], ['photography', 'weather'], ['food', 'accommodation'], ['souvenir', 'activities']),
  'hoh-xil': priority('理解高寒荒原生态，而不是追逐网红动物。', '高寒荒原生态志', ['ecology', 'health', 'safety', 'road', 'weather'], ['photography', 'souvenir'], [], ['food', 'accommodation', 'activities', 'booking']),
  'tibetan-antelope': priority('尊重不确定性，远距离观察自然。', '远距离生态观察页', ['ecology', 'safety', 'photography'], ['health', 'road', 'weather'], [], ['food', 'souvenir', 'accommodation', 'activities', 'booking']),
}

export function contentPriorityFor(placeId: string): PlaceContentPriority {
  const value = placeContentPriorities[placeId]
  if (!value) throw new Error(`Missing PlaceContentPriority for ${placeId}`)
  return value
}

export function moduleLevelFor(config: PlaceContentPriority, module: PlaceModule): PlaceModuleLevel {
  if (config.primaryModules.includes(module)) return 'primary'
  if (config.secondaryModules.includes(module)) return 'secondary'
  if (config.compactModules.includes(module)) return 'compact'
  if (config.hiddenModules.includes(module)) return 'hidden'
  return 'secondary'
}
