import { journeyRouteById } from '@/data/journeyRoutes'
import type { HomeJourneyRoute } from '@/types/content'

const classic = journeyRouteById.get('classic')!
const discovery = journeyRouteById.get('discovery')!

export const homeJourneyRoutes: HomeJourneyRoute[] = [
  {
    ...classic,
    name: '五星经典路线',
    shortName: '五星经典',
    positioning: '第一次走青甘',
    tagline: '收藏级风景，不错过经典。',
    tags: ['热门景点', '出片率高', '配套成熟'],
    highlightPlaceIds: ['qinghai-lake', 'chaka-salt-lake', 'zhangye-danxia'],
    tone: 'gold',
  },
  {
    ...discovery,
    name: '优选探索路线',
    shortName: '优选探索',
    positioning: '看更多西北变化',
    tagline: '减少同质化，探索更特别的西北。',
    tags: ['地貌反差', '相对清静', '摄影变化'],
    highlightPlaceIds: ['qinghai-lake', 'black-mountain', 'wusute-yadan'],
    tone: 'green',
  },
]

export const homeJourneyRouteById = new Map(homeJourneyRoutes.map((route) => [route.id, route]))
