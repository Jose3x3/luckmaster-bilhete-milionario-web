import { api } from '@/api'
import { CampaignResponse } from '@/types/CampaingResponse'
import Image from 'next/image'
import { Timer } from '@/app/payment/_components/Timer'
import { Pix } from '@/app/payment/_components/Pix'
import { cookies } from 'next/headers'
import { CopyAndPastePix } from '@/app/payment/_components/CopyAndPastePix'
import { Title } from '@/app/payment/_components/Title'

export default async function Payment({
  searchParams,
}: {
  searchParams?: { generated_date?: string }
}) {
  const cookieStore = cookies()
  const campaignReponse = await api.get<CampaignResponse>(
    '/user/find/sharedcampaign/94e57731-e792-4ca2-a74c-31381d1e7dec',
  )
  const generatedDate =
    searchParams && searchParams.generated_date
      ? new Date(Number(searchParams.generated_date))
      : new Date()

  const value = cookieStore.get('value')?.value
  const pix = cookieStore.get('pix')?.value
  const txId = cookieStore.get('txId')?.value
  const token = cookieStore.get('token')?.value

  return (
    <main className="text-gray-900 flex flex-col items-center gap-4 p-2 md:p-10">
      <div className="max-w-[550px] w-full">
        <div className="bg-white shadow w-full gap-2 flex flex-col items-center justify-center rounded-t-2xl sm:p-2 md:p-3 ">
          <Title pix={pix} />
          <Image
            className="rounded-2xl w-full h-auto p-2 md:p-0"
            src={campaignReponse.data.rifa.imagem}
            width={1920}
            height={1080}
            alt="Banner"
            priority
          />

          {pix && txId && token && (
            <>
              <Timer date={generatedDate} txId={txId} token={token} />
              <Pix pix={pix} />
              {value && (
                <CopyAndPastePix
                  pix={pix}
                  value={Number(value)}
                  token={token}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
