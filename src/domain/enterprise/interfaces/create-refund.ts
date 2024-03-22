import { Card } from "./card"

export interface CreateRefund {
  amountInCents: number
  paymentId: string
  card: Card
}