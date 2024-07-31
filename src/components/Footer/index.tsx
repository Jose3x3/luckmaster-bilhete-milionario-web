import { Rifa } from '@/types/Rifa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@/components/Button'
import Image from 'next/image'

interface FooterProps {
  campaign: Rifa
}

export function Footer({ campaign }: FooterProps) {
  const removePhoneMask = () => campaign.celular_suporte.replace(/\D/g, '')
  return (
    <footer className="flex justify-center items-start bg-zinc-800 h-36 p-4 w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-2">
          <a
            href={`https://api.whatsapp.com/send/?phone=55${removePhoneMask()}`}
            target="_blank"
          >
            <Button
              customClass="flex items-center justify-center gap-2 !bg-green-600 hover:!bg-green-500"
              label={
                <>
                  <FontAwesomeIcon
                    className="text-white"
                    size="2xl"
                    icon={faWhatsapp}
                  />
                  <span>Suporte</span>
                </>
              }
            />
          </a>
          <a
            href={`https://www.instagram.com/bilhetemilionario.oficial?igsh=MW9ubGl5bDBzYjRiMA==`}
            target="_blank"
          >
            <Button
              customClass="flex items-center justify-center gap-2 bg-secondary-700 hover:bg-secondary-600"
              label={
                <>
                  <FontAwesomeIcon
                    className="text-white"
                    size="2xl"
                    icon={faInstagram}
                  />
                  <span>Instagram</span>
                </>
              }
            />
          </a>
        </div>
        <Image
          src={campaign.logo}
          className="w-24 h-auto"
          alt="Bilhete Milionário Logo"
          width={1920}
          height={1080}
          priority
        />

        <div className="flex gap-2 text-white">
          <span>Termos de uso</span>
          <span>|</span>
          <span>Política de privacidade</span>
        </div>
      </div>
    </footer>
  )
}
