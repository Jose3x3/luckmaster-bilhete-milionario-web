import { User } from '@/types/User'

export const formatValue = (
  value: number,
  style: 'currency' | 'unit' | 'decimal' = 'currency',
): string => {
  return value.toLocaleString('pt-br', {
    style,
    currency: 'BRL',
  })
}

export function padNumber(numberStr: string, totalLength: number): string {
  const numZeros = totalLength - numberStr.length
  if (numZeros < 0) return numberStr
  const zeros = '0'.repeat(numZeros)
  return zeros + numberStr
}

export const parseJwt = (token: string): User => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8')
  return JSON.parse(jsonPayload) as User
}
