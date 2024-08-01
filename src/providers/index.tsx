'use client'
import { ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <SessionProvider>{children}</SessionProvider>
    </CookiesProvider>
  )
}
