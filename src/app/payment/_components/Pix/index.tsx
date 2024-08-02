'use client'
import QRCode from 'qrcode.react'
import { usePayment } from '@/providers/payment'

interface PixProps {
  pix: string
}

export function Pix({ pix }: PixProps) {
  const { status } = usePayment()
  if (status === 'CONCLUIDA') return <></>
  return <QRCode value={pix} size={256} />
}
