import type {
  BookingLevel,
  OfficialChannel,
  OperatingHoursInfo,
  ScenicContact,
  SourceLevel,
  TicketBookingInfo,
  TicketStatus,
} from '@/types/content'

const VERIFIED_AT = '2026-08-01'

const channel = (type: OfficialChannel['type'], label: string, value: string, url?: string): OfficialChannel => ({
  type,
  label,
  value,
  url,
  copyable: type === 'wechat-official' || type === 'wechat-mini-program',
})

const contact = (
  label: string,
  number: string,
  type: ScenicContact['type'] = 'consultation',
  sourceLevel: SourceLevel = 'A',
): ScenicContact => ({ label, number, type, sourceLevel, verified: sourceLevel === 'A' })

const operating = (input: Partial<OperatingHoursInfo> & Pick<OperatingHoursInfo, 'mode' | 'summary' | 'displayStatus'>): OperatingHoursInfo => ({
  periods: [],
  internalProjects: [],
  temporaryAdjustmentPossible: true,
  confirmationNote: '景区可能因季节、天气、客流、活动、道路或保护要求临时调整，前往前建议再次确认。',
  lastVerifiedAt: VERIFIED_AT,
  sourceLevel: 'B',
  ...input,
})

const noFixed = (
  summary: string,
  mode: OperatingHoursInfo['mode'] = 'no-fixed-hours',
  displayStatus: OperatingHoursInfo['displayStatus'] = 'no-fixed-hours',
  confirmationChannel: string[] = ['属地官方公告', '现场管理信息'],
): OperatingHoursInfo => operating({
  mode,
  summary,
  displayStatus,
  confirmationChannel,
  adjustmentReasons: ['天气', '道路管制', '现场管理'],
})

interface TicketInput {
  ticketStatus: TicketStatus
  ticketLabel: string
  bookingLevel: BookingLevel
  bookingLabel: string
  bookingLeadTime: string
  confirmationTiming: string
  address?: string
  sourceLevel?: SourceLevel
  identityRequired?: boolean
  officialChannels?: OfficialChannel[]
  contacts?: ScenicContact[]
  bookingNotes?: string[]
  accessNotes?: string[]
  verificationNote?: string
  operatingHours: OperatingHoursInfo
}

const ticket = (input: TicketInput): TicketBookingInfo => ({
  officialChannels: [],
  contacts: [],
  bookingNotes: [],
  lastVerifiedAt: VERIFIED_AT,
  sourceLevel: 'B',
  ...input,
})

