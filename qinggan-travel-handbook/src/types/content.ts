export type PlaceCategory =
  | '文化遗址'
  | '湖泊盐湖'
  | '草原雪山'
  | '沙漠雅丹'
  | '公路风景'
  | '沿途彩蛋'

export type Coordinates = readonly [longitude: number, latitude: number]

export interface OutfitAdvice {
  mainColors: string[]
  accentColor: string
  note: string
}

export interface ReservationInfo {
  channel: string
  timing: string
  note: string
}

export interface Place {
  id: string
  slug: string
  name: string
  region: string
  category: PlaceCategory
  routeOrder: number
  coordinates: Coordinates
  summary: string
  recommendation: number
  worthDetour: string
  suggestedDuration: string
  bestViewingTime: string
  suitableWeather: string
  walkingIntensity: string
  physicalNotes: string[]
  conventionalPlay: string[]
  unconventionalPlay: string[]
  photoGuide: string[]
  soloPoses: readonly [string, string, string]
  groupComposition: string
  outfitAdvice: OutfitAdvice
  reservation: ReservationInfo
  pitfalls: string[]
  siteNotes: string[]
  nearbyCombinationIds: string[]
  weatherCoordinates: Coordinates
  visualTone: string
}

export interface RouteStop {
  id: string
  name: string
  coordinates: Coordinates
  kind: 'flight' | 'route'
  placeId?: string
  note: string
}

export interface RouteCombination {
  id: string
  title: string
  placeIds: string[]
  note: string
  pacing: string
}

export type Confidence = 'A' | 'B' | 'C'

export interface Highlight {
  id: string
  title: string
  location: string
  reason: string
  routeFit: string
  worthTrip: string
  note: string
  confidence: Confidence
}

export interface PhotoSceneGuide {
  id: string
  name: string
  kicker: string
  vantage: string
  lens: string
  soloPoses: readonly [string, string, string]
  groupComposition: string
  commonMistakes: string[]
  outfit: OutfitAdvice
  overviewImage: string
}

export interface PreparationItem {
  id: string
  title: string
  category: '票务' | '活动' | '天气' | '道路' | '设备' | '开放信息'
  summary: string
  checks: string[]
}
