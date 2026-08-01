import type { ExperienceLevel, JourneyRouteId, LegacyPlacePriority, Place, PlaceCategory, TravelPlaceType } from '@/types/content'
import { ticketBookingFor } from '@/data/ticketBookings'
import { contentPriorityFor } from '@/data/placeContentPriorities'
import { classificationFor, placePriorityLabels } from '@/data/placeClassifications'

interface ExtendedPlaceSource {
  id: string
  slug: string
  name: string
  region: string
  category: PlaceCategory
  coordinates: Place['coordinates']
  routeOrder: number
  summary: string
  reason: string
  uniqueness: string
  bestFor: string[]
  priority: LegacyPlacePriority
  ifLimited: string
  worthDetour: string
  duration: string
  bestTime: string
  bestSeason?: string
  weatherSensitivity?: Place['weatherSensitivity']
  weather: string
  conventional: string[]
  unconventional: string[]
  photo: string[]
  group: string
  colors: string[]
  accent: string
  outfitNote: string
  reservation: string
  pitfalls: string[]
  siteNotes: string[]
  placeTypes: TravelPlaceType[]
  routeIds: JourneyRouteId[]
  experienceLevel: ExperienceLevel
  accommodationHubId: string
  seasonalTitle: string
  nearbyExplorationIds?: string[]
  lightNote: string
  image?: string
  imageAlt?: string
  visualTone?: string
}

function createExtendedPlace(source: ExtendedPlaceSource): Place {
  const classification = classificationFor(source.id)
  return {
    id: source.id,
    slug: source.slug,
    name: source.name,
    region: source.region,
    category: source.category,
    routeOrder: source.routeOrder,
    coordinates: source.coordinates,
    weatherCoordinates: source.coordinates,
    summary: source.summary,
    classification,
    value: {
      reasonToVisit: source.reason,
      uniqueness: source.uniqueness,
      bestFor: source.bestFor,
      priority: source.priority,
      priorityLabel: placePriorityLabels[classification.priority],
      ifTimeIsLimited: source.ifLimited,
    },
    contentPriority: contentPriorityFor(source.id),
    accommodationHubId: source.accommodationHubId,
    recommendation: source.priority === 'core' ? 5 : source.priority === 'recommended' ? 4 : 3,
    worthDetour: source.worthDetour,
    suggestedDuration: source.duration,
    bestSeason: source.bestSeason ?? (source.placeTypes.includes('博物馆') ? '全年' : '5月至10月，具体看当年天气'),
    bestViewingTime: source.bestTime,
    suitableWeather: source.weather,
    weatherSensitivity: source.weatherSensitivity ?? (source.placeTypes.includes('博物馆') ? '低' : source.placeTypes.includes('野生动物') ? '很高' : '高'),
    walkingIntensity: '轻松至中等',
    physicalNotes: ['以短距离步行和定点观赏为主', '海拔、日照与温差感受因天气而变', '现场状态舒适时再自然延长停留'],
    conventionalPlay: source.conventional,
    unconventionalPlay: source.unconventional,
    photoGuide: source.photo,
    soloPoses: ['侧身看向主景，给环境留出空间', '沿开放步道缓慢走过镜头', '站定后轻轻回头，动作保持自然'],
    groupComposition: source.group,
    outfitAdvice: { mainColors: source.colors, accentColor: source.accent, note: source.outfitNote },
    reservation: {
      channel: source.reservation,
      timing: '到访前再次核对',
      note: '开放范围、票务与交通组织可能随季节和现场条件调整。',
      verifiedAt: '2026-08-01',
      dynamicNote: '请在出发前查看景区官方公告。',
    },
    ticketBooking: ticketBookingFor(source.id),
    pitfalls: source.pitfalls,
    siteNotes: source.siteNotes,
    nearbyCombinationIds: [],
    visualTone: source.visualTone ?? 'sky',
    image: source.image ?? '',
    imageAlt: source.imageAlt ?? `${source.name}实景图暂缺，页面显示文字内容`,
    placeTypes: source.placeTypes,
    routeIds: source.routeIds,
    experienceLevel: source.experienceLevel,
    seasonalActivities: [{ title: source.seasonalTitle, season: '随季节与开放条件变化', note: source.weather }],
    weatherAlternatives: {
      rain: `雨势明显时缩短${source.name}的户外段，保留最有代表性的观察位置。`,
      wind: '风力较大时优先使用有遮挡的开放区域，长焦拍摄也更从容。',
      heat: '日照较强时可把户外内容放在上午或傍晚，中段安排车程与休息。',
    },
    nearbyExplorationIds: source.nearbyExplorationIds ?? [],
    viralStories: [],
    informationUpdatedAt: '2026-08-01',
    lightNote: source.lightNote,
  }
}

