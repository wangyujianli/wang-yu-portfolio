import type { PreparationCard, PreparationQuickEntry, TravelPreparationGuide } from '@/types/content'

export const preparationChangeNotice = '景区开放、票务、活动和天气可能临时调整，出发前请以景区官方最新公告为准。'

export const preparationCards: PreparationCard[] = [
  {
    id: 'mogao-ticket',
    number: '01',
    category: '票务',
    title: '莫高窟票务',
    urgency: 'urgent',
    timingLabel: '立即确认',
    confirmTiming: '建议现在立即查询，参观前一天再次查看公告',
    description: '莫高窟旺季票源紧张，票务直接影响当天体验，建议优先完成确认。',
    summary: ['优先确认常规参观票余量', '核对六人实名信息和证件', '参观前至少提前30分钟抵达数字展示中心'],
    sections: [
      {
        title: '需要确认',
        items: [
          '预约日期和入场场次是否正确',
          '优先选择常规参观票；常规票无余量时，再评估应急参观票',
          '六人的姓名、身份证号码和手机号是否准确',
          '各类优惠证件及其有效凭证是否需要携带',
          '是否已经保存订单、二维码或购票短信',
          '是否看到强降雨、临时关闭或参观调整公告',
          '常规票与应急票包含的参观内容不同，购票前请核对票型说明',
        ],
      },
      {
        title: '建议携带',
        items: ['身份证原件', '优惠证件', '订单截图', '饮用水', '薄外套', '充电宝'],
      },
      {
        title: '拍摄提醒',
        tone: 'warning',
        items: ['洞窟内部当前不开放摄影摄像', '无人机不带入窟区更便于通行', '参观通道不安排直播或长时间停留拍摄'],
      },
    ],
    officialLinks: [{ label: '打开官方网站', url: 'https://www.mgk.org.cn/', type: 'official-site' }],
    wechatChannels: [{ label: '微信预约', value: '莫高窟参观预约网' }],
    phones: [{ label: '莫高窟咨询', number: '400-833-3715', type: 'consultation', group: 'scenic' }],
    updatedAt: '2026年8月',
    timeSensitive: true,
  },
  {
    id: 'zhangye-entry',
    number: '02',
    category: '活动与入园',
    title: '张掖活动与入园',
    urgency: 'important',
    timingLabel: '提前3天',
    confirmTiming: '建议提前3天购票，前一天核对活动和天气',
    description: '门票、入口与低空项目往往分属不同安排，提前核对可以减少现场来回确认。',
    summary: ['核对景区门票和入园入口', '热气球等项目受风力影响较大', '观赏活动与实际乘坐通常不是同一票种'],
    sections: [
      {
        title: '需要确认',
        items: [
          '景区门票日期和场次',
          '从哪个入口进入',
          '观光车是否包含在票价内',
          '景区当天开放和停止检票时间',
          '日落场是否需要单独选择',
          '热气球属于飞行表演、系留体验还是游客乘坐项目',
          '低空项目是否需要另外预约和付款',
          '当日风力是否符合飞行条件',
          '雷雨、大风或临时活动是否导致调整',
        ],
      },
      {
        title: '建议携带',
        items: ['身份证', '防晒用品', '墨镜', '薄外套', '充电宝', '舒适防滑鞋', '镜头布'],
      },
      {
        title: '活动说明',
        tone: 'warning',
        items: ['热气球及低空项目受日期、风力和运营安排影响，请以前一天景区官方公告为准。'],
      },
    ],
    wechatChannels: [{ label: '官方微信公众号', value: '张掖七彩丹霞旅游景区' }],
    phones: [{ label: '张掖七彩丹霞', number: '0936-5623666', type: 'consultation', group: 'scenic' }],
    updatedAt: '2026年8月',
    timeSensitive: true,
  },
  {
    id: 'mingsha-day',
    number: '03',
    category: '当日安排',
    title: '鸣沙山当日安排',
    urgency: 'important',
    timingLabel: '前一天复核',
    confirmTiming: '建议提前2至3天购票，前一天和当天下午再次确认',
    description: '日落、检票、现场活动和沙漠天气彼此相关，临近到访时再看一遍会更从容。',
    summary: ['确认日落、停止检票和活动时间', '高温、大风和沙尘可能影响体验', '骆驼、演出等项目以当天公告为准'],
    sections: [
      {
        title: '需要确认',
        items: [
          '门票日期',
          '开放时间和停止检票时间',
          '当日日落时间',
          '星空演唱活动是否举行',
          '骆驼项目是否正常开放',
          '停车场和接驳信息',
          '是否有高温、大风、沙尘或雷雨预警',
          '入园高峰是否适合错峰',
          '沙漠项目是否需要单独购票',
        ],
      },
      {
        title: '建议携带',
        items: ['身份证', '高倍防晒霜', '遮阳帽', '墨镜', '饮用水', '薄外套', '手机防沙袋', '镜头布', '充电宝', '舒适运动鞋或防沙鞋套'],
      },
    ],
    officialLinks: [{ label: '打开官方网站', url: 'https://www.mssyyq.com/', type: 'official-site' }],
    wechatChannels: [
      { label: '官方微信公众号', value: '鸣沙山月牙泉' },
      { label: '微信小程序', value: '游敦煌' },
    ],
    phones: [{ label: '鸣沙山咨询', number: '400-118-3388', type: 'consultation', group: 'scenic' }],
    updatedAt: '2026年8月',
    timeSensitive: true,
  },
  {
    id: 'yadan-g315',
    number: '04',
    category: '远途路段',
    title: '水上雅丹与 G315',
    urgency: 'important',
    timingLabel: '出发前一晚',
    confirmTiming: '建议提前2天确认，出发前一晚再次核对',
    description: '这段路程长、补给点分散，景区开放、住宿权益、道路与车辆状态适合放在一起确认。',
    summary: ['核实景区开放、住宿和门票关系', '提前检查油量、道路和离线地图', '机动车道不作为拍摄区域'],
    sections: [
      {
        title: '需要确认',
        items: [
          '景区是否正常开放',
          '酒店或营地订单是否有效',
          '住宿是否包含门票、观光车和二次入园',
          'G315相关路段是否有施工、封闭或临时管控',
          '加油站位置和车辆剩余油量',
          '是否已经下载离线地图',
          '饮水和应急食品是否充足',
          '当前安排是否能够在天黑前抵达',
          '手机信号较弱时的同行联络方式',
          '路线以正式开放道路为准，非开放岔路或雅丹保护区域不作为通行选择',
        ],
      },
      {
        title: '建议携带',
        items: ['饮用水', '应急食品', '充电宝', '车载充电器', '纸巾和湿巾', '防晒用品', '薄外套', '手电筒', '离线地图', '简单车辆应急工具'],
      },
      {
        title: '道路与拍摄',
        tone: 'warning',
        items: ['G315 U形公路可在合法停车区域远距离取景', '机动车道内不安排人物拍摄', '坡顶、弯道和视线盲区不适合作为停车点', '取景以不影响正常车辆通行为前提'],
      },
      {
        title: '票务入口',
        items: ['请通过景区官方认证公众号或正规平台核实开放和票务信息，购票前确认认证主体。'],
      },
    ],
    updatedAt: '2026年8月',
    timeSensitive: true,
  },
  {
    id: 'lakes-weather',
    number: '05',
    category: '湖区天气',
    title: '茶卡与青海湖天气',
    urgency: 'important',
    timingLabel: '提前3天',
    confirmTiming: '提前3天看趋势，前一天看风力，当天进入前再确认',
    description: '盐湖倒影、湖岸体感和体验项目都受局地风雨影响，县城天气不能完全代表湖区。',
    summary: ['盐湖倒影主要受风力影响', '湖区天气和县城天气可能不同', '只从正规开放区域进入青海湖'],
    sections: [
      {
        title: '重点查看',
        items: ['风速和阵风', '降雨概率', '雷暴和冰雹', '能见度', '紫外线强度', '日出和日落时间', '景区开放和限流情况', '环湖道路临时交通管制', '小火车、夜游或其他体验是否运行', '是否有大风导致项目暂停'],
      },
      {
        title: '茶卡建议携带',
        items: ['身份证', '防水鞋套或备用鞋', '湿巾', '清洗鞋底和器材的清水', '手机防坠绳', '墨镜', '防晒用品', '镜头布', '密封袋'],
      },
      {
        title: '青海湖建议携带',
        items: ['防风外套', '帽子', '墨镜', '饮用水', '防晒用品', '舒适鞋', '充电宝'],
      },
      {
        title: '开放区域与生态',
        tone: 'warning',
        items: ['盐壳适合穿鞋或鞋套进入开放体验区', '非开放盐池不作为取景点', '青海湖以正式开放入口和现场围栏为界', '私人草场和来源不明的入口不作为通行选择', '环湖公路停车以正规停车区域为准'],
      },
    ],
    officialLinks: [
      { label: '打开茶卡官网', url: 'https://www.chakasl.com/', type: 'official-site' },
      { label: '打开茶卡官方票务', url: 'https://www.chakasl.com/ticket.html', type: 'official-ticket' },
    ],
    wechatChannels: [
      { label: '茶卡官方公众号', value: '茶卡盐湖' },
      { label: '茶卡微信小程序', value: '西矿智旅' },
      { label: '青海湖微信小程序', value: '智游青海湖' },
    ],
    phones: [
      { label: '茶卡咨询投诉', number: '0977-8246999', type: 'consultation', group: 'scenic' },
      { label: '茶卡景区救援', number: '0977-8246699', type: 'rescue', group: 'scenic' },
      { label: '青海湖二郎剑咨询', number: '0974-8519826', type: 'consultation', group: 'scenic' },
    ],
    updatedAt: '2026年8月',
    timeSensitive: true,
  },
  {
    id: 'altitude-health',
    number: '06',
    category: '健康准备',
    title: '健康与高原反应',
    urgency: 'important',
    timingLabel: '行前评估',
    confirmTiming: '建议出发前完成健康评估，抵达高原后按身体感受调整活动',
    description: '高原反应因人而异，提前了解个人健康情况和需要立即求助的信号，会让判断更清楚。',
    summary: ['首日减少剧烈活动、饮酒和熬夜', '每个人携带长期服用的处方药', '严重症状出现时立即停止活动并拨打120'],
    sections: [
      {
        title: 'A. 出发前评估',
        items: ['是否有严重心脑血管疾病', '是否有严重呼吸系统疾病', '是否正在感冒、发热或身体明显不适', '是否刚做完手术或处于恢复期', '是否需要提前咨询医生', '处方类高原药物适合在医生评估后使用，不自行购药更稳妥'],
      },
      {
        title: 'B. 建议携带',
        items: ['本人长期服用的处方药', '身份证', '医保电子凭证', '常用退热、止痛和肠胃药', '创可贴', '消毒用品', '电子体温计', '指夹式血氧仪', '便携氧气，仅作临时辅助', '口罩', '饮用水'],
      },
      {
        title: 'C. 一般不适时',
        items: ['停止剧烈活动并就地休息', '保持温暖并补充水分', '暂不饮酒', '不勉强继续登高', '观察症状是否加重'],
      },
      {
        title: 'D. 需要立即求助的信号',
        tone: 'danger',
        items: ['静息状态仍严重呼吸困难', '胸痛或明显胸闷', '咳粉红色泡沫痰', '持续剧烈头痛', '反复呕吐', '意识异常', '行走不稳', '嘴唇或指甲明显发紫', '血氧持续明显偏低并伴有不适', '出现上述情况时，立即停止活动，拨打120，听从专业人员建议，并评估尽快降低海拔'],
      },
    ],
    phones: [{ label: '医疗急救', number: '120', type: 'emergency', group: 'national' }],
    updatedAt: '2026年8月',
    disclaimer: '本页面只提供一般旅行安全信息，不能代替医生诊断。',
  },
  {
    id: 'vehicle-road',
    number: '07',
    category: '车辆与道路',
    title: '车辆与道路安全',
    urgency: 'important',
    timingLabel: '每段出发前',
    confirmTiming: '建议取车时完成车辆检查，每段长途道路前再看车辆、油量与路况',
    description: '长距离与偏远路段更依赖车辆基础状态、油量余度和驾驶员精力，简单复核比临时处理轻松。',
    summary: ['出发前检查车辆、油量和驾驶员状态', '偏远地区尽量保持半箱以上油量', '暴雨、山洪和落石风险需要单独关注'],
    sections: [
      {
        title: '车辆检查',
        items: ['胎压', '轮胎磨损情况', '备胎', '玻璃水', '冷却液', '雨刮器', '灯光', '刹车状态', '随车工具', '三角警示牌', '反光背心', '车载充电器'],
      },
      {
        title: '物资建议',
        items: ['饮用水', '应急食品', '充电宝', '手电筒', '保暖外套', '纸巾', '基础药品', '离线地图'],
      },
      {
        title: '驾驶与道路',
        tone: 'warning',
        items: ['驾驶员出发前保证睡眠，长途段落及时换人', '偏远路段尽量保持半箱以上油量', '弯道、坡顶和狭窄路肩不适合作为停车点', '日落和热门地点不作为疲劳赶路的理由', '暴雨后留意积水、落石、滑坡和泥石流信息', '道路管控期间按现场交通组织通行', '遇见野生动物时保持车距和观察距离'],
      },
    ],
    phones: [
      { label: '交通事故报警', number: '122', type: 'emergency', group: 'national' },
      { label: '交通运输咨询', number: '12328', type: 'consultation', group: 'national' },
    ],
    updatedAt: '2026年8月',
  },
  {
    id: 'emergency-contacts',
    number: '08',
    category: '随行通讯录',
    title: '紧急联系',
    urgency: 'urgent',
    timingLabel: '随时可用',
    confirmTiming: '无需预先拨打；遇到对应情况时可以直接选择号码',
    description: '全国紧急号码、公共服务热线和景区咨询集中放在一处，真正需要时可以少一步查找。',
    summary: ['人身危险、火灾、严重疾病和交通事故优先使用全国紧急号码', '12328与12345用于交通或非紧急政务求助', '景区电话适合票务、开放和现场服务咨询'],
    sections: [
      {
        title: '使用提示',
        tone: 'warning',
        items: ['人身危险、火灾、严重疾病和交通事故，请优先拨打110、119、120或122，不要先拨景区咨询电话。'],
      },
    ],
    phones: [
      { label: '报警', number: '110', type: 'emergency', group: 'national' },
      { label: '火警及抢险救援', number: '119', type: 'emergency', group: 'national' },
      { label: '医疗急救', number: '120', type: 'emergency', group: 'national' },
      { label: '交通事故报警', number: '122', type: 'emergency', group: 'national' },
      { label: '交通运输咨询与投诉', number: '12328', type: 'consultation', group: 'national' },
      { label: '非紧急政务求助', number: '12345', type: 'consultation', group: 'national' },
      { label: '莫高窟咨询', number: '400-833-3715', type: 'consultation', group: 'scenic' },
      { label: '鸣沙山咨询', number: '400-118-3388', type: 'consultation', group: 'scenic' },
      { label: '张掖七彩丹霞', number: '0936-5623666', type: 'consultation', group: 'scenic' },
      { label: '茶卡盐湖咨询投诉', number: '0977-8246999', type: 'consultation', group: 'scenic' },
      { label: '茶卡盐湖景区救援', number: '0977-8246699', type: 'rescue', group: 'scenic' },
      { label: '青海湖二郎剑咨询', number: '0974-8519826', type: 'consultation', group: 'scenic' },
    ],
    updatedAt: '2026年8月',
  },
]

