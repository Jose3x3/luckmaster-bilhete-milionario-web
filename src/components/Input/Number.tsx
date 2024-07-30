'use client'
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { OnValueChange } from 'react-number-format/types/types'
/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface NumberProps
  extends Omit<
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'value'
    >,
    'defaultValue'
  > {
  defaultValue?: any
  register?: UseFormRegisterReturn<string>
  value?: any
  onValueChange?: OnValueChange
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NumberInput({
  type,
  onValueChange,
  ...restProps
}: NumberProps) {
  return (
    <NumericFormat
      allowNegative={false}
      thousandSeparator={'.'}
      decimalSeparator={','}
      decimalScale={0}
      onValueChange={onValueChange}
      className={restProps.className}
      {...restProps}
    />
  )
}