export const ticketBookingsByPlaceId: Record<string, TicketBookingInfo> = {
  xining: ticket({
    ticketStatus: 'free', ticketLabel: '城市公共区域无统一门票', bookingLevel: 'not-required', bookingLabel: '无需统一预约', bookingLeadTime: '不需要提前预约', confirmationTiming: '具体博物馆、演出或商业体验分别确认', sourceLevel: 'A',
    contacts: [contact('非紧急政务服务', '12345', 'authority'), contact('报警', '110', 'authority'), contact('医疗急救', '120', 'authority'), contact('交通事故报警', '122', 'authority')],
    bookingNotes: ['西宁市区本身无需购票，独立场馆和演出分别确认。'],
    operatingHours: noFixed('城市公共区域无统一景区开放时间，具体场馆分别运营'),
  }),
  'kumbum-monastery': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要购买参观门票', bookingLevel: 'recommended', bookingLabel: '旺季建议提前购票', bookingLeadTime: '建议提前1天', confirmationTiming: '当天出发前可拨打景区电话确认开放时间、实名信息和现场安排', address: '青海省西宁市湟中区鲁沙尔镇金塔路56号', identityRequired: true,
    officialChannels: [channel('wechat-official', '微信认证账号', '塔尔寺景区'), channel('on-site-window', '景区渠道', '景区官方售票窗口')],
    contacts: [contact('票务咨询', '0971-2210188', 'ticket', 'B'), contact('票务咨询', '0971-2232357', 'ticket', 'B')],
    bookingNotes: ['当天出发前可通过景区电话再次确认。'], verificationNote: '本条按旅行团队提供的开放信息更新；遇临时调整以景区当日答复为准。',
    operatingHours: operating({
      mode: 'seasonal',
      summary: '旺季07:30—17:30，淡季08:00—16:30，闭园时停止入园',
      displayStatus: 'verified',
      confirmationChannel: ['票务咨询0971-2210188', '票务咨询0971-2232357', '“塔尔寺景区”认证账号'],
      adjustmentReasons: ['宗教活动', '特殊天气'],
      confirmationNote: '遇宗教活动或特殊天气可能临时调整；当天出发前可拨打0971-2210188或0971-2232357确认。',
      periods: [
        { id: 'high', label: '旺季', dateRange: '4月1日至10月31日', openTime: '07:30', lastEntryTime: '17:30', closeTime: '17:30' },
        { id: 'low', label: '淡季', dateRange: '11月1日至次年3月31日', openTime: '08:00', lastEntryTime: '16:30', closeTime: '16:30' },
      ],
    }),
  }),
  'menyuan-gangshika': ticket({
    ticketStatus: 'partially-ticketed', ticketLabel: '沿途观景无统一门票，正式观景台或景区可能收费', bookingLevel: 'recommended', bookingLabel: '进入正式区域前建议确认', bookingLeadTime: '计划进入正式观景区时，建议提前1天确认', confirmationTiming: '前一天区分公路观景、花田小路和正式景区的开放边界',
    contacts: [contact('百里油菜花海票务咨询', '0970-8610333', 'ticket', 'B')], bookingNotes: ['普通沿途观景与正式收费区域分别管理。'],
    operatingHours: operating({ mode: 'seasonal', summary: '花期与正式观景区时刻随季节调整，临行确认', displayStatus: 'verify-before-visit', confirmationChannel: ['门源属地文旅公告', '百里油菜花海咨询电话'], adjustmentReasons: ['花期', '天气', '道路与现场管理'] }),
  }),
  biandukou: ticket({
    ticketStatus: 'partially-ticketed', ticketLabel: '公路沿途无统一门票，正式旅游区及项目可能收费', bookingLevel: 'recommended', bookingLabel: '进入正式景区前建议确认', bookingLeadTime: '如准备进入景区，建议前一天确认', confirmationTiming: '前一天核对游客中心、开放入口和内部项目', bookingNotes: ['暂无经可靠来源核实的独立景区电话。'],
    operatingHours: operating({ mode: 'confirm-before-visit', summary: '正式旅游区时刻尚无可靠统一公告，请临行确认', displayStatus: 'verify-before-visit', confirmationChannel: ['现场游客中心', '民乐县属地官方公告'] }),
  }),
  'zhangye-danxia': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要购买景区门票', bookingLevel: 'strongly-recommended', bookingLabel: '旺季建议提前购票', bookingLeadTime: '建议提前1至2天', confirmationTiming: '前一天再次确认开闭园时间、入口、观光车和活动安排', identityRequired: true, sourceLevel: 'A',
    officialChannels: [channel('wechat-official', '官方微信公众号', '张掖七彩丹霞旅游景区')], contacts: [contact('景区咨询', '0936-5623666')],
    bookingNotes: ['观光车、深度游及低空项目的停止服务时刻可能不同。', '热气球、直升机、滑翔伞等项目受风力和临时运营安排影响。'],
    operatingHours: operating({ mode: 'seasonal', summary: '8月3日至9日适用：05:30开园，19:00闭园并停止售票', displayStatus: 'verified', sourceLevel: 'A', confirmationChannel: ['“张掖七彩丹霞旅游景区”官方微信公众号', '咨询电话0936-5623666'], officialSourceUrl: 'https://finance.sina.com.cn/jjxw/2026-04-17/doc-inhuutzh3318441.shtml', adjustmentReasons: ['日出日落', '季节', '大风', '活动安排'], periods: [{ id: '2026-summer', label: '2026年夏季运营安排', dateRange: '2026年4月28日至8月31日', openTime: '05:30', lastTicketTime: '19:00', closeTime: '19:00', notes: ['公告明确开闭园时间与售票时间一致；普通游览未另列停止检票时刻。'] }], internalProjects: [{ projectName: '观光车', suspendedByWeather: false, notes: ['末班时刻随当日入园安排确认。'] }, { projectName: '深度游', lastServiceTime: '18:00', suspendedByWeather: true, notes: ['官方公告明确深度游18:00截止入园。'] }, { projectName: '低空体验项目', suspendedByWeather: true, notes: ['运行受风力和当日安排影响。'] }] }),
  }),
  'jiayuguan-pass': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要实名购票', bookingLevel: 'recommended', bookingLabel: '建议提前购票', bookingLeadTime: '建议提前1天', confirmationTiming: '前一天确认开放时间和实名入园要求', identityRequired: true, sourceLevel: 'A',
    officialChannels: [channel('on-site-window', '景区购票', '景区售票处与自助售票机')], contacts: [contact('游客咨询', '0937-6396110'), contact('团队预约', '0937-6396100', 'ticket')], bookingNotes: ['以景区当期认证渠道和实名要求为准。'],
    operatingHours: operating({ mode: 'seasonal', summary: '旺季08:00开放，18:00停止售票，18:30停止入园', displayStatus: 'verified', sourceLevel: 'A', officialSourceUrl: 'https://www.jyg.gov.cn/wlj/xwdt/tzgg/art/2025/art_9ef6a22298a946268de62164b71dfe19.html', confirmationChannel: ['嘉峪关市文化和旅游局最新日间入园须知', '游客咨询0937-6396110'], periods: [{ id: 'high', label: '旺季', dateRange: '5月1日至10月31日', openTime: '08:00', lastTicketTime: '18:00', lastEntryTime: '18:30', closeTime: '18:30' }, { id: 'low', label: '淡季', dateRange: '11月1日至次年4月30日', openTime: '09:00', lastTicketTime: '17:30', lastEntryTime: '18:00', closeTime: '18:00' }] }),
  }),
  'son-of-earth': ticket({ ticketStatus: 'free', ticketLabel: '通常无统一景区门票', bookingLevel: 'not-required', bookingLabel: '无需提前预约', bookingLeadTime: '不需要提前预约', confirmationTiming: '到访前看现场停车和管理提示', bookingNotes: ['暂无独立景区客服电话。'], accessNotes: ['以现场停车和管理规定为准', '不影响道路通行'], operatingHours: noFixed('公共艺术点无统一景区开放时间，建议白天到访') }),
  boundless: ticket({ ticketStatus: 'free', ticketLabel: '通常无统一景区门票', bookingLevel: 'not-required', bookingLabel: '无需提前预约', bookingLeadTime: '不需要提前预约', confirmationTiming: '与大地之子顺路停留，现场管理以当日为准', bookingNotes: ['暂无独立景区客服电话。'], operatingHours: noFixed('公共艺术点无统一景区开放时间，建议白天顺路停留') }),
  'mogao-grottoes': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '必须实名分时预约购票', bookingLevel: 'mandatory', bookingLabel: '必须提前预约', bookingLeadTime: '行程确定后立即查询，旺季不要等到抵达敦煌再购票', confirmationTiming: '参观前一天查看天气与开放公告；当天至少提前30分钟抵达数字展示中心', identityRequired: true, sourceLevel: 'A',
    officialChannels: [channel('official-site', '官方网站', '莫高窟参观预约网', 'https://www.mgk.org.cn/'), channel('wechat-mini-program', '微信服务号或小程序', '莫高窟参观预约网')], contacts: [contact('票务及咨询', '400-833-3715', 'ticket')],
    bookingNotes: ['优先确认常规参观票；不同票种参观内容不同。', '订单预留手机号需要准确。', '洞窟内拍摄规定以现场当期说明为准。'],
    operatingHours: operating({ mode: 'seasonal', summary: '旺季08:00—18:00，16:10停止检票', displayStatus: 'verified', sourceLevel: 'A', officialSourceUrl: 'https://www.dunhuangcaves.org/info/1020/7498.htm', confirmationChannel: ['敦煌研究院最新旅游开放公告', '莫高窟参观预约网'], adjustmentReasons: ['降雨', '极端天气', '临时保护安排'], periods: [{ id: 'high', label: '旺季', dateRange: '4月1日至11月30日', openTime: '08:00', lastCheckInTime: '16:10', closeTime: '18:00', notes: ['在预约时间前至少30分钟抵达莫高窟数字展示中心。'] }, { id: 'low', label: '淡季', dateRange: '12月1日至次年3月31日', openTime: '09:00', lastCheckInTime: '15:10', closeTime: '17:00', notes: ['窟区不设普通游客售票处和停车场。'] }] }),
  }),
  'mingsha-crescent': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要实名购票', bookingLevel: 'strongly-recommended', bookingLabel: '旺季建议提前购票', bookingLeadTime: '建议提前1至3天', confirmationTiming: '前一天确认开闭园、日落、天气和活动，当天下午再次看大风沙尘信息', identityRequired: true, sourceLevel: 'A',
    officialChannels: [channel('official-site', '官方网站', '鸣沙山月牙泉景区', 'https://www.mssyyq.com/'), channel('wechat-official', '官方微信公众号', '鸣沙山月牙泉'), channel('wechat-mini-program', '微信小程序', '游敦煌')], contacts: [contact('景区咨询', '400-118-3388')], bookingNotes: ['骆驼、演出及其他体验项目分别确认。', '星空演唱等活动以当天公告为准。'],
    operatingHours: operating({ mode: 'seasonal', summary: '2026年4月20日起开放及售检票时段06:00—19:30，闭园时刻另行确认', displayStatus: 'verified', sourceLevel: 'A', officialSourceUrl: 'https://www.gswbj.gov.cn/a/2026/04/16/28007.html', confirmationChannel: ['景区官方网站和公众号', '咨询电话400-118-3388'], periods: [{ id: '2026-spring', label: '2026年春夏运营安排', dateRange: '2026年4月20日起', openTime: '06:00', lastCheckInTime: '19:30', notes: ['正式公告未单列闭园时刻，出发前再次确认。'] }], adjustmentReasons: ['大风', '沙尘', '高温', '活动安排'], internalProjects: [{ projectName: '骆驼项目', suspendedByWeather: true, notes: ['具体服务时段以当天现场公告为准。'] }, { projectName: '星空演唱或演出', suspendedByWeather: true, notes: ['举办日期和散场时刻另行公告。'] }, { projectName: '观光车', suspendedByWeather: true, notes: ['末班时刻与景区开放时刻分开确认。'] }] }),
  }),
  'boluo-zhuanjing': ticket({ ticketStatus: 'confirm-before-visit', ticketLabel: '可能需要购买景区或影视基地门票', bookingLevel: 'recommended', bookingLabel: '建议临行确认', bookingLeadTime: '建议前一天确认', confirmationTiming: '通过阿克塞县官方文旅渠道或现场游客中心确认', bookingNotes: ['暂未录入可靠的独立官方网站和景区电话。'], verificationNote: '不将第三方售票入口作为官方网站。', operatingHours: operating({ mode: 'confirm-before-visit', summary: '影视基地开放时刻尚无可靠当前公告，请前一天确认', displayStatus: 'verify-before-visit', confirmationChannel: ['阿克塞县官方文旅渠道', '现场游客中心'] }) }),
  'g315-u-road': ticket({ ticketStatus: 'free', ticketLabel: '公共道路无门票', bookingLevel: 'not-required', bookingLabel: '无需预约', bookingLeadTime: '不需要预约，但需要确认道路和天气', confirmationTiming: '出发前看道路、天气和临时管制', sourceLevel: 'A', contacts: [contact('交通事故报警', '122', 'authority'), contact('交通运输服务监督', '12328', 'authority')], accessNotes: ['道路通行不等于可以停车拍摄，现场以交通管理为准。'], operatingHours: noFixed('公共道路无统一景区开放时间，通行状态以道路管理信息为准') }),
  'wusute-yadan': ticket({ ticketStatus: 'ticket-required', ticketLabel: '需要购买门票，观光车规则需同时确认', bookingLevel: 'strongly-recommended', bookingLabel: '旺季建议提前购票', bookingLeadTime: '建议提前1至2天', confirmationTiming: '官方已确认恢复开放；前一天再看开闭园、天气、住宿和观光车安排', sourceLevel: 'A', officialChannels: [channel('official-site', '景区官方网站', '乌素特（水上）雅丹景区', 'https://www.wusuteyadan.com/'), channel('wechat-official', '官方微信服务号', '乌素特雅丹'), channel('on-site-window', '现场购票', '景区现场售票')], contacts: [contact('景区咨询', '13909778220')], bookingNotes: ['官网支持“乌素特雅丹”微信服务号预订。', '住宿订单是否包含门票和二次入园需单独确认。'], verificationNote: '官网2026年6月25日公告确认景区及娱乐项目已恢复开放；最新开闭园分项时刻未公开列出。', operatingHours: operating({ mode: 'confirm-before-visit', summary: '6月22日起已恢复开放；8月具体开闭园和项目末班需看官方服务号', displayStatus: 'verify-before-visit', sourceLevel: 'A', confirmationChannel: ['“乌素特雅丹”微信服务号', '景区官网公告', '咨询电话13909778220'], officialSourceUrl: 'https://www.wusuteyadan.com/index.php/content/67', adjustmentReasons: ['天气', '道路', '运营调度'], internalProjects: [{ projectName: '观光车', notes: ['官网当前未单列8月首末班，避免沿用往年时刻。'] }, { projectName: '水上项目', suspendedByWeather: true, notes: ['恢复开放公告确认项目已开放，具体时段受风力和现场调度影响。'] }, { projectName: '景区内住宿二次入园', notes: ['是否包含在住宿权益内需向住宿方与景区同时确认。'] }] }) }),
  'dachaidan-emerald': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要购买景区门票', bookingLevel: 'recommended', bookingLabel: '建议提前购票', bookingLeadTime: '建议提前1天', confirmationTiming: '前一天核对当日开闭园、观光车和天气；到达后以景区实际运营时间为准',
    contacts: [contact('票务咨询参考', '0977-7775888', 'ticket', 'B')],
    verificationNote: '海西州文体旅游广电局消息确认景区已恢复开放；季节时刻按旅行团队汇总信息更新，电话仍为公开平台参考。',
    bookingNotes: ['观光项目运营时刻与景区闭园时刻分别确认。', '景区面积较大，核心湖区间距较远，可提前规划游览重点并尽早入园。'],
    operatingHours: operating({
      mode: 'seasonal',
      summary: '旺季08:00—19:30，淡季09:00—18:30；具体以景区当日实际运营为准',
      displayStatus: 'verified',
      sourceLevel: 'B',
      officialSourceUrl: 'https://travel.china.com.cn/txt/2026-06/29/content_118572354.shtml',
      confirmationChannel: ['大柴旦官方文旅公告', '景区认证渠道', '票务咨询0977-7775888'],
      adjustmentReasons: ['季节', '天气', '特定日期安排', '临时运营调整'],
      confirmationNote: '开放时间会随季节和景区实际运营调整，部分年份或特定日期可能提前或延后，以景区当日公告为准。',
      periods: [
        { id: 'high', label: '旺季', dateRange: '5月1日至10月31日', openTime: '08:00', closeTime: '19:30', notes: ['部分年份或特定日期可能提前或延后，以景区当日实际运营时间为准。'] },
        { id: 'low', label: '淡季', dateRange: '11月1日至次年4月30日', openTime: '09:00', closeTime: '18:30' },
      ],
    }),
  }),
  'chaka-salt-lake': ticket({
    ticketStatus: 'ticket-required', ticketLabel: '需要购票，交通和体验项目需分别确认', bookingLevel: 'recommended', bookingLabel: '可提前购买，非强制预约', bookingLeadTime: '可提前购买，也可按售票时间当天办理', confirmationTiming: '按7月22日起旺季运营公告执行；当天只需查看天气和项目调度', identityRequired: true, sourceLevel: 'A',
    officialChannels: [channel('official-site', '官方网站', '茶卡盐湖景区', 'https://www.chakasl.com/'), channel('official-ticket', '官方票务', '茶卡盐湖官方票务', 'https://www.chakasl.com/ticket.html'), channel('wechat-official', '官方微信公众号', '茶卡盐湖'), channel('wechat-mini-program', '微信小程序', '西矿智旅')], contacts: [contact('景区咨询', '0977-8246999'), contact('投诉电话', '0977-8246999', 'complaint'), contact('景区救援', '0977-8246699', 'rescue'), contact('门票预约', '0971-7533111', 'ticket')], bookingNotes: ['小火车、游船、夜游等项目属于不同运营安排。'],
    operatingHours: operating({ mode: 'seasonal', summary: '8月3日至9日适用：07:20开园，20:00停止检票，21:30闭园', displayStatus: 'verified', sourceLevel: 'A', confirmationChannel: ['茶卡盐湖官方网站通知公告', '茶卡盐湖微信公众号', '咨询电话0977-8246999'], officialSourceUrl: 'https://www.chakasl.com/talk/detail/2593.html', adjustmentReasons: ['天气', '临时运营调度'], periods: [{ id: '2026-peak', label: '2026年旺季运营安排', dateRange: '2026年7月22日起', openTime: '07:20', ticketSalesStartTime: '07:20', lastTicketTime: '19:50', lastCheckInTime: '20:00', closeTime: '21:30', notes: ['普通票19:50停止售票，套票18:50停止售票；线上电子票24小时可购。'] }], internalProjects: [{ projectName: '景交车', firstServiceTime: '07:30', lastServiceTime: '20:40', notes: ['茶卡新站末班20:30，茶卡盐站末班20:40。'] }, { projectName: '观光小火车', firstServiceTime: '07:35', lastServiceTime: '20:30', suspendedByWeather: true, notes: ['天空之镜站进湖末班19:10，茶卡雪站出湖返程末班20:30。'] }, { projectName: '游船', firstServiceTime: '07:35', lastServiceTime: '20:10', suspendedByWeather: true, notes: ['湖滨码头首班07:35，湖心码头末班20:10。'] }] }),
  }),
  'qinghai-lake': ticket({ ticketStatus: 'partially-ticketed', ticketLabel: '青海湖无统一大门票，二郎剑等正规景区需要购票', bookingLevel: 'strongly-recommended', bookingLabel: '进入正式景区建议提前购票', bookingLeadTime: '计划进入二郎剑景区时，建议提前1至3天', confirmationTiming: '官方按月发布二郎剑开闭园表；8月行程请在“青海湖景区”公众号或“智游青海湖”查看当月表', sourceLevel: 'A', officialChannels: [channel('wechat-official', '官方微信公众号', '青海湖景区'), channel('wechat-mini-program', '官方微信小程序', '智游青海湖')], contacts: [contact('二郎剑景区咨询', '0974-8519826'), contact('二郎剑景区投诉', '18297180790', 'complaint'), contact('二郎剑景区举报', '18997174342', 'report')], accessNotes: ['青海湖各开放区域分别运营，只从正规开放区域进入。'], verificationNote: '官方6月公告明确“7月起另行通知”；截至核实日，网页端未检索到可验证的8月分项表，因此不沿用6月时刻。', operatingHours: operating({ mode: 'monthly', summary: '二郎剑按月调整；8月开闭园与车船时刻需直接查看官方公众号', displayStatus: 'verify-before-visit', sourceLevel: 'A', officialSourceUrl: 'https://www.gonghe.gov.cn/xwdt/tzgg/content_1013653405', confirmationChannel: ['“青海湖景区”官方微信公众号', '“智游青海湖”小程序', '二郎剑咨询电话0974-8519826'], adjustmentReasons: ['月份', '大风', '降雨', '湖面风浪', '车船调度'], internalProjects: [{ projectName: '二郎剑景区', notes: ['官方逐月发布开闭园及车船项目表，8月数字以当月公告为准。'] }, { projectName: '游船', suspendedByWeather: true, notes: ['风浪与当日调度可能影响运营。'] }, { projectName: '观光车与其他项目', notes: ['以当月公告及当天现场调度为准。'] }] }) }),
  'tibetan-culture-museum': ticket({ ticketStatus: 'ticket-required', ticketLabel: '部分场馆或展览需要购票', bookingLevel: 'recommended', bookingLabel: '建议提前确认', bookingLeadTime: '建议提前1天确认场馆、展览和讲解', confirmationTiming: '前一天核对南北馆、特展和讲解安排', sourceLevel: 'A', officialChannels: [channel('official-site', '官方网站', '青海藏文化博物院', 'https://www.tibetanculturemuseum.com.cn/'), channel('wechat-official', '官方微信公众号', '青海藏文化博物院')], contacts: [contact('参观咨询', '0971-5317881')], bookingNotes: ['南北馆及特展安排可能不同。', '人工讲解需要单独确认。'], operatingHours: operating({ mode: 'seasonal', summary: '公开平台显示夏冬季时刻不同，停止入馆时刻请临行确认', displayStatus: 'verify-before-visit', confirmationChannel: ['博物院官方网站', '官方微信公众号', '参观咨询0971-5317881'], periods: [{ id: 'summer-reference', label: '夏季公开信息参考', dateRange: '夏季，适用日期待确认', openTime: '09:00', closeTime: '18:00' }, { id: 'winter-reference', label: '冬季公开信息参考', dateRange: '冬季，适用日期待确认', openTime: '09:00', closeTime: '17:00' }], adjustmentReasons: ['季节', '场馆维护', '特展安排'] }) }),
  'riyue-mountain': ticket({ ticketStatus: 'partially-ticketed', ticketLabel: '进入正式景区通常需要购票，公路途经无统一门票', bookingLevel: 'recommended', bookingLabel: '进入正式景区前建议确认', bookingLeadTime: '建议提前1天确认', confirmationTiming: '前一天确认正式入口、停止入园与天气', bookingNotes: ['暂未录入经可靠来源核实的独立景区电话。'], operatingHours: operating({ mode: 'confirm-before-visit', summary: '正式景区开闭园时刻尚待可靠公告确认', displayStatus: 'verify-before-visit', confirmationChannel: ['属地官方文旅公告', '现场游客中心'] }) }),
  heimahe: ticket({ ticketStatus: 'partially-ticketed', ticketLabel: '镇区无统一门票，正式湖岸区域或经营项目可能收费', bookingLevel: 'recommended', bookingLabel: '进入正式区域前建议确认', bookingLeadTime: '前一天确认开放区域和停车管理', confirmationTiming: '日落前确认正规入口与停车位置', accessNotes: ['不同湖岸区域分别管理，以现场开放边界为准。'], operatingHours: noFixed('镇区与公共道路无统一景区开放时间，正式湖岸区域分别运营') }),
  'qilian-grassland': ticket({ ticketStatus: 'partially-ticketed', ticketLabel: '沿途草原无统一门票，牧场、景区和体验项目可能收费', bookingLevel: 'recommended', bookingLabel: '进入经营区域前建议确认', bookingLeadTime: '准备进入经营区域时，建议前一天确认', confirmationTiming: '进入前确认项目内容、开放边界和停车方式', accessNotes: ['草原沿途与经营区域分别管理。'], operatingHours: noFixed('沿途草原无统一景区开放时间，经营区域分别确认') }),
  'zhuoer-mountain': ticket({ ticketStatus: 'ticket-required', ticketLabel: '进入正式景区需要购票', bookingLevel: 'recommended', bookingLabel: '建议提前购票', bookingLeadTime: '建议提前1天', confirmationTiming: '前一天核对开闭园、景交车与天气', contacts: [contact('景区咨询参考', '0970-8679114', 'consultation', 'B')], verificationNote: '临行前请通过景区认证账号再次核对。', operatingHours: operating({ mode: 'confirm-before-visit', summary: '当前开园、停止入园与闭园时刻请临行确认', displayStatus: 'verify-before-visit', confirmationChannel: ['景区认证账号', '咨询电话0970-8679114'], adjustmentReasons: ['季节', '天气', '景交车调度'] }) }),
  delingha: ticket({ ticketStatus: 'free', ticketLabel: '城市公共区域无统一门票', bookingLevel: 'not-required', bookingLabel: '无需统一预约', bookingLeadTime: '不需要预约', confirmationTiming: '周边独立景点分别确认票务和开放信息', bookingNotes: ['德令哈市区与周边独立景点分别运营。'], operatingHours: noFixed('城市公共区域无统一景区开放时间，独立场馆分别运营') }),
  'lenghu-oil-town': ticket({ ticketStatus: 'confirm-before-visit', ticketLabel: '无统一稳定票务信息，需确认具体开放区域和管理要求', bookingLevel: 'recommended', bookingLabel: '建议临行确认开放边界', bookingLeadTime: '建议提前1天确认', confirmationTiming: '通过冷湖属地公告确认允许进入的区域', accessNotes: ['残损建筑与正式开放游览区需要明确区分。'], operatingHours: noFixed('非正式开放区域无普通景区开闭园时间，以属地准入管理为准', 'access-controlled', 'access-controlled', ['冷湖属地最新公告']) }),
  'black-mountain': ticket({ ticketStatus: 'access-control', ticketLabel: '重点是开放边界和准入管理，不按普通景区票务理解', bookingLevel: 'recommended', bookingLabel: '需要核对合法开放边界', bookingLeadTime: '建议前一天核对属地最新公告', confirmationTiming: '无法确认合法位置的网络照片只作为地貌参考', accessNotes: ['仅限合法开放区域', '不进入禁游区，不开展无人区穿越。'], operatingHours: noFixed('无普通景区开闭园时间，进入范围以属地最新管理公告为准', 'access-controlled', 'access-controlled', ['属地最新公告']) }),
  'yanzhi-mountain': ticket({ ticketStatus: 'confirm-before-visit', ticketLabel: '无稳定统一票务信息，开放和支线路况需确认', bookingLevel: 'recommended', bookingLabel: '建议临行确认', bookingLeadTime: '建议前一天确认', confirmationTiming: '通过属地文旅或道路信息确认开放与支线路况', bookingNotes: ['未找到稳定的独立景区售票或客服电话。'], operatingHours: operating({ mode: 'confirm-before-visit', summary: '开放范围与支线路况需临行确认，建议白天到访', displayStatus: 'verify-before-visit', confirmationChannel: ['属地文旅公告', '道路管理信息'] }) }),
  'qarhan-salt-lake': ticket({ ticketStatus: 'ticket-required', ticketLabel: '需要购买景区门票或相关游览产品', bookingLevel: 'strongly-recommended', bookingLabel: '建议提前购票', bookingLeadTime: '建议提前1天', confirmationTiming: '官方近期信息确认景区正常接待；前一天再确认沙尘天气、观光车和停止入园时间', sourceLevel: 'A', officialChannels: [channel('wechat-official', '景区官方微信公众号', '察尔汗盐湖景区')], contacts: [contact('景区客服', '18309798669'), contact('景区投诉', '18309799558', 'complaint'), contact('应急救援', '18309799559', 'rescue')], bookingNotes: ['门区与观光车运营信息分别确认。', '生产区域不属于普通游览范围。'], verificationNote: '格尔木市政府6月22日信息确认景区在雨后已恢复开放，但未公布8月分项时刻。', operatingHours: operating({ mode: 'confirm-before-visit', summary: '景区已恢复开放；8月停止入园和观光车末班需向官方客服确认', displayStatus: 'verify-before-visit', sourceLevel: 'A', officialSourceUrl: 'https://www.geermu.gov.cn/details?id=ff8080819d6c38cf019eee0a21311094', confirmationChannel: ['“察尔汗盐湖景区”官方微信公众号', '景区客服18309798669', '格尔木市官方文旅公告'], adjustmentReasons: ['沙尘天气', '降雨', '临时运营', '生产区域管理'] }) }),
  'queen-mother-lake': ticket({ ticketStatus: 'confirm-before-visit', ticketLabel: '是否收费及游览方式取决于当期线路和现场管理', bookingLevel: 'recommended', bookingLabel: '建议临行确认', bookingLeadTime: '建议提前1天向格尔木当地文旅渠道确认', confirmationTiming: '确认当期线路、道路与允许停留范围', bookingNotes: ['目前未录入经核实的独立景区客服电话。'], operatingHours: operating({ mode: 'confirm-before-visit', summary: '相关游览区域没有可确认的统一开闭园时刻', displayStatus: 'verify-before-visit', sourceLevel: 'A', confirmationChannel: ['格尔木市官方文旅渠道', '现场管理信息'], adjustmentReasons: ['道路', '天气', '线路管理'] }) }),
  'kunlun-pass': ticket({ ticketStatus: 'free', ticketLabel: '公共道路节点通常无门票', bookingLevel: 'not-required', bookingLabel: '无需预约', bookingLeadTime: '不需要预约，但需确认天气、道路和停车条件', confirmationTiming: '出发前看道路、天气和停车条件', sourceLevel: 'A', contacts: [contact('交通事故报警', '122', 'authority'), contact('交通运输服务监督', '12328', 'authority')], accessNotes: ['道路节点与保护区域边界需要区分。'], operatingHours: noFixed('公共道路节点无统一景区开放时间，通行以道路管理信息为准') }),
  'hoh-xil': ticket({ ticketStatus: 'access-control', ticketLabel: '不是普通售票景区，只能在合法道路和开放观察区域活动', bookingLevel: 'not-required', bookingLabel: '无需景区预约，需确认准入信息', bookingLeadTime: '出发前一天确认道路、天气和保护区管理提示', confirmationTiming: '以合法道路、保护区管理与现场指引为准', sourceLevel: 'A', contacts: [contact('紧急报警', '110', 'authority'), contact('医疗急救', '120', 'authority'), contact('交通事故报警', '122', 'authority')], accessNotes: ['不提供野生动物位置线索', '道路开放不等于保护区域可以进入。'], operatingHours: noFixed('无普通景区开闭园时间，进入范围以保护区与道路管理信息为准', 'access-controlled', 'access-controlled', ['保护区管理提示', '道路管理信息']) }),
  'tibetan-antelope': ticket({ ticketStatus: 'access-control', ticketLabel: '无统一门票，只能在合法道路和允许观察区域远距离观看', bookingLevel: 'not-required', bookingLabel: '无需景区预约，需确认观察边界', bookingLeadTime: '前一天确认道路和保护管理信息', confirmationTiming: '动物出现不可预设，以合法道路和远距离观察为前提', sourceLevel: 'A', contacts: [contact('紧急报警', '110', 'authority'), contact('医疗急救', '120', 'authority'), contact('交通事故报警', '122', 'authority')], accessNotes: ['动物位置和数量不可预设', '不公布所谓固定出没点。'], operatingHours: noFixed('无普通景区开闭园时间，观察以保护管理和道路开放信息为准', 'access-controlled', 'access-controlled', ['保护区管理提示', '道路管理信息']) }),
}

