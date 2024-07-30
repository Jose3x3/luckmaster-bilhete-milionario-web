import banner from '@/assets/imgs/banner.jpg'
import Image from 'next/image'
import { Purchase } from '@/app/_components/Purchase'

export default function Home() {
  return (
    <main className="text-white flex min-h-screen flex-col items-center gap-4 md:p-10">
      <div className="max-w-[550px] w-full">
        <div className="bg-white shadow w-full flex flex-col items-center justify-center rounded-t-2xl sm:p-2 md:p-3 ">
          <Image
            className="rounded-2xl h-80 w-auto md:h-96 p-2 md:p-0"
            src={banner}
            alt="Banner"
            priority
          />
        </div>

        <Purchase />
      </div>
    </main>
  )
}
