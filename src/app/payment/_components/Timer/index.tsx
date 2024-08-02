'use client'

import { padNumber } from '@/utils'
import { useTimer } from 'react-timer-hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/api'
import { PaymentCompletedResponse } from '@/types/PaymentCompletedResponse'
import { usePayment } from '@/providers/payment'

type TimerProps = {
  date: Date
  txId: string
  token: string
}

export function Timer({ date, txId, token }: TimerProps) {
  const {
    minutes,
    seconds,
    start,
    totalSeconds: remainTimeInSeconds,
  } = useTimer({
    expiryTimestamp: date,
    onExpire: () =>
      toast.warning(
        'Pix expirado. Se ainda deseja realizar a compra, por favor, gere um novo pagamento.',
      ),
  })

  const { updateStatus, status } = usePayment()

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    const endTime = Date.now() + 3 * 60 * 1000 // 3 minutos a partir de agora

    const fetchData = async () => {
      const { data: paymentCompletedResponse } =
        await api.post<PaymentCompletedResponse>(
          `/payment/completed/${txId}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        )
      console.log(paymentCompletedResponse.pagamento)
      if (paymentCompletedResponse.pagamento !== null)
        updateStatus(paymentCompletedResponse.pagamento.status)
    }
    const startFetching = () => {
      fetchData() // Primeira chamada imediata
      intervalId = setInterval(() => {
        if (Date.now() < endTime) {
          fetchData()
        } else {
          clearInterval(intervalId)
        }
      }, 5000) // 5000 ms = 5 segundos
    }
    startFetching()

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (status === 'CONCLUIDA') {
      toast.success('Pagamento concluído')
    }
  }, [status])

  const handleProgressBar = () => {
    const totalSeconds = 180
    return ((remainTimeInSeconds / totalSeconds) * 100).toFixed(2)
  }

  if (status === 'CONCLUIDA') return <></>
  return (
    <div className="flex flex-col text-gray-900 w-full px-2 py-2">
      <span className="text-sm">Tempo para você pagar acaba em:</span>
      <div className="flex">
        <span className="text-3xl font-bold">
          {padNumber(minutes.toString(), 2)}:
        </span>
        <span className="text-3xl font-bold">
          {padNumber(seconds.toString(), 2)}
        </span>
      </div>
      <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${handleProgressBar()}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
        />
      </div>
    </div>
  )
}
