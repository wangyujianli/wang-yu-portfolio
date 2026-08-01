import type {
  LegacyPlacePriority,
  PlaceClassification,
  PlacePriority,
  PlaceRole,
  RouteScope,
} from '@/types/content'

export const placePriorityLabels: Record<PlacePriority, string> = {
  core: '核心必看',
  priority: '优先安排',
  'en-route': '顺路可看',
  interest: '兴趣加选',
  optional: '时间紧可略',
}

export const routeScopeLabels: Record<RouteScope, string> = {
  'main-route': '青甘主线',
  'lenghu-extension': '冷湖延伸',
  'golmud-extension': '格尔木延伸',
}

export const routeLineStyles: Record<RouteScope, {
  color: string
  strokeStyle: 'solid' | 'dashed'
  dash: number[]
  opacity: number
}> = {
  'main-route': { color: '#b47a2c', strokeStyle: 'solid', dash: [], opacity: 0.88 },
  'lenghu-extension': { color: '#61765a', strokeStyle: 'dashed', dash: [10, 8], opacity: 0.82 },
  'golmud-extension': { color: '#66859a', strokeStyle: 'dashed', dash: [4, 10], opacity: 0.7 },
}

export const placeRoleLabels: Record<PlaceRole, string> = {
  'core-attraction': '核心景区',
  'cultural-site': '文化核心',
  'landscape-stop': '风景停留',
  'route-experience': '路线体验',
  'city-start': '城市起点',
  'city-supply': '补给节点',
  'accommodation-hub': '住宿节点',
  'industrial-heritage': '工业遗产',
  'public-art': '沿途艺术',
  'ecology-observation': '生态观察',
  'optional-extension': '延伸探索',
}

export const legacyPriorityMigration: Record<LegacyPlacePriority, PlacePriority> = {
  core: 'core',
  recommended: 'priority',
  'along-the-way': 'en-route',
  interest: 'interest',
  optional: 'optional',
}

export const placePriorityOptions: ReadonlyArray<{ value: PlacePriority; label: string }> = (
  Object.entries(placePriorityLabels) as Array<[PlacePriority, string]>
).map(([value, label]) => ({ value, label }))

export const routeScopeOptions: ReadonlyArray<{ value: RouteScope; label: string }> = (
  Object.entries(routeScopeLabels) as Array<[RouteScope, string]>
).map(([value, label]) => ({ value, label }))

const sharedExtensionNotice = '此地点属于延伸探索，通常会增加车程或住宿。是否加入应结合天气、体力、道路和包车司机建议决定。'

export function extensionNoticeFor(scope: RouteScope): string | undefined {
  return scope === 'main-route' ? undefined : sharedExtensionNotice
}

const roleLabelOverrides: Record<string, string> = {
  'black-mountain': '开放边界确认',
  'qarhan-salt-lake': '盐湖与工业地理',
}

export function placeRoleLabelFor(placeId: string, role: PlaceRole): string {
  return roleLabelOverrides[placeId] ?? placeRoleLabels[role]
}

const classification = (
  priority: PlacePriority,
  routeScope: RouteScope,
  placeRole: PlaceRole,
  priorityReason: string,
  routeReason: string,
  extra: Partial<Pick<PlaceClassification, 'routeDecisionNote' | 'seasonalNote' | 'isStandalone' | 'parentPlaceId'>> = {},
): PlaceClassification => ({
  priority,
  routeScope,
  placeRole,
  priorityReason,
  routeReason,
  isStandalone: true,
  ...extra,
})

