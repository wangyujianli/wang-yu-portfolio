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
  verifiedAt?: string
  dynamicNote?: string
}

export type TicketStatus = 'free' | 'ticket-required' | 'partially-ticketed' | 'access-control' | 'confirm-before-visit'
export type BookingLevel = 'mandatory' | 'strongly-recommended' | 'recommended' | 'not-required'
export type SourceLevel = 'A' | 'B' | 'C'
export type OpeningHoursMode = 'fixed' | 'seasonal' | 'monthly' | 'daylight-dependent' | 'no-fixed-hours' | 'access-controlled' | 'confirm-before-visit'
export type OpeningDisplayStatus = 'verified' | 'verify-before-visit' | 'no-fixed-hours' | 'access-controlled'

export interface OfficialChannel {
  type: 'official-site' | 'official-ticket' | 'wechat-official' | 'wechat-mini-program' | 'on-site-window'
  label: string
  value: string
  url?: string
  copyable?: boolean
}

export interface ScenicContact {
  label: string
  number: string
  type: 'consultation' | 'ticket' | 'complaint' | 'rescue' | 'report' | 'authority'
  verified: boolean
  sourceLevel: SourceLevel
}

export interface OpeningPeriod {
  id: string
  label: string
  dateRange?: string
  openTime?: string
  ticketSalesStartTime?: string
  lastTicketTime?: string
  lastCheckInTime?: string
  lastEntryTime?: string
  closeTime?: string
  notes?: string[]
}

export interface ProjectOperatingHour {
  projectName: string
  firstServiceTime?: string
  lastServiceTime?: string
  suspendedByWeather?: boolean
  notes?: string[]
}

export interface OperatingHoursInfo {
  mode: OpeningHoursMode
  summary: string
  periods: OpeningPeriod[]
  internalProjects: ProjectOperatingHour[]
  temporaryAdjustmentPossible: boolean
  adjustmentReasons?: string[]
  confirmationChannel?: string[]
  officialSourceUrl?: string
  lastVerifiedAt: string
  sourceLevel: SourceLevel
  conflictDetected?: boolean
  conflictNote?: string
  displayStatus: OpeningDisplayStatus
  confirmationNote: string
}

export interface TicketBookingInfo {
  ticketStatus: TicketStatus
  ticketLabel: string
  bookingLevel: BookingLevel
  bookingLabel: string
  bookingLeadTime: string
  confirmationTiming: string
  address?: string
  identityRequired?: boolean
  officialChannels: OfficialChannel[]
  contacts: ScenicContact[]
  bookingNotes: string[]
  accessNotes?: string[]
  lastVerifiedAt: string
  sourceLevel: SourceLevel
  verificationNote?: string
  operatingHours: OperatingHoursInfo
}

export type TravelPlaceType =
  | '湖泊'
  | '盐湖'
  | '草原'
  | '雪山'
  | '沙漠'
  | '雅丹'
  | '古建'
  | '博物馆'
  | '公路'
  | '野生动物'
  | '网红地点'

export type JourneyRouteId = 'classic' | 'discovery' | 'golmud-extension' | 'mangya-extension'
export type ExperienceLevel = 'must-see' | 'along-the-way' | 'half-day' | 'add-one-day' | 'add-two-to-four-days'

export interface WeatherAlternatives {
  rain: string
  wind: string
  heat?: string
}

export interface SeasonalActivity {
  title: string
  season: string
  note: string
}

export interface ViralStory {
  title: string
  context: string
  sourceLabel: string
  confidence: Confidence
  imitable: string
  note: string
}

export type LegacyPlacePriority = 'core' | 'recommended' | 'along-the-way' | 'interest' | 'optional'
export type PlacePriority = 'core' | 'priority' | 'en-route' | 'interest' | 'optional'
export type RouteScope = 'main-route' | 'lenghu-extension' | 'golmud-extension'
export type PlaceRole =
  | 'core-attraction'
  | 'cultural-site'
  | 'landscape-stop'
  | 'route-experience'
  | 'city-start'
  | 'city-supply'
  | 'accommodation-hub'
  | 'industrial-heritage'
  | 'public-art'
  | 'ecology-observation'
  | 'optional-extension'

export interface PlaceClassification {
  priority: PlacePriority
  routeScope: RouteScope
  placeRole: PlaceRole
  priorityReason: string
  routeReason: string
  routeDecisionNote?: string
  seasonalNote?: string
  isStandalone: boolean
  parentPlaceId?: string
}

export interface PlaceValue {
  reasonToVisit: string
  uniqueness: string
  bestFor: string[]
  priority: LegacyPlacePriority
  priorityLabel: string
  ifTimeIsLimited: string
  contrastWithNearby?: string
}

export interface ImageAsset {
  src: string
  alt: string
  credit?: string
  sourceUrl?: string
}

export type PlaceModule =
  | 'culture'
  | 'landscape'
  | 'geology'
  | 'ecology'
  | 'photography'
  | 'food'
  | 'souvenir'
  | 'accommodation'
  | 'booking'
  | 'safety'
  | 'health'
  | 'road'
  | 'weather'
  | 'activities'

export type PlaceModuleLevel = 'primary' | 'secondary' | 'compact' | 'hidden'

export interface PlaceContentPriority {
  primaryModules: PlaceModule[]
  secondaryModules: PlaceModule[]
  compactModules: PlaceModule[]
  hiddenModules: PlaceModule[]
  editorialTheme: string
  pageMood: string
  editorialIntro?: string
}

export interface LocalFoodRecommendation {
  id: string
  name: string
  category: '主食' | '小吃' | '饮品' | '甜品' | '肉类' | '地方特色'
  description: string
  whyTry: string
  suitableFor: string[]
  caution?: string
  areaToFind: string
  image?: ImageAsset
  sourceLevel?: SourceLevel
}

