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

export type PlacePriority = 'core' | 'recommended' | 'along-the-way' | 'interest' | 'optional'

export interface PlaceValue {
  reasonToVisit: string
  uniqueness: string
  bestFor: string[]
  priority: PlacePriority
  priorityLabel: string
  ifTimeIsLimited: string
  contrastWithNearby?: string
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
  value: PlaceValue
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
  image: string
  imageAlt: string
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

export type PreparationUrgency = 'urgent' | 'important' | 'normal'
export type PreparationSectionTone = 'normal' | 'warning' | 'danger'
export type OfficialLinkType = 'official-site' | 'official-ticket'
export type PhoneContactType = 'emergency' | 'rescue' | 'consultation'
export type PhoneContactGroup = 'national' | 'scenic'

export interface PreparationSection {
  title: string
  items: string[]
  tone?: PreparationSectionTone
}

export interface OfficialLink {
  label: string
  url: string
  type: OfficialLinkType
}

export interface CopyableChannel {
  label: string
  value: string
}

export interface PhoneContact {
  label: string
  number: string
  type: PhoneContactType
  group: PhoneContactGroup
}

export interface PreparationCard {
  id: string
  number: string
  category: string
  title: string
  urgency: PreparationUrgency
  timingLabel: string
  confirmTiming: string
  description: string
  summary: string[]
  sections: PreparationSection[]
  officialLinks?: OfficialLink[]
  wechatChannels?: CopyableChannel[]
  phones?: PhoneContact[]
  updatedAt: string
  timeSensitive?: boolean
  disclaimer?: string
}
