import { useMask } from '@react-input/mask'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface MaskInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegisterReturn<string>
}

export function MaskInput(props: MaskInputProps) {
  const cellPhone = '(__) _____-____'
  const inputRef = useMask({
    mask: cellPhone,
    replacement: { _: /\d/ },
  })

  const { ref = () => {}, ...rest } = props.register || {}

  return (
    <input
      ref={(e) => {
        ref(e)
        inputRef.current = e
      }}
      {...rest}
      {...props}
    />
  )
}