export const placeClassificationById: Readonly<Record<string, PlaceClassification>> = {
  'zhangye-danxia': classification(
    'core', 'main-route', 'core-attraction',
    '张掖丹霞代表河西走廊最鲜明的地质景观，与后续沙漠、雅丹和盐湖并不重复。观景体系成熟，六人包车游览也较容易组织，是主线中体验稳定、替代性较低的一站。',
    '位于门源、扁都口进入河西走廊后的主线路径上，是青甘主线的核心地貌节点。',
  ),
  'jiayuguan-pass': classification(
    'core', 'main-route', 'cultural-site',
    '嘉峪关把河西走廊、长城防御和边塞交通转化为可以行走和理解的空间。它与莫高窟共同支撑整条线路的文化部分，避免路线只剩自然风景。',
    '位于张掖前往敦煌的主线路径上，不需要明显绕行。',
  ),
  'mogao-grottoes': classification(
    'core', 'main-route', 'cultural-site',
    '莫高窟是整条线路中不可替代的文化节点，其他景点无法替代其丝路艺术和跨文化交流价值。实名预约和分时参观会直接影响六人同行，应优先确认。',
    '属于敦煌停留的核心内容，与鸣沙山形成文明与自然的互补。',
  ),
  'mingsha-crescent': classification(
    'core', 'main-route', 'core-attraction',
    '鸣沙山月牙泉将高大沙丘、绿洲泉水、敦煌暮色和人物旅拍集中在同一空间，能够提供区别于戈壁、雅丹和盐湖的完整体验。',
    '与莫高窟同属敦煌核心停留内容，可以根据天气和体力灵活组合。',
  ),
  'wusute-yadan': classification(
    'core', 'main-route', 'core-attraction',
    '水面与雅丹地貌同时出现，在整条青甘线路中替代性很低。它也是G315段最明确的目的地，不只是途中拍照点。',
    '位于柴达木主线的重要路段，但距离城市较远，需要同步考虑住宿、油量和到达时间。',
    { routeDecisionNote: '出发前必须核实最新开放、道路、观光车和住宿运营信息。' },
  ),
  'qinghai-lake': classification(
    'core', 'main-route', 'core-attraction',
    '青海湖不是单一观景台，而是一整段湖岸、草原、湿地和远山不断变化的高原景观。它能够自然收束此前的沙漠、戈壁和盐湖体验。',
    '位于茶卡返回西宁方向，是整条主线的自然收束节点。',
  ),
  'kumbum-monastery': classification(
    'priority', 'main-route', 'cultural-site',
    '塔尔寺能够帮助理解青海的宗教文化、建筑和生活秩序，但实际体验受个人文化兴趣、抵达时间和高原适应状态影响，因此列为优先安排而非绝对核心。',
    '位于西宁周边，适合根据抵达或离开西宁时的时间灵活安排。',
  ),
  'dachaidan-emerald': classification(
    'priority', 'main-route', 'core-attraction',
    '不同盐池形成蓝、绿、白等色彩层次，摄影表现丰富，也能补充柴达木荒原的色彩变化。但路线中已有茶卡，延伸线还可能包含察尔汗，因此优先级略低于水上雅丹。',
    '位于水上雅丹、茶卡方向的主线路径中，适合结合住宿节点安排。',
  ),
  'chaka-salt-lake': classification(
    'priority', 'main-route', 'core-attraction',
    '茶卡的白色地平线、盐轨和人物倒影非常适合六人合影，但实际效果高度依赖风力、天气和客流，因此不作为完全不受条件影响的核心点。',
    '位于大柴旦或德令哈前往青海湖的主线位置，线路衔接自然。',
  ),
  'qilian-grassland': classification(
    'priority', 'main-route', 'route-experience',
    '祁连山草原不是一个单一景区，而是门源、扁都口和张掖之间持续展开的高山草地景观。它对整条路线的空间感和季节感十分重要。',
    '属于沿途持续体验，不需要寻找唯一入口，也不应为了打卡反复绕行。',
  ),
  xining: classification(
    'en-route', 'main-route', 'city-start',
    '西宁的重要性主要在于集合、高原适应、饮食、住宿和补给，而不是与莫高窟、丹霞等核心景点竞争优先级。',
    '是本次包车自由行的起点和结束节点。',
  ),
  'menyuan-gangshika': classification(
    'en-route', 'main-route', 'landscape-stop',
    '门源在花期和雪山能见度良好时体验突出，但本次为8月初，实际花况存在不确定性，适合根据现场情况顺路决定，而不是固定占用大量时间。',
    '位于西宁前往张掖方向，可与祁连山草原和扁都口共同构成沿途景观。',
    { seasonalNote: '本次出发时间为8月初，必须临行核实当年花况和能见度。' },
  ),
  biandukou: classification(
    'en-route', 'main-route', 'route-experience',
    '扁都口的价值主要在于观察祁连山地向河西走廊过渡，而不是作为需要长时间游览的单体景区。天气好、停车方便时短暂停留即可。',
    '位于门源前往张掖的主线路径中。',
  ),
  'son-of-earth': classification(
    'en-route', 'main-route', 'public-art',
    '大地之子识别度高，与戈壁环境形成直接反差，适合途中休息和六人合影，但不值得为了它明显改变路线。',
    '位于嘉峪关前往敦煌方向的顺路位置，可与无界组合。',
  ),
  'g315-u-road': classification(
    'en-route', 'main-route', 'route-experience',
    'G315的价值是一整段公路和柴达木荒原共同形成的空间体验，而不是某一个精确网红坐标。只需在合法停车区域安全观察和拍摄。',
    '属于前往水上雅丹和大柴旦过程中的路线体验。',
    { routeDecisionNote: '不为了寻找所谓唯一机位折返，不进入机动车道拍摄。' },
  ),
  'riyue-mountain': classification(
    'en-route', 'main-route', 'landscape-stop',
    '日月山适合帮助理解从河湟谷地进入青海湖区域的地理变化，但单体体验不必压过青海湖本身，经过时根据天气和体力决定。',
    '位于西宁与青海湖之间，是顺路地理节点。',
  ),
  delingha: classification(
    'en-route', 'main-route', 'city-supply',
    '德令哈的主要价值是住宿、饮食、车辆补给和人员恢复，而不是密集游览。对长途包车路线而言，它是一个实际而重要的恢复节点。',
    '位于柴达木北缘，可根据住宿和路线衔接需要使用。',
  ),
  'boluo-zhuanjing': classification(
    'interest', 'main-route', 'industrial-heritage',
    '博罗转井适合对电影场景、工业遗址和废墟摄影感兴趣的人。对普通自然风光旅行者而言体验可能偏单一，不需要为它牺牲敦煌核心内容。',
    '位于敦煌前往柴达木方向，可根据开放状态和兴趣决定。',
  ),
  'tibetan-culture-museum': classification(
    'interest', 'main-route', 'cultural-site',
    '博物院能够系统补充藏医药、文字、服饰和艺术背景，也适合雨天，但主线已有塔尔寺、莫高窟等文化重点，因此更适合作为抵达日或天气不佳时的加选。',
    '位于西宁，可根据航班、天气和体力灵活安排。',
  ),
  heimahe: classification(
    'interest', 'main-route', 'landscape-stop',
    '黑马河的价值主要集中在清晨湖岸、日出和住宿体验。如果不准备在湖边住宿或早起，它与青海湖其他区域存在较高重叠。',
    '位于青海湖南岸，是否使用取决于住宿点和青海湖游览方向。',
  ),
  'zhuoer-mountain': classification(
    'interest', 'main-route', 'landscape-stop',
    '卓尔山适合从高处理解祁连盆地，对全景摄影爱好者价值较高，但需要额外进入祁连县并安排登高，与门源、祁连草原和沿途雪山存在部分重叠。',
    '属于祁连方向的加选内容，不默认纳入最紧凑的主线。',
  ),
  boundless: classification(
    'optional', 'main-route', 'public-art',
    '无界的镂空结构和光影有特点，但与大地之子同属瓜州戈壁公共艺术。如果时间有限，优先保留辨识度更高的大地之子。',
    '与大地之子顺路，不建议单独绕行。',
  ),
  'black-mountain': classification(
    'priority', 'lenghu-extension', 'optional-extension',
    '若决定进入冷湖延伸线，黑独山是差异化最明显的地貌目标。黑灰山体与丹霞、沙丘和盐湖形成强烈区别，但开放边界和合法道路比景观本身更重要。',
    '属于冷湖方向延伸，需要增加车程并结合冷湖住宿或路线衔接。',
    { routeDecisionNote: '只有确认当日合法开放区域、道路和属地管理后才考虑进入。' },
  ),
  'lenghu-oil-town': classification(
    'interest', 'lenghu-extension', 'industrial-heritage',
    '冷湖石油小镇具有工业历史和荒废空间叙事，适合工业遗产和摄影兴趣者，但与博罗转井存在一定主题重叠。',
    '适合与黑独山组合，不建议只为冷湖遗址单独进行长距离绕行。',
  ),
  'yanzhi-mountain': classification(
    'optional', 'lenghu-extension', 'optional-extension',
    '胭脂山的价值主要是与黑独山形成黑与红的地貌对照，但成熟度、路线信息和辨识度低于黑独山。冷湖延伸时间不足时应优先舍弃。',
    '属于冷湖延伸中的次级支线，必须确认开放和道路条件。',
  ),
  'qarhan-salt-lake': classification(
    'priority', 'golmud-extension', 'core-attraction',
    '察尔汗与茶卡、大柴旦不同，它能同时呈现大尺度盐湖、矿物生产和工业地理。若路线确定延伸到格尔木，这是优先保留的一处。',
    '位于格尔木方向，需要结合格尔木住宿和返程路线单独安排。',
  ),
  'kunlun-pass': classification(
    'priority', 'golmud-extension', 'optional-extension',
    '昆仑山口是格尔木南线最明确的高海拔地理节点，能够真实感受地势抬升、公路和雪山尺度，但需要控制停留时间和活动强度。',
    '属于格尔木南线，需要额外往返时间，并依赖道路、天气和司机经验。',
  ),
  'queen-mother-lake': classification(
    'interest', 'golmud-extension', 'optional-extension',
    '西王母瑶池具有昆仑文化意象和较安静的山水关系，但视觉冲击和不可替代性低于察尔汗盐湖与昆仑山口，更适合对昆仑文化感兴趣时加入。',
    '属于格尔木南线加选地点，需结合道路和当期管理信息。',
  ),
  'hoh-xil': classification(
    'interest', 'golmud-extension', 'ecology-observation',
    '可可西里的价值在于理解高寒荒原生态，但不能按普通景区处理。是否前往需要同时考虑高海拔健康、道路施工或管制、天气和司机经验。',
    '属于格尔木南线高条件延伸，只能在合法道路和允许观察区域活动。',
    { routeDecisionNote: '不以进入保护区腹地或必须看到野生动物为目标。' },
  ),
  'tibetan-antelope': classification(
    'interest', 'golmud-extension', 'ecology-observation',
    '藏羚羊不是固定景点，出现位置、数量和距离都不可预设。继续作为独立地点会产生到达后必然能看到动物的误导。',
    '应并入可可西里详情页，作为合法道路生态观察模块，而不是独立导航目标。',
    { isStandalone: false, parentPlaceId: 'hoh-xil' },
  ),
}

export function classificationFor(placeId: string): PlaceClassification {
  const value = placeClassificationById[placeId]
  if (!value) throw new Error(`Missing place classification for ${placeId}`)
  return value
}
