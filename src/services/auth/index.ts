import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { api } from '@/api'
import { AxiosResponse, isAxiosError } from 'axios'
import { LoginResponse } from '@/types/LoginResponse'
import { parseJwt } from '@/utils'
import { AccessDenied, AuthError } from '@auth/core/errors'

const errors: Record<number, () => void> = {
  401: () => {
    throw new AccessDenied()
  },
  999: () => {
    throw new AuthError()
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: {
          label: 'phone_number',
          type: 'text',
        },
        name: {
          label: 'name',
          type: 'text',
        },
        last_name: {
          label: 'last_name',
          type: 'text',
        },
        cpf: {
          label: 'cpf',
          type: 'text',
        },
        email: {
          label: 'email',
          type: 'text',
        },
        is_login: {
          label: 'is_login',
          type: 'boolean',
        },
      },
      authorize: async (credentials) => {
        try {
          let response: AxiosResponse<LoginResponse>
          if (credentials.is_login)
            response = await api.post<LoginResponse>('/user/auth/login', {
              phone_number: credentials.phone_number,
            })
          else
            response = await api.post<LoginResponse>('/user/auth/login', {
              phone_number: credentials.phone_number,
              name: credentials.name,
              last_name: credentials.last_name,
              cpf: credentials.cpf,
              email: credentials.email,
            })
          if (response.data.message) return null
          const token = response.data.token
          const user = parseJwt(token)
          if (user) return user
          return null
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            if (error.response) {
              const errorHandler = errors[error.response.status]
              if (errorHandler === undefined) {
                errors[999]()
              }
              errorHandler()
            }
          }
          throw new Error('Erro ao fazer login')
        }
      },
    }),
  ],
  pages: {
    signOut: '/login',
    signIn: '/login',
    error: '/login',
    verifyRequest: '/login',
    newUser: '/app',
  },
})
