export type PaymentCompletedResponse = {
  payment: {
    id: number
    status: string
  } | null
}
