export interface WeatherCheckpoint {
  id: string
  name: string
  queryArea: string
  impact: string
  clothing: string
  protection: string
  weatherUrl: string
  queryNote?: string
}

export const weatherNotice = '天气变化较快，本页不提供实时预报。建议出发前一天和当天出发前，通过常用天气应用再次确认温度、风力、降水和道路影响。'

const chinaWeather = (cityCode: string): string => `https://www.weather.com.cn/weather/${cityCode}.shtml`

export const weatherCheckpoints: readonly WeatherCheckpoint[] = [
  {
    id: 'xining',
    name: '西宁',
    queryArea: '西宁市',
    impact: '昼夜温差会影响抵达后的体感；降雨时，市内博物馆与文化场馆仍可作为从容的替代选择。',
    clothing: '短袖或薄长袖打底，随身留一件轻薄外套，早晚和阴雨时再加上。',
    protection: '高原日照直、空气偏干，墨镜、防晒与饮水都适合放在随手可取的位置。',
    weatherUrl: chinaWeather('101150101'),
  },
  {
    id: 'menyuan',
    name: '门源',
    queryArea: '门源县',
    impact: '低云会遮住岗什卡雪峰，大风会改变花田拍摄感受；能见度往往比单看温度更值得留意。',
    clothing: '薄长袖配防风外套，花田和山脚停留较久时可在车内备一层轻保暖。',
    protection: '开阔地日晒和风感同时存在，帽子宜选择有固定带的款式，并注意眼睛防风。',
    weatherUrl: chinaWeather('101150802'),
  },
  {
    id: 'zhangye',
    name: '张掖',
    queryArea: '张掖市',
    impact: '丹霞的层次受光线和能见度影响明显；阵雨前后色彩可能更沉，但大风和雷雨会影响户外停留。',
    clothing: '轻薄透气衣物为主，傍晚看丹霞时带一件薄外套，应对日落后的降温。',
    protection: '观景台遮阴有限，防晒、遮阳帽与补水需要兼顾；有风时留意沙尘对镜头的影响。',
    weatherUrl: chinaWeather('101160701'),
  },
  {
    id: 'jiayuguan',
    name: '嘉峪关',
    queryArea: '嘉峪关市',
    impact: '关城空间开阔，风力会直接改变城墙步行的体感；通透度则决定远山与城墙能否同时看清。',
    clothing: '以透气长袖为主，随身带轻薄防风层，登城墙时比只看城区温度更实用。',
    protection: '日照反射强，优先做好面部、颈部和手臂防晒；风起时保护好帽子与轻便物品。',
    weatherUrl: chinaWeather('101161401'),
  },
  {
    id: 'dunhuang',
    name: '敦煌',
    queryArea: '敦煌市',
    impact: '白天热度、傍晚风力和沙尘会影响鸣沙山体验；莫高窟参观主体受天气影响相对较小。',
    clothing: '白天选择轻薄长袖或防晒衣，夜间活动时备薄外套，鞋袜以不易进沙、便于行走为宜。',
    protection: '重点关注紫外线、风沙和补水；相机镜头减少在扬沙环境中频繁更换。',
    weatherUrl: chinaWeather('101160808'),
  },
  {
    id: 'water-yadan',
    name: '水上雅丹',
    queryArea: '大柴旦行政区',
    impact: '这里离城镇较远，风力、降水和道路状态比单一温度更关键，也会影响湖面层次与户外项目。',
    clothing: '薄长袖打底，备防风外套和轻保暖层；即使白天暖和，长时间迎风仍会明显降温。',
    protection: '开阔荒原缺少遮蔽，防晒与防风同等重要；长路段前一并确认沿途道路信息。',
    weatherUrl: chinaWeather('101150713'),
    queryNote: '外链查询大柴旦行政区天气，仅作为区域趋势；景区现场与城镇可能存在温差和风力差异。',
  },
  {
    id: 'dachaidan',
    name: '大柴旦',
    queryArea: '大柴旦行政区',
    impact: '翡翠湖的倒影和色块受风力、云量与降水影响；低风时水面更平，阴天则更适合观察盐湖本身的颜色。',
    clothing: '分层穿着更方便，白天可减层，清晨、傍晚和有风时及时加上防风外套。',
    protection: '盐湖反光会增加日晒体感，墨镜与防晒需要兼顾；鞋底沾盐后可及时简单清理。',
    weatherUrl: chinaWeather('101150713'),
  },
  {
    id: 'chaka',
    name: '茶卡',
    queryArea: '乌兰县（茶卡一带）',
    impact: '风力是倒影效果的重要变量，降雨和低温会改变下湖体感，观光项目也可能随现场天气调整。',
    clothing: '浅色长裙或长裤可搭配防风外套，拍摄时再暂时减层，避免一直迎风等待。',
    protection: '盐湖反光强，墨镜、防晒与防滑都要兼顾；外链显示乌兰县天气，仍需在常用应用中搜索茶卡复核。',
    weatherUrl: chinaWeather('101150709'),
    queryNote: '中国天气网以乌兰县为查询锚点，茶卡盐湖现场风力与县域预报可能有差异。',
  },
  {
    id: 'qinghai-lake',
    name: '青海湖',
    queryArea: '共和县（湖区参考）',
    impact: '湖岸跨度很长，局地阵雨、风力与能见度可能各不相同；湖面颜色和远山层次也会随云量快速变化。',
    clothing: '薄长袖、轻保暖层和防风外套分层携带，停车看湖时再根据风感自然增减。',
    protection: '湖岸紫外线和风感都较明显，墨镜、防晒与帽绳更实用；不要只依据西宁市区天气判断。',
    weatherUrl: chinaWeather('101150409'),
    queryNote: '外链查询共和县天气。青海湖岸线范围很大，请在常用天气应用中再搜索当天实际停留区域。',
  },
  {
    id: 'golmud',
    name: '格尔木',
    queryArea: '格尔木市',
    impact: '城区天气适合判断南线出发的大趋势，但不能代表昆仑山口；长距离路段更应同时看风、降水和道路信息。',
    clothing: '城区以轻薄长袖为主，车内另备防风和保暖层，为南线海拔抬升留出调整余量。',
    protection: '空气干燥、日照强，注意补水、防晒和防风；出城前再确认沿线道路状态。',
    weatherUrl: chinaWeather('101150901'),
  },
  {
    id: 'kunlun-pass',
    name: '昆仑山口',
    queryArea: '格尔木（南线出发锚点）',
    impact: '山口海拔远高于格尔木城区，大风、降雪、低能见度或道路管控都会直接改变是否适合继续前往。',
    clothing: '保暖层、防风外层、帽子和手套应独立准备，不能按格尔木城区温度简单推算山口穿着。',
    protection: '重点复核风力、降雪、能见度和G109道路信息；外链只能提供格尔木趋势，不代表山口实况。',
    weatherUrl: chinaWeather('101150901'),
    queryNote: '中国天气网没有在本页提供山口点位预报。请在常用天气应用中搜索昆仑山口，并结合道路公告再次确认。',
  },
]

