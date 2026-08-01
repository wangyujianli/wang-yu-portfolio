import type { NearbyExploration, NearbyExplorationGroup } from '@/types/content'

interface NearbySource {
  id: string
  name: string
  reason: string
  extraTime: string
  start: string
  detour: string
  season?: string
  weather?: string
  spontaneous?: string
  reservation?: string
  boundary?: string
}

const nearby = (source: NearbySource): NearbyExploration => ({
  id: source.id,
  name: source.name,
  reason: source.reason,
  extraTime: source.extraTime,
  bestStartingPoint: source.start,
  detourNote: source.detour,
  season: source.season ?? '四季均可，景观表现随季节变化',
  weatherSensitivity: source.weather ?? '中等；能见度和风力会影响户外体验',
  spontaneous: source.spontaneous ?? '可在当天结合状态决定',
  reservationNote: source.reservation ?? '请在出发前查看景区官方公告',
  boundaryNote: source.boundary ?? '活动范围与拍摄要求以现场开放区域和提示为准',
})

export const nearbyExplorationGroups: NearbyExplorationGroup[] = [
  {
    id: 'along-the-way', label: '顺路增加', note: '通常约半小时至两小时；适合在天气、车程和兴致都合适时自然加入。',
    items: [
      nearby({ id: 'kumbum-monastery', name: '塔尔寺', reason: '用仍在运行的宗教空间补足青海人文线索。', extraTime: '约半天以内', start: '西宁', detour: '位于西宁周边，适合抵达日或离开西宁前组合', reservation: '到访前核对官方票务、讲解与开放院落' }),
      nearby({ id: 'biandukou', name: '扁都口', reason: '看祁连山口如何过渡到河西走廊，地理转场很清楚。', extraTime: '约半小时至一小时', start: '门源至张掖主线', detour: '主线沿途短停，不必专门往返', weather: '较高；低云会遮住山口层次' }),
      nearby({ id: 'boundless', name: '瓜州无界及雕塑群', reason: '在大地之子之外看到戈壁公共艺术的另一种尺度。', extraTime: '约半小时至一小时', start: '嘉峪关前往敦煌途中', detour: '与大地之子顺路组合', weather: '中等；强风和强光会影响停留舒适度' }),
      nearby({ id: 'boluo-zhuanjing', name: '阿克塞博罗转井石油小镇', reason: '用旧城空间补上一段工业迁徙与电影场景的时间感。', extraTime: '约一至两小时', start: '敦煌前往大柴旦途中', detour: '沿主线自然加入，不适合反复绕行', boundary: '仅使用明确开放的街道和建筑范围' }),
      nearby({ id: 'xiaochaidan-lake', name: '小柴旦湖', reason: '在长途公路旁获得一段更安静、没有复杂游览动线的湖景。', extraTime: '短时停留', start: '大柴旦或G315沿线', detour: '以当天主线和可停车条件判断', weather: '高；风力和能见度决定水面表现', boundary: '仅在正式可停车与可到达区域观察' }),
      nearby({ id: 'keluke-tuoso', name: '克鲁克湖、托素湖', reason: '给德令哈节点增加湿地与湖泊生态层次。', extraTime: '约一至两小时以上', start: '德令哈', detour: '需要从城市节点增加支线', weather: '高；风力和开放状态影响明显', spontaneous: '当天状态宽裕时考虑', reservation: '请在出发前查看景区官方公告' }),
      nearby({ id: 'heimahe', name: '黑马河', reason: '从更生活化的湖岸角度观察青海湖晨景和聚落。', extraTime: '约一至两小时或结合住宿', start: '茶卡前往青海湖途中', detour: '适合与青海湖南岸住宿组合', weather: '高；云层、风力和湖岸开放共同影响' }),
      nearby({ id: 'shengquan-bay', name: '圣泉湾', reason: '提供青海湖岸线的另一种观看角度，可与成熟景区形成取舍。', extraTime: '约一至两小时', start: '青海湖沿线', detour: '需先核对具体入口与当天动线', weather: '高；湖岸天气变化快', reservation: '请在出发前查看景区官方公告', boundary: '湖岸开放范围和生态管理以现场为准' }),
    ],
  },
  {
    id: 'half-day', label: '增加半天', note: '适合为某一种地貌或人文主题留出更完整的半天。',
    items: [
      nearby({ id: 'zhuoer-mountain', name: '卓尔山', reason: '从高处同时看丹霞、县城、草原和雪山的层次。', extraTime: '约半天', start: '门源或祁连支线', detour: '需要进入祁连县方向', weather: '高；远山能见度决定价值', spontaneous: '天气通透时更适合临时加入' }),
      nearby({ id: 'arou-temple', name: '阿柔大寺', reason: '在祁连草原段补充更安静的宗教建筑与牧区文化。', extraTime: '约半天以内', start: '祁连草原或卓尔山', detour: '适合祁连支线组合', boundary: '宗教空间的参观与拍摄以现场秩序为准' }),
      nearby({ id: 'binggou-danxia', name: '冰沟丹霞', reason: '与七彩丹霞相比，更突出岩体形态和城堡式轮廓。', extraTime: '约半天', start: '张掖', detour: '需要从张掖主线增加一段往返', weather: '中高；侧光和能见度影响岩体层次' }),
      nearby({ id: 'hanging-wall', name: '嘉峪关悬壁长城', reason: '把关城的平面历史延伸到山体上的防御线。', extraTime: '约半天以内', start: '嘉峪关', detour: '与关城同区域组合更合适', reservation: '请在出发前查看景区官方公告' }),
      nearby({ id: 'first-pier', name: '天下第一墩', reason: '从河谷与烽燧角度理解嘉峪关防御体系的边界。', extraTime: '约半天以内', start: '嘉峪关', detour: '可与关城二选一或组合', weather: '中高；风力与视野影响停留' }),
      nearby({ id: 'dunhuang-museum', name: '敦煌博物馆', reason: '把莫高窟、丝路和敦煌城市放进更完整的历史线索。', extraTime: '约半天', start: '敦煌', detour: '市区内组合，适合雨天或高温中段', weather: '低；室内内容稳定', reservation: '核对闭馆日、预约方式和临时展览' }),
      nearby({ id: 'yulin-grottoes', name: '榆林窟', reason: '对石窟艺术兴趣较深时，可看到与莫高窟不同的空间和壁画脉络。', extraTime: '至少半天', start: '敦煌或瓜州', detour: '需要单独核算支线车程', weather: '中等；道路状态影响较大', spontaneous: '不适合临时起意', reservation: '提前核对官方票务、讲解与道路信息' }),
      nearby({ id: 'nanbaxian-open-area', name: '南八仙合法开放区域', reason: '在成熟开放条件下观察规模更大的雅丹荒原。', extraTime: '约半天', start: 'G315或大柴旦', detour: '需结合当天道路与公开区域安排', weather: '高；风、沙尘和能见度影响明显', spontaneous: '只有开放和道路信息明确时考虑', boundary: '只在合法道路、正式观景点和公开区域活动' }),
    ],
  },
  {
    id: 'one-two-days', label: '增加 1 至 2 天', note: '这些内容已经会改变经典环线节奏，适合明确兴趣后再增加。',
    items: [
      nearby({ id: 'mati-temple', name: '马蹄寺', reason: '将石窟、山谷和祁连山文化放在比城市景点更自然的环境中。', extraTime: '约一天', start: '张掖', detour: '需要从张掖增加往返支线', weather: '中高；山地天气和道路影响明显', spontaneous: '建议提前判断是否增加', reservation: '请在出发前查看景区官方公告' }),
      nearby({ id: 'pingshanhu-canyon', name: '平山湖大峡谷', reason: '提供更深入的峡谷步行和地貌尺度，与观景台式丹霞不同。', extraTime: '约一天', start: '张掖', detour: '需要单独安排张掖支线', weather: '高；高温、降雨和风力影响步行', spontaneous: '不适合在主线很满时临时加入' }),
      nearby({ id: 'dunhuang-west', name: '敦煌西线：阳关、玉门关、雅丹', reason: '把敦煌从石窟和沙山扩展到边塞遗址与荒漠交通线。', extraTime: '约一天', start: '敦煌', detour: '形成完整西线往返', weather: '高；长距离荒漠路段受风沙影响', spontaneous: '建议提前留出完整一天', reservation: '分别核对各景区开放、票务和道路信息' }),
      nearby({ id: 'lenghu-oil-town', name: '冷湖石油小镇', reason: '用工业遗产补充柴达木的建设历史。', extraTime: '约一至两天支线的一部分', start: '大柴旦或冷湖方向', detour: '会明显偏离经典环线', weather: '中高；风力和道路信息影响', spontaneous: '不适合临时增加', boundary: '仅在明确开放区域参观' }),
      nearby({ id: 'black-mountain', name: '黑独山', reason: '以黑灰单色山体形成与丹霞、盐湖完全不同的视觉经验。', extraTime: '约一至两天支线的一部分', start: '大柴旦或冷湖方向', detour: '需要结合冷湖支线整体安排', weather: '高；开放、道路、风力和能见度缺一不可', spontaneous: '不适合只凭旧游记临时进入', reservation: '出发前核对属地最新官方公告', boundary: '未明确开放时只在合法道路与公开观景范围远观' }),
      nearby({ id: 'yanzhi-mountain', name: '胭脂山', reason: '与黑独山形成暖色与冷黑山体的地貌对照。', extraTime: '约一至两天支线的一部分', start: '冷湖方向', detour: '与冷湖、黑独山组合才有意义', weather: '高；侧光和能见度决定色彩表现', spontaneous: '以现场信息明确为前提', boundary: '本地带版权图片不发布，到访边界以属地公告为准' }),
    ],
  },
  {
    id: 'two-four-days', label: '增加 2 至 4 天', note: '格尔木延伸需要单独形成完整往返，不适合从九天主线中硬挤。',
    items: [
      nearby({ id: 'qarhan-salt-lake', name: '察尔汗盐湖', reason: '看到盐湖工业尺度与矿物色彩，而不只是镜面倒影。', extraTime: '格尔木延伸中的半天', start: '格尔木', detour: '需先完成格尔木延伸', weather: '中高；开放状态、风力与能见度影响', spontaneous: '建议提前确认', reservation: '核对官方预约、入口和开放区域' }),
      nearby({ id: 'queen-mother-lake', name: '西王母瑶池', reason: '在昆仑山南线中加入湖泊与文化传说的柔和停顿。', extraTime: '格尔木南线的一至两小时', start: '格尔木', detour: '与昆仑山口方向组合', weather: '高；低风和雪山能见度决定画面', spontaneous: '随南线状态决定' }),
      nearby({ id: 'kunlun-pass', name: '昆仑山口', reason: '真实感受从柴达木盆地进入高海拔荒原的地理抬升。', extraTime: '格尔木南线核心节点', start: '格尔木', detour: '需形成完整南线往返', weather: '很高；道路、风雪和能见度直接决定可行性', spontaneous: '不适合临时硬加', reservation: '出发前核对G109与属地官方信息' }),
      nearby({ id: 'g109-viewpoints', name: 'G109合法观景区域', reason: '用公路、雪山和高寒荒原理解昆仑山脉尺度。', extraTime: '包含在格尔木南线车程中', start: '格尔木或昆仑山口', detour: '沿既定南线观察', weather: '很高；管控、风雪和道路状态优先', spontaneous: '仅在当天道路信息明确时', boundary: '只在正式可停车区域停留，不影响主路通行' }),
      nearby({ id: 'hoh-xil', name: '可可西里自然景观', reason: '从合法道路与开放观察点理解高寒荒原生态，而不是进入保护地腹地。', extraTime: '格尔木南线完整一天的一部分', start: '格尔木', detour: '需要完整往返与充足余量', weather: '很高；道路、风雪、能见度共同决定', spontaneous: '不适合临时起意', reservation: '核对保护地、道路和格尔木属地公开信息', boundary: '不进入非开放区域，不改变野生动物行为' }),
      nearby({ id: 'tibetan-antelope', name: '藏羚羊远距离观察', reason: '在自然出现时观察动物与栖息环境的关系，结果不预设。', extraTime: '随合法南线路段自然发生', start: '昆仑山口至合法观察路段', detour: '不为追逐动物另行绕路', weather: '高；能见度与道路状态影响观察', spontaneous: '只在自然遇见时停留', reservation: '出发前查看保护地与道路官方公告', boundary: '远距离观察，不围堵、不投喂、不追车' }),
    ],
  },
]

export const nearbyExplorationById = new Map(
  nearbyExplorationGroups.flatMap((group) => group.items).map((item) => [item.id, item]),
)
