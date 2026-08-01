import type { LocalFoodRecommendation, PlaceLocalFood } from '@/types/content'

const food = (
  id: string,
  name: string,
  category: LocalFoodRecommendation['category'],
  description: string,
  whyTry: string,
  suitableFor: string[],
  areaToFind: string,
  caution?: string,
): LocalFoodRecommendation => ({ id, name, category, description, whyTry, suitableFor, areaToFind, caution, sourceLevel: 'A' })

const foodPools: Record<string, LocalFoodRecommendation[]> = {
  xining: [
    food('xining-hand-grabbed-lamb', '手抓羊肉', '肉类', '以羊肉本味为主的高原肉食，适合多人分食。', '能直接感受青海藏羊肉的质地与河湟饮食习惯。', ['多人分享', '正餐'], '西宁市区成熟餐饮街区', '初到高原时可以少量品尝，不必一顿吃得很重。'),
    food('xining-niangpi', '青海酿皮', '小吃', '筋韧面皮配蒜汁、醋和辣椒，是西宁常见的街巷小吃。', '口感和调味都很有河湟辨识度，份量也便于分享。', ['小份尝鲜', '午间简餐'], '西宁市区小吃集中区域', '肠胃敏感时可少放辣椒和蒜汁。'),
    food('xining-yogurt', '牦牛酸奶', '甜品', '质地较浓，酸味明显，常以糖调和。', '奶香和酸度能形成很直接的高原味觉记忆。', ['小份尝鲜', '餐后'], '正规包装门店或成熟餐饮区域', '乳制品不耐受者先少量尝试。'),
    food('xining-tianpei', '甜醅', '甜品', '以青稞发酵形成清甜谷物香，冷热吃法会随店家变化。', '它把青稞从主粮变成轻盈甜食，是河湟地区很有代表性的发酵味道。', ['午后小食', '谷物风味'], '西宁市区成熟小吃区域', '含发酵风味，介意者可先询问做法。'),
    food('xining-earth-pot', '青海土火锅', '地方特色', '铜锅或砂锅中层叠肉类、蔬菜、豆制品和粉条，适合围桌分享。', '比单一道菜更像当地家庭式的聚餐方式。', ['六人分享', '晚餐'], '西宁市区成熟餐饮区域', '汤底和配菜通常偏咸，按自身饮食情况选择。'),
  ],
  qilianshan: [
    food('qilian-highland-barley-cake', '青稞饼', '主食', '以青稞面制成，谷物香明显，适合做沿途补给。', '便于理解高寒地区主粮与日常饮食的关系。', ['早餐', '车内补给'], '门源或祁连县城正规餐饮与食品门店'),
    food('qilian-yogurt', '牦牛酸奶', '甜品', '高原奶制品，口感浓稠、酸度清晰。', '与草原牧业环境有直接关联，适合小份尝试。', ['午后小食'], '门源、祁连县城成熟补给区', '乳制品不耐受者先少量尝试。'),
    food('qilian-lamb', '手抓羊肉', '肉类', '以羊肉本味为主，通常适合多人分食。', '能补足祁连沿线牧业景观背后的生活味道。', ['多人正餐'], '门源、祁连县城成熟餐饮区', '长途驾驶前不必吃得过饱。'),
    food('qilian-milk-tea', '咸奶茶', '饮品', '茶汤与奶香结合，咸淡随做法不同。', '在风凉和温差明显时，它比冰饮更贴合沿线体感。', ['早餐', '休息补给'], '门源或祁连县城'),
  ],
  zhangye: [
    food('zhangye-beef-small-rice', '牛肉小饭', '主食', '方形面片、粉皮与豆腐浸在牛骨汤里，并非米饭。', '它与张掖古城的商贸和早餐生活紧密相连。', ['早餐', '温热主食'], '张掖市区成熟餐饮区域'),
    food('zhangye-cuo-yuzi', '甘州搓鱼子', '主食', '面剂搓成中间粗、两端尖的短条，可配汤或拌食。', '形态和手工做法都具有甘州面食辨识度。', ['面食爱好者', '正餐'], '张掖市区成熟餐饮区域'),
    food('zhangye-juan-zi-ji', '卷子鸡', '地方特色', '鸡肉与面卷同锅焖制，面卷吸收汤汁。', '把河西面食和肉菜合在一锅，适合多人分享。', ['六人分享', '晚餐'], '张掖市区成熟餐饮区域', '口味和油量因做法而异，可按胃口点量。'),
    food('zhangye-chao-bo-la', '炒拨拉', '地方特色', '肉与内脏等食材在铁板上快速炒制，火香明显。', '观看制作过程本身就是河西夜间烟火的一部分。', ['多人分享', '重口风味'], '张掖市区成熟餐饮区域', '对内脏或重油不适应时可不选。'),
  ],
  jiayuguan: [
    food('jiayuguan-barbecue', '嘉峪关烤肉', '肉类', '以羊肉烧烤为代表，孜然和炭火香气明显。', '与边塞城市的夜间烟火气很相称。', ['多人分享', '晚餐'], '嘉峪关市区成熟餐饮区域', '长途驾驶前可适量，避免过饱。'),
    food('jiayuguan-paolajiao', '炒炮仗', '主食', '短条面形似小炮仗，与肉菜同炒。', '是西北面食在嘉峪关日常餐桌上的直观样子。', ['面食', '正餐'], '嘉峪关市区成熟餐饮区域'),
    food('jiayuguan-huguo', '糊锅', '地方特色', '以浓汤、面筋和粉条等组合成温热小吃。', '它更接近酒嘉地区清晨和夜间的日常味道。', ['温热小吃', '早餐'], '嘉峪关及酒泉成熟餐饮区域'),
    food('jiayuguan-apricot-drink', '杏皮水', '饮品', '以杏干熬制的酸甜饮品，在河西沿线常见。', '适合搭配肉食与面食，酸甜度比碳酸饮料柔和。', ['佐餐', '解腻'], '嘉峪关市区正规餐饮与食品门店', '留意配料和含糖量。'),
  ],
  dunhuang: [
    food('dunhuang-donkey-yellow-noodle', '驴肉黄面', '主食', '黄面筋韧，常配香菇等制成的臊子，并以驴肉作菜。', '这是敦煌饮食和丝路面食传统很具辨识度的组合。', ['面食爱好者', '正餐'], '敦煌市区成熟餐饮区域'),
    food('dunhuang-huyang-bread', '胡羊焖饼', '地方特色', '羊肉与面饼同锅焖制，面饼吸收肉汤。', '适合六人共享，也能感受绿洲城市的肉食与面食组合。', ['六人分享', '晚餐'], '敦煌市区成熟餐饮区域', '份量通常较足，可按同行胃口点量。'),
    food('dunhuang-saozi-noodle', '敦煌臊子面', '主食', '细面配汤臊子，味道层次来自蔬菜、肉丁和汤底。', '比重肉菜更轻，适合旅途中换一顿温热面食。', ['早餐', '简餐'], '敦煌市区成熟餐饮区域'),
    food('dunhuang-apricot-water', '杏皮水', '饮品', '以敦煌李广杏干熬制，酸甜清爽。', '原料与敦煌绿洲物产有关，是肉食和面食的自然搭配。', ['佐餐', '午后'], '敦煌市区正规餐饮与食品门店', '留意配料、含糖量和冷藏条件。'),
  ],
  haixi: [
    food('haixi-kang-pot-lamb', '炕锅羊肉', '肉类', '羊肉与土豆、洋葱等同锅炒制，香气浓郁。', '是海西长途路段后很典型的热菜选择。', ['多人分享', '晚餐'], '大柴旦或德令哈城区成熟餐饮区', '份量和油量较足，按实际胃口选择。'),
    food('haixi-beef-noodle', '牛肉面', '主食', '热汤面补充碳水和水分，供应相对稳定。', '在长途自驾节点，它的价值主要是温热、熟悉和容易找到。', ['早餐', '长途补给'], '大柴旦或德令哈城区成熟餐饮区'),
    food('haixi-yogurt', '牦牛酸奶', '甜品', '口感浓稠、酸度清晰的高原奶制品。', '少量尝试即可把草原牧业味道带进休整段。', ['午后小食'], '德令哈、大柴旦正规门店', '乳制品不耐受者先少量尝试。'),
    food('haixi-barley', '青稞制品', '地方特色', '包括饼、面点等便于携带的谷物食品。', '适合作为车内补给，也能理解高原谷物的日常用法。', ['早餐', '车内补给'], '德令哈、大柴旦正规食品门店'),
  ],
  qinghaiLake: [
    food('lake-earth-pot', '青海土火锅', '地方特色', '肉、菜、粉条和豆制品层叠成一锅，适合抵达住宿节点后分享。', '温热和多人共享的形式很适合湖区风凉的傍晚。', ['六人分享', '晚餐'], '茶卡镇、黑马河或青海湖成熟住宿节点'),
    food('lake-barley-cake', '青稞饼', '主食', '谷物香明显，便于随车携带。', '在湖区长距离车程中是相对稳妥的补给。', ['早餐', '车内补给'], '茶卡镇、黑马河或成熟湖区补给点'),
    food('lake-yogurt', '牦牛酸奶', '甜品', '酸度和奶香较明显，适合小份尝试。', '与湖区牧业环境形成自然联系。', ['午后小食'], '成熟湖区餐饮或正规食品门店', '乳制品不耐受者先少量尝试。'),
    food('lake-milk-tea', '咸奶茶', '饮品', '温热奶茶带轻微咸味，适合风凉时休息。', '比冰饮更贴近湖区气温和牧区饮食。', ['早餐', '休息补给'], '茶卡镇、黑马河或成熟湖区餐饮点'),
  ],
  golmud: [
    food('golmud-kang-pot-lamb', '炕锅羊排', '肉类', '羊排与土豆、洋葱等同锅炒制，香气浓郁。', '适合格尔木休整时多人共享。', ['多人分享', '晚餐'], '格尔木市区成熟餐饮区域', '高海拔路段前不必吃得过饱。'),
    food('golmud-hand-lamb', '手抓羊肉', '肉类', '以羊肉本味为主，常作为多人正餐。', '能把昆仑沿线牧业和城市补给连接起来。', ['多人分享', '正餐'], '格尔木市区成熟餐饮区域'),
    food('golmud-barley-noodle', '青稞面食', '主食', '以青稞参与制作的面点或面食，谷物香明显。', '适合在重肉餐之间换一顿相对简洁的主食。', ['早餐', '简餐'], '格尔木市区成熟餐饮区域'),
    food('golmud-yogurt', '牦牛酸奶', '甜品', '高原奶制品，酸度和奶香清楚。', '适合休整时小份尝试。', ['午后小食'], '格尔木正规食品门店', '乳制品不耐受者先少量尝试。'),
  ],
}

