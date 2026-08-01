import { scenicImagesFor } from '@/data/scenicImages'
import type { ImageAsset, PhotoCheckpoint } from '@/types/content'

type PhotoSeed = Pick<PhotoCheckpoint,
  'name' | 'locationDescription' | 'sceneType' | 'whyItWorks' | 'bestLight' | 'recommendedLens' | 'safetyBoundary'
> & Partial<Pick<PhotoCheckpoint, 'poseIdeas' | 'groupPose' | 'clothingColors' | 'accessNote'>>

const defaultPoses: Record<PhotoCheckpoint['sceneType'], string[]> = {
  全景: ['人物放在画面三分之一处', '背向镜头看向主景'],
  人像: ['侧身慢走', '站定后自然回头', '手持帽檐或围巾'],
  六人合影: ['前后错开半步', '两端微微向内收'],
  建筑: ['从门侧缓慢走入画面', '人物保持小比例'],
  公路: ['在正规停车区与车辆侧面同框', '从车窗记录移动中的地貌'],
  日落: ['让人物轮廓彼此分开', '沿光线方向缓慢行走'],
  倒影: ['站稳后再拍', '动作幅度放小以保留水面'],
  生态观察: ['人物留在观察环境中', '镜头重点交给动物与栖息地'],
}

const defaultColors: Record<PhotoCheckpoint['sceneType'], string[]> = {
  全景: ['米白', '藏蓝', '酒红'],
  人像: ['米白', '宝蓝', '酒红'],
  六人合影: ['米白', '湖蓝', '卡其', '酒红'],
  建筑: ['米白', '深棕', '藏蓝'],
  公路: ['牛仔蓝', '卡其', '日落橙'],
  日落: ['米白', '深棕', '酒红'],
  倒影: ['米白', '宝蓝', '酒红'],
  生态观察: ['灰蓝', '卡其', '深绿'],
}

function imageFor(placeId: string, index: number): ImageAsset[] {
  const image = scenicImagesFor(placeId)[index]
  return image ? [{ src: image.regular, alt: image.alt }] : []
}

function checkpoints(placeId: string, seeds: PhotoSeed[]): PhotoCheckpoint[] {
  return seeds.map((seed, index) => ({
    id: `${placeId}-photo-${index + 1}`,
    ...seed,
    poseIdeas: seed.poseIdeas ?? defaultPoses[seed.sceneType],
    groupPose: seed.groupPose ?? '六人分成前后两层，人物之间保留空隙，让主景完整露出。',
    clothingColors: seed.clothingColors ?? defaultColors[seed.sceneType],
    imageReferences: imageFor(placeId, index),
    sourceLevel: 'A',
  }))
}

const openPath = ['使用现场开放步道或观景区，不影响其他游客通行。']
const roadEdge = ['车辆停在正式停车区或足够宽的安全区域，人物始终留在机动车道外。']
const natureEdge = ['只使用正规开放区域，不跨越围栏或进入私人牧场。']
const saltEdge = ['只进入景区明确开放的栈道或体验区，留意湿滑和盐壳变化。']

