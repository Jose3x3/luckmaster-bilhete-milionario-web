import { createContext, ReactNode, useContext, useState } from 'react'

type Payment = {
  status: string
  updateStatus: (status: string) => void
}

const PaymentContext = createContext({} as Payment)

function PaymentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState('PENDING')
  const updateStatus = (value: string) => {
    setStatus(value)
  }
  return (
    <PaymentContext.Provider value={{ status, updateStatus }}>
      {children}
    </PaymentContext.Provider>
  )
}

const usePayment = () => useContext(PaymentContext)

export { PaymentProvider, usePayment }
