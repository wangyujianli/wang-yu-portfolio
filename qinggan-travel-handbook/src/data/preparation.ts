import type { PreparationCard } from '@/types/content'

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
          '老年人、军人、残疾人等优惠证件是否需要携带',
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