export interface PlaceLocalFood {
  intro: string
  recommendations: LocalFoodRecommendation[]
  nearbyFoodHub?: string
}

export interface SouvenirRecommendation {
  id: string
  name: string
  type: '食品' | '文创' | '工艺品' | '服饰配件' | '地方物产'
  description: string
  whyBuy: string
  buyingAdvice: string
  authenticityTips?: string[]
  carryingTips?: string[]
  notRecommended?: string[]
  image?: ImageAsset
}

export interface PlaceSouvenirs {
  intro: string
  recommendations: SouvenirRecommendation[]
}

export interface PhotoCheckpoint {
  id: string
  name: string
  locationDescription: string
  sceneType: '全景' | '人像' | '六人合影' | '建筑' | '公路' | '日落' | '倒影' | '生态观察'
  whyItWorks: string
  bestLight: string
  recommendedLens: string
  poseIdeas: string[]
  groupPose?: string
  clothingColors?: string[]
  safetyBoundary: string[]
  accessNote?: string
  imageReferences: ImageAsset[]
  sourceLevel?: SourceLevel
}

export type AccommodationTag =
  | '位置首选'
  | '舒适首选'
  | '景观首选'
  | '连锁稳妥'
  | '住在景区'
  | '安静休息'

export interface AccommodationFacilities {
  parking?: boolean
  elevator?: boolean
  breakfast?: boolean
  airConditioning?: boolean
  oxygen?: boolean
  humidifier?: boolean
  laundry?: boolean
  chargingStation?: boolean
}

export interface AccommodationImage {
  src: string
  alt: string
  credit?: string
  sourceUrl?: string
}

export interface Accommodation {
  id: string
  name: string
  tag: AccommodationTag
  area: string
  address: string
  proximityText: string
  reason: string
  suitableFor: string[]
  facilities: AccommodationFacilities
  quietness?: string
  cautions: string[]
  images: AccommodationImage[]
  detailUrl?: string
  updatedAt: string
}

export interface AccommodationHub {
  id: string
  name: string
  description: string
  placeIds: string[]
  remoteStayNotice?: string
  accommodations: Accommodation[]
}

export interface RemoteStayAdvice {
  suggestedCity: string
  travelText: string
  reason: string
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
  classification: PlaceClassification
  contentPriority: PlaceContentPriority
  localFood?: PlaceLocalFood
  souvenirs?: PlaceSouvenirs
  photoCheckpoints?: PhotoCheckpoint[]
  accommodationHubId: string
  remoteStayAdvice?: RemoteStayAdvice
  recommendation: number
  worthDetour: string
  suggestedDuration: string
  bestSeason: string
  bestViewingTime: string
  suitableWeather: string
  weatherSensitivity: '低' | '中' | '高' | '很高'
  walkingIntensity: string
  physicalNotes: string[]
  conventionalPlay: string[]
  unconventionalPlay: string[]
  photoGuide: string[]
  soloPoses: readonly [string, string, string]
  groupComposition: string
  outfitAdvice: OutfitAdvice
  reservation: ReservationInfo
  ticketBooking: TicketBookingInfo
  pitfalls: string[]
  siteNotes: string[]
  nearbyCombinationIds: string[]
  weatherCoordinates: Coordinates
  visualTone: string
  image: string
  imageAlt: string
  placeTypes: TravelPlaceType[]
  routeIds: JourneyRouteId[]
  experienceLevel: ExperienceLevel
  seasonalActivities: SeasonalActivity[]
  weatherAlternatives: WeatherAlternatives
  nearbyExplorationIds: string[]
  viralStories: ViralStory[]
  informationUpdatedAt: string
  lightNote: string
}

export interface JourneyRoute {
  id: JourneyRouteId
  scope: RouteScope
  name: string
  shortName: string
  description: string
  durationHint: string
  placeIds: string[]
  accent: string
}

export interface HomeJourneyRoute extends JourneyRoute {
  positioning: string
  tagline: string
  tags: readonly [string, string, string]
  highlightPlaceIds: readonly [string, string, string]
  tone: 'gold' | 'green'
}

export type DrivingPressure = '轻松' | '中等' | '较长'

export interface NineDayReference {
  id: string
  day: number
  title: string
  mainLine: string
  departureWindow: string
  bestPeriods: string[]
  drivingPressure: DrivingPressure
  corePlaces: string[]
  removablePlaces: string[]
  weatherAlternatives: Required<WeatherAlternatives>
  stayArea: string
  reservations: string[]
  photoTheme: string
  lightTip: string
}

export type NearbyTimeGroup = 'along-the-way' | 'half-day' | 'one-two-days' | 'two-four-days'

export interface NearbyExploration {
  id: string
  name: string
  reason: string
  extraTime: string
  bestStartingPoint: string
  detourNote: string
  season: string
  weatherSensitivity: string
  spontaneous: string
  reservationNote: string
  boundaryNote: string
}

export interface NearbyExplorationGroup {
  id: NearbyTimeGroup
  label: string
  note: string
  items: NearbyExploration[]
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

export type PreparationIconKey =
  | 'ticket'
  | 'id'
  | 'clothing'
  | 'sun'
  | 'food'
  | 'health'
  | 'vehicle'
  | 'camera'
  | 'weather'
  | 'emergency'

export interface PreparationQuickEntry {
  id: string
  title: string
  icon: PreparationIconKey
  confirmWhen: string
  bring: string
  reminder: string
}

export interface TravelPreparationGroup {
  title: string
  items: string[]
  note?: string
}

export interface TravelPreparationGuide {
  id: string
  eyebrow: string
  title: string
  intro: string
  groups: TravelPreparationGroup[]
  callout?: string
  disclaimer?: string
}