export const photoCheckpointsByPlaceId: Record<string, PhotoCheckpoint[]> = {
  xining: checkpoints('xining', [
    { name: '河湟街巷与远山', locationDescription: '市区可步行街巷或城市公共空间', sceneType: '人像', whyItWorks: '街巷尺度让高原城市不只剩一张天际线。', bestLight: '傍晚侧光', recommendedLens: '1×或35mm', safetyBoundary: ['在人行区域取景，不妨碍通行。'] },
    { name: '城市开场六人照', locationDescription: '能同时看到城市与远山的公共观景位置', sceneType: '六人合影', whyItWorks: '把六个人和旅程起点一起交代清楚。', bestLight: '日落前一小时', recommendedLens: '1×或24—35mm', safetyBoundary: openPath },
  ]),
  'kumbum-monastery': checkpoints('kumbum-monastery', [
    { name: '红墙与回廊', locationDescription: '允许拍摄的院落外部回廊', sceneType: '建筑', whyItWorks: '红墙形成稳定色块，人物只需小比例出现。', bestLight: '上午柔光', recommendedLens: '1×或35mm', safetyBoundary: ['以现场拍摄标识为准，不占用礼佛与参观通道。'] },
    { name: '院门框景', locationDescription: '开放院门外侧或门洞边缘', sceneType: '人像', whyItWorks: '门框自然收束画面，也能保留建筑层次。', bestLight: '光线从侧面进入院落时', recommendedLens: '2×或50mm', safetyBoundary: openPath },
    { name: '屋檐与金顶远景', locationDescription: '开放区域内可看见屋檐层次的位置', sceneType: '六人合影', whyItWorks: '六人3＋3错位后，建筑轮廓仍保持完整。', bestLight: '上午或傍晚', recommendedLens: '2×或70mm', groupPose: '三人前、三人后轻微错位，不做夸张动作。', safetyBoundary: ['宗教活动区域保持安静，拍摄范围听从现场标识。'] },
  ]),
  'menyuan-gangshika': checkpoints('menyuan-gangshika', [
    { name: '雪山花田三层景', locationDescription: '正式观景台或开放花田步道边缘', sceneType: '全景', whyItWorks: '花带、人物和岗什卡雪峰构成清楚的三层。', bestLight: '上午能见度较好时', recommendedLens: '2×或70—120mm', safetyBoundary: natureEdge },
    { name: '合法花田边缘', locationDescription: '景区标明可通行的小路或观景区域', sceneType: '人像', whyItWorks: '花田在人物两侧展开，无需进入作物区域。', bestLight: '清晨或傍晚', recommendedLens: '1×或50mm', safetyBoundary: natureEdge },
    { name: '六人与雪峰', locationDescription: '公路外正式停车观景区', sceneType: '六人合影', whyItWorks: '长焦能让雪峰更接近，同时保留六人完整站位。', bestLight: '雪峰清晰时', recommendedLens: '2×至3×', groupPose: '2＋2＋2沿安全区域分层，前排略低，后排留出雪峰。', safetyBoundary: roadEdge },
  ]),
  biandukou: checkpoints('biandukou', [
    { name: '山谷转场全景', locationDescription: '正式停车区或开放观景点', sceneType: '全景', whyItWorks: '道路、山谷与草地能交代从祁连山进入河西的变化。', bestLight: '上午或雨后放晴', recommendedLens: '1×或24—35mm', safetyBoundary: roadEdge },
    { name: '公路外侧背影', locationDescription: '机动车道以外的安全观景区域', sceneType: '公路', whyItWorks: '人物背影提供尺度，公路转折仍是主体。', bestLight: '侧光', recommendedLens: '2×或70mm', safetyBoundary: roadEdge },
  ]),
  'zhangye-danxia': checkpoints('zhangye-danxia', [
    { name: '核心观景台层理', locationDescription: '景区开放核心观景台', sceneType: '全景', whyItWorks: '侧光能把不同山层的起伏和颜色分开。', bestLight: '日落前一至两小时', recommendedLens: '2×至5×', safetyBoundary: openPath },
    { name: '栈道引导线', locationDescription: '开放栈道的宽阔停留区', sceneType: '人像', whyItWorks: '栈道斜线能把人物引向丹霞主景。', bestLight: '傍晚侧光', recommendedLens: '1×或35mm', safetyBoundary: openPath },
    { name: '小人物与大地貌', locationDescription: '允许停留的观景平台边缘', sceneType: '六人合影', whyItWorks: '人物缩小后，更能表达地质尺度。', bestLight: '云层有变化的傍晚', recommendedLens: '2×或70mm', groupPose: '六人沿平台内侧分散站立，不遮挡地貌主线。', safetyBoundary: openPath },
  ]),
  'jiayuguan-pass': checkpoints('jiayuguan-pass', [
    { name: '城门框景', locationDescription: '开放城门外侧', sceneType: '建筑', whyItWorks: '门洞自然形成画框，人物与关城尺度同时成立。', bestLight: '上午或傍晚侧光', recommendedLens: '1×或35mm', safetyBoundary: openPath },
    { name: '城墙背影', locationDescription: '开放城墙步道的宽阔段', sceneType: '人像', whyItWorks: '城墙线条把视线引向关楼和远处戈壁。', bestLight: '傍晚', recommendedLens: '2×或50—70mm', safetyBoundary: ['在护栏内拍摄，不倚靠或攀爬城墙构件。'] },
    { name: '关楼六人错位', locationDescription: '关楼前开放广场', sceneType: '六人合影', whyItWorks: '低机位保留关楼气势，错位站姿避免排队式合影。', bestLight: '正面光较柔和时', recommendedLens: '1×或24—35mm', groupPose: '前2、中2、后2沿中轴轻微错开。', safetyBoundary: openPath },
  ]),
  'son-of-earth': checkpoints('son-of-earth', [
    { name: '戈壁尺度远景', locationDescription: '雕塑外部开放观赏区域', sceneType: '全景', whyItWorks: '先拉远才能看清雕塑与戈壁的尺度反差。', bestLight: '清晨或傍晚', recommendedLens: '2×或70mm', safetyBoundary: ['在允许观赏范围内取景，不触碰或攀附雕塑。'] },
    { name: '六人与雕塑借位', locationDescription: '开放区域内与雕塑保持距离的位置', sceneType: '六人合影', whyItWorks: '借位比围在雕塑正面更有画面层次。', bestLight: '侧光', recommendedLens: '1×或35mm', safetyBoundary: ['不触碰或攀附公共艺术装置。'] },
  ]),
  boundless: checkpoints('boundless', [
    { name: '镂空几何逆光', locationDescription: '装置外部开放观赏区', sceneType: '建筑', whyItWorks: '光穿过结构后形成稳定的明暗节奏。', bestLight: '上午低角度光或傍晚', recommendedLens: '1×或35mm', safetyBoundary: ['在开放地面取景，不进入维护区域。'] },
    { name: '人物剪影', locationDescription: '装置投影与开口相交的位置', sceneType: '人像', whyItWorks: '人物轮廓与几何开口形成简洁关系。', bestLight: '逆光', recommendedLens: '2×或50mm', safetyBoundary: openPath },
  ]),
  'mogao-grottoes': checkpoints('mogao-grottoes', [
    { name: '九层楼外部', locationDescription: '九层楼前开放外部区域', sceneType: '建筑', whyItWorks: '完整立面能交代莫高窟最具辨识度的外部形象。', bestLight: '上午或傍晚柔光', recommendedLens: '1×或35mm', safetyBoundary: ['仅拍摄允许的外部区域，保持参观通道畅通。'] },
    { name: '崖壁洞窟排列', locationDescription: '开放参观线路可见的崖壁外部', sceneType: '全景', whyItWorks: '连续洞窟与崖壁能呈现遗址的真实尺度。', bestLight: '侧光', recommendedLens: '2×至3×', safetyBoundary: ['不离开参观线路，不触碰崖体和文物构件。'] },
    { name: '回廊纵深', locationDescription: '允许拍摄的外部回廊', sceneType: '人像', whyItWorks: '小人物与长回廊把有限参观时间放进千年空间。', bestLight: '光线柔和时', recommendedLens: '2×或50mm', safetyBoundary: ['洞窟内部不摄影；外部拍摄范围以现场标识为准。'] },
  ]),
  'mingsha-crescent': checkpoints('mingsha-crescent', [
    { name: '低矮沙脊人像', locationDescription: '开放步道附近可到达的低缓沙脊', sceneType: '人像', whyItWorks: '低沙脊已经能形成干净曲线，不必追求高处。', bestLight: '日落前一小时', recommendedLens: '2×或50—70mm', safetyBoundary: ['留在景区开放游览范围，注意风沙与脚下坡度。'] },
    { name: '沙脊日落剪影', locationDescription: '开放区域内视野开阔的沙坡', sceneType: '日落', whyItWorks: '逆光把人物与沙丘轮廓压缩成简洁层次。', bestLight: '太阳接近地平线时', recommendedLens: '2×至3×', safetyBoundary: ['按景区闭园与项目运营时间自然收尾。'] },
    { name: '骆驼队曲线', locationDescription: '骆驼项目公开运行线路外的观察位置', sceneType: '全景', whyItWorks: '驼队连续曲线能表现敦煌沙漠的旅行节奏。', bestLight: '早晨或傍晚', recommendedLens: '3×至5×', safetyBoundary: ['在项目规定的游客区域观察，不靠近或打断队伍。'] },
    { name: '月牙泉六人远景', locationDescription: '景区正式观景区域', sceneType: '六人合影', whyItWorks: '人物分层后，绿洲与沙山仍能完整进入画面。', bestLight: '日落前后', recommendedLens: '1×或35mm', groupPose: '六人沿沙脊形成高低错位，彼此轮廓不重叠。', safetyBoundary: openPath },
  ]),
  'boluo-zhuanjing': checkpoints('boluo-zhuanjing', [
    { name: '旧街道纵深', locationDescription: '明确开放的旧城街道', sceneType: '建筑', whyItWorks: '空街和旧立面自带电影分镜感。', bestLight: '上午斜光或傍晚', recommendedLens: '1×或35mm', safetyBoundary: ['只进入明确开放区域，远离松动构件。'] },
    { name: '窗框与小人物', locationDescription: '可安全停留的建筑外部', sceneType: '人像', whyItWorks: '窗框和门洞让人物成为工业旧址中的小比例。', bestLight: '侧光', recommendedLens: '2×或50mm', safetyBoundary: ['不攀爬、不进入封闭建筑内部。'] },
  ]),
  'g315-u-road': checkpoints('g315-u-road', [
    { name: '远距离长焦起伏', locationDescription: '正式停车区或宽阔安全区域', sceneType: '公路', whyItWorks: '长焦压缩能表现U形起伏，不需要靠近车流。', bestLight: '上午或傍晚侧光', recommendedLens: '5×或120—200mm', safetyBoundary: roadEdge },
    { name: '商务车与荒原', locationDescription: '机动车道外的合法停车区域', sceneType: '公路', whyItWorks: '车辆停稳后，侧面轮廓能交代六人自驾的故事。', bestLight: '侧逆光', recommendedLens: '2×或70mm', safetyBoundary: roadEdge },
    { name: '车窗移动视角', locationDescription: '车辆正常行驶时由乘客隔窗拍摄', sceneType: '全景', whyItWorks: '车窗反光和荒原变化保留真实在路上的感觉。', bestLight: '光线从车身另一侧进入时', recommendedLens: '1×或35mm', poseIdeas: ['由乘客完成记录', '人物不参与摆拍'], safetyBoundary: ['驾驶者专注道路，拍摄由乘客完成。'] },
  ]),
  'wusute-yadan': checkpoints('wusute-yadan', [
    { name: '雅丹与水面倒影', locationDescription: '开放水岸步道或观景台', sceneType: '倒影', whyItWorks: '水面把坚硬雅丹变成上下两层，区别于普通荒漠雅丹。', bestLight: '清晨低风或傍晚', recommendedLens: '2×或70mm', safetyBoundary: openPath },
    { name: '人物与地貌尺度', locationDescription: '开放观景区域内的宽阔平台', sceneType: '全景', whyItWorks: '人物缩小后，水与雅丹的尺度更清楚。', bestLight: '傍晚侧光', recommendedLens: '2×至3×', safetyBoundary: openPath },
    { name: '六人分层日落', locationDescription: '景区开放的日落观景位置', sceneType: '日落', whyItWorks: '前后两层站位能避开剪影重叠。', bestLight: '日落前后', recommendedLens: '1×或50mm', groupPose: '两人前景、四人后景形成缓弧，保留水面反光。', safetyBoundary: ['关注风力和观光车收车信息，按现场运营安排返回。'] },
  ]),
  'dachaidan-emerald': checkpoints('dachaidan-emerald', [
    { name: '盐池天然色块', locationDescription: '开放栈道或观景台', sceneType: '全景', whyItWorks: '不同盐池的色块和白色盐线能形成抽象构图。', bestLight: '上午或傍晚', recommendedLens: '2×或70mm', safetyBoundary: saltEdge },
    { name: '栈道引导线', locationDescription: '栈道宽阔停留位置', sceneType: '人像', whyItWorks: '栈道斜线把人物引向湖格深处。', bestLight: '侧光', recommendedLens: '1×或35mm', safetyBoundary: saltEdge },
    { name: '2＋2＋2六人色块照', locationDescription: '开放观景区域', sceneType: '六人合影', whyItWorks: '分组站位与湖格色块呼应，画面不会拥挤。', bestLight: '色彩清晰且风力适中时', recommendedLens: '2×或50mm', groupPose: '2＋2＋2沿栈道方向前后错开。', safetyBoundary: saltEdge },
  ]),
  'chaka-salt-lake': checkpoints('chaka-salt-lake', [
    { name: '人物完整倒影', locationDescription: '景区明确开放的盐湖体验区域', sceneType: '倒影', whyItWorks: '低风时人物与天空能形成完整上下关系。', bestLight: '上午10点前或下午4点后', recommendedLens: '1×或50mm', safetyBoundary: saltEdge },
    { name: '小火车与盐轨', locationDescription: '开放步道旁能看见轨道纵深的位置', sceneType: '全景', whyItWorks: '轨道把白色地平线变成有方向的旅行画面。', bestLight: '侧光或云层有变化时', recommendedLens: '2×至3×', safetyBoundary: ['在游客区域取景，不进入运营轨道。'] },
    { name: '六人镜面分层', locationDescription: '开放体验区域内较宽阔水面', sceneType: '六人合影', whyItWorks: '分层站位能让六个人和各自倒影都被辨认。', bestLight: '低风时段', recommendedLens: '1×或35mm', groupPose: '2＋2＋2前后分层，站稳后再依次调整动作。', safetyBoundary: saltEdge },
    { name: '白色地平线留白', locationDescription: '开放盐面或栈道观景位置', sceneType: '人像', whyItWorks: '把人物缩小后，白色盐面和天空成为画面主体。', bestLight: '阴天柔光或日落前', recommendedLens: '2×或70mm', safetyBoundary: saltEdge },
  ]),
  'qinghai-lake': checkpoints('qinghai-lake', [
    { name: '湖面草原远山三层', locationDescription: '正规开放湖岸或观景景区', sceneType: '全景', whyItWorks: '三层地理关系比单纯贴近水边更能说明青海湖。', bestLight: '清晨、傍晚或雨后放晴', recommendedLens: '2×或70mm', safetyBoundary: natureEdge },
    { name: '湖岸动态人像', locationDescription: '开放湖岸步道', sceneType: '人像', whyItWorks: '披肩和风的动态能回应湖区真实体感。', bestLight: '傍晚侧光', recommendedLens: '2×或50mm', safetyBoundary: natureEdge },
    { name: '六人三角站位', locationDescription: '正式观景区内宽阔位置', sceneType: '六人合影', whyItWorks: '三角站位比横排更适合湖面与远山层次。', bestLight: '能见度较好时', recommendedLens: '1×或35mm', groupPose: '前1、中2、后3形成松散三角，队伍两端留空。', safetyBoundary: natureEdge },
    { name: '安静生态观察', locationDescription: '公开观鸟或生态观察区域', sceneType: '生态观察', whyItWorks: '长焦把动物留在栖息环境里，不需要改变它们的行为。', bestLight: '清晨或傍晚', recommendedLens: '200mm以上', safetyBoundary: ['保持观察距离，车辆与人物不靠近野生动物。'] },
  ]),
  'tibetan-culture-museum': checkpoints('tibetan-culture-museum', [
    { name: '场馆建筑序章', locationDescription: '博物院外部公共区域', sceneType: '建筑', whyItWorks: '先交代场馆，再进入文字、服饰与医药的文化脉络。', bestLight: '上午或傍晚', recommendedLens: '1×或35mm', safetyBoundary: openPath },
    { name: '展厅细节关系', locationDescription: '允许拍摄的展厅区域', sceneType: '人像', whyItWorks: '人物小比例和展陈细节能形成安静的阅读感。', bestLight: '室内自然展陈光', recommendedLens: '2×或50mm', safetyBoundary: ['以展厅拍摄标识为准，不使用影响参观的补光设备。'] },
  ]),
  'riyue-mountain': checkpoints('riyue-mountain', [
    { name: '山口地理转场', locationDescription: '开放观景平台', sceneType: '全景', whyItWorks: '道路、山口和两侧地貌能说明地理变化。', bestLight: '能见度较好时', recommendedLens: '1×或35mm', safetyBoundary: roadEdge },
    { name: '风中人物小景', locationDescription: '观景平台内侧', sceneType: '人像', whyItWorks: '人物保持小比例，风与山口成为主角。', bestLight: '侧光', recommendedLens: '2×或70mm', safetyBoundary: ['风大时缩短停留，保暖层放在车内易取处。'] },
  ]),
  heimahe: checkpoints('heimahe', [
    { name: '湖岸晨光', locationDescription: '正规开放湖岸观景区', sceneType: '日落', whyItWorks: '低角度光把湖面和云层分成柔和层次。', bestLight: '日出前后', recommendedLens: '2×或70mm', safetyBoundary: natureEdge },
    { name: '清晨六人剪影', locationDescription: '开放湖岸步道', sceneType: '六人合影', whyItWorks: '人物轮廓分开后，晨光仍是主体。', bestLight: '日出后短时段', recommendedLens: '1×或50mm', safetyBoundary: natureEdge },
    { name: '住宿地窗外片段', locationDescription: '正规住宿公共区域或停车区', sceneType: '人像', whyItWorks: '不赶机位也能记录湖岸清晨的真实抵达感。', bestLight: '晨间柔光', recommendedLens: '1×或35mm', safetyBoundary: ['尊重住宿公共区域秩序。'] },
  ]),
  'qilian-grassland': checkpoints('qilian-grassland', [
    { name: '草原雪山长卷', locationDescription: '公路沿线正规观景区', sceneType: '全景', whyItWorks: '雪山、草地和公路连续展开，适合保留宽幅画面。', bestLight: '上午或雨后', recommendedLens: '1×或35mm', safetyBoundary: roadEdge },
    { name: '道路外侧慢走', locationDescription: '停车区相连的开放步道', sceneType: '人像', whyItWorks: '慢走动作能让草地纹理和远山保持自然。', bestLight: '傍晚侧光', recommendedLens: '2×或70mm', safetyBoundary: natureEdge },
    { name: '六人横向疏落构图', locationDescription: '开放观景草地或平台', sceneType: '六人合影', whyItWorks: '横向疏落站位呼应草原宽度，同时避免排成一条线。', bestLight: '云层有变化时', recommendedLens: '1×或35mm', safetyBoundary: natureEdge },
  ]),
  'zhuoer-mountain': checkpoints('zhuoer-mountain', [
    { name: '盆地全景', locationDescription: '景区开放观景平台', sceneType: '全景', whyItWorks: '红色山体、村镇、田野与雪山在高处同时展开。', bestLight: '上午能见度好时', recommendedLens: '2×或70mm', safetyBoundary: openPath },
    { name: '栈道与红山', locationDescription: '开放栈道宽阔停留段', sceneType: '人像', whyItWorks: '栈道引导线让人物与红色山体自然相连。', bestLight: '侧光', recommendedLens: '1×或35mm', safetyBoundary: openPath },
    { name: '六人与祁连盆地', locationDescription: '正式观景台', sceneType: '六人合影', whyItWorks: '人物小比例能保留盆地地貌信息。', bestLight: '云量较少时', recommendedLens: '2×或50mm', safetyBoundary: openPath },
  ]),
  delingha: checkpoints('delingha', [
    { name: '城市与荒原抵达感', locationDescription: '市区公共空间或正规停车区', sceneType: '全景', whyItWorks: '城市建筑与远处荒原形成长途路线中的停顿。', bestLight: '傍晚', recommendedLens: '1×或35mm', safetyBoundary: ['在公共空间或正式停车区域取景。'] },
    { name: '诗歌气质街景', locationDescription: '市区步行公共区域', sceneType: '人像', whyItWorks: '安静街景比继续堆景点更能表现休整。', bestLight: '傍晚柔光', recommendedLens: '2×或50mm', safetyBoundary: ['不妨碍居民和车辆通行。'] },
  ]),
  'lenghu-oil-town': checkpoints('lenghu-oil-town', [
    { name: '工业遗址远景', locationDescription: '明确开放的遗址外围', sceneType: '建筑', whyItWorks: '远景能保留荒漠与工业建筑的比例。', bestLight: '上午斜光或傍晚', recommendedLens: '2×或70mm', safetyBoundary: ['仅在开放范围活动，远离坍塌风险构件。'] },
    { name: '旧墙电影分镜', locationDescription: '可安全停留的建筑外部', sceneType: '人像', whyItWorks: '人物小比例与旧墙肌理形成年代感。', bestLight: '侧光', recommendedLens: '2×或50mm', safetyBoundary: ['不进入封闭建筑，不触碰松动设施。'] },
  ]),
  'black-mountain': checkpoints('black-mountain', [
    { name: '合法区域极简留白', locationDescription: '当期明确允许到达的开放区域', sceneType: '全景', whyItWorks: '黑灰山体与大面积天空形成极简关系。', bestLight: '阴天柔光或傍晚', recommendedLens: '2×或70mm', safetyBoundary: ['仅限合法开放区域，现场边界不清时不继续进入。'], accessNote: '不提供精确机位，实际可达范围以属地与现场管理信息为准。' },
    { name: '人物与黑灰尺度', locationDescription: '合法开放范围内的稳定地面', sceneType: '人像', whyItWorks: '人物缩小后，地貌的孤独感和尺度更清楚。', bestLight: '侧光', recommendedLens: '2×至3×', safetyBoundary: ['仅限合法开放区域，不离开已有开放路径。'] },
    { name: '商务车与地貌', locationDescription: '正规或明确允许停车的安全位置', sceneType: '公路', whyItWorks: '车辆提供尺度，也保留六人自驾的故事线。', bestLight: '傍晚侧光', recommendedLens: '2×或70mm', safetyBoundary: ['车辆停稳且不阻碍通行，不驶入脆弱地貌。'] },
  ]),
  'yanzhi-mountain': checkpoints('yanzhi-mountain', [
    { name: '红色山体远景', locationDescription: '当期明确开放的支线观景位置', sceneType: '全景', whyItWorks: '红色地貌与黑独山形成明显色彩对照。', bestLight: '上午或傍晚侧光', recommendedLens: '2×至3×', safetyBoundary: ['先确认支线与观景范围当期开放，再决定是否停留。'] },
    { name: '人物与红黑对照', locationDescription: '开放区域内稳定地面', sceneType: '人像', whyItWorks: '克制穿搭能把注意力留给地貌色彩。', bestLight: '柔和侧光', recommendedLens: '2×或70mm', safetyBoundary: ['不驶离开放道路，不在松软坡面留下车辙。'] },
  ]),
  'qarhan-salt-lake': checkpoints('qarhan-salt-lake', [
    { name: '正式观景设施与盐湖', locationDescription: '景区开放观景平台', sceneType: '全景', whyItWorks: '观景设施与盐湖同框，能说明工业地理而非只拍湖色。', bestLight: '上午或傍晚', recommendedLens: '1×或35mm', safetyBoundary: saltEdge },
    { name: '盐湖色彩人像', locationDescription: '正式游览线路的宽阔段', sceneType: '人像', whyItWorks: '简洁服装与矿物色形成清楚对比。', bestLight: '侧光', recommendedLens: '2×或50mm', safetyBoundary: saltEdge },
    { name: '工业与湖面关系', locationDescription: '允许拍摄的公开观景区域', sceneType: '全景', whyItWorks: '远距离长焦把生产尺度与湖面层次压进同一画面。', bestLight: '能见度好时', recommendedLens: '3×至5×', safetyBoundary: ['不进入生产作业区，以现场拍摄和通行标识为准。'] },
  ]),
  'queen-mother-lake': checkpoints('queen-mother-lake', [
    { name: '昆仑山水全景', locationDescription: '道路沿线合法观景或停车区域', sceneType: '全景', whyItWorks: '湖面与昆仑山体形成安静、克制的山水关系。', bestLight: '上午能见度好时', recommendedLens: '2×或70mm', safetyBoundary: roadEdge },
    { name: '小人物安静观赏', locationDescription: '安全观景区域内', sceneType: '人像', whyItWorks: '人物不抢景，更贴合传统文化想象与高原尺度。', bestLight: '侧光', recommendedLens: '2×至3×', safetyBoundary: ['关注海拔体感，不延长不舒适的停留。'] },
  ]),
  'kunlun-pass': checkpoints('kunlun-pass', [
    { name: '雪山公路车辆', locationDescription: '正式停车区或道路服务节点', sceneType: '公路', whyItWorks: '车辆、道路和雪山共同说明地势抬升。', bestLight: '上午能见度较好时', recommendedLens: '2×或70mm', safetyBoundary: roadEdge },
    { name: '人物小比例地理照', locationDescription: '安全观景区域', sceneType: '全景', whyItWorks: '人物缩小后，高海拔山口的尺度更真实。', bestLight: '侧光', recommendedLens: '2×至3×', safetyBoundary: ['缩短站立拍摄时间，体感不舒适时回到车内。'] },
    { name: '山口标识与远山', locationDescription: '不影响通行的公开标识周边', sceneType: '六人合影', whyItWorks: '标识交代地点，远山保留环境信息。', bestLight: '顺光较柔和时', recommendedLens: '1×或35mm', safetyBoundary: ['不聚集在车辆通行区域，快速完成后让出空间。'] },
  ]),
  'hoh-xil': checkpoints('hoh-xil', [
    { name: '合法道路荒原', locationDescription: 'G109合法行车与公开服务节点可见范围', sceneType: '全景', whyItWorks: '雪山、公路和荒原能说明高寒生态尺度。', bestLight: '能见度好且天气稳定时', recommendedLens: '2×或70mm', safetyBoundary: roadEdge, accessNote: '不延伸到保护区腹地路线。' },
    { name: '车辆与高寒地貌', locationDescription: '正式停车或服务节点', sceneType: '公路', whyItWorks: '车辆提供尺度，同时保留人在生态系统中的克制位置。', bestLight: '侧光', recommendedLens: '2×至3×', safetyBoundary: roadEdge },
    { name: '动物与栖息环境', locationDescription: '合法道路或公开观察范围内偶遇时', sceneType: '生态观察', whyItWorks: '长焦把动物留在环境里，比贴脸特写更能说明可可西里。', bestLight: '自然出现时', recommendedLens: '300mm以上长焦', poseIdeas: ['由车内或公开观察位置完成记录'], safetyBoundary: ['不主动接近、不鸣笛惊扰，接受没有观察到动物。'], accessNote: '不公布动物位置；现场观察具有不确定性。' },
  ]),
  'tibetan-antelope': checkpoints('tibetan-antelope', [
    { name: '动物与栖息地同框', locationDescription: '合法公开观察范围内自然遇见时', sceneType: '生态观察', whyItWorks: '长焦保留动物与荒原关系，不追求贴近画面。', bestLight: '自然出现时', recommendedLens: '300mm以上长焦', poseIdeas: ['人物不参与动物画面摆拍'], safetyBoundary: ['保持距离，不主动接近、不鸣笛、不使用低空设备。'], accessNote: '不提供动物位置，能否观察到取决于自然状态。' },
    { name: '远距离环境观察', locationDescription: '公开道路或管理允许的观察位置', sceneType: '全景', whyItWorks: '环境照片能说明迁徙通道和高寒荒原尺度。', bestLight: '能见度好时', recommendedLens: '200mm以上', poseIdeas: ['由乘客或停车后在公开区域记录'], safetyBoundary: ['车辆服从现场交通与保护管理，不改变动物行为。'] },
  ]),
}

export function photoCheckpointsFor(placeId: string): PhotoCheckpoint[] {
  const value = photoCheckpointsByPlaceId[placeId]
  if (!value) throw new Error(`Missing photo checkpoints for ${placeId}`)
  return value
}

export const photoCheckpointSourceNote = '2026-08-01：结合景区公开导览、官方拍摄建议、保护与道路管理信息核实；只描述安全画面关系，不提供危险精确坐标。'
