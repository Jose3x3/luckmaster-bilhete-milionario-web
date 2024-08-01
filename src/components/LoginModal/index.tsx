'use client'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useState } from 'react'

interface LoginModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}
export function LoginModal({ open, setOpen }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  const handleContinue = () => {
    setIsRegister(true)
  }
  return (
    <Modal open={open} setOpen={setOpen} title="Login">
      <form>
        <Input
          type="tel"
          label="Celular"
          placeholder="Digite seu celular com DDD"
          required
        />
        {isRegister && (
          <>
            <div className="flex gap-2">
              <Input label="Nome" placeholder="Digite seu nome" required />
              <Input
                label="Sobrenome"
                placeholder="Digite seu sobrenome"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              required
            />
            <Input
              label="CPF"
              type="cpf"
              placeholder="Digite seu CPF"
              required
            />
          </>
        )}
        {!isRegister && <Button label="Continuar" onClick={handleContinue} />}
        {isRegister && <Button label="Registrar-se" />}
      </form>
    </Modal>
  )
}
