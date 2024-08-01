'use client'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { toast } from 'react-toastify'
import { api } from '@/api'
import { LoginResponse } from '@/types/LoginResponse'
import { useCookies } from 'react-cookie'

const registerFormSchema = z.object({
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
  last_name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'Email inválido' }),
  cpf: z.string().refine((value) => cpfValidator.isValid(value), {
    message: 'CPF Inválido',
  }),
})

type registerFormData = z.infer<typeof registerFormSchema>

interface LoginModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}
export function LoginModal({ open, setOpen }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [cellphoneError, setCellphoneError] = useState<string>('')
  const [cellphone, setCellphone] = useState<string>('')
  const [, setCookies] = useCookies(['token'])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const hasCellphone = () => {
    return cellphone !== undefined && cellphone !== ''
  }

  const handleContinue = async () => {
    if (!hasCellphone()) {
      setCellphoneError('Campo Obrigatório')
      return
    }
    try {
      const response = await api.post<LoginResponse>('/user/auth/login', {
        phone_number: cellphone,
      })
      if (response.data.message) {
        setIsRegister(true)
        return
      }
      setCookies('token', response.data.token)
      toast.success('Login efetuado com sucesso')
      setOpen(false)
    } catch (error) {
      toast.error('Erro ao efetuar o cadastro')
    }
  }

  const handleRegister = async (data: registerFormData) => {
    if (!hasCellphone()) {
      setCellphoneError('Campo Obrigatório')
      return
    }
    try {
      const response = await api.post<LoginResponse>('/user/auth/login', {
        phone_number: cellphone,
        name: data.name,
        last_name: data.last_name,
        cpf: data.cpf,
        email: data.email,
      })
      setCookies('token', response.data.token)
      toast.success('Cadastro efetuado com sucesso')
      setOpen(false)
    } catch (error) {
      toast.error('Erro ao efetuar o cadastro')
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Login">
      <form onSubmit={handleSubmit(handleRegister)}>
        <Input
          type="tel"
          label="Celular"
          placeholder="Digite seu celular com DDD"
          required
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          errorMessage={cellphoneError}
        />
        {isRegister && (
          <>
            <div className="flex gap-2">
              <Input
                label="Nome"
                placeholder="Digite seu nome"
                required
                errorMessage={errors.name?.message}
                register={register('name')}
              />
              <Input
                label="Sobrenome"
                placeholder="Digite seu sobrenome"
                required
                errorMessage={errors.last_name?.message}
                register={register('last_name')}
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              required
              errorMessage={errors.email?.message}
              register={register('email')}
            />
            <Input
              label="CPF"
              type="cpf"
              placeholder="Digite seu CPF"
              required
              errorMessage={errors.cpf?.message}
              register={register('cpf')}
            />
          </>
        )}
        {!isRegister && (
          <Button type="button" label="Continuar" onClick={handleContinue} />
        )}
        {isRegister && <Button type="submit" label="Registrar-se" />}
      </form>
    </Modal>
  )
}
