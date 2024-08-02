'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Rifa } from '@/types/Rifa'
import { LoginModal } from '@/components/LoginModal'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  campaign: Rifa
}

export default function Navbar({ campaign }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [cookies, , removeCookie] = useCookies(['token'])
  const router = useRouter()

  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  const signOut = () => {
    localStorage.removeItem('@Code:JWT_TOKEN')
    removeCookie('token')
  }
  return (
    <nav className="flex bg-primary-700 shadow flex-col justify-between shadow">
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={campaign.logo}
            className="h-14 w-auto"
            alt="Bilhete Milionário Logo"
            width={1920}
            height={1080}
            priority
          />
          <span className="self-center text-white text-xl font-semibold whitespace-nowrap dark:text-white">
            {campaign.titulo_pagina}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${open ? 'block' : 'hidden'} flex text-white md:block font-semibold mx-6`}
        >
          {!cookies.token ? (
            <button
              className="cursor-pointer mx-4"
              onClick={() => setOpenLoginModal(true)}
            >
              Entrar/Registrar
            </button>
          ) : (
            <>
              <button
                className="cursor-pointer mx-4"
                onClick={() => {
                  router.push('/tickets')
                }}
              >
                Meus Bilhetes
              </button>

              <button className="cursor-pointer mx-4" onClick={() => signOut()}>
                Desconectar
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
    </nav>
  )
}
