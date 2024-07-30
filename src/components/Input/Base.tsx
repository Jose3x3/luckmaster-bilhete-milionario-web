import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export interface BaseProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegisterReturn<string>
}

export function BaseInput(props: BaseProps) {
  return <input {...props.register} {...props} />
}
