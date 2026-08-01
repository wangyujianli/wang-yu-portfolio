import type { ViralStory } from '@/types/content'

const story = (item: ViralStory): ViralStory => item

export const viralStoriesByPlaceId: Readonly<Record<string, readonly ViralStory[]>> = {
  'zhangye-danxia': [story({
    title: '张掖热气球画面',
    context: '张掖七彩丹霞周边，活动期的热气球与彩色山体同框。',
    sourceLabel: '活动运营与景区公开信息，具体日期待出发前核验',
    confidence: 'B',
    imitable: '适合把它当作活动期的额外画面，不以升空作为固定承诺。',
    note: '起降方式、观赏区域和风况会改变现场效果。',
  })],
  'mingsha-crescent': [
    story({
      title: '鸣沙山星空演唱',
      context: '鸣沙山月牙泉夜间活动区域，暮色、沙山与现场合唱形成传播画面。',
      sourceLabel: '景区公开活动信息，具体场次待出发前核验',
      confidence: 'B',
      imitable: '喜欢现场气氛时可以顺势参与；更想安静看沙山时不必围绕活动安排。',
      note: '场次、季节和入场组织会随当天安排变化。',
    }),
    story({
      title: '骆驼队伍的专用信号灯',
      context: '鸣沙山月牙泉景区骆驼通行区域，是现场交通组织形成的独特画面。',
      sourceLabel: '景区现场交通组织信息',
      confidence: 'A',
      imitable: '适合用中长焦记录队伍层次，不需要靠近通行路线。',
      note: '把骆驼队伍、信号灯与沙山同时放入画面更有地点辨识度。',
    }),
  ],
  'chaka-salt-lake': [story({
    title: '茶卡夜游',
    context: '茶卡盐湖开放夜游时，灯光、星空与盐地反光形成与白天不同的氛围。',
    sourceLabel: '景区公开运营信息，开放月份待出发前核验',
    confidence: 'B',
    imitable: '住在茶卡周边且夜游开放时顺路考虑，天气不合适时可自然舍弃。',
    note: '末班交通、温差和开放区域以当天公告为准。',
  })],
  'qinghai-lake': [story({
    title: '湟鱼洄游',
    context: '青海湖流域部分河道的季节性自然现象，与水温、降水和河道状态有关。',
    sourceLabel: '青海湖生态保护与属地公开科普信息',
    confidence: 'A',
    imitable: '季节吻合时从公开观察点观看，出现时间和数量不作预设。',
    note: '它更适合作为生态观察，而不是追求近距离同框。',
  })],
  'hoh-xil': [story({
    title: '可可西里“网红狼”讨论',
    context: '可可西里相关公路影像曾引发大量关注，具体个体与持续出现位置并不稳定。',
    sourceLabel: '原始出处暂未可靠核实',
    confidence: 'C',
    imitable: '不以寻找某只动物为目标；自然遇见时远距离观察即可。',
    note: '社交平台片段不能代替当天道路、保护地与动物活动信息。',
  })],
  'black-mountain': [story({
    title: '黑独山开放边界讨论',
    context: '黑灰山体的极简照片持续传播，也让到访边界与地貌保护成为长期话题。',
    sourceLabel: '原始出处暂未可靠核实；开放信息以属地公告为准',
    confidence: 'C',
    imitable: '只在当期明确开放的道路和观景范围内寻找相似构图。',
    note: '旧照片的拍摄位置不能自动视为当前可到访位置。',
  })],
}
