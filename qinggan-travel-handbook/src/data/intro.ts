export type IntroStageId = 'opening' | 'route-choice' | 'travel-content' | 'footprint' | 'blessing'

export interface IntroStage {
  id: IntroStageId
  duration: number | null
}

export interface IntroFeature {
  id: 'scenic' | 'food' | 'souvenir'
  title: string
  copy: string
}

export const introStages: IntroStage[] = [
  { id: 'opening', duration: 1800 },
  { id: 'route-choice', duration: 2200 },
  { id: 'travel-content', duration: 3000 },
  { id: 'footprint', duration: 1800 },
  { id: 'blessing', duration: null },
]

export const introFeatures: IntroFeature[] = [
  {
    id: 'scenic',
    title: '景点与拍照，都提前看明白',
    copy: '最佳时间、游玩建议和拍照方式，放在每一站的同一页里。',
  },
  {
    id: 'food',
    title: '看风景，也尝尝沿途味道',
    copy: '每一站值得吃什么，不必到了现场再临时寻找。',
  },
  {
    id: 'souvenir',
    title: '带回家的，是一段西北记忆',
    copy: '纪念品与贴心提示沿路线收好，需要时再展开。',
  },
]
