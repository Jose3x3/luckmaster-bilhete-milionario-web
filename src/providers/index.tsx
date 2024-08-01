'use client'
import { ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'

export function Providers({ children }: { children: ReactNode }) {
  return <CookiesProvider>{children}</CookiesProvider>
}
