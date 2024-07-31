'use client'
import Image from 'next/image'
import CoinGif from '@/assets/imgs/coin.gif'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { AwardWithWinner } from '@/types/AwardWithWinner'
import { Label } from '@/components/Label'

interface AvailableAwardsProps {
  awards: AwardWithWinner[]
  title: string
}

export function AwardsList({ awards, title }: AvailableAwardsProps) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-col bg-white shadow rounded-md text-gray-900 mb-4">
      <div className={`flex items-center gap-2 p-3 rounded-t-md`}>
        <h2 className="font-bold text-lg ">{title}</h2>
        <Label label={`${awards.length}`} size="sm" />
      </div>
      <div className="grid grid-cols-1 px-2 gap-2 my-2">
        {awards.slice(0, open ? 1000 : 5).map((award) => (
          <div
            key={award.number}
            className={`flex flex-col md:border-r-2 py-2 px-2 gap-1`}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-md">Bilhete #{award.number}</h2>
              <div
                className={` ${award.name !== undefined ? 'bg-yellow-400' : 'bg-green-500'} text-white text-center w-24 text-sm font-semibold py-1 px-2 rounded-full`}
              >
                {award.name !== undefined ? 'Vencedor' : 'Disponível'}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">{award.description}</span>
              {award.name !== undefined && (
                <div className="flex gap-1 justify-end items-center ">
                  <span className="text-sm text-gray-500 font-medium">
                    {award.name}
                  </span>
                  <Image className="size-4" src={CoinGif} alt="moeda" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {awards.length > 5 && (
        <div className="w-full p-2">
          <Button
            label={open ? 'Mostrar menos' : 'Mostrar mais'}
            onClick={() => setOpen((prevState) => !prevState)}
          />
        </div>
      )}
    </div>
  )
}
