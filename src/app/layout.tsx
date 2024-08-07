import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ToastContainer } from 'react-toastify'
import { Providers } from '@/providers'
import { getAllCampaignsByShareId } from '@/app/actions'

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
  const campaign = await getAllCampaignsByShareId(
    '037472c3-b0c7-4a87-a121-84089d8cbd09',
  )
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col h-screen justify-between">
            <Navbar campaign={campaign.rifa} />
            {children}
            <Footer campaign={campaign.rifa} />
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
