'use client'

import { usePayment } from '@/providers/payment'

interface TitleProps {
  pix?: string
}

export function Title({ pix }: TitleProps) {
  const { status } = usePayment()
  const handleTitle = () => {
    if (pix === undefined)
      return (
        <>
          <h1>Pix Expirado</h1>
          <h2 className="font-bold">Tente novamente mais tarde</h2>
        </>
      )
    if (status === 'CONCLUIDA')
      return (
        <>
          <h1>Pagamento Concluído</h1>
        </>
      )
    return (
      <>
        <h1>Aguardando Pagamento</h1>
        <h2 className="font-bold">Não perca tempo!</h2>
      </>
    )
  }
  return <div className="text-xl text-center">{handleTitle()}</div>
}
