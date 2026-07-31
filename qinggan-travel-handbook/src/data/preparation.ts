import type { PreparationItem } from '@/types/content'

export const preparationItems: PreparationItem[] = [
  { id: 'mogao-ticket', title: '莫高窟票务', category: '票务', summary: '场次与参观范围直接影响当天体验，适合优先复核。', checks: ['官方预约渠道与实名信息', '所选票型包含的参观内容', '到场换乘与入场要求'] },
  { id: 'zhangye-events', title: '张掖活动时间', category: '活动', summary: '热气球等活动受日期与风况影响较大。', checks: ['活动是否在旅行日期内举行', '观赏与乘坐是否分开预约', '当日风况变化'] },
  { id: 'mingsha-events', title: '鸣沙山活动安排', category: '活动', summary: '日落、夜游与现场活动常随季节调整。', checks: ['开放时段与末班交通', '星空演唱等活动是否举行', '天气与日落时间'] },
  { id: 'yadan-open', title: '水上雅丹开放情况', category: '开放信息', summary: '远距离到访前，确认开放区域会更从容。', checks: ['当日开放区域', '景交车与末班时间', '风力和降温情况'] },
  { id: 'lake-weather', title: '茶卡与青海湖天气', category: '天气', summary: '风速、降水和能见度对盐湖倒影与湖岸体验影响明显。', checks: ['逐小时风速和降水概率', '日出日落与体感温度', '备用的顺路组合方案'] },
  { id: 'road-control', title: '主要道路临时管控', category: '道路', summary: '高原、戈壁路段偶有施工或天气性调整。', checks: ['出发前查看权威道路信息', '沿线补给点与续航', '当日驾驶节奏留有余量'] },
  { id: 'drone', title: '无人机规定', category: '设备', summary: '景区、文保单位和临时活动区域的规则并不相同。', checks: ['景区当日公示', '禁飞或报备范围', '风力与起降环境'] },
  { id: 'opening-hours', title: '景区开放时间', category: '开放信息', summary: '季节、维护与活动都会带来临时变化。', checks: ['官方当日开放时间', '停止入园与末班交通时间', '特殊区域是否开放'] },
]
