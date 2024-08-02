import { Rifa } from '@/types/Rifa'
import { Promotion } from '@/types/Promotion'

export type CampaignResponse = {
  rifa: Rifa
  promotions: Promotion[]
}
