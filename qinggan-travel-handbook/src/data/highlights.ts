import type { Highlight } from '@/types/content'

export const highlights: Highlight[] = [
  {
    id: 'zhangye-balloon', title: '张掖热气球', location: '张掖七彩丹霞周边',
    reason: '彩色山体上方升起热气球，画面层次鲜明，社交平台传播度高。',
    routeFit: '到访张掖时可以顺路了解，不改变原有线路。', worthTrip: '活动与风况合适时值得看；不建议单为一次升空远程赶路。',
    note: '运营日期、起降方式和观赏区域会随当期活动调整。', confidence: 'B',
  },
  {
    id: 'mingsha-concert', title: '鸣沙山星空演唱', location: '鸣沙山月牙泉',
    reason: '暮色、沙山和万人合唱叠在一起，现场氛围成为敦煌的新记忆点。',
    routeFit: '已在鸣沙山游览时自然衔接。', worthTrip: '喜欢现场氛围可留意；更看重安静沙景时不必专程。',
    note: '场次、季节和现场组织以景区当日信息为准。', confidence: 'B',
  },
  {
    id: 'camel-light', title: '鸣沙山骆驼红绿灯', location: '鸣沙山月牙泉',
    reason: '骆驼队列与专用信号灯形成强烈反差，是很有敦煌辨识度的沿途画面。',
    routeFit: '景区内顺路可见。', worthTrip: '适合当作旅行彩蛋，不需要单独安排。',
    note: '拍摄时给队伍和通道留出空间，长焦更容易得到整齐层次。', confidence: 'A',
  },
  {
    id: 'chaka-night', title: '茶卡夜游', location: '茶卡盐湖',
    reason: '灯光、星空和盐湖倒影构成白天以外的另一种气质。',
    routeFit: '住宿茶卡周边时可以顺路考虑。', worthTrip: '天气通透且开放时有意思；阴雨大风时不必勉强。',
    note: '夜游开放区域、末班交通和温差以当天安排为准。', confidence: 'B',
  },
  {
    id: 'naked-carp', title: '湟鱼洄游', location: '青海湖流域',
    reason: '季节性洄游让高原湖泊呈现出鲜活的生命循环。',
    routeFit: '季节吻合时可与青海湖顺路组合。', worthTrip: '时间和季节合适时值得停留观察。',
    note: '观赏窗口受水温、降水与河道情况影响，保持自然距离更容易看到真实状态。', confidence: 'A',
  },
  {
    id: 'hollow-wolf', title: '可可西里网红狼', location: '可可西里相关路段',
    reason: '野生动物与公路旅行的偶遇感引发持续讨论。',
    routeFit: '不在本环线核心路线内。', worthTrip: '不值得为了特定动物专程寻找。',
    note: '它首先是野生动物；远观即可，不把偶遇变成追逐。', confidence: 'C',
  },
  {
    id: 'heidushan', title: '黑独山区域讨论', location: '茫崖方向',
    reason: '黑色山体与极简荒原画面极具辨识度，也伴随开放边界和生态影响讨论。',
    routeFit: '偏离本环线核心顺序。', worthTrip: '没有清晰开放信息时，不建议为了同款画面额外改线。',
    note: '开放范围与道路条件可能变化，只采用当期公开、可进入区域的信息。', confidence: 'C',
  },
]
