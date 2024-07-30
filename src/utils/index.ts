export const formatValue = (
  value: number,
  style: 'currency' | 'unit' | 'decimal' = 'currency',
): string => {
  return value.toLocaleString('pt-br', {
    style,
    currency: 'BRL',
  })
}
