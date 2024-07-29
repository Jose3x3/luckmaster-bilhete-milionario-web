import Image from 'next/image'
import Banner from '@/assets/imgs/banner.jpg'

export default function Home() {
  return (
    <main className="bg-primary-900 text-white flex min-h-screen flex-col items-center justify-center gap-4 md:p-24">
      <h1 className="font-semibold text-center sm:text-2xl md:text-4xl">
        Em breve, no dia 02/08, a ação terá início.
      </h1>
      <Image
        width={500}
        height={500}
        src={Banner}
        alt="Bilhete Milionário Banner"
      />
    </main>
  )
}
