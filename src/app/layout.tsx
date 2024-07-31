import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { api } from '@/api'
import { CampaignResponse } from '@/types/CampaingResponse'
import { Footer } from '@/components/Footer'
import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilhete Milionário',
  description: 'Campanha Bilhete Milionário',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const response = await api.get<CampaignResponse>(
    '/user/find/sharedcampaign/94e57731-e792-4ca2-a74c-31381d1e7dec',
  )
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Navbar campaign={response.data.rifa} />
        {children}
        <Footer campaign={response.data.rifa} />
      </body>
    </html>
  )
}
