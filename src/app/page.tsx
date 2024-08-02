import Image from 'next/image'
import { Awards } from '@/app/_components/Awards'
import { api } from '@/api'
import { CampaignResponse } from '@/types/CampaingResponse'
import { Description } from '@/app/_components/Description'

import { Purchase } from '@/app/_components/Purchase'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [campaignReponse] = await Promise.all([
    api.get<CampaignResponse>(
      `/user/find/sharedcampaign/${searchParams.sharedcampaignId}`,
    ),
  ])

  return (
    <main className="text-white flex flex-col items-center gap-4 p-2 md:p-10">
      <div className="max-w-[550px] w-full">
        <div className="bg-white shadow w-full flex flex-col items-center justify-center rounded-t-2xl sm:p-2 md:p-3 ">
          <Image
            className="rounded-2xl w-full h-auto p-2 md:p-0"
            src={campaignReponse.data.rifa.imagem}
            width={1920}
            height={1080}
            alt="Banner"
            priority
          />
        </div>

        <Purchase
          campaign={campaignReponse.data.rifa}
          promotion={campaignReponse.data.promotions[0]}
          sharedCampaignId={searchParams.sharedcampaignId as string}
        />

        <Description rifa={campaignReponse.data.rifa} />
        <Awards />
      </div>
    </main>
  )
}