const emergencyCard = preparationCards.find((card) => card.id === 'emergency-contacts')

if (!emergencyCard) {
  throw new Error('Emergency preparation card is required')
}

export const emergencyPreparationCard = emergencyCard

export const preparationQuickEntries: PreparationQuickEntry[] = [
  { id: 'ticket-hours', title: '门票与开放时间', icon: 'ticket', confirmWhen: '路线大致确定后与到访前一晚', bring: '身份证件、预约凭证', reminder: '莫高窟等实名项目先处理，临时开放变化再临行核对。' },
  { id: 'documents', title: '证件与官方预约', icon: 'id', confirmWhen: '出发前一周', bring: '身份证、驾驶证、行驶资料', reminder: '证件原件与电子凭证分开保存，同行者各自能独立调取。' },
  { id: 'clothing', title: '服装与温差', icon: 'clothing', confirmWhen: '看完沿线天气后整理', bring: '分层衣物、防风外套、备用鞋袜', reminder: '保暖层留在车内易取位置，停下拍照时再自然加衣。' },
  { id: 'sun-protection', title: '防晒与皮肤保护', icon: 'sun', confirmWhen: '装随身包时', bring: '防晒、帽子、墨镜、润唇与保湿', reminder: '水面和盐地反射明显，用品留在手边比放进后备箱实用。' },
  { id: 'food-hydration', title: '饮食与补水', icon: 'food', confirmWhen: '出发前采购与每日补给时', bring: '常温水、保温杯、耐存放小食', reminder: '初到高原和长途驾驶时，温热、少量和持续补水更舒服。' },
  { id: 'health-altitude', title: '健康与高原反应', icon: 'health', confirmWhen: '出发前完成个人健康核对', bring: '个人常用药、健康资料', reminder: '任何明显不适都以当事人的真实感受和专业意见为先。' },
  { id: 'vehicle-road', title: '车辆与道路安全', icon: 'vehicle', confirmWhen: '取车时及长路段前', bring: '充电线、胎压工具、饮水与备用物资', reminder: '油量、轮胎和路线下载比临时赶路更值得提前处理。' },
  { id: 'photography-electronics', title: '摄影与电子设备', icon: 'camera', confirmWhen: '出发前一晚充电整理', bring: '充电器、移动电源、镜头布、防尘袋', reminder: '盐、沙和温差都影响器材，轻装并保留一套随手可拍设备。' },
  { id: 'weather-control', title: '天气与临时管制', icon: 'weather', confirmWhen: '每天早晚与长路段前', bring: '离线地图、官方渠道收藏', reminder: '天气与道路变化用来帮助取舍，不把路线变成硬性日程。' },
  { id: 'emergency', title: '紧急联系', icon: 'emergency', confirmWhen: '出发前保存到每个人手机', bring: '紧急联系人、救援与保险信息', reminder: '电话与当前位置描述方式提前存好，真正需要时更从容。' },
]

