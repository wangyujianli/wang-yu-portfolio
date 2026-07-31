import type { RouteCombination } from '@/types/content'

export const routeCombinations: RouteCombination[] = [
  {
    id: 'menyuan-zhangye',
    title: '门源 · 扁都口 · 张掖七彩丹霞',
    placeIds: ['menyuan-gangshika', 'biandukou', 'zhangye-danxia'],
    note: '可以顺路安排，花海、山口与丹霞会形成很完整的地貌过渡。',
    pacing: '车程较长，依赖花期、天气和日落；不必为了打卡特意赶路。',
  },
  {
    id: 'jiayuguan-dunhuang',
    title: '嘉峪关 · 大地之子 · 敦煌',
    placeIds: ['jiayuguan-pass', 'son-of-earth', 'mogao-grottoes'],
    note: '可以顺路安排，把关城的厚重、戈壁公共艺术和敦煌气质串起来。',
    pacing: '时间宽裕时考虑；沿途光线变化比多停几个点更值得留意。',
  },
  {
    id: 'mogao-mingsha',
    title: '莫高窟 · 鸣沙山月牙泉',
    placeIds: ['mogao-grottoes', 'mingsha-crescent'],
    note: '可以顺路安排，一处看文明细节，一处看沙丘与天光。',
    pacing: '依赖预约场次、天气和日落，时间紧时建议二选一。',
  },
  {
    id: 'aksai-g315-yadan',
    title: '博罗转井 · G315 · 水上雅丹',
    placeIds: ['boluo-zhuanjing', 'g315-u-road', 'wusute-yadan'],
    note: '可以顺路安排，废墟电影感、公路纵深和雅丹水域各有一套画面语言。',
    pacing: '车程较长，时间宽裕时考虑；沿线补给与开放情况适合提前复核。',
  },
  {
    id: 'yadan-emerald',
    title: '水上雅丹 · 大柴旦翡翠湖',
    placeIds: ['wusute-yadan', 'dachaidan-emerald'],
    note: '可以顺路安排，两处颜色与地貌反差明显。',
    pacing: '依赖天气和风力，光线普通时不必为了打卡特意赶路。',
  },
  {
    id: 'chaka-qinghai',
    title: '茶卡盐湖 · 青海湖',
    placeIds: ['chaka-salt-lake', 'qinghai-lake'],
    note: '可以顺路安排，从盐湖镜面过渡到高原大湖，视觉节奏很舒服。',
    pacing: '天气差异会很大，时间不宽裕时建议二选一。',
  },
]

export const combinationById = new Map(routeCombinations.map((item) => [item.id, item]))
