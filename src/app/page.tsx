import Image from 'next/image'
import { Awards } from '@/app/_components/Awards'
import { api } from '@/api'
import { CampaignResponse } from '@/types/CampaingResponse'
import { Description } from '@/app/_components/Description'
import { AwardResponse } from '@/types/AwardResponse'
import { WinnerResponse } from '@/types/WinnerResponse'
import { AwardWithWinner } from '@/types/AwardWithWinner'
import { Purchase } from '@/app/_components/Purchase'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [campaignReponse, awardResponse, awardWinnersResponse] =
    await Promise.all([
      api.get<CampaignResponse>(
        `/user/find/sharedcampaign/${searchParams.sharedcampaignId}`,
      ),
      api.get<AwardResponse>(
        `/rifa/award/force/list/0111de6e-b225-4d13-a906-a523afbff5cc/1/1000?isAdminPanel=false`,
      ),
      api.get<WinnerResponse>(
        '/user/find/awards/winner/0111de6e-b225-4d13-a906-a523afbff5cc',
      ),
    ])

  const awardWithWinners: AwardWithWinner[] = awardResponse.data.awards.map(
    (award) => ({
      ...award,
      name:
        awardWinnersResponse.data.winners === null
          ? undefined
          : awardWinnersResponse.data.winners.find(
              (winner) => winner.number === award.number,
            )?.name,
    }),
  )
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
        <Awards awards={awardWithWinners} />
      </div>
    </main>
  )
}
