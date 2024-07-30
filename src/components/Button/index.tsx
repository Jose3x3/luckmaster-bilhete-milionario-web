import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode
  customClass?: string
  Icon?: never
  iconClass?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'default'
    | 'info'
    | 'warning'
}

export function Button({
  label,
  variant = 'primary',
  customClass,
  ...rest
}: ButtonProps) {
  if (variant === 'primary')
    return (
      <button
        className={`flex rounded-md justify-center bg-primary-700 hover:bg-primary-500 w-full px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${customClass}`}
        {...rest}
      >
        {label}
      </button>
    )
  if (variant === 'info')
    return (
      <button
        className={`bg-primary-700 h-16 flex justify-center items-center w-full text-xl font-bold text-white
                hover:bg-primary-500 rounded ${customClass}`}
        {...rest}
      >
        {label}
      </button>
    )
  if (variant === 'warning')
    return (
      <button
        className={`bg-primary-700 size-12 flex items-center text-8xl font-bold hover:bg-primary-500 border-transparent justify-center px-3 py-1.5 leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${customClass}`}
        {...rest}
      >
        {label}
      </button>
    )
}
