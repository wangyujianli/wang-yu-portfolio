export interface TicketChecklistGroup {
  id: string
  title: string
  note: string
  placeIds: string[]
}

export const ticketChecklistGroups: TicketChecklistGroup[] = [
  { id: 'urgent', title: 'A · 必须尽早处理', note: '票务本身会影响是否能进入。', placeIds: ['mogao-grottoes'] },
  { id: 'advance', title: 'B · 旺季建议提前购票', note: '先确认入口和项目，比临到门口再查更从容。', placeIds: ['kumbum-monastery', 'zhangye-danxia', 'jiayuguan-pass', 'mingsha-crescent', 'wusute-yadan', 'dachaidan-emerald', 'chaka-salt-lake', 'qinghai-lake', 'tibetan-culture-museum', 'zhuoer-mountain', 'qarhan-salt-lake'] },
  { id: 'partial', title: 'C · 进入正式区域时可能收费', note: '沿途公共区域与正式经营区域需要分开看。', placeIds: ['menyuan-gangshika', 'biandukou', 'riyue-mountain', 'heimahe', 'qilian-grassland'] },
  { id: 'boundary', title: 'D · 确认开放或准入边界', note: '重点是确认现场开放范围，不把“无统一门票”理解成可以随意进入。', placeIds: ['boluo-zhuanjing', 'lenghu-oil-town', 'black-mountain', 'yanzhi-mountain', 'queen-mother-lake', 'kunlun-pass', 'hoh-xil', 'tibetan-antelope'] },
]

export const formalAttractionPlaceIds = [
  'kumbum-monastery',
  'menyuan-gangshika',
  'biandukou',
  'zhangye-danxia',
  'jiayuguan-pass',
  'mogao-grottoes',
  'mingsha-crescent',
  'boluo-zhuanjing',
  'wusute-yadan',
  'dachaidan-emerald',
  'chaka-salt-lake',
  'qinghai-lake',
  'tibetan-culture-museum',
  'riyue-mountain',
  'zhuoer-mountain',
  'qarhan-salt-lake',
  'queen-mother-lake',
]
