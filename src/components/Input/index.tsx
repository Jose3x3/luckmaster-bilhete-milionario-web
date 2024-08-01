import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { BaseInput } from '@/components/Input/Base'
import { MaskInput } from '@/components/Input/Mask'
import { UseFormRegisterReturn } from 'react-hook-form'
import { NumberInput } from '@/components/Input/Number'
import { OnValueChange } from 'react-number-format/types/types'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  register?: UseFormRegisterReturn<string>
  containerClass?: string
  errorMessage?: string
  onValueChange?: OnValueChange
  type?: 'tel' | 'number' | 'cpf' | 'text' | 'password' | 'email'
}

export function Input({
  label,
  containerClass,
  errorMessage,
  required,
  register,
  onValueChange,
  type = 'text',
  ...rest
}: InputProps) {
  const customClass = `block outline-none w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 ${rest.className}`

  function handleInputs() {
    if (type === 'tel' || type === 'cpf')
      return (
        <MaskInput
          className={customClass}
          register={register}
          type={type}
          {...rest}
        />
      )
    if (type === 'number')
      return (
        <NumberInput
          className={customClass}
          onValueChange={onValueChange}
          register={register}
          {...rest}
        />
      )
    return <BaseInput className={customClass} register={register} {...rest} />
  }

  return (
    <div className={`flex flex-col my-2 w-full ${containerClass}`}>
      <label
        htmlFor={rest.id}
        className="block text-sm font-medium leading-6 text-gray-600"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">{handleInputs()}</div>
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  )
}
