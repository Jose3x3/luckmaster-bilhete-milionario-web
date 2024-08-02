'use client'
import { Ticket } from '@/types/Ticket'
import { formatValue } from '@/utils'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { PlusIcon } from '@heroicons/react/24/outline'

interface CardProps {
  ticket: Ticket
}

export function Card({ ticket }: CardProps) {
  const [titleId, setTitleId] = useState<string>('')
  const handleToggle = (rifaId: string) => {
    if (titleId === rifaId) {
      setTitleId('')
    } else {
      setTitleId(rifaId)
    }
  }

  function formatDate(dataString: string): string {
    const date: string = new Date(dataString).toLocaleDateString('pt-BR')
    return date
  }

  function formatDatetime(datetime: string): string {
    const date: string = new Date(datetime).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })
    return date
  }

  const formatTitle = (title: number) => {
    const titleString = title.toString()
    if (titleString.length < 6) {
      let newNumber = ''
      new Array(6 - titleString.length).fill(0).forEach(() => {
        newNumber = `0${newNumber}`
      })
      return `${newNumber}${titleString}`
    }
    return titleString
  }
  return (
    <div
      key={ticket?.pago_horario}
      className="border border-gray-300 px-4 py-8 rounded-md mb-4"
    >
      <div className="flex gap-4">
        <div>
          <img
            src={ticket?.imagem}
            className="rounded shadow-xl size-24"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <h3 className="text-gray-700 text-xl font-medium">
            {ticket?.titulo}
          </h3>
          <div className="flex items-center gap-2">
            {ticket.data_sorteio && (
              <div className="flex flex-col">
                <span className="text-gray-700 text-md font-medium">
                  Sorteio
                </span>
                <span className="text-gray-700  text-sm">
                  {formatDate(ticket?.data_sorteio)}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center w-full justify-between gap-2 mt-4">
            {ticket.pago_valor && (
              <div className="flex flex-col">
                <span className="text-gray-700 text-md font-medium">
                  Valor pago
                </span>
                <span className="text-gray-700  text-sm">
                  {formatValue(ticket.pago_valor)}
                </span>
              </div>
            )}

            {ticket.pago_horario && (
              <div className="flex flex-col">
                <span className="text-gray-700 text-md font-medium">
                  Data da compra
                </span>
                <span className="text-gray-700  text-sm">
                  {formatDatetime(ticket.pago_horario)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col relative w-full">
          <span className="text-gray-700 font-semibold my-3 text-xl">
            Bilhete(s)
          </span>
          <span
            className={`${ticket.rifa_id === titleId ? ' overflow-auto' : 'max-h-[40px] overflow-hidden'} text-gray-700 font-normal text-xl flex flex-wrap gap-4`}
          >
            {Array.isArray(ticket?.numeros) &&
              ticket?.numeros.map((numero: number) => (
                <p
                  key={numero}
                  className="bg-primary-700 text-white rounded-full font-semibold py-1 px-4"
                >
                  {formatTitle(numero)}
                </p>
              ))}
          </span>
        </div>
      </div>
    </div>
  )
}
