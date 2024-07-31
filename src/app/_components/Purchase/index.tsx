'use client'
import { Button } from '@/components/Button'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { TicketIcon } from '@heroicons/react/24/solid'
import { Input } from '@/components/Input'
import { useEffect, useState } from 'react'
import { formatValue } from '@/utils'
import { Rifa } from '@/types/Rifa'
import { Promotion } from '@/types/Promotion'

interface PurchaseProps {
  campaign: Rifa
  promotion: Promotion
}

export function Purchase({ campaign, promotion }: PurchaseProps) {
  const oldValue = campaign.preco_por_numero
  const promoValue = promotion.valor / promotion.quantidade
  const minQtd = campaign.qntd_min
  const quantities = [20, 50, 100, 200]
  const [qtd, setQtd] = useState(minQtd)
  const [value, setValue] = useState(oldValue)

  useEffect(() => {
    if (qtd >= 100) setValue(promoValue)
    else setValue(oldValue)
  }, [qtd])

  const handleQtdValue = (finalValue: number) => {
    const initialQtd = finalValue / promoValue
    return Math.round(initialQtd / 100) * 100
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center bg-white w-full rounded-b-md mb-2 gap-2 pb-2">
        <TicketIcon className="text-primary-700 size-7" />
        <h3 className="text-primary-700 bg font-semibold text-md mb">
          Por apenas{' '}
          <span className="bg-primary-700 text-white p-1 rounded">
            {formatValue(oldValue)}
          </span>
        </h3>
      </div>

      <Button
        className="relative w-[98%] mb-2 cursor-pointer font-semibold rounded-md bg-yellow-400 shadow-sm animate-pulse h-16 md:text-xl text-lg text-white"
        label={
          <>
            <span className="block mx-8">
              {promotion.quantidade} bilhetes por apenas{' '}
              {formatValue(promotion.valor)}
            </span>
          </>
        }
        onClick={() => setQtd((prevState) => prevState + 100)}
      />

      <div className="p-4 bg-white shadow rounded-md w-full rounded-b-md">
        <div className="py-4 rounded-md w-full grid grid-cols-4 gap-3 items-center p-1">
          {quantities.map((quantity) => (
            <Button
              label={`+${handleQtdValue(quantity)}`}
              variant="info"
              key={quantity}
              onClick={() =>
                setQtd((prevState) => prevState + handleQtdValue(quantity))
              }
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              label={<MinusIcon className="size-9 text-white" />}
              variant="warning"
              customClass="rounded-full"
              onClick={() =>
                setQtd((prevState) => {
                  const total = prevState - 1
                  if (total < minQtd) return minQtd
                  if (total >= 0) return total
                  return 0
                })
              }
            />
            <Input
              label=""
              defaultValue={minQtd}
              value={qtd}
              type="number"
              maxLength={7}
              onBlur={(e) => {
                const value = Number(e.target.value)
                  ? Number(e.target.value)
                  : 0
                if (value < minQtd) setQtd(() => minQtd)
              }}
              onValueChange={(e) => {
                if (e.floatValue) setQtd(e.floatValue)
              }}
              className="w-full border-[1px] rounded-full border-primary-400 h-12 !text-2xl text-center text-primary-400 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            />
            <Button
              label={<PlusIcon className="size-9 text-white" />}
              variant="warning"
              customClass="rounded-full"
              onClick={() => setQtd((prevState) => prevState + 1)}
            />
          </div>
          <div className="flex items-center flex-wrap gap-4 justify-center rounded-full p-2 bg-primary-700 w-full text-white max-w-[600px] ">
            <div className="font-semibold text-lg">
              {formatValue(qtd, 'decimal')} x {formatValue(value)}
            </div>
            <span className="font-semibold text-lg">=</span>
            <div className="sm:text-2xl md:text-4xl font-bold">
              {formatValue(value * qtd)}
            </div>
          </div>
          <Button
            className="mt-1 font-semibold rounded-[50px] bg-green-500 shadow-sm animate-pulse h-14 text-xl text-white"
            label="Quero Participar!!"
          />
        </div>
      </div>
    </div>
  )
}
