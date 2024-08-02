'use client'
import { api } from '@/api'
import { Ticket } from '@/types/Ticket'
import { Card } from '@/app/tickets/_components/Card'
import cryImg from '@/assets/imgs/crying.svg'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

export default function Tickets() {
  const [cookies] = useCookies(['token'])
  const token = cookies.token
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const handleTickets = async () => {
      const response = await api.get<{ purchases: Ticket[] }>(
        '/user/find/purchases',
        {
          headers: {
            Authorization: token,
          },
        },
      )
      setTickets(response.data.purchases)
    }
    handleTickets()
  }, [token])

  const verificaNum = () => {
    const index = tickets.findIndex((value) => Array.isArray(value.numeros))
    return index > -1
  }
  return (
    <main className="text-gray-900 flex flex-col items-center gap-4 p-2 md:p-10">
      <h1>Meus Bilhetes</h1>
      {tickets && tickets.length > 0 && verificaNum() ? (
        tickets.map((ticket) => (
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
