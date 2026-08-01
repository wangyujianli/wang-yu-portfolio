import type { JourneyRoute } from '@/types/content'

export const journeyRoutes: JourneyRoute[] = [
  {
    id: 'classic',
    scope: 'main-route',
    name: '经典青甘环线',
    shortName: '经典环线',
    description: '从河湟谷地进入河西走廊，经敦煌与柴达木返回青海湖，九天参考路线以此为基础。',
    durationHint: '约 9 天，可自由增减',
    accent: '#c38a2f',
    placeIds: [
      'xining', 'tibetan-culture-museum', 'kumbum-monastery', 'menyuan-gangshika',
      'qilian-grassland', 'biandukou', 'zhangye-danxia', 'jiayuguan-pass',
      'son-of-earth', 'boundless', 'mogao-grottoes', 'mingsha-crescent',
      'boluo-zhuanjing', 'dachaidan-emerald', 'g315-u-road', 'wusute-yadan',
      'delingha', 'chaka-salt-lake', 'qinghai-lake', 'heimahe', 'riyue-mountain', 'xining',
    ],
  },
  {
    id: 'discovery',
    scope: 'main-route',
    name: '优选探索路线',
    shortName: '优选探索',
    description: '从日月山和青海湖进入柴达木，经公路、雅丹、黑色山体与石油遗址向敦煌和河西走廊展开，减少相似盐湖的重复。',
    durationHint: '约 8 至 9 天，可按兴趣删减',
    accent: '#6f875f',
    placeIds: [
      'xining', 'riyue-mountain', 'qinghai-lake', 'delingha', 'dachaidan-emerald',
      'g315-u-road', 'wusute-yadan', 'black-mountain', 'lenghu-oil-town',
      'mingsha-crescent', 'son-of-earth', 'zhangye-danxia', 'qilian-grassland', 'xining',
    ],
  },
  {
    id: 'golmud-extension',
    scope: 'golmud-extension',
    name: '格尔木与昆仑延伸',
    shortName: '格尔木延伸',
    description: '从德令哈向格尔木延伸，加入察尔汗盐湖、昆仑山口与可可西里合法观察路段。',
    durationHint: '在经典线外增加约 2 至 4 天',
    accent: '#2f5f8f',
    placeIds: [
      'delingha', 'qarhan-salt-lake', 'queen-mother-lake', 'kunlun-pass',
      'hoh-xil', 'tibetan-antelope', 'qinghai-lake',
    ],
  },
  {
    id: 'mangya-extension',
    scope: 'lenghu-extension',
    name: '冷湖方向延伸',
    shortName: '冷湖延伸',
    description: '从大柴旦向柴达木西部延伸，以冷湖工业遗址、黑灰山体和彩色荒原为主。',
    durationHint: '在经典线外增加约 2 至 4 天',
    accent: '#667451',
    placeIds: [
      'dachaidan-emerald', 'g315-u-road', 'wusute-yadan', 'black-mountain',
      'lenghu-oil-town', 'yanzhi-mountain',
    ],
  },
]

export const journeyRouteById = new Map(journeyRoutes.map((route) => [route.id, route]))
