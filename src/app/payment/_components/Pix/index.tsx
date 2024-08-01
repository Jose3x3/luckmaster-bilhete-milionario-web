'use client'
import QRCode from 'qrcode.react'

interface PixProps {
  pix: string
}

export function Pix({ pix }: PixProps) {
  return <QRCode value={pix} size={256} />
}
