'use client'
import CoinGif from '@/assets/imgs/coin.gif'
import { AwardWithWinner } from '@/types/AwardWithWinner'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/Button'

interface AwardsProps {
  awards: AwardWithWinner[]
}

export function Awards({ awards }: AwardsProps) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <div className="flex justify-between py-2">
        <h1 className="flex justify-center items-center gap-2 md:text-3xl text-2xl font-bold text-gray-900">
          Bilhetes Premiados
        </h1>
        <div className="bg-gray-300 flex justify-center items-center font-semibold text-gray-600 px-4 py-2 rounded-full">
          1000 Bilhetes
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 bg-white shadow rounded-md text-gray-900 sm:p-2 md:p-3">
        {awards.slice(0, open ? 100 : 10).map((award, index) => (
          <div
            key={award.number}
            className={`flex flex-col md:border-r-2 py-2 px-2 ${index >= 2 ? 'md:mt-6' : 'mt-2'} gap-2`}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-md">Bilhete #{award.number}</h2>
              <div
                className={` ${award.name !== undefined ? 'bg-yellow-400' : 'bg-secondary-500'} text-center w-24 text-sm font-semibold py-1 px-2 rounded-full`}
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
        <Button
          customClass="col-span-full my-4"
          label={open ? 'Mostrar menos' : 'Mostrar mais'}
          onClick={() => setOpen((prevState) => !prevState)}
        />
      </div>
    </>
  )
}
