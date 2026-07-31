import type { RouteStop } from '@/types/content'

export const routeStops: RouteStop[] = [
  { id: 'hangzhou', name: '杭州', coordinates: [120.1551, 30.2741], kind: 'flight', note: '飞往西宁，旅程由此向西展开。' },
  { id: 'xining-start', name: '西宁', coordinates: [101.7782, 36.6171], kind: 'route', placeId: 'xining', note: '青甘环线的起点与回望点。' },
  { id: 'menyuan', name: '门源', coordinates: [101.6224, 37.3767], kind: 'route', placeId: 'menyuan-gangshika', note: '花海与岗什卡雪峰同框。' },
  { id: 'zhangye', name: '张掖', coordinates: [100.0612, 38.9707], kind: 'route', placeId: 'zhangye-danxia', note: '丹霞把山体写成色谱。' },
  { id: 'jiayuguan', name: '嘉峪关', coordinates: [98.2892, 39.7731], kind: 'route', placeId: 'jiayuguan-pass', note: '关城与戈壁铺开河西走廊。' },
  { id: 'guazhou', name: '瓜州', coordinates: [95.7823, 40.5155], kind: 'route', placeId: 'son-of-earth', note: '公共艺术散落在旷野。' },
  { id: 'dunhuang', name: '敦煌', coordinates: [94.6619, 40.1421], kind: 'route', placeId: 'mogao-grottoes', note: '壁画、沙山与绿洲相遇。' },
  { id: 'aksai', name: '阿克塞', coordinates: [94.3405, 39.6337], kind: 'route', placeId: 'boluo-zhuanjing', note: '旧城景象带一点电影感。' },
  { id: 'g315', name: 'G315', coordinates: [95.129, 37.394], kind: 'route', placeId: 'g315-u-road', note: '公路在荒原上起伏。' },
  { id: 'wusute', name: '水上雅丹', coordinates: [93.1936, 37.2753], kind: 'route', placeId: 'wusute-yadan', note: '雅丹群像漂浮在蓝色水面。' },
  { id: 'dachaidan', name: '大柴旦', coordinates: [95.1516, 37.8436], kind: 'route', placeId: 'dachaidan-emerald', note: '盐湖呈现翡翠般的分层。' },
  { id: 'chaka', name: '茶卡', coordinates: [99.0778, 36.6939], kind: 'route', placeId: 'chaka-salt-lake', note: '低风速时，天空落到盐湖里。' },
  { id: 'qinghai', name: '青海湖', coordinates: [100.1953, 36.8721], kind: 'route', placeId: 'qinghai-lake', note: '高原大湖为环线收束情绪。' },
  { id: 'xining-finish', name: '西宁', coordinates: [101.7782, 36.6171], kind: 'route', placeId: 'xining', note: '回到西宁，环线完整闭合。' },
]
