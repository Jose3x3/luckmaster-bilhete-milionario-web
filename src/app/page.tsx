import banner from '@/assets/imgs/banner.jpg'
import Image from 'next/image'
import { Purchase } from '@/app/_components/Purchase'

export default function Home() {
  return (
    <main className="bg-primary-900 text-white flex min-h-screen flex-col items-center gap-4 md:p-10">
      <div className="max-w-[600px]">
        <div className="bg-primary-800 w-full flex flex-col items-center justify-center rounded-t-2xl sm:p-2 md:p-4 ">
          <Image src={banner} alt="Banner" />
        </div>
        <Purchase />
      </div>
    </main>
  )
}
