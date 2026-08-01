import type { Accommodation, AccommodationImage } from '@/types/content'

type IllustrationTone = 'city' | 'desert' | 'lake'

const illustrationNames: Record<IllustrationTone, string> = {
  city: '城市住宿环境',
  desert: '荒原住宿环境',
  lake: '湖畔住宿环境',
}

function makeImages(name: string, tone: IllustrationTone): AccommodationImage[] {
  const tones: IllustrationTone[] = [tone, tone === 'city' ? 'lake' : 'city', tone === 'desert' ? 'lake' : 'desert']
  return tones.map((item, index) => ({
    src: `/images/accommodations/${item}-room.svg`,
    alt: `${name}${illustrationNames[item]}示意图 ${index + 1}，实际房型以住宿方为准`,
    credit: '向西而行手册环境示意',
  }))
}

function amap(name: string): string {
  return `https://www.amap.com/search?query=${encodeURIComponent(name)}`
}

const stay = (item: Accommodation): Accommodation => item

export const accommodations: Accommodation[] = [
  stay({
    id: 'xining-holiday-express-railway', name: '西宁火车站智选假日酒店', tag: '位置首选', area: '西宁站片区',
    address: '青海省西宁市城东区互助西路145号', proximityText: '到西宁站约5分钟车程，到城区主要点位约15—25分钟',
    reason: '进出城和取还车都顺手，适合把抵达或返程那一晚安排得简单。', suitableFor: ['航班或火车衔接', '自驾取还车', '连锁服务'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true }, quietness: '临交通节点，订房时可询问背街房',
    cautions: ['停车权益、房型朝向与早餐份数在下单前确认'], images: makeImages('西宁火车站智选假日酒店', 'city'),
    detailUrl: 'https://www.ihg.com/holidayinnexpress/hotels/cn/zh/xining/xnnrw/hoteldetail/directions', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'xining-sofitel', name: '西宁新华联索菲特大酒店', tag: '舒适首选', area: '海湖新区',
    address: '青海省西宁市城西区五四西路63号', proximityText: '到海湖新区餐饮与城市公共空间约5—15分钟',
    reason: '公共空间与综合配套更完整，适合在长途行车前后留一晚从容休整。', suitableFor: ['舒适休整', '城市配套', '多人同行'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true }, quietness: '城市综合体内，房间朝向会影响安静感',
    cautions: ['停车收费规则、相邻房安排与早餐时间在预订前确认'], images: makeImages('西宁新华联索菲特大酒店', 'city'),
    detailUrl: 'https://all.accor.com/hotel/9567/index.zh.shtml', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'qinghai-hotel', name: '青海宾馆', tag: '安静休息', area: '城西区',
    address: '青海省西宁市城西区黄河路158号', proximityText: '到新宁广场、城市公园和中心城区约5—15分钟',
    reason: '老牌城市宾馆的园区感较安稳，适合更看重房间安静与停车便利的同行。', suitableFor: ['安静休息', '城区漫步', '自驾停车'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true }, quietness: '院区相对安静，仍建议确认不临活动空间的房型',
    cautions: ['不同楼栋和装修批次可能有差异，预订时确认具体楼栋'], images: makeImages('青海宾馆', 'city'), detailUrl: amap('青海宾馆 西宁'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'menyuan-haocheng', name: '门源浩城大酒店', tag: '位置首选', area: '浩门镇中心',
    address: '青海省海北州门源县浩门镇东大街30号广场西侧', proximityText: '到县城补给点约5分钟，到花海观景区域约20—35分钟',
    reason: '位于县城中心，餐饮、补给和次日出发衔接较方便，是门源节点的省心选择。', suitableFor: ['县城补给', '停车便利', '多人同行'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '中心位置，偏内侧房间通常更安静',
    cautions: ['花期入住集中，确认停车位、电梯与房间朝向'], images: makeImages('门源浩城大酒店', 'lake'), detailUrl: 'https://www.amap.com/place/B0FFF3TRL5', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'menyuan-haoyun', name: '门源浩云饭店', tag: '连锁稳妥', area: '浩门镇老城',
    address: '青海省海北州门源县浩门镇西大街22号', proximityText: '到县城商业与补给点步行可达，到花海约20—35分钟车程',
    reason: '房量与停车空间相对成熟，适合六人同行希望住在同一处、少折腾行李的情况。', suitableFor: ['同住一处', '停车便利', '早餐需求'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '位于老城中心，临街与背街房差别较明显',
    cautions: ['确认同楼层房间、电梯运行和夜间街面朝向'], images: makeImages('门源浩云饭店', 'city'), detailUrl: amap('门源浩云饭店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'menyuan-liangyuan', name: '门源亮媛臻美酒店', tag: '安静休息', area: '浩门镇大十字',
    address: '青海省海北州门源县北大街1号', proximityText: '县城餐饮与补给步行可达，到花海约20—35分钟车程',
    reason: '房间数量不大、更新较新，适合更在意整洁与安静、能提前确认房型的同行。', suitableFor: ['整洁房间', '安静休息', '小规模住宿'],
    facilities: { parking: true, elevator: true, breakfast: false }, quietness: '房量较少，预订时可直接确认安静房',
    cautions: ['目前早餐不作为固定设施，停车位与同层房间需要预先确认'], images: makeImages('门源亮媛臻美酒店', 'city'), detailUrl: amap('门源亮媛臻美酒店'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'zhangye-hotel', name: '张掖宾馆', tag: '舒适首选', area: '滨河新区',
    address: '甘肃省张掖市甘州区滨河新区滨河大道', proximityText: '到张掖城区约10分钟，到七彩丹霞约45—60分钟',
    reason: '园区和城市配套较完整，适合看完丹霞后回城休整，也方便第二天继续向西。', suitableFor: ['舒适休整', '城市餐饮', '长途自驾'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '新区环境相对舒展，会议活动日期可能影响安静度',
    cautions: ['确认所在楼栋、团队活动和早餐开始时间'], images: makeImages('张掖宾馆', 'city'), detailUrl: 'https://m.zhangyehotel.cn/', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'zhangye-huachen', name: '张掖华辰国际大酒店', tag: '位置首选', area: '甘州区中心',
    address: '甘肃省张掖市甘州区东大街162号', proximityText: '到市区主要餐饮约5—15分钟，到七彩丹霞约50—65分钟',
    reason: '住在城区更便于补给和晚餐，适合把丹霞作为往返游览而不想住景区周边。', suitableFor: ['城区便利', '餐饮选择', '补给采购'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '中心城区，建议询问高楼层或背街房',
    cautions: ['门牌与停车入口以到店导航为准，确认大车或商务车停放位置'], images: makeImages('张掖华辰国际大酒店', 'city'), detailUrl: amap('张掖华辰国际大酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'linze-qicai', name: '临泽七彩宾馆', tag: '位置首选', area: '临泽县丹霞片区',
    address: '甘肃省张掖市临泽县丹霞大道七彩镇', proximityText: '到七彩丹霞景区入口约10—20分钟车程',
    reason: '离丹霞更近，适合把日落或清晨光线放在首位，减少景区与城区之间的往返。', suitableFor: ['丹霞日落', '减少往返', '早晚拍摄'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '旅游片区旺季人流集中，房间位置影响体验',
    cautions: ['确认准确入口、早餐时间和景区班次变化'], images: makeImages('临泽七彩宾馆', 'desert'), detailUrl: amap('张掖七彩宾馆 临泽'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'jiayuguan-hotel', name: '嘉峪关宾馆', tag: '位置首选', area: '新华北路',
    address: '甘肃省嘉峪关市新华北路1号', proximityText: '到嘉峪关关城约15—25分钟，到城市餐饮约5—10分钟',
    reason: '城市中心位置便于用餐和补给，也能较顺地连接关城与后续瓜州方向。', suitableFor: ['城市便利', '自驾衔接', '早餐需求'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '中心位置，房间朝向需要提前问清',
    cautions: ['确认停车入口、房间朝向和早餐安排'], images: makeImages('嘉峪关宾馆', 'city'), detailUrl: amap('嘉峪关宾馆 新华北路'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'jiayuguan-jiugang', name: '酒钢宾馆', tag: '舒适首选', area: '雄关西路',
    address: '甘肃省嘉峪关市雄关西路2号', proximityText: '到嘉峪关关城约10—20分钟，到市中心约5—10分钟',
    reason: '停车、洗衣和城市配套较齐，适合中段连续行车后集中整理衣物与休息。', suitableFor: ['停车便利', '洗衣需求', '多人同行'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true, chargingStation: true }, quietness: '园区内相对稳定，具体楼栋仍有差别',
    cautions: ['确认入住楼栋、充电车位可用情况和相邻房安排'], images: makeImages('酒钢宾馆', 'city'), detailUrl: amap('酒钢宾馆 嘉峪关雄关西路'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'jiayuguan-great-wall', name: '嘉峪关长城宾馆', tag: '连锁稳妥', area: '建设西路',
    address: '甘肃省嘉峪关市建设西路6号', proximityText: '到嘉峪关关城约15—25分钟，到市区餐饮约5—10分钟',
    reason: '院内停车空间是它的主要优势，适合自驾车辆较大、希望进出不费周折的情况。', suitableFor: ['商务车停车', '城市补给', '稳妥过夜'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '院落有缓冲，临活动空间房间需另行确认',
    cautions: ['建筑不同区域维护状况可能不同，确认装修楼层与电梯'], images: makeImages('嘉峪关长城宾馆', 'city'), detailUrl: amap('嘉峪关长城宾馆'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'dunhuang-villa', name: '敦煌山庄', tag: '景观首选', area: '鸣沙山片区',
    address: '甘肃省敦煌市敦月路鸣沙山月牙泉景区北侧', proximityText: '到鸣沙山月牙泉约5—10分钟，到莫高窟数字展示中心约20—30分钟',
    reason: '建筑与荒漠气质连在一起，适合希望住宿本身也保留敦煌氛围、清晨少赶路的同行。', suitableFor: ['鸣沙山近住', '建筑氛围', '安静休息'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '度假型院落较舒展，旺季公共区域可能较热闹',
    cautions: ['确认楼栋是否有电梯、房间离大堂距离和鸣沙山活动日期'], images: makeImages('敦煌山庄', 'desert'), detailUrl: amap('敦煌山庄'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'dunhuang-hotel', name: '敦煌宾馆', tag: '位置首选', area: '沙州夜市片区',
    address: '甘肃省敦煌市阳关中路151号', proximityText: '步行可到沙州夜市，到鸣沙山约15分钟、莫高窟游客中心约20分钟',
    reason: '餐饮、城市漫步和两个核心景点之间都比较均衡，适合作为敦煌连续停留的中心节点。', suitableFor: ['城市餐饮', '多景点衔接', '停车便利'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '夜市邻近，院内楼栋比沿街房更安静',
    cautions: ['确认具体楼栋、停车区与房间是否朝向夜市'], images: makeImages('敦煌宾馆', 'desert'), detailUrl: 'https://www.dunhuanghotel.com/', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'dunhuang-tianhe', name: '敦煌天河大酒店', tag: '舒适首选', area: '鸣山中路',
    address: '甘肃省敦煌市鸣山中路106号', proximityText: '到鸣沙山月牙泉约10分钟，到沙州夜市约10—15分钟',
    reason: '园区、停车与综合设施更完整，适合多人同行希望房间和公共空间都宽松一些。', suitableFor: ['多人同行', '舒适休整', '停车与充电'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, chargingStation: true }, quietness: '园区较大，活动区域与客房楼栋距离需确认',
    cautions: ['确认楼栋位置、充电车位与早餐高峰时段'], images: makeImages('敦煌天河大酒店', 'desert'), detailUrl: amap('敦煌天河大酒店 鸣山中路'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'wusute-yadan-hotel', name: '乌素特水上雅丹大酒店', tag: '住在景区', area: '水上雅丹景区',
    address: '青海省海西州大柴旦行委西台2号，G315线约900公里处', proximityText: '位于水上雅丹景区住宿区，前往核心游览区约5—15分钟',
    reason: '这是长距离荒原路段里最直接的落脚方式，主要价值是减少夜间继续赶路。', suitableFor: ['景区内休息', '减少夜驾', '日落与清晨'],
    facilities: { parking: true, elevator: true, breakfast: true, oxygen: true }, quietness: '夜间环境安静，但风声和房间位置会有差异',
    cautions: ['开放季节、供暖供氧、餐饮时段与住宿权益均需提前向景区确认'], images: makeImages('乌素特水上雅丹大酒店', 'desert'), detailUrl: 'https://www.wusuteyadan.com/index.php/about/hotel', updatedAt: '2026-08-01',
  }),
  stay({
    id: 'wusute-yadan-camp', name: '乌素特水上雅丹房车营地', tag: '景观首选', area: '水上雅丹景区',
    address: '青海省海西州大柴旦行委西台2号，乌素特水上雅丹景区内', proximityText: '在景区住宿节点内，具体接驳与入住位置由景区安排',
    reason: '更贴近荒原与星空，但舒适度受季节、风力与具体房型影响，适合把环境体验放在前面。', suitableFor: ['星空环境', '减少夜驾', '特色体验'],
    facilities: { parking: true, breakfast: true, oxygen: true }, quietness: '环境开阔安静，风大时体感与声音会更明显',
    cautions: ['确认卫浴形式、供暖、供氧、接驳、餐饮和极端天气取消规则'], images: makeImages('乌素特水上雅丹房车营地', 'desert'), detailUrl: amap('乌素特水上雅丹 房车营地'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'dachaidan-guangyue', name: '大柴旦光岳大酒店', tag: '舒适首选', area: '大柴旦镇中心',
    address: '青海省海西州大柴旦行委人民路与中天街交汇处', proximityText: '到大柴旦翡翠湖约15—25分钟，到镇内餐饮约5分钟',
    reason: '停车、洗衣与充电配置相对完整，适合长途路段中途集中补给和整理行李。', suitableFor: ['长途休整', '洗衣需求', '车辆充电'],
    facilities: { parking: true, elevator: true, breakfast: true, laundry: true, chargingStation: true }, quietness: '临路房和背街房差别明显',
    cautions: ['部分房型空调配置可能不同，确认朝向、供暖和充电车位'], images: makeImages('大柴旦光岳大酒店', 'desert'), detailUrl: amap('大柴旦光岳大酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'dachaidan-longzhimeng', name: '大柴旦守信龙之梦大酒店', tag: '位置首选', area: '翡翠步行街片区',
    address: '青海省海西州大柴旦行委团结路供热公司西侧', proximityText: '到镇内餐饮步行可达，到翡翠湖约15—25分钟车程',
    reason: '镇内位置便于吃饭和采购，适合抵达较晚后不再额外寻找补给。', suitableFor: ['镇内餐饮', '补给采购', '短暂停留'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '步行街片区，旺季晚间可能有活动声',
    cautions: ['确认停车入口、房间朝向与夜间供暖'], images: makeImages('大柴旦守信龙之梦大酒店', 'city'), detailUrl: amap('大柴旦守信龙之梦大酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'dachaidan-xihai', name: '大柴旦西海明珠大酒店', tag: '连锁稳妥', area: '大柴旦镇区',
    address: '青海省海西州大柴旦行委人民东路镇区', proximityText: '到翡翠湖约20—30分钟，到镇内补给约5—10分钟',
    reason: '作为镇区备选，重点是把停车、早餐和同层房间提前确认好，减少临时分散住宿。', suitableFor: ['同层房间', '停车需求', '稳妥过夜'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '镇区环境，具体安静程度取决于房间朝向',
    cautions: ['准确门牌、设施维护与供暖情况以住宿方当日回复为准'], images: makeImages('大柴旦西海明珠大酒店', 'desert'), detailUrl: amap('大柴旦西海明珠大酒店'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'chaka-sky-one', name: '茶卡天空壹号酒店', tag: '住在景区', area: '天空壹号景区',
    address: '青海省海西州乌兰县茶卡镇天空壹号景区入口处', proximityText: '位于天空壹号景区入口，前往茶卡盐湖主景区约15—25分钟',
    reason: '住在盐湖片区能减少早晚往返，适合把日落、夜色或清晨光线作为重点。', suitableFor: ['盐湖早晚', '减少往返', '停车便利'],
    facilities: { parking: true, breakfast: true, oxygen: true }, quietness: '景区活动日期可能较热闹',
    cautions: ['住宿与景区权益、供氧方式、空调和开放时间需分别确认'], images: makeImages('茶卡天空壹号酒店', 'lake'), detailUrl: amap('茶卡天空壹号酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'chaka-yinghu', name: '茶卡影湖钻石星空酒店', tag: '景观首选', area: '天空壹号景区',
    address: '青海省海西州乌兰县茶卡镇天空壹号景区核心区', proximityText: '步行约5—10分钟可到天空壹号观景区域',
    reason: '更偏向看星空和盐湖环境的住宿体验，适合愿意用设施确定性换取景观位置的同行。', suitableFor: ['星空体验', '盐湖景观', '早晚摄影'],
    facilities: { parking: true, breakfast: true, airConditioning: true, laundry: true, chargingStation: true }, quietness: '独立房型较安静，但风力会影响体感',
    cautions: ['确认具体房型的卫浴、保温、遮光与恶劣天气安排'], images: makeImages('茶卡影湖钻石星空酒店', 'lake'), detailUrl: amap('茶卡影湖钻石星空酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'chaka-starry-inn', name: '茶卡天空壹号星空客栈', tag: '连锁稳妥', area: '天空壹号文化街',
    address: '青海省海西州乌兰县天空壹号景区文化街1号楼、3号楼', proximityText: '在天空壹号商业区内，到茶卡镇约10—20分钟',
    reason: '商业区内餐饮与停车相对集中，适合把住宿当作盐湖附近的实用落脚点。', suitableFor: ['景区近住', '餐饮便利', '停车需求'],
    facilities: { parking: true, breakfast: true }, quietness: '文化街营业时段可能较热闹',
    cautions: ['确认早餐、供氧、空调和房间离停车点的距离'], images: makeImages('茶卡天空壹号星空客栈', 'lake'), detailUrl: amap('茶卡天空壹号星空客栈'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'qinghai-lake-hotel', name: '青海湖宾馆', tag: '住在景区', area: '二郎剑景区',
    address: '青海省海南州共和县109国道151公里处青海湖二郎剑景区内', proximityText: '位于二郎剑景区内，前往核心游览区约5—10分钟',
    reason: '位置最省往返，适合希望把湖边清晨和傍晚留得完整，又不想额外夜驾的同行。', suitableFor: ['湖边早晚', '减少夜驾', '景区近住'],
    facilities: { parking: true, elevator: true, breakfast: true, oxygen: true }, quietness: '景区闭园后相对安静，团队活动日期另当别论',
    cautions: ['确认景区进出规则、楼栋电梯、供暖供氧与餐饮时间'], images: makeImages('青海湖宾馆', 'lake'), detailUrl: amap('青海湖宾馆 二郎剑'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'qinghai-lake-holiday', name: '青海湖假日酒店', tag: '位置首选', area: '二郎剑景区对面',
    address: '青海省海南州共和县江西沟镇二郎剑景区对面', proximityText: '到二郎剑景区入口约5—10分钟，到周边餐饮步行可达',
    reason: '靠近景区又保留镇区补给便利，适合希望步行吃饭、第二天直接上路的安排。', suitableFor: ['景区近住', '餐饮补给', '电梯需求'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '临路与背湖房型差别较大',
    cautions: ['确认准确门牌、停车入口、供暖供氧和房间朝向'], images: makeImages('青海湖假日酒店', 'lake'), detailUrl: amap('青海湖假日酒店 二郎剑'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'qinghai-lake-jiuqi', name: '青海湖久栖湖畔民宿', tag: '景观首选', area: '二郎剑民俗风情小镇',
    address: '青海省海南州共和县江西沟镇二郎剑景区民俗风情小镇16号楼', proximityText: '到二郎剑景区约5—10分钟车程',
    reason: '更适合重视湖景和小体量住宿氛围的人，但电梯、餐饮和供氧需要比城市酒店问得更细。', suitableFor: ['湖景房', '安静小住', '停车便利'],
    facilities: { parking: true, breakfast: true }, quietness: '小体量住宿通常较安静，房间相邻情况需确认',
    cautions: ['确认楼层搬运行李、独立卫浴、供暖、供氧和晚餐安排'], images: makeImages('青海湖久栖湖畔民宿', 'lake'), detailUrl: amap('青海湖久栖湖畔民宿'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'delingha-haixi-hotel', name: '海西宾馆', tag: '位置首选', area: '德令哈市中心',
    address: '青海省海西州德令哈市乌兰东路与长江路片区', proximityText: '到市区餐饮与补给约5—10分钟，到外星人遗址方向出城较顺',
    reason: '位于成熟城区，餐饮、停车和次日补给都比较集中，适合作为柴达木东西向行车的中转节点。', suitableFor: ['城市补给', '停车便利', '中途休整'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '城市中心位置，建议确认背街房与同层房间',
    cautions: ['具体楼栋、停车入口与设施开放情况以预订前回复为准'], images: makeImages('海西宾馆', 'city'), detailUrl: amap('海西宾馆 德令哈'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'delingha-senyuan', name: '德令哈森元品质酒店', tag: '舒适首选', area: '德令哈新区',
    address: '青海省海西州德令哈市河东新区中心片区', proximityText: '到市区主干道约5分钟，到德令哈城市景点约10—20分钟',
    reason: '公共空间与房间配置相对完整，适合连续长途驾驶后，把这一晚用于安静休息和整理行李。', suitableFor: ['舒适休整', '多人同行', '城市配套'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true }, quietness: '新区道路较舒展，仍建议避开设备层与电梯口',
    cautions: ['确认空调运行时段、洗衣安排与商务车停车位置'], images: makeImages('德令哈森元品质酒店', 'city'), detailUrl: amap('德令哈森元品质酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'delingha-blue-sky', name: '德令哈蓝天品质酒店', tag: '连锁稳妥', area: '德令哈河西片区',
    address: '青海省海西州德令哈市河西成熟生活区', proximityText: '到城市餐饮和加油补给约5—15分钟，向茶卡方向离城方便',
    reason: '适合作为不追求景观、只希望停车和第二天出发都省事的稳妥备选。', suitableFor: ['稳妥过夜', '车辆补给', '早晨出发'],
    facilities: { parking: true, elevator: true, breakfast: true }, quietness: '生活区夜间相对平稳，房间朝向仍需确认',
    cautions: ['准确门牌、早餐时段和房间设施以住宿方当日信息为准'], images: makeImages('德令哈蓝天品质酒店', 'city'), detailUrl: amap('德令哈蓝天品质酒店'), updatedAt: '2026-08-01',
  }),

  stay({
    id: 'golmud-hotel', name: '格尔木宾馆', tag: '位置首选', area: '格尔木市中心',
    address: '青海省海西州格尔木市昆仑中路与八一中路片区', proximityText: '到市区餐饮约5—10分钟，前往察尔汗或昆仑山方向都便于接入主路',
    reason: '城市中心的补给效率高，适合把格尔木作为盐湖与昆仑南线共同使用的住宿节点。', suitableFor: ['城市补给', '多方向衔接', '停车便利'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '中心城区，院内或背街房通常更安静',
    cautions: ['确认具体楼栋、停车区与次日早餐开始时间'], images: makeImages('格尔木宾馆', 'city'), detailUrl: amap('格尔木宾馆'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'golmud-kaibang', name: '格尔木凯邦瑞斯丽酒店', tag: '舒适首选', area: '格尔木河西片区',
    address: '青海省海西州格尔木市柴达木西路片区', proximityText: '到市中心约10分钟，向昆仑山口方向出城较顺',
    reason: '房间与公共区域更适合连续住两晚，能把南线往返前后的休息、早餐与行李整理放在同一处。', suitableFor: ['连续住宿', '舒适休整', '多人同行'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true, laundry: true }, quietness: '城市新区环境较舒展，建议确认远离宴会区的房间',
    cautions: ['确认供氧服务形式、洗衣安排和相邻房需求'], images: makeImages('格尔木凯邦瑞斯丽酒店', 'city'), detailUrl: amap('格尔木凯邦瑞斯丽酒店'), updatedAt: '2026-08-01',
  }),
  stay({
    id: 'golmud-salt-lake-hotel', name: '格尔木盐湖大酒店', tag: '连锁稳妥', area: '格尔木察尔汗路片区',
    address: '青海省海西州格尔木市察尔汗路与黄河路片区', proximityText: '到市区餐饮约5—15分钟，前往察尔汗盐湖方向衔接直接',
    reason: '作为城市内的实用备选，重点在停车、早餐和次日前往盐湖方向的路线都比较清楚。', suitableFor: ['察尔汗方向', '稳妥过夜', '早餐需求'],
    facilities: { parking: true, elevator: true, breakfast: true, airConditioning: true }, quietness: '临主干路房间可能有车流声，预订时可询问内侧房',
    cautions: ['名称相近住宿较多，预订时确认门牌、定位与停车入口'], images: makeImages('格尔木盐湖大酒店', 'city'), detailUrl: amap('格尔木盐湖大酒店'), updatedAt: '2026-08-01',
  }),
]

export const accommodationById = new Map(accommodations.map((item) => [item.id, item]))
