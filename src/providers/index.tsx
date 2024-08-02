'use client'
import { ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { SessionProvider } from 'next-auth/react'
import { PaymentProvider } from '@/providers/payment'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <SessionProvider>
        <PaymentProvider>{children}</PaymentProvider>
      </SessionProvider>
    </CookiesProvider>
  )
}
