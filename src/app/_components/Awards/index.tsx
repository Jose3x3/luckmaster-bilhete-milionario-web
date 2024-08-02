'use client'
import { AwardWithWinner } from '@/types/AwardWithWinner'
import { AwardsList } from '../AwardsList'
import { Award } from '@/types/Award'
import { Label } from '@/components/Label'
import { useEffect, useState } from 'react'
import { api } from '@/api'
import { AwardResponse } from '@/types/AwardResponse'
import { WinnerResponse } from '@/types/WinnerResponse'

export function Awards() {
  const [awards, setAwards] = useState<AwardWithWinner[]>([])

  useEffect(() => {
    const handleAwards = async () => {
      const awardResponse = await api.get<AwardResponse>(
        `/rifa/award/force/list/0111de6e-b225-4d13-a906-a523afbff5cc/1/1000?isAdminPanel=false`,
      )
      const awardWinnersResponse = await api.get<WinnerResponse>(
        '/user/find/awards/winner/0111de6e-b225-4d13-a906-a523afbff5cc',
      )
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
      setAwards(awardWithWinners)
    }
    handleAwards()
  }, [])

  useEffect(() => {}, [])
  const availableAwards: Award[] = awards.filter(
    (award) => award.name === undefined,
  )
  const winnersAwards: AwardWithWinner[] = awards.filter(
    (award) => award.name !== undefined,
  )
  return (
    <>
      <div className="flex justify-between py-2">
        <h1 className="flex justify-center items-center gap-2 md:text-3xl text-2xl font-bold text-gray-900">
          Bilhetes Premiados
        </h1>
        <Label label={`${awards.length} Bilhetes`} />
      </div>
      <AwardsList awards={availableAwards} title="Disponíveis" />
      <AwardsList awards={winnersAwards} title="Sorteados" />
    </>
  )
}
