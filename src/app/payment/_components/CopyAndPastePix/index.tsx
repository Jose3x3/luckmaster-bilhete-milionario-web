'use client'
import { Button } from '@/components/Button'
import { toast } from 'react-toastify'
import { Input } from '@/components/Input'
import { formatValue } from '@/utils'
import { usePayment } from '@/providers/payment'
import { useRouter } from 'next/navigation'

interface CopyAndPastePixProps {
  pix: string
  value: number
  token: string
}

export function CopyAndPastePix({ pix, value }: CopyAndPastePixProps) {
  const { status } = usePayment()
  const router = useRouter()

  const copyPaste = () => {
    navigator.clipboard.writeText(pix)
    toast.success('Chave pix copiada com sucesso')
  }

  const handleTickets = () => {
    router.push('/tickets')
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
