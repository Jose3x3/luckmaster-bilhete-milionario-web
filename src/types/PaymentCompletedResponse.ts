export type PaymentCompletedResponse = {
  pagamento: {
    id: number
    status: string
  } | null
}