export const extendedPlaces: Place[] = [
  createExtendedPlace({
    id: 'tibetan-culture-museum', slug: 'qinghai-tibetan-culture-museum', name: '青海藏文化博物院', region: '青海 · 西宁', category: '文化遗址',
    coordinates: [101.7515, 36.7085], routeOrder: 17, accommodationHubId: 'xining', placeTypes: ['博物馆'], routeIds: ['classic'], experienceLevel: 'half-day',
    summary: '先在室内建立高原文化的坐标，再去看寺院、草原和聚落，会少很多只看表面的匆忙。',
    reason: '这里把藏医药、服饰、文字、艺术与生活方式放进同一套脉络，适合在旅程开头补上一张文化底图。之后经过塔尔寺、牧区和青海湖时，许多符号不再只是装饰，而有了来处。',
    uniqueness: '它是全程信息密度最高、受天气影响最小的文化入口。', bestFor: ['文化', '博物馆', '雨天替代'], priority: 'recommended',
    ifLimited: '若航班较晚可缩短为重点展厅；遇到户外天气不佳时，优先保留。', worthDetour: '在西宁停留时值得专门安排，不必为它改变整条路线。', duration: '2至3小时', bestTime: '开馆后的完整半天', weather: '几乎不受天气影响，适合抵达日或雨天。',
    conventional: ['从核心常设展览建立青藏高原文化线索', '关注服饰、唐卡与藏医药的日常用途', '把感兴趣的符号记下来，后续沿线再寻找实物对应'],
    unconventional: ['先选一个主题深入看，不追求逐柜读完', '与塔尔寺形成“馆内脉络—现场空间”的对照阅读'],
    photo: ['利用展厅入口和长廊拍有秩序的环境人像', '展品拍摄范围与闪光灯使用以现场提示为准'], group: '六人在开阔序厅分成前后两层，保留展陈标题和空间尺度。',
    colors: ['米白', '墨蓝'], accent: '藏红', outfitNote: '安静色系不与展陈抢画面，小面积藏红能与文化主题呼应。', reservation: '博物院官方渠道',
    pitfalls: ['馆名相近的场馆容易混淆，导航前核对全名与地址', '闭馆日和预约方式可能调整'], siteNotes: ['室内参观适合做旅途节奏缓冲', '展厅拍摄规定以当日标识为准'], seasonalTitle: '常设展览与临时展览',
    lightNote: '先把高原读懂一点，后面的风景就不只是好看。', visualTone: 'brick',
  }),
  createExtendedPlace({
    id: 'riyue-mountain', slug: 'riyue-mountain', name: '日月山', region: '青海 · 湟源', category: '草原雪山', coordinates: [100.923, 36.437], routeOrder: 18, accommodationHubId: 'xining', placeTypes: ['草原', '雪山'], routeIds: ['classic'], experienceLevel: 'along-the-way',
    summary: '它更像一处地理分界：从河湟谷地抬升到高原腹地，风、云和视野一起换了尺度。',
    reason: '日月山的价值不只在地标，而在于亲眼看见季风、草坡与交通通道交会的山口地形。它连接西宁与青海湖，也让“翻过一座山进入另一种地理”变得具体。', uniqueness: '它是青海湖方向最清楚的地理转场，而非单一建筑景点。', bestFor: ['地理', '山口', '顺路停留'], priority: 'along-the-way', ifLimited: '天气通透时保留短停；低云和大风同时出现时可直接通过。', worthDetour: '顺路停留更合适，不建议单独往返。', duration: '40分钟至1.5小时', bestTime: '上午或傍晚侧光', weather: '能见度良好、风力适中时更容易看出山口层次。',
    conventional: ['从开放观景位置辨认山口与草坡关系', '把日月山作为前往青海湖的地理序章', '结合沿途云层观察天气在山口的变化'], unconventional: ['用车窗连续记录谷地到山口的色彩变化', '少拍地标，多拍风吹草坡和远处道路'], photo: ['让道路或坡线斜向引入画面', '2×镜头压缩云层与草坡'], group: '六人沿观景边缘松散站位，保留大面积天空与山口尺度。', colors: ['驼色', '牛仔蓝'], accent: '橙色', outfitNote: '山口色彩克制，小面积暖色能让队伍在风景中被看见。', reservation: '景区或属地官方信息', pitfalls: ['山口风感与温差常比西宁市区明显', '只拍地标容易错过地形变化'], siteNotes: ['停车与开放区域以现场组织为准', '经幡与宗教文化元素以观看为主'], seasonalTitle: '草坡返青与山口云景', lightNote: '翻过山口以后，连风都像换了一个方向。', visualTone: 'grass',
  }),
  createExtendedPlace({
    id: 'heimahe', slug: 'heimahe', name: '黑马河', region: '青海 · 海南州', category: '湖泊盐湖', coordinates: [99.779, 36.73], routeOrder: 19, accommodationHubId: 'qinghai-lake', placeTypes: ['湖泊', '草原'], routeIds: ['classic'], experienceLevel: 'along-the-way',
    summary: '这里不是靠一座大门成立，而是靠湖岸、晨光和沿途生活共同形成停留感。', reason: '黑马河位于青海湖南岸的重要节点，价值在于接近湖面、观察清晨光线和感受湖畔聚落。它适合把宏大的青海湖转换成更具体的岸线、风声与同行片段。', uniqueness: '与成熟景区相比，它更接近“住在湖边、醒来看湖”的生活视角。', bestFor: ['湖岸', '晨景', '轻松游览'], priority: 'along-the-way', ifLimited: '若不住湖边可缩短为顺路岸线停留；已有满意的青海湖段时可以舍弃。', worthDetour: '适合与青海湖住宿组合，不必单独专程。', duration: '1至2小时', bestTime: '清晨或傍晚', weather: '低风速、云层有层次时更舒展。', conventional: ['沿开放湖岸看晨光与远山', '观察湖畔聚落和草地过渡', '把这里作为青海湖南岸的缓冲停留'], unconventional: ['只拍风、草和水面细节，做一组安静的小景', '从住处附近步行观察天色变化'], photo: ['低机位保留湖面反光', '人物放在画面下三分之一'], group: '六人分成两组三角站位，不挡住完整湖岸线。', colors: ['米白', '宝蓝'], accent: '酒红', outfitNote: '湖岸颜色清冷，酒红围巾或帽子能稳定六人画面。', reservation: '所选湖岸点或住宿方官方信息', pitfalls: ['湖岸入口名称相似，先确认具体开放点', '日出效果受云层和风力影响明显'], siteNotes: ['湖岸生态管理范围以现场为准', '不把野生动物引向车辆或人群'], seasonalTitle: '青海湖晨景', nearbyExplorationIds: ['heimahe'], lightNote: '早起若碰上云层，也不算亏，湖面会换一种安静。', visualTone: 'lake',
  }),
  createExtendedPlace({
    id: 'qilian-grassland', slug: 'qilian-grassland', name: '祁连山草原', region: '青海 · 祁连沿线', category: '草原雪山', coordinates: [100.62, 37.69], routeOrder: 20, accommodationHubId: 'menyuan', placeTypes: ['草原', '雪山'], routeIds: ['classic'], experienceLevel: 'along-the-way',
    summary: '真正有意思的是车行途中草坡、雪线、牛羊与云影不断重新组合，而不是某一块牌子。', reason: '祁连山草原把门源花田、雪峰和河西走廊连接起来，是整条路线中最连续的高山草地景观。停留价值来自沿路视野的逐步展开，也来自牧区生活与山地气候的同框。', uniqueness: '它是一段流动的景观带，最好的画面往往不在唯一观景台。', bestFor: ['草原', '雪山', '公路风景'], priority: 'recommended', ifLimited: '保留一至两个视野开阔的合法停靠点，不必追逐每一处观景牌。', worthDetour: '处在主线路上时很值得看，不需要额外绕行。', duration: '沿途分段停留', bestTime: '上午通透时或雨后初晴', weather: '云层有层次、雪峰可见时最有纵深。', conventional: ['沿主线观察草坡与雪峰的组合', '在开放停车点短停远眺', '把牛羊和道路作为地理尺度参照'], unconventional: ['用连续短视频记录云影越过草坡', '让商务车成为画面里的小比例前景'], photo: ['2×镜头拉近雪峰', '用公路与河谷形成引导线'], group: '六人与车辆分成前后两组，人物不排成整齐横线。', colors: ['米白', '牛仔蓝'], accent: '酒红', outfitNote: '草原与天空色块大，蓝白稳定，点色分散在两端。', reservation: '沿线道路与属地公告', pitfalls: ['导航到单一“草原景区”可能错过沿途整体', '天气变化快，短停比长时间等待更灵活'], siteNotes: ['仅在明确可停车区域停留', '牧场和草地边界以现场标识为准'], seasonalTitle: '草原返青与雪峰能见度', nearbyExplorationIds: ['biandukou', 'zhuoer-mountain'], lightNote: '草原不用一口气看完，它会在下一个弯继续出现。', visualTone: 'grass',
  }),
  createExtendedPlace({
    id: 'zhuoer-mountain', slug: 'zhuoer-mountain', name: '卓尔山', region: '青海 · 祁连县', category: '草原雪山', coordinates: [100.244, 38.196], routeOrder: 21, accommodationHubId: 'menyuan', placeTypes: ['草原', '雪山'], routeIds: ['classic'], experienceLevel: 'half-day',
    summary: '站上观景高处，丹霞山体、县城、草坡和牛心山会被同时放进一个清楚的地理模型。', reason: '卓尔山适合从高处理解祁连盆地：红色山体、草原、村镇与雪山在同一视野里分层。相比沿途草原，它提供了更完整、更易辨认的全景关系。', uniqueness: '它把祁连沿线的多个地貌层次压缩进一座可步行展开的观景山体。', bestFor: ['全景', '地貌', '半日游'], priority: 'interest', ifLimited: '经典环线较紧时可不绕入祁连县；选择祁连支线时则值得保留。', worthDetour: '偏爱高处全景和祁连县停留时值得专程。', duration: '2至3小时', bestTime: '上午通透或傍晚侧光', weather: '能见度决定远山层次，低云时价值会明显下降。', conventional: ['沿开放步道逐层抬高视野', '辨认丹霞、县城与牛心山的前后关系', '在主要观景平台等待云影变化'], unconventional: ['用中长焦寻找村镇与山体的色块关系', '反向拍同行者沿山脊步道走入画面'], photo: ['2×至3×压缩远山', '人物放小，避免挡住山体分层'], group: '六人沿步道前后错开，山体主峰留在队伍一侧。', colors: ['奶油白', '雾蓝'], accent: '藏红', outfitNote: '冷色衣服与红色山体形成清楚层次。', reservation: '卓尔山景区官方渠道', pitfalls: ['低云时远景层次会减少', '观景步道有持续坡度，可按状态缩短'], siteNotes: ['开放路线以景区当日安排为准', '高处风感比县城明显'], seasonalTitle: '祁连山全景', nearbyExplorationIds: ['zhuoer-mountain'], lightNote: '站得高以后，地图突然就从纸上搬到了眼前。', visualTone: 'danxia',
  }),
  createExtendedPlace({
    id: 'delingha', slug: 'delingha', name: '德令哈', region: '青海 · 海西州', category: '公路风景', coordinates: [97.37, 37.37], routeOrder: 22, accommodationHubId: 'delingha', placeTypes: ['公路', '湖泊'], routeIds: ['classic', 'golmud-extension'], experienceLevel: 'along-the-way',
    summary: '在长距离荒原之后，它是一处把湖泊、城市补给和诗意地名重新接回日常的节点。', reason: '德令哈是柴达木北缘的重要城市节点，适合在水上雅丹之后恢复节奏，也方便延伸克鲁克湖、托素湖等周边内容。它的价值更多在路线组织和城市气质，而非密集打卡。', uniqueness: '它是荒原长途之间少有的成熟城市停顿，也是多条延伸路线的分岔口。', bestFor: ['城市停顿', '补给', '周边湖泊'], priority: 'along-the-way', ifLimited: '保留住宿与补给即可；时间宽裕再增加湖泊或城市漫步。', worthDetour: '作为路线节点有价值，不必只为市内地标专程。', duration: '半天或一晚', bestTime: '傍晚抵达、次日上午出发', weather: '城区内容受天气影响较小。', conventional: ['在城市节点完成补给与休息', '时间宽裕时了解海西州与柴达木地理', '把周边湖泊作为可选支线'], unconventional: ['傍晚在城市公共空间慢走，给长途车程收尾', '用一组街景记录荒原城市的尺度'], photo: ['城市与远山同框时使用2×镜头', '把路牌、树影和行李作为旅途细节'], group: '六人在开阔城市背景前自然交谈，保留“终于到站”的松弛感。', colors: ['米白', '墨蓝'], accent: '沙丘金', outfitNote: '城市节点用沉静色，和前后荒原照片形成节奏变化。', reservation: '德令哈文旅与所选场馆官方信息', pitfalls: ['克鲁克湖、托素湖等周边点开放与道路状态需要单独核对', '不要把补给节点排成密集景点日'], siteNotes: ['城市服务相对成熟', '支线距离以当天导航与道路公告为准'], seasonalTitle: '城市与周边湖泊', nearbyExplorationIds: ['keluke-tuoso'], lightNote: '走过荒原以后，看见一排整齐路灯也会觉得很有风景。', visualTone: 'sky',
  }),
  createExtendedPlace({
    id: 'lenghu-oil-town', slug: 'lenghu-oil-town', name: '冷湖石油小镇', region: '青海 · 冷湖', category: '文化遗址', coordinates: [93.34, 38.74], routeOrder: 23, accommodationHubId: 'dachaidan', placeTypes: ['古建', '网红地点'], routeIds: ['mangya-extension'], experienceLevel: 'add-one-day',
    summary: '废弃工业空间与荒漠相遇，让柴达木不只剩自然地貌，也留下建设年代的时间层。', reason: '冷湖石油小镇保留了工业开发年代的遗址氛围，能为盐湖、雅丹和公路组成的自然路线补上一段人的历史。它适合对工业遗产、旧城空间和荒漠叙事感兴趣的人。', uniqueness: '它是环线延伸段中少见的工业遗产现场，而不是自然观景区。', bestFor: ['工业遗产', '历史', '摄影'], priority: 'interest', ifLimited: '主环线九天内可舍弃；选择冷湖支线时再安排。', worthDetour: '对工业遗产有兴趣时值得增加支线，不是普适必看。', duration: '2至3小时', bestTime: '上午或傍晚侧光', weather: '风力适中、能见度好时更适合观察遗址空间。', conventional: ['从公开区域了解石油小镇历史', '观察建筑尺度与荒漠环境的关系', '把遗址与冷湖镇的现实生活区分开'], unconventional: ['用门窗框景记录空旷感', '拍细节而非只追求废墟大全景'], photo: ['侧光表现墙面纹理', '利用门洞形成前后层次'], group: '六人分散在同一公开建筑外侧，保留遗址空旷比例。', colors: ['驼色', '墨蓝'], accent: '藏红', outfitNote: '深浅分层能避免人物与土色墙面融在一起。', reservation: '冷湖属地文旅与现场公告', pitfalls: ['公开范围可能调整，旧资料不能代替现场边界', '本地图片仅作内部参考，页面不发布受限素材'], siteNotes: ['只使用明确开放道路与参观区域', '建筑状态与管理要求以现场为准'], seasonalTitle: '工业遗址侧光', nearbyExplorationIds: ['lenghu-oil-town'], lightNote: '这里的安静不是空白，而是旧日机器停下来以后留下的回声。', visualTone: 'desert',
  }),
  createExtendedPlace({
    id: 'black-mountain', slug: 'black-mountain', name: '黑独山', region: '青海 · 冷湖周边', category: '沙漠雅丹', coordinates: [93.25, 38.55], routeOrder: 24, accommodationHubId: 'dachaidan', placeTypes: ['沙漠', '网红地点'], routeIds: ['mangya-extension'], experienceLevel: 'add-one-day',
    summary: '黑灰色山体和浅色戈壁形成近乎单色的荒原，让画面从“大风景”变成极简地貌。', reason: '黑独山提供环线中少见的黑灰色山体质感，与丹霞、沙丘和盐湖形成强烈反差。它的吸引力主要来自极简地貌和光影，实际可到访范围以属地管理信息为准。', uniqueness: '全程罕见的黑灰单色山体，是与彩色丹霞完全相反的视觉经验。', bestFor: ['地貌', '摄影', '极简画面'], priority: 'interest', ifLimited: '九天经典线可舍弃；只有在开放信息明确且走冷湖支线时考虑。', worthDetour: '摄影兴趣明确且官方开放条件合适时再增加行程。', duration: '视公开观景范围而定', bestTime: '侧光与低风速时段', weather: '强风、低能见度或开放边界不清时不适合停留。', conventional: ['从官方允许的观景位置看山体色阶', '用长焦压缩黑色山脊', '把它与附近彩色地貌作视觉对照'], unconventional: ['拍人物和车辆的小比例剪影', '只记录纹理与阴影，不追求接近山体'], photo: ['2×至5×长焦观察山脊', '保留大面积负空间'], group: '六人与车辆保持小比例，利用黑山和浅色地面形成上下分层。', colors: ['米白', '雾蓝'], accent: '暗红', outfitNote: '浅色主体最容易从黑灰背景中分离，小面积暗红增加节奏。', reservation: '冷湖属地官方公告', pitfalls: ['网络旧路线和现场管理可能不一致', '是否开放不能从社交平台照片推断'], siteNotes: ['仅依据最新官方开放范围停留', '未明确开放时以远观和道路沿线合法观景为主'], seasonalTitle: '黑灰山体侧光', nearbyExplorationIds: ['black-mountain'], lightNote: '颜色少了，光影反而开始说话。', image: '/assets/scenic/black-mountain-01-1600.webp', imageAlt: '黑独山黑灰色山体与浅色戈壁实景', visualTone: 'desert',
  }),
  createExtendedPlace({
    id: 'yanzhi-mountain', slug: 'yanzhi-mountain', name: '胭脂山', region: '青海 · 柴达木西部', category: '草原雪山', coordinates: [93.18, 38.47], routeOrder: 25, accommodationHubId: 'dachaidan', placeTypes: ['雪山', '网红地点'], routeIds: ['mangya-extension'], experienceLevel: 'add-one-day',
    summary: '彩色山体让冷湖一带的单色荒原突然转暖，但它更适合在信息清楚时顺势观察。', reason: '胭脂山的暖色山体为黑独山和冷湖遗址之间增加明显的色彩反差，适合构成一组“黑与红”的地貌对照。它不是成熟大景区，路线价值依赖开放信息和支线安排。', uniqueness: '它与黑独山相邻却色调相反，最适合作为地貌对照而非孤立打卡。', bestFor: ['色彩地貌', '摄影', '支线'], priority: 'optional', ifLimited: '时间紧或开放信息不清时直接舍弃，不影响主线完整性。', worthDetour: '只有走冷湖支线且现场条件合适时顺路考虑。', duration: '短时观察', bestTime: '晨昏侧光', weather: '能见度好且道路信息明确时再考虑。', conventional: ['从公开位置观察暖色山体', '与黑独山形成色彩对照', '使用长焦记录山体纹理'], unconventional: ['把两种山色做成连续照片组', '用人物服装冷色衬托暖色地貌'], photo: ['中长焦压缩色带', '人物保持小比例'], group: '六人分成两组三角构图，中间留给色带最明显的山体。', colors: ['米白', '墨蓝'], accent: '湖水青', outfitNote: '冷色服装能与暖色山体形成清楚分离。', reservation: '属地官方公告', pitfalls: ['本地参考图带版权说明，不进入公开页面', '非成熟景区信息变化更快'], siteNotes: ['以最新公开范围与道路状态为准', '没有明确到访条件时保留远观'], seasonalTitle: '暖色山体侧光', nearbyExplorationIds: ['yanzhi-mountain'], lightNote: '黑色荒原旁突然出现暖色，像地图翻页时夹进了一张彩纸。', visualTone: 'danxia',
  }),
  createExtendedPlace({
    id: 'qarhan-salt-lake', slug: 'qarhan-salt-lake', name: '察尔汗盐湖', region: '青海 · 格尔木', category: '湖泊盐湖', coordinates: [95.18, 36.79], routeOrder: 26, accommodationHubId: 'golmud', placeTypes: ['盐湖'], routeIds: ['golmud-extension'], experienceLevel: 'add-one-day',
    summary: '它不是茶卡式镜面舞台，而是更接近盐湖工业尺度与矿物色彩的巨大地理现场。', reason: '察尔汗盐湖让人看到盐湖不仅是倒影，还与矿物、工业和柴达木盆地的形成相关。湖区尺度远大于常规景点，色彩和岸线也更接近生产与自然并置的真实状态。', uniqueness: '它把盐湖自然景观与工业生产放在同一尺度中，与茶卡的游览体验明显不同。', bestFor: ['盐湖', '工业地理', '摄影'], priority: 'recommended', ifLimited: '走格尔木延伸线时保留；经典九天不必为它单独改线。', worthDetour: '增加格尔木段时很值得安排。', duration: '2至4小时', bestTime: '上午通透或下午侧光', weather: '晴到多云、风力适中时色彩更清楚。', conventional: ['从正式开放区域认识盐湖尺度', '观察盐层、湖水与生产设施的关系', '结合格尔木段理解柴达木资源地理'], unconventional: ['用长焦寻找盐纹理和极简色块', '将车辆作为尺度参照而非画面主体'], photo: ['1×保留空间，2×拍色块', '避免高饱和滤镜改变真实矿物色'], group: '六人沿开放观景边缘错开，保留盐湖与设施的横向尺度。', colors: ['米白', '宝蓝'], accent: '藏红', outfitNote: '蓝白与盐湖冷色协调，藏红小面积提气。', reservation: '察尔汗盐湖官方渠道', pitfalls: ['入口、预约和开放区域可能阶段性调整', '地图上的湖区范围不等于游客可进入范围'], siteNotes: ['只进入正式开放参观区域', '无人机规则以湖区和属地当日要求为准'], seasonalTitle: '盐湖矿物色', nearbyExplorationIds: ['qarhan-salt-lake'], lightNote: '看过这里以后，会知道盐湖不只负责照镜子。', image: '/assets/scenic/qarhan-salt-lake-01-1600.webp', imageAlt: '察尔汗盐湖团结湖水色与盐地实景', visualTone: 'salt',
  }),
  createExtendedPlace({
    id: 'queen-mother-lake', slug: 'queen-mother-lake', name: '西王母瑶池', region: '青海 · 格尔木南线', category: '湖泊盐湖', coordinates: [94.38, 35.86], routeOrder: 27, accommodationHubId: 'golmud', placeTypes: ['湖泊', '雪山'], routeIds: ['golmud-extension'], experienceLevel: 'add-one-day',
    summary: '湖面、昆仑山与文化传说叠在一起，让南线从公路远行转入更安静的高原水景。', reason: '西王母瑶池把昆仑山水景与传统文化想象联系起来，是格尔木南线中气质较柔和的一处停留。与盐湖相比，它更强调山水关系；与青海湖相比，尺度更收敛。', uniqueness: '它是昆仑山南线少见的高原湖泊停顿，并带有明确的文化叙事。', bestFor: ['湖泊', '昆仑文化', '安静观赏'], priority: 'interest', ifLimited: '格尔木南线时间紧时可与其他湖景二选一；经典环线可舍弃。', worthDetour: '走昆仑山口方向时顺路考虑。', duration: '1至2小时', bestTime: '上午低风或下午侧光', weather: '低风速和雪山能见度会明显提升层次。', conventional: ['从开放位置看湖面与昆仑山关系', '了解地名背后的文化传说', '把它作为长途南线中的安静停顿'], unconventional: ['用湖岸标识和远山形成旅行纪实画面', '拍水面细纹而不是只等镜面倒影'], photo: ['2×镜头拉近雪山', '人物放在湖岸一侧留足水面'], group: '六人沿湖岸形成缓弧，人物不遮挡远山主峰。', colors: ['米白', '宝蓝'], accent: '酒红', outfitNote: '冷色稳定湖面，酒红点缀让六人位置更清楚。', reservation: '格尔木文旅与景点官方信息', pitfalls: ['同名信息较多，出发前核对具体位置与开放状态', '南线海拔和天气变化需结合全程判断'], siteNotes: ['湖岸活动范围以现场标识为准', '自然环境中减少遗留物'], seasonalTitle: '昆仑山湖景', nearbyExplorationIds: ['queen-mother-lake'], lightNote: '名字很有神话感，湖面本身倒是安静得不抢台词。', image: '/assets/scenic/queen-mother-lake-01-1600.webp', imageAlt: '西王母瑶池湖面与地标实景', visualTone: 'lake',
  }),
  createExtendedPlace({
    id: 'kunlun-pass', slug: 'kunlun-pass', name: '昆仑山口', region: '青海 · G109', category: '草原雪山', coordinates: [94.067, 35.62], routeOrder: 28, accommodationHubId: 'golmud', placeTypes: ['雪山', '公路'], routeIds: ['golmud-extension'], experienceLevel: 'add-one-day',
    summary: '它让“昆仑”从一个遥远地名变成真实的高海拔山口、风和辽阔路面。', reason: '昆仑山口是格尔木南线最清楚的地理节点之一，能看到高海拔山地、公路与可可西里方向的开阔过渡。它的价值在于真实感受地势抬升和高原尺度，而非密集游乐。', uniqueness: '它是从柴达木盆地进入高海拔荒原最明确的道路地标。', bestFor: ['雪山', '地理', '公路'], priority: 'recommended', ifLimited: '只有完整增加格尔木南线时保留；不适合从经典环线临时硬加。', worthDetour: '格尔木延伸线的核心节点。', duration: '短停观察', bestTime: '上午能见度较好时', weather: '大风、降雪或道路管控会直接影响到访条件。', conventional: ['从正式停车与观景区域认识山口地形', '观察公路进入高海拔荒原的变化', '把山口作为南线地理坐标'], unconventional: ['用中长焦拍纪念碑与远山关系', '记录车窗外植被逐渐稀疏的变化'], photo: ['中长焦压缩雪山', '人物与地标各留独立轮廓'], group: '六人前后错开站位，给纪念碑和远山同时留出完整边缘。', colors: ['米白', '墨蓝'], accent: '藏红', outfitNote: '深浅搭配有利于在雪山和石质背景间保持轮廓。', reservation: 'G109道路与格尔木属地公告', pitfalls: ['旧游记不能替代当天道路和天气信息', '这里不是临时起意增加的短支线'], siteNotes: ['活动范围以正式开放区域为准', '野生动物观察不改变其自然路线'], seasonalTitle: '昆仑雪山能见度', nearbyExplorationIds: ['kunlun-pass'], lightNote: '站在这里以后，“昆仑”两个字终于有了风的声音。', image: '/assets/scenic/kunlun-pass-01-1600.webp', imageAlt: '昆仑山口纪念碑与雪山实景', visualTone: 'grass',
  }),
  createExtendedPlace({
    id: 'hoh-xil', slug: 'hoh-xil', name: '可可西里', region: '青海 · 格尔木南线', category: '草原雪山', coordinates: [93.62, 35.34], routeOrder: 29, accommodationHubId: 'golmud', placeTypes: ['草原', '雪山', '野生动物'], routeIds: ['golmud-extension'], experienceLevel: 'add-two-to-four-days',
    summary: '这里真正震撼的不是某个打卡点，而是高寒荒原、雪山和野生动物共同构成的完整生态尺度。', reason: '可可西里的价值在于理解高寒荒原生态：视野辽阔却并不空，植被、水系、雪山和野生动物彼此关联。旅行者能接触的是合法道路与开放观察区域，而不是进入保护地腹地。', uniqueness: '它是整条路线生态价值最高、也最需要克制观看方式的自然区域。', bestFor: ['生态', '荒原', '野生动物'], priority: 'interest', ifLimited: '九天经典线直接舍弃；只有预留完整格尔木南线并确认道路条件时安排。', worthDetour: '生态兴趣明确并为延伸线预留充足时间时值得。', duration: '完整南线的一部分', bestTime: '白天能见度良好时', weather: '道路、风雪与能见度共同决定是否适合出发。', conventional: ['沿合法公路和开放观景点理解高寒生态', '远距离观察荒原与野生动物', '从格尔木方向建立完整往返计划'], unconventional: ['用长焦记录动物与环境关系而非追求近景', '拍一组道路、雪山和天空的尺度变化'], photo: ['长焦优先，人物保持小比例', '用道路边缘引向远处雪山'], group: '六人与商务车在明确停车区域合影，荒原占据画面大部分。', colors: ['驼色', '墨蓝'], accent: '藏红', outfitNote: '自然低饱和色不抢生态主体，点色只用于人物识别。', reservation: '格尔木属地、道路与保护地官方信息', pitfalls: ['“到达地名”不等于可以进入保护地内部', '网络上的近距离动物影像不代表可复制'], siteNotes: ['仅在合法道路和开放区域活动', '野生动物保持远距离观察，不围堵、不投喂'], seasonalTitle: '高寒荒原与雪山', nearbyExplorationIds: ['hoh-xil'], lightNote: '这里越辽阔，越会提醒人把自己的声音放小一点。', image: '/assets/scenic/hoh-xil-01-1600.webp', imageAlt: '可可西里高寒荒原与远处雪山实景', visualTone: 'grass',
  }),
  createExtendedPlace({
    id: 'tibetan-antelope', slug: 'tibetan-antelope-observation', name: '藏羚羊合法观察区域', region: '青海 · 格尔木南线', category: '沿途彩蛋', coordinates: [94.02, 35.43], routeOrder: 30, accommodationHubId: 'golmud', placeTypes: ['野生动物'], routeIds: ['golmud-extension'], experienceLevel: 'add-two-to-four-days',
    summary: '它不是“保证遇见”的项目，而是一种在不改变动物行为的前提下等待和远望。', reason: '藏羚羊观察让可可西里的生态价值有了具体生命，但出现位置、数量和距离都不可预设。真正有意义的是理解迁徙与栖息环境，并接受“今天没有看见”也是自然的一部分。', uniqueness: '这是全程唯一以野生动物自然行为为核心、结果不可保证的体验。', bestFor: ['野生动物', '生态', '长焦摄影'], priority: 'interest', ifLimited: '不为寻找动物额外追车或绕行；只在合法观察路段自然遇见时停留。', worthDetour: '以“肯定看见”为目标专程追逐并不合适。', duration: '随合法路段自然观察', bestTime: '白天视线清楚时', weather: '风雪、低能见度和道路状况会减少观察条件。', conventional: ['在明确可停车位置用望远镜或长焦观察', '把动物放在完整环境中理解尺度', '接受远距离和不确定性'], unconventional: ['拍足迹、远山和栖息环境作为生态叙事', '用10秒稳定视频记录自然行走而非追逐'], photo: ['长焦镜头优先，不靠近换画面', '保留环境比例，避免只裁成动物头像'], group: '合影与动物观察分开完成，不让人群和车辆改变动物方向。', colors: ['驼色', '墨蓝'], accent: '沙丘金', outfitNote: '低饱和色适合生态观察，也减少画面对主体的干扰。', reservation: '格尔木属地与保护地公开信息', pitfalls: ['任何“固定出现点”都不能当作实时保证', '不根据网红视频模仿近距离接触'], siteNotes: ['保持远距离观察，不围堵、不投喂', '只在正式可停车位置停留'], seasonalTitle: '藏羚羊远距离观察', nearbyExplorationIds: ['tibetan-antelope'], lightNote: '看见是运气，没打扰到它们才是这段路真正的分寸。', image: '/assets/scenic/tibetan-antelope-01-1600.webp', imageAlt: '可可西里藏羚羊雄性个体远距离实景', visualTone: 'grass',
  }),
]
