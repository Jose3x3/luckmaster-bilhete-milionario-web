'use client'
import Image from 'next/image'
import Logo from '@/assets/imgs/bilhete_milionario.png'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }
  return (
    <nav className="bg-primary-700 flex flex-col justify-between">
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={Logo}
            className="h-14 w-24"
            alt="Bilhete Milionário Logo"
          />
          <span className="self-center text-white text-xl font-semibold whitespace-nowrap dark:text-white">
            Bilhete Milionário
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-language"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-language"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${open ? 'block' : 'hidden'} flex text-white md:block font-semibold mx-6`}
        >
          <span className="cursor-pointer mx-4">Meus Bilhetes</span>
          <span className="cursor-pointer mx-4">Desconectar</span>
        </div>
      </div>
    </nav>
  )
}
