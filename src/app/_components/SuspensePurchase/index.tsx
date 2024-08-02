import { Suspense } from 'react'
import { Purchase } from '@/app/_components/Purchase'
import { Rifa } from '@/types/Rifa'
import { Promotion } from '@/types/Promotion'
interface PurchaseProps {
  campaign: Rifa
  promotion: Promotion
  sharedCampaignId: string
}
export function SuspensePurchase({
  campaign,
  promotion,
  sharedCampaignId,
}: PurchaseProps) {
  return (
    <Suspense>
      <Purchase
        campaign={campaign}
        promotion={promotion}
        sharedCampaignId={sharedCampaignId}
      />
    </Suspense>
  )
}
