import { AwardWithWinner } from '@/types/AwardWithWinner'
import { AwardsList } from '../AwardsList'
import { Award } from '@/types/Award'
import { Label } from '@/components/Label'

interface AwardsProps {
  awards: AwardWithWinner[]
}

export function Awards({ awards }: AwardsProps) {
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
