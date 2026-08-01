import type { PlaceSouvenirs, SouvenirRecommendation } from '@/types/content'

const item = (
  id: string,
  name: string,
  type: SouvenirRecommendation['type'],
  description: string,
  whyBuy: string,
  buyingAdvice: string,
  authenticityTips: string[] = [],
  carryingTips: string[] = [],
  notRecommended: string[] = [],
): SouvenirRecommendation => ({ id, name, type, description, whyBuy, buyingAdvice, authenticityTips, carryingTips, notRecommended })

const commonNaturalBoundary = ['自然保护地与景区中的盐壳、矿石、植物和沙土留在原处', '不选择野生动物来源材料']

const souvenirSets: Record<string, PlaceSouvenirs> = {
  xining: {
    intro: '优先看博物馆、正规文化机构和标识清楚的青海物产，体量小、便于返程携带更从容。',
    recommendations: [
      item('xining-culture-stationery', '青海文化主题纸品', '文创', '以河湟、昆仑、青海湖等地域图形制作的明信片、笔记本或书签。', '轻便，也能把沿途不同地理线索收进一本手册。', '优先选择博物馆、文旅机构或作者信息清楚的产品。'),
      item('xining-barley-food', '正规包装青稞食品', '食品', '以青稞为原料的饼干、面点或冲调食品。', '与青海高原农业有直接联系，也适合多人分装。', '查看生产信息、配料和保质期。', [], ['避免在车内高温久放']),
      item('xining-small-textile', '民族纹样小型织物', '服饰配件', '采用青海多民族纹样的围巾、杯垫或小收纳件。', '比大型摆件更适合长途和航空携带。', '选择材质与制作信息清楚的正规产品。'),
    ],
  },
  'kumbum-monastery': {
    intro: '纪念品宜承接文化理解，选择正规文化出版物和克制的小型文创即可。',
    recommendations: [
      item('taer-architecture-postcard', '寺院建筑主题明信片', '文创', '以建筑、院落和装饰细节为主题的纸品。', '适合记录参观中真正看过的空间。', '在景区正规服务点选择来源标识清楚的产品。'),
      item('taer-culture-book', '文化艺术类出版物', '文创', '介绍建筑、艺术与宗教文化背景的正规出版物。', '比未经说明的摆件更能延续参观后的理解。', '核对出版社、书号和内容说明。', [], ['书籍较重，可按行李余量选择'], ['来源不明的法器或所谓收藏品']),
    ],
  },
  'zhangye-danxia': {
    intro: '丹霞主题适合做成轻量纸品和地质说明类文创，不必购买仿造的“彩色矿石”。',
    recommendations: [
      item('zhangye-danxia-postcard', '丹霞地貌明信片', '文创', '以山体层理和观景台视角为主题的纸品。', '能保留天气和光线对丹霞色彩的影响。', '优先景区正规文创或作者信息清楚的摄影产品。'),
      item('zhangye-geology-bookmark', '地貌主题书签', '文创', '用层理线条或地质色带制作的小型书签。', '体量小，也与这里真正重要的地质信息有关。', '查看材质和设计来源。', [], [], commonNaturalBoundary),
    ],
  },
  'jiayuguan-pass': {
    intro: '关城的记忆适合收进印章、书签和建筑纸品，重点是城防空间而非夸张仿古物。',
    recommendations: [
      item('jiayuguan-seal', '关城主题印章', '文创', '以关楼、长城或丝路线条为主题的小型印章。', '适合直接盖进旅行册，和手账系统自然衔接。', '选择景区或文化机构标识清楚的产品。'),
      item('jiayuguan-silk-road-bookmark', '丝路书签', '文创', '将关城轮廓和河西走廊路线做成轻量书签。', '便于携带，也能提醒这里在丝路交通中的位置。', '查看授权或设计来源。'),
      item('jiayuguan-postcard', '关楼建筑明信片', '文创', '呈现门洞、城墙和关楼结构的摄影或插画纸品。', '比大型仿古摆件更适合返程。', '优先现场正规文创服务点。'),
    ],
  },
  'mogao-grottoes': {
    intro: '优先敦煌研究院及其正规授权体系的文创和出版物，让购买与文化保护保持同一条线。',
    recommendations: [
      item('mogao-authorized-scarf', '壁画纹样丝巾或织物', '服饰配件', '从飞天、藻井等敦煌艺术纹样转化而来的轻量织物。', '既能在旅途中使用，也比仿古摆件更便于保存。', '核对敦煌研究院、如是敦煌、念念敦煌等正规品牌或授权信息。'),
      item('mogao-nine-deer-stationery', '九色鹿与藻井主题纸品', '文创', '以代表性壁画形象和装饰结构制作的明信片、便签或书签。', '能把参观后的图像记忆变成日常可用物。', '优先官方场馆与正规授权渠道。'),
      item('mogao-publication', '敦煌文化正规出版物', '文创', '关于石窟艺术、保护和丝路文化的图册或通识读物。', '为有限的现场讲解补充更完整背景。', '核对出版社、书号和机构信息。', [], ['图册较重，按行李空间选择']),
    ],
  },
  'mingsha-crescent': {
    intro: '这里适合选择与敦煌文化相连的小型纸品，沙漠本身不需要被装进行李。',
    recommendations: [
      item('mingsha-silhouette-postcard', '沙丘与月牙泉明信片', '文创', '以沙脊、驼队曲线和月牙泉为主题的轻量纸品。', '能保留傍晚光线和沙漠尺度。', '选择来源清楚的景区或本地文创。', [], [], commonNaturalBoundary),
      item('mingsha-dunhuang-bookmark', '敦煌暮色书签', '文创', '以沙金、藏红和墨蓝呈现敦煌暮色。', '小巧且适合旅行册收藏。', '查看设计与制作信息。'),
    ],
  },
  'chaka-salt-lake': {
    intro: '盐湖纪念品以正规文创和清楚包装的盐文化产品为主，自然盐壳仍留在湖边。',
    recommendations: [
      item('chaka-mirror-postcard', '天空之镜主题明信片', '文创', '以水平线、倒影和盐轨为主题的纸品。', '最贴近茶卡真正的画面特征。', '优先景区正规渠道或摄影作者信息清楚的产品。'),
      item('chaka-salt-culture-product', '正规包装盐文化产品', '地方物产', '具有完整生产、用途与包装信息的盐文化展示产品。', '能了解盐湖产业与生活的联系。', '查看生产信息、用途说明和密封状态。', [], ['液体或喷雾类留意航空规定'], commonNaturalBoundary),
    ],
  },
  'qinghai-lake': {
    intro: '选择生态保护主题纸品或公益产品，把纪念与湖区保护联系起来。',
    recommendations: [
      item('qinghai-lake-ecology-postcard', '青海湖生态主题纸品', '文创', '以湖泊、湟鱼和候鸟生态为主题的明信片或书签。', '比单纯风景摆件更能说明青海湖的生态价值。', '选择官方景区、保护机构或公益信息清楚的产品。', [], [], commonNaturalBoundary),
      item('qinghai-lake-conservation', '保护主题公益文创', '文创', '围绕湟鱼、普氏原羚或候鸟保护的正规文创。', '纪念旅行的同时保留对自然边界的尊重。', '核对机构名称和公益用途说明。', [], [], ['野生动物来源材料']),
    ],
  },
  'tibetan-culture-museum': {
    intro: '场馆文创宜围绕文字、服饰、医药和艺术知识，优先博物院正规产品。',
    recommendations: [
      item('museum-pattern-stationery', '藏文化纹样纸品', '文创', '把服饰、文字或艺术纹样转化为笔记本、书签和明信片。', '和场馆展陈内容有明确对应。', '优先博物院官方文创区域。'),
      item('museum-catalogue', '展览图录与正规出版物', '文创', '记录展览脉络和重点藏品信息的图录或读物。', '适合作为进入沿线文化场景前的长期参考。', '核对出版信息。', [], ['图录较重，按行李余量选择']),
    ],
  },
  delingha: {
    intro: '德令哈适合带走与城市诗歌气质或柴达木地理有关的轻量纸品，不把休整站变成购物站。',
    recommendations: [
      item('delingha-poetry-stationery', '德令哈诗歌主题纸品', '文创', '以城市、夜色和诗歌意象制作的明信片、书签或笔记本。', '与这座城市作为长途停顿和诗歌记忆的性格相合。', '选择文化场馆、正规书店或设计来源清楚的产品。'),
      item('delingha-haixi-postcard', '海西地理明信片', '文创', '记录柴达木盆地、盐湖和城市关系的摄影纸品。', '能把后续荒原路线放回更完整的地理背景。', '查看摄影作者、出版或制作信息。'),
    ],
  },
  'qarhan-salt-lake': {
    intro: '这里的纪念重点是盐湖与工业地理，适合正规纸品和产业说明类产品。',
    recommendations: [
      item('qarhan-industry-postcard', '盐湖工业地理明信片', '文创', '呈现盐湖色块、观景设施与工业尺度关系的纸品。', '能保留察尔汗区别于普通镜面盐湖的工业性格。', '选择景区正规渠道或来源清楚的产品。'),
      item('qarhan-salt-culture', '正规包装盐文化产品', '地方物产', '具有生产信息和用途说明的盐文化展示产品。', '便于理解矿物生产与日常生活的联系。', '核对生产、用途与密封信息。', [], [], commonNaturalBoundary),
    ],
  },
  'hoh-xil': {
    intro: '只保留生态公益方向：纪念的是保护行动，不是对动物或自然物的占有。',
    recommendations: [
      item('hoh-xil-conservation', '藏羚羊保护主题公益文创', '文创', '由保护、公益或正规文化机构推出的纸品、徽章等轻量产品。', '把观察经历与野生动物保护联系起来。', '核对机构、公益用途与正规来源。', [], [], ['任何野生动物来源材料', '来源不明的所谓高原珍稀物产']),
      item('hoh-xil-ecology-publication', '可可西里生态出版物', '文创', '介绍高寒荒原、藏羚羊迁徙和保护工作的正规读物。', '比近距离动物纪念品更符合这里的生态主题。', '核对出版社与保护机构信息。'),
    ],
  },
}

export function souvenirsFor(placeId: string): PlaceSouvenirs | undefined {
  return souvenirSets[placeId]
}

export const souvenirCarryingNote = '食品看清生产信息和保质期，易碎品考虑长途运输，液体、喷雾和工具留意航空托运规定。'
export const souvenirSourceNote = '2026-08-01：博物馆、景区、文化机构及生态保护部门公开信息核实；不提供价格和购买链接。'
