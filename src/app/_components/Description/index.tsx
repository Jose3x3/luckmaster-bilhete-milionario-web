import { Rifa } from '@/types/Rifa'

interface DescriptionProps {
  rifa: Rifa
}

export function Description({ rifa }: DescriptionProps) {
  return (
    <div className="flex flex-col bg-white shadow rounded-md text-gray-900 p-2 md:p-3 mt-2 gap-2">
      <h2 className="font-bold text-2xl">Descrição</h2>
      <pre className="text-sm">{rifa.descricao.trim()}</pre>
    </div>
  )
}
