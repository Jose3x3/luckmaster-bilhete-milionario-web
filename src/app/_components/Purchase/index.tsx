'use client'
import { Button } from '@/components/Button'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { TicketIcon } from '@heroicons/react/24/solid'
import { Input } from '@/components/Input'
import { useCallback, useEffect, useState } from 'react'
import { formatValue } from '@/utils'
import { Rifa } from '@/types/Rifa'
import { Promotion } from '@/types/Promotion'
import { Modal } from '@/components/Modal'
import { PaymentRequest } from '@/types/PaymentRequest'
import { api } from '@/api'
import { PaymentResponse } from '@/types/PaymentResponse'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { LoginModal } from '@/components/LoginModal'

interface PurchaseProps {
  campaign: Rifa
  promotion: Promotion
  sharedCampaignId: string
}

export function Purchase({
  campaign,
  promotion,
  sharedCampaignId,
}: PurchaseProps) {
  const oldValue = campaign.preco_por_numero
  const promoValue = promotion.valor / promotion.quantidade
  const minQtd = campaign.qntd_min
  const quantities = [20, 50, 100, 200]
  const [qtd, setQtd] = useState(minQtd)
  const [value, setValue] = useState(oldValue)
  const [openPurchase, setOpenPurchase] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [cookies, setCookies] = useCookies(['pix', 'txId', 'value', 'token'])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  useEffect(() => {
    if (qtd >= 100) setValue(promoValue)
    else setValue(oldValue)
  }, [qtd])

  const handleQtdValue = (finalValue: number) => {
    const initialQtd = finalValue / promoValue
    return Math.round(initialQtd / 100) * 100
  }

  const handlePurchase = async (payload: PaymentRequest) => {
    if (qtd < minQtd) {
      toast.info(`A quantidade minima de compra é de ${minQtd}`)
      return
    }
    try {
      const { data: paymentResponse } = await api.post<PaymentResponse>(
        '/payment/new',
        payload,
      )
      const generatedDate = new Date(paymentResponse.data_geracao)
      generatedDate.setMinutes(generatedDate.getMinutes() + 3)
      const maxAge = 180
      const path = '/'
      setCookies('pix', paymentResponse.pix, { maxAge, path })
      setCookies('txId', paymentResponse.txid, { maxAge, path })
      setCookies('value', payload.valor, { maxAge, path })
      const waitTime = 3000
      toast.success('Pix gerado com sucesso, você será redirecionado.', {
        autoClose: waitTime,
      })
      setTimeout(() => {
        router.push(
          '/payment?' +
            createQueryString(
              'generated_date',
              String(generatedDate.getTime()),
            ),
        )
      }, waitTime)
    } catch (error) {
      toast.error('Erro ao gerar pix, por favor consulte o suporte')
    }
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
      <div className="flex flex-col w-full gap-2 rounded p-4 flex bg-white mb-2">
        <h2 className="text-gray-900 font-bold text-xl">
          Promoção por Tempo Limitado!!
        </h2>
        <Button
          label={
            <span className="text !text-gray-900">
              a partir de{' '}
              <span className="font-bold">{promotion.quantidade}</span>{' '}
              bilhetes,{' '}
              <span className="font-bold">{formatValue(promoValue)} </span> cada
            </span>
          }
          variant="other"
          onClick={() => setQtd((prevState) => prevState + 100)}
        />
      </div>
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
            onClick={() => setOpenPurchase(true)}
          />
        </div>
      </div>
      <Modal
        open={openPurchase}
        setOpen={setOpenPurchase}
        title="Deseja continuar?"
      >
        <p className="mt-2 text-sm/6 text-gray-900">
          Você está comprando <span className="font-bold">{qtd} bilhetes</span>{' '}
          por <span className="font-bold">{formatValue(value)}</span> cada, será
          gerado um <span className="font-bold">PIX</span> no valor total de{' '}
          <span className="font-bold">{formatValue(value * qtd)}</span>.
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            customClass="!bg-white hover:!bg-gray-400 hover:!text-white !text-gray-400 !border-2 !border-gray-400"
            onClick={() => setOpenPurchase(false)}
            label="Cancelar"
          />
          <Button
            customClass="!bg-green-500 hover:!bg-green-400"
            onClick={async () => {
              if (!cookies.token) {
                setOpenLoginModal(true)
                return
              }
              await handlePurchase({
                quantidade_numeros: qtd,
                shared_id: sharedCampaignId,
                sorteio_id: '0111de6e-b225-4d13-a906-a523afbff5cc',
                user_id: '01651fe4-d6f1-48a2-9469-ee49ad67e3ea',
                valor: value * qtd,
              })
              setOpenPurchase(false)
            }}
            label="Confirmar"
          />
        </div>
      </Modal>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    </div>
  )
}
