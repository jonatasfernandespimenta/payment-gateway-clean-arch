import { Card } from "./card"

export interface Refund {
  id: string
  amountInCents: number
  paymentId: string
  card: Card
}
