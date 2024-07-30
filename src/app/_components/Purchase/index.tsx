'use client'
import { Button } from '@/components/Button'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/Input'
import { useEffect, useState } from 'react'
import { formatValue } from '@/utils'
import Image from 'next/image'
import CoinImg from '@/assets/imgs/coin.gif'

export function Purchase() {
  const oldValue = 0.2
  const [qtd, setQtd] = useState(0)
  const [value, setValue] = useState(oldValue)
  const promoValue = 9.99 / 100

  useEffect(() => {
    if (qtd >= 100) setValue(promoValue)
    else setValue(oldValue)
  }, [qtd])

  return (
    <>
      <div className="flex justify-center items-center bg-primary-500 w-full border-t-4 border-t-secondary-500">
        <h3 className="text-white font-semibold text-xl my-2">
          PARTICIPE - Apenas {formatValue(oldValue)}
        </h3>
      </div>

      <div className="p-4 bg-primary-500 mt-[-1px] w-full rounded-b-md">
        <div className="bg-primary-700 py-4 rounded-md w-full grid grid-cols-4 gap-3 items-center sm:p-1 md:p-6">
          <Button
            className="col-span-full cursor-default font-semibold rounded-[50px] bg-yellow-400 hover:bg-yellow-500 shadow-sm animate-pulse h-16 text-xl text-primary-700"
            label={
              <div className="flex justify-center items-center">
                <Image className="size-6" src={CoinImg} alt="Moeda girando" />
                <span className="mx-8">100 bilhetes por apenas R$ 9,99</span>
                <Image className="size-6" src={CoinImg} alt="Moeda girando" />
              </div>
            }
          />
          <Button
            label={`+${Math.floor(20 / promoValue).toFixed(0)}`}
            variant="info"
            onClick={() => setQtd((prevState) => prevState + 20 / promoValue)}
          />
          <Button
            label={`+${Math.floor(50 / promoValue).toFixed(0)}`}
            variant="info"
            onClick={() => setQtd((prevState) => prevState + 50 / promoValue)}
          />
          <Button
            label={`+${Math.floor(100 / promoValue).toFixed(0)}`}
            variant="info"
            onClick={() => setQtd((prevState) => prevState + 100 / promoValue)}
          />
          <Button
            label={`+${Math.floor(200 / promoValue).toFixed(0)}`}
            variant="info"
            onClick={() => setQtd((prevState) => prevState + 200 / promoValue)}
          />
        </div>
        <div className="flex flex-col mt-8 gap-2">
          <div className="flex items-center gap-2">
            <Button
              label={<MinusIcon className="size-9 text-yellow-300" />}
              variant="warning"
              customClass="rounded-full"
              onClick={() =>
                setQtd((prevState) => {
                  const total = prevState - 1
                  if (total >= 0) return total
                  return 0
                })
              }
            />
            <Input
              label=""
              value={qtd}
              defaultValue={qtd}
              type="number"
              onValueChange={(e) => {
                if (e.floatValue) setQtd(e.floatValue)
              }}
              className="w-full border-[1px] rounded-full border-primary-400 h-12 !text-2xl text-center text-primary-400 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            />
            <Button
              label={<PlusIcon className="size-9 text-yellow-300" />}
              variant="warning"
              customClass="rounded-full"
              onClick={() => setQtd((prevState) => prevState + 1)}
            />
          </div>
          <div className="flex items-center gap-4 justify-center rounded-full h-12 border-2 border-secondary-500 w-full max-w-[630px] p-3">
            <div className="font-semibold text-lg">
              {qtd} x {formatValue(value)}
            </div>
            <span className="font-semibold text-lg">=</span>
            <div className="text-white sm:text-2xl md:text-4xl font-bold">
              {formatValue(value * qtd)}
            </div>
          </div>
          <Button
            className="mt-1 font-semibold rounded-[50px] bg-secondary-500 hover:bg-secondary-500 shadow-sm animate-pulse h-14 text-xl text-primary-700"
            label="Quero Participar!!"
          />
        </div>
      </div>
    </>
  )
}