ticketBookingsByPlaceId['riyue-mountain'] = ticket({
  ticketStatus: 'partially-ticketed',
  ticketLabel: '进入正式景区通常需要购票，公路途经无统一门票',
  bookingLevel: 'recommended',
  bookingLabel: '进入正式景区前建议确认',
  bookingLeadTime: '建议提前1天确认',
  confirmationTiming: '出行前确认当日开放状态、正式入口、停止入园与天气',
  bookingNotes: ['根据最新通知，景区于8月1日、8月2日临时闭园，已于8月3日恢复对外开放。'],
  operatingHours: operating({
    mode: 'seasonal',
    summary: '当前已恢复开放；旺季通常07:00—19:30，淡季通常08:30—18:30',
    displayStatus: 'verify-before-visit',
    confirmationChannel: ['属地官方文旅公告', '景区或现场游客中心'],
    adjustmentReasons: ['临时闭园', '天气', '道路与现场管理', '季节调整'],
    confirmationNote: '当前状态：根据最新通知，景区于8月1日、8月2日临时闭园，已于8月3日恢复对外开放。出行前请务必确认当日状态，以免耽误行程。',
    periods: [
      { id: 'high', label: '旺季', dateRange: '4月—10月', openTime: '07:00', closeTime: '19:30' },
      { id: 'low', label: '淡季', dateRange: '11月—次年3月', openTime: '08:30', closeTime: '18:30' },
    ],
  }),
})

export const ticketBookingFor = (placeId: string): TicketBookingInfo => {
  const info = ticketBookingsByPlaceId[placeId]
  if (!info) throw new Error(`Missing ticket booking data for ${placeId}`)
  return info
}
