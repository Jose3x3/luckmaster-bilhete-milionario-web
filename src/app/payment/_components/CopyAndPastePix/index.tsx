'use client'
import { Button } from '@/components/Button'
import { toast } from 'react-toastify'
import { Input } from '@/components/Input'
import { formatValue } from '@/utils'
import { usePayment } from '@/providers/payment'

interface CopyAndPastePixProps {
  pix: string
  value: number
  token: string
}

export function CopyAndPastePix({ pix, value, token }: CopyAndPastePixProps) {
  const { status } = usePayment()
  const copyPaste = () => {
    navigator.clipboard.writeText(pix)
    toast.success('Chave pix copiada com sucesso')
  }

  const handleTickets = () => {
    localStorage.setItem('@Code:JWT_TOKEN', token)
    window.location.href =
      'https://www.luckmastersorteio.com.br/campaign/bilhetes'
  }
  if (status === 'CONCLUIDA')
    return (
      <>
        <Button label="Meus Bilhetes" onClick={handleTickets} />
      </>
    )
  return (
    <>
      <h4 className="text-center">
        <span className="font-bold">Valor: </span>
        {formatValue(value)}
      </h4>
      <Input label="" value={pix} errorMessage="" />
      <Button label="Copiar código Pix" onClick={copyPaste} />
    </>
  )
}
