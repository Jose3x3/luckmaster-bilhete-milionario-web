'use client'

import { padNumber } from '@/utils'
import { useTimer } from 'react-timer-hook'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '@/api'
import { PaymentCompletedResponse } from '@/types/PaymentCompletedResponse'

type TimerProps = {
  date: Date
  txId: string
}

export function Timer({ date, txId }: TimerProps) {
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

  const [time, setTime] = useState(180000)
  const [paymentData, setPaymentData] =
    useState<PaymentCompletedResponse | null>(null)

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    setInterval(async () => {
      const { data: paymentCompletedResponse } =
        await api.post<PaymentCompletedResponse>(`/payment/completed/${txId}`)
      setPaymentData(paymentCompletedResponse)

      setTime((prevState) => prevState - 5000)
    }, 5000)
  }, [time])

  useEffect(() => {
    if (paymentData?.payment?.status === 'CONCLUIDA') {
      toast.success('Pagamento concluído')
    }
  }, [paymentData])

  const handleProgressBar = () => {
    const totalSeconds = 180
    return ((remainTimeInSeconds / totalSeconds) * 100).toFixed(2)
  }

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
