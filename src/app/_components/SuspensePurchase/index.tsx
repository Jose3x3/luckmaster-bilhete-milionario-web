import { Suspense } from 'react'
import { Purchase } from '@/app/_components/Purchase'
import { Rifa } from '@/types/Rifa'
import { Promotion } from '@/types/Promotion'
interface PurchaseProps {
  campaign: Rifa
  promotion: Promotion
}
export function SuspensePurchase({ campaign, promotion }: PurchaseProps) {
  return (
    <Suspense>
      <Purchase campaign={campaign} promotion={promotion} />
    </Suspense>
  )
}
