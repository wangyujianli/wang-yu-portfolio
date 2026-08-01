import { accommodationById } from '@/data/accommodations'
import type { AccommodationHub } from '@/types/content'

interface HubSource extends Omit<AccommodationHub, 'accommodations'> {
  accommodationIds: string[]
}

const hub = (source: HubSource): AccommodationHub => ({
  id: source.id,
  name: source.name,
  description: source.description,
  placeIds: source.placeIds,
  remoteStayNotice: source.remoteStayNotice,
  accommodations: source.accommodationIds.map((id) => {
    const item = accommodationById.get(id)
    if (!item) throw new Error(`Unknown accommodation: ${id}`)
    return item
  }),
})

export const accommodationHubs: AccommodationHub[] = [
  hub({
    id: 'xining', name: '西宁', description: '城市配套最完整，适合抵达、返程或把长途行车前后的一晚留得从容。',
    placeIds: ['xining', 'kumbum-monastery', 'tibetan-culture-museum', 'riyue-mountain'], accommodationIds: ['xining-holiday-express-railway', 'xining-sofitel', 'qinghai-hotel'],
  }),
  hub({
    id: 'menyuan', name: '门源', description: '住在浩门镇更方便吃饭、补给和统一停车，再根据花期与天气前往观景区域。',
    placeIds: ['menyuan-gangshika', 'qilian-grassland', 'zhuoer-mountain'], accommodationIds: ['menyuan-haocheng', 'menyuan-haoyun', 'menyuan-liangyuan'],
  }),
  hub({
    id: 'zhangye', name: '张掖与七彩丹霞', description: '可在城区舒适度与丹霞早晚光线之间取舍，两种落脚方式各有侧重。',
    placeIds: ['biandukou', 'zhangye-danxia'], accommodationIds: ['linze-qicai', 'zhangye-hotel', 'zhangye-huachen'],
  }),
  hub({
    id: 'jiayuguan', name: '嘉峪关', description: '成熟城市节点，停车、餐饮与洗衣更容易安排，也便于继续向瓜州和敦煌行驶。',
    placeIds: ['jiayuguan-pass'], accommodationIds: ['jiayuguan-hotel', 'jiayuguan-jiugang', 'jiayuguan-great-wall'],
  }),
  hub({
    id: 'dunhuang', name: '敦煌', description: '可在鸣沙山近住、夜市便利与综合舒适度之间选择，多个景点共用同一落脚城市。',
    placeIds: ['son-of-earth', 'boundless', 'mogao-grottoes', 'mingsha-crescent', 'boluo-zhuanjing'], accommodationIds: ['dunhuang-villa', 'dunhuang-hotel', 'dunhuang-tianhe'],
  }),
  hub({
    id: 'water-yadan', name: '乌素特水上雅丹', description: '荒原路段可选住宿有限，重点不是多比较，而是提前确认开放、供暖、供氧与餐饮。',
    remoteStayNotice: '这一段补给距离长，若不住景区，下一处成熟住宿需要结合当天路况重新核算。',
    placeIds: ['g315-u-road', 'wusute-yadan'], accommodationIds: ['wusute-yadan-hotel', 'wusute-yadan-camp'],
  }),
  hub({
    id: 'dachaidan', name: '大柴旦', description: '镇区是柴达木路段较成熟的补给点，适合集中处理加油、洗衣、餐饮和车辆充电。',
    placeIds: ['dachaidan-emerald', 'lenghu-oil-town', 'black-mountain', 'yanzhi-mountain'], accommodationIds: ['dachaidan-guangyue', 'dachaidan-longzhimeng', 'dachaidan-xihai'],
  }),
  hub({
    id: 'chaka', name: '茶卡', description: '住宿分布在镇区与盐湖片区，选择时更应看早晚观景需求和房型设施确定性。',
    placeIds: ['chaka-salt-lake'], accommodationIds: ['chaka-sky-one', 'chaka-yinghu', 'chaka-starry-inn'],
  }),
  hub({
    id: 'qinghai-lake', name: '青海湖', description: '二郎剑周边以景区近住为主，湖景、安静与设施完整度需要逐项权衡。',
    placeIds: ['qinghai-lake', 'heimahe'], accommodationIds: ['qinghai-lake-hotel', 'qinghai-lake-holiday', 'qinghai-lake-jiuqi'],
  }),
  hub({
    id: 'delingha', name: '德令哈', description: '成熟城区位于柴达木东西向路线中段，餐饮、加油与车辆补给集中，适合把长途行车拆得更从容。',
    placeIds: ['delingha'], accommodationIds: ['delingha-haixi-hotel', 'delingha-senyuan', 'delingha-blue-sky'],
  }),
  hub({
    id: 'golmud', name: '格尔木', description: '格尔木是察尔汗盐湖与昆仑山南线共用的成熟住宿节点，适合连续住两晚，减少频繁搬运行李。',
    placeIds: ['qarhan-salt-lake', 'queen-mother-lake', 'kunlun-pass', 'hoh-xil', 'tibetan-antelope'], accommodationIds: ['golmud-hotel', 'golmud-kaibang', 'golmud-salt-lake-hotel'],
  }),
]

export const accommodationHubById = new Map(accommodationHubs.map((item) => [item.id, item]))
