import { Card } from "./card"
import { PaymentStatus } from "./payment-status-enum"

export interface Payment {
  id: string
  amountInCents: number
  installments: number
  paymentMethod: string
  currency: string
  customerId: string
  pixExpiresAfterSeconds: number
  card?: Card
  orderId: number
  status: PaymentStatus
}
