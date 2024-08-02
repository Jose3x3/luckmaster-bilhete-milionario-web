import { api } from '@/api'
import { cookies } from 'next/headers'
import { Ticket } from '@/types/Ticket'
import { Card } from '@/app/tickets/_components/Card'
import cryImg from '@/assets/imgs/crying.svg'

export default async function Tickets() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const response = await api.get<{ purchases: Ticket[] }>(
    '/user/find/purchases',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const verificaNum = () => {
    const index = response.data.purchases.findIndex((value) =>
      Array.isArray(value.numeros),
    )
    return index > -1
  }
  return (
    <main className="text-gray-900 flex flex-col items-center gap-4 p-2 md:p-10">
      <h1>Meus Bilhetes</h1>
      {response.data.purchases &&
      response.data.purchases.length > 0 &&
      verificaNum() ? (
        response.data.purchases.map((ticket) => (
          <Card key={ticket.pago_horario} ticket={ticket} />
        ))
      ) : (
        <div className="w-full flex-col gap-4 flex items-center justify-center rounded p-4 mb-56">
          <img src={cryImg} alt="" />
          <h5 className="font-semibold text-gray-700">
            Você não possui nenhum bilhete
          </h5>
        </div>
      )}
    </main>
  )
}