const checkpointById = new Map(weatherCheckpoints.map((checkpoint) => [checkpoint.id, checkpoint]))

const checkpointIdByPlaceId: Readonly<Record<string, string>> = {
  xining: 'xining',
  'kumbum-monastery': 'xining',
  'tibetan-culture-museum': 'xining',
  'menyuan-gangshika': 'menyuan',
  'qilian-grassland': 'menyuan',
  'zhuoer-mountain': 'menyuan',
  biandukou: 'zhangye',
  'zhangye-danxia': 'zhangye',
  'yanzhi-mountain': 'zhangye',
  'jiayuguan-pass': 'jiayuguan',
  'son-of-earth': 'dunhuang',
  boundless: 'dunhuang',
  'mogao-grottoes': 'dunhuang',
  'mingsha-crescent': 'dunhuang',
  'boluo-zhuanjing': 'dunhuang',
  'g315-u-road': 'water-yadan',
  'wusute-yadan': 'water-yadan',
  'dachaidan-emerald': 'dachaidan',
  'chaka-salt-lake': 'chaka',
  'qinghai-lake': 'qinghai-lake',
  heimahe: 'qinghai-lake',
  'riyue-mountain': 'qinghai-lake',
  'qarhan-salt-lake': 'golmud',
  'queen-mother-lake': 'golmud',
  'kunlun-pass': 'kunlun-pass',
  'hoh-xil': 'kunlun-pass',
  'tibetan-antelope': 'kunlun-pass',
}

export function weatherCheckpointForPlace(placeId: string): WeatherCheckpoint | undefined {
  const checkpointId = checkpointIdByPlaceId[placeId]
  return checkpointId ? checkpointById.get(checkpointId) : undefined
}