const placeFoodHub: Record<string, { pool: keyof typeof foodPools; name: string; direct: boolean }> = {
  xining: { pool: 'xining', name: '西宁市区', direct: true },
  'kumbum-monastery': { pool: 'xining', name: '西宁或湟中成熟餐饮区', direct: false },
  'menyuan-gangshika': { pool: 'qilianshan', name: '门源县城', direct: true },
  biandukou: { pool: 'zhangye', name: '民乐或张掖市区', direct: false },
  'zhangye-danxia': { pool: 'zhangye', name: '张掖市区', direct: true },
  'jiayuguan-pass': { pool: 'jiayuguan', name: '嘉峪关市区', direct: true },
  'son-of-earth': { pool: 'dunhuang', name: '瓜州县城或敦煌市区', direct: false },
  boundless: { pool: 'dunhuang', name: '瓜州县城或敦煌市区', direct: false },
  'mogao-grottoes': { pool: 'dunhuang', name: '敦煌市区', direct: false },
  'mingsha-crescent': { pool: 'dunhuang', name: '敦煌市区', direct: true },
  'boluo-zhuanjing': { pool: 'dunhuang', name: '阿克塞县城或敦煌市区', direct: false },
  'g315-u-road': { pool: 'haixi', name: '大柴旦或水上雅丹成熟补给节点', direct: false },
  'wusute-yadan': { pool: 'haixi', name: '水上雅丹或大柴旦成熟补给节点', direct: false },
  'dachaidan-emerald': { pool: 'haixi', name: '大柴旦镇区', direct: true },
  'chaka-salt-lake': { pool: 'qinghaiLake', name: '茶卡镇', direct: true },
  'qinghai-lake': { pool: 'qinghaiLake', name: '正规湖区住宿节点', direct: true },
  'tibetan-culture-museum': { pool: 'xining', name: '西宁市区', direct: false },
  'riyue-mountain': { pool: 'xining', name: '湟源或西宁', direct: false },
  heimahe: { pool: 'qinghaiLake', name: '黑马河成熟住宿节点', direct: true },
  'qilian-grassland': { pool: 'qilianshan', name: '祁连县城或门源', direct: false },
  'zhuoer-mountain': { pool: 'qilianshan', name: '祁连县城', direct: true },
  delingha: { pool: 'haixi', name: '德令哈市区', direct: true },
  'lenghu-oil-town': { pool: 'haixi', name: '冷湖镇区或大柴旦', direct: false },
  'black-mountain': { pool: 'haixi', name: '冷湖镇区', direct: false },
  'yanzhi-mountain': { pool: 'haixi', name: '冷湖镇区', direct: false },
  'qarhan-salt-lake': { pool: 'golmud', name: '格尔木市区', direct: false },
  'queen-mother-lake': { pool: 'golmud', name: '格尔木市区', direct: false },
  'kunlun-pass': { pool: 'golmud', name: '格尔木市区', direct: false },
  'hoh-xil': { pool: 'golmud', name: '格尔木市区', direct: false },
  'tibetan-antelope': { pool: 'golmud', name: '格尔木市区', direct: false },
}

export function localFoodFor(placeId: string): PlaceLocalFood {
  const hub = placeFoodHub[placeId]
  if (!hub) throw new Error(`Missing local food hub for ${placeId}`)
  return {
    intro: hub.direct
      ? `在${hub.name}可以从当地日常风味里选几样分享，不必把每顿都排成任务。`
      : `这里以游览或行车为主，吃饭和补给更适合留在${hub.name}。`,
    recommendations: hub.direct ? (foodPools[hub.pool] ?? []) : [],
    nearbyFoodHub: hub.name,
  }
}

export const localFoodSourceNote = '2026-08-01：地方政府、文旅部门与省级非遗名录核实；仅保留风味类别，不提供商家排名、价格和营业时间。'