export const travelPreparationGuides: TravelPreparationGuide[] = [
  {
    id: 'documents', eyebrow: 'DOCUMENTS · 证件', title: '证件与预约放在各自都找得到的位置', intro: '不用把资料交给一个人统一保管；六个人各自留一份关键凭证，临时分开行动也不慌。',
    groups: [
      { title: '证件与驾驶资料', items: ['身份证原件', '驾驶证与行驶资料', '保险、租车或车辆服务信息', '必要证件电子备份'] },
      { title: '预约凭证', items: ['实名门票订单与身份证对应', '官方公众号或小程序名称收藏', '关键凭证截图留在本机', '同行者知道由谁保管纸质资料'] },
    ],
    callout: '手机无信号时，提前保存的订单截图和电话号码往往最有用。',
  },
  {
    id: 'clothing', eyebrow: 'LAYERING · 分层', title: '怎么穿更舒服', intro: '青甘线一天可能经历高温、强风、低温和明显温差，适合分层穿衣，而不是只带厚衣服。',
    groups: [
      { title: '8月3日至20日温度判断', items: ['西宁白天约23～30℃，夜间约9～18℃，白天短袖，早晚薄外套', '日月山、青海湖白天约17～24℃，清晨约6～14℃，需要长袖、防风衣，清晨可加轻薄羽绒', '茶卡白天约22～31℃，夜间约8～16℃，防晒长袖和傍晚外套都要带', '大柴旦、翡翠湖、黑独山、G315、西台和水上雅丹白天约20～30℃，夜间约8～15℃，重点是太阳晒、风又冷、日落后降温快', '敦煌、瓜州、鸣沙山、莫高窟白天约32～41℃，夜间约17～27℃，按极强防晒和避开正午户外准备', '嘉峪关、张掖、七彩丹霞、平山湖白天约27～37℃，夜间约13～25℃，白天夏装，早晚薄外套', '祁连山草原、门源附近白天约18～26℃，清晨约5～16℃，抓绒或薄羽绒加防风外层更稳妥'], note: '8月16日至20日只能按前段趋势估计，实际温度建议按±3～5℃预留。' },
      { title: '一套穿衣逻辑', items: ['贴身层：短袖、速干短袖或轻薄速干长袖', '防晒层：敦煌、瓜州即使很热，也优先轻薄防晒长袖，少让皮肤直接暴露', '保暖层：薄抓绒、针织开衫或卫衣，用在青海湖、祁连、日月山早晚', '防护层：轻薄防风防雨外套，高原的风会明显拉低体感温度', '兜底层：每人带一件轻薄羽绒，放在车内随手可取的位置'], note: '一句话：短袖过盛夏，防风衣过高原，薄羽绒兜住所有意外。' },
      { title: '基础分层', items: ['速干短袖或透气内层', '薄长袖衬衣或防晒衣', '抓绒、薄针织或轻保暖中层', '防风外套或轻量冲锋衣', '轻薄羽绒或保暖外套一件', '舒适长裤、备用袜子与防滑运动鞋'] },
      { title: '沙漠与戈壁', items: ['透气长袖与防风外套', '宽檐帽和防沙面巾', '包裹性较好的鞋或鞋口较紧的鞋', '衣摆保持利落，方便在沙地行走'], note: '适用于鸣沙山、G315、水上雅丹、黑独山、冷湖和博罗转井。' },
      { title: '盐湖与湖泊', items: ['防风外套与备用鞋袜', '防水鞋套和手机防坠绳', '衣物避免过于贴地', '米白、宝蓝、卡其、藏蓝或酒红更容易与水面协调'], note: '盐水和盐壳可能损伤鞋面，鞋套也不能替代稳稳走路。' },
      { title: '寺院与文化遗址', items: ['服装整洁得体', '剪裁方便行走和参观', '米白、深棕、藏蓝、灰蓝与酒红更克制', '饰物不影响通道和参观秩序'] },
      { title: '高海拔区域', items: ['保暖帽和手套备用', '保暖衣物放在随手可取处', '强风中缩短停留', '体感变化时先回车内休息'], note: '适用于昆仑山口、可可西里、岗什卡雪峰周边和祁连山区。' },
      { title: '每人建议打包', items: ['短袖或速干上衣3件', '防晒长袖2件', '薄抓绒或卫衣1件', '防风防雨外套1件', '轻薄羽绒服1件', '速干长裤2条', '舒适防滑运动鞋1双', '宽檐帽、墨镜、面罩或防晒口罩', '备用袜子、盐湖拍照用鞋套', '折叠雨衣，比雨伞更适合高原大风'] },
      { title: '敦煌与鸣沙山高温处理', items: ['敦煌、瓜州和鸣沙山尽量安排在上午10点前或下午18点以后', '中午不建议长时间爬沙山或连续暴晒拍照', '衣服选浅色、宽松、透气，不为了拍照长时间裸露皮肤', '莫高窟、鸣沙山这段白天可按36～41℃的烤箱模式准备'] },
      { title: '6人同行特别提醒', items: ['50～60岁成员不要省羽绒服，青海湖清晨、祁连雨后和高海拔垭口都可能用到', '青海湖、祁连、黑独山拍照可以临时脱外套，但等待和走路阶段及时穿回去', '保暖层不要压在后备箱最底层，放在车内座位附近更实用', '任何人感觉冷、头痛或明显疲惫时，先加衣、回车内休息，再决定是否继续停留'] },
    ],
    callout: '保暖层放在车内方便拿取的位置，不必压在后备箱最底层。',
  },
  {
    id: 'sun-protection', eyebrow: 'SUN CARE · 高原日照', title: '高原防晒，不只是一瓶防晒霜', intro: '盐湖、水面和浅色地面会增强反射，防晒和保湿更适合被当作一套随手可用的装备。',
    groups: [
      { title: '随身用品', items: ['SPF50+、PA++++广谱防晒霜', '防晒唇膏与润唇膏', '遮阳帽与UV防护墨镜', '防晒衣或薄长袖', '润肤与保湿产品', '镜头布和湿巾'] },
      { title: '使用节奏', items: ['出门前提前涂抹', '脸、耳朵、颈部和手背都照顾到', '长时间户外、出汗或擦拭后补涂', '车内靠窗位置也留意紫外线', '阴天仍保留基本防护', '皮肤出现晒红或刺痛时减少继续暴露'] },
    ],
    callout: '防晒用品放在随身包或车内，不要全部塞进后备箱。',
  },
  {
    id: 'food-hydration', eyebrow: 'FOOD & WATER · 在路上', title: '路上怎么吃更舒服', intro: '西北风味值得尝，但长途自驾、高原和明显温差下，舒服比一次吃很多更重要。',
    groups: [
      { title: '初到高原', items: ['少量多餐', '先选温热、清淡、易消化的食物', '适量补充碳水化合物', '持续饮水，不短时间大量灌水', '减少饮酒', '不空腹进行长时间活动'] },
      { title: '车内补给', items: ['常温饮用水和保温杯', '小包装坚果、饼干或面包', '耐储存的肉类食品', '香蕉、苹果等水果', '少量电解质饮品', '独立包装湿巾和垃圾袋'], note: '易腐食品不在高温车内久放，驾驶过程中不吃容易噎住或洒落的食物。' },
      { title: '当地风味', items: ['牛羊肉和面食可少量多次尝试', '肠胃敏感时不连续多顿重油重辣', '奶制品先从小份开始', '青稞酒不是必须体验', '不饮用未经处理的自然水体', '对来源不明的食材保持谨慎'] },
      { title: '个人饮食需要', items: ['食物过敏', '高血压、糖尿病、痛风等饮食限制', '低盐、低糖或其他特殊饮食', '常用药是否需要随餐服用', '是否需随车准备糖果或饼干'] },
    ],
    disclaimer: '本页面为一般旅行饮食建议，不能替代医生或营养师的个体化建议。',
  },
  {
    id: 'health-altitude', eyebrow: 'BODY SIGNALS · 身体感受', title: '让身体决定停留的长度', intro: '高原体验因人而异，六个人保持彼此可沟通，比追求同样的步调更重要。',
    groups: [
      { title: '出发前', items: ['个人慢性病与常用药核对', '睡眠与近期身体状态', '食物和药物过敏信息', '必要时向专业医务人员咨询'] },
      { title: '途中', items: ['活动强度逐步增加', '长路段留意头痛、胸闷、恶心等真实体感', '不舒服时先停止活动并休息', '症状明显或持续时尽快获得专业帮助'] },
    ],
  },
  {
    id: 'vehicle-road', eyebrow: 'ON THE ROAD · 车辆', title: '长路段开始前，把车况与补给看一遍', intro: '这条路线真正消耗耐心的往往不是景点，而是风、距离和补给间隔。提前看一眼，比在路上临时找更轻松。',
    groups: [
      { title: '车辆', items: ['轮胎、胎压和备胎状态', '油量或电量与下一补给节点', '灯光、雨刷和玻璃水', '车载充电、警示工具与基础救援信息'] },
      { title: '道路', items: ['离线地图与关键路段截图', '长距离前查看道路临时管制', '驾驶者轮换与休息', '正式停车区或安全宽阔区域再停留'] },
    ],
    callout: '地图上的一条线，看起来往往比真实车程短；留一点余量给风和临时变化。',
  },
  {
    id: 'photography-electronics', eyebrow: 'CAMERA KIT · 轻装记录', title: '摄影与电子设备，先保证随手可用', intro: '旅途中最常错过的不是器材参数，而是电量、存储和拿取速度。六个人的素材最小公式仍然够用。',
    groups: [
      { title: '随身设备', items: ['手机与常用镜头', '充电器、车充和移动电源', '足够的存储空间', '镜头布、防尘袋和手机防坠绳', '需要时准备偏振镜或小型三脚架'] },
      { title: '每天最少三份素材', items: ['10秒稳定全景', '10秒人物行走', '一张六人完整合影'] },
      { title: '盐湖与沙地', items: ['换镜头前避开扬沙', '器材接触盐水后及时清洁外部', '冷热变化时给设备一点适应时间', '非首要设备留在有遮挡的位置'] },
    ],
  },
  {
    id: 'weather-control', eyebrow: 'LIVE CONDITIONS · 当日变化', title: '天气与临时管制，用来帮助取舍', intro: '这本手册提供的是判断框架。真正到现场，天气、道路、客流和活动运营都可能改变最合适的选择。',
    groups: [
      { title: '每天查看', items: ['沿线逐点天气而不是只看出发城市', '风力、能见度和降水', '景区官方临时公告', '主要道路管制与施工', '无人机与拍摄当期规定'] },
      { title: '变化后的替代思路', items: ['风大时把倒影改成公路或建筑题材', '雨天优先博物馆与城市文化内容', '能见度差时减少高处观景点', '活动停运时保留景观本身，不为项目硬等'] },
    ],
  },
  {
    id: 'emergency', eyebrow: 'CONTACTS · 联络', title: '紧急联系，保存比临时搜索可靠', intro: '把全国通用电话、景区咨询与同行紧急联系人分别保存，描述位置时优先说道路、方向和最近公开节点。',
    groups: [
      { title: '同行内部', items: ['每个人保存领队与两位同行者电话', '共享车辆信息与保险信息', '长路段前说清下一集合或补给节点'] },
      { title: '对外联系', items: ['110 报警', '120 医疗急救', '122 道路交通事故报警', '景区咨询、救援与属地政务热线'], note: '页面底部保留可直接拨打的紧急电话抽屉。' },
    ],
  },
]
