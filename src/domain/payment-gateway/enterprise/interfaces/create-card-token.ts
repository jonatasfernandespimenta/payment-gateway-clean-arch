export interface CreateCardToken {
  customerId: string
  brand: string
  country: string
  expMonth: string
  expYear: string
  lastFour: string
  name: string
  funding: 'credit' | 'debit' | 'prepaid' | 'unknown'
  number: string
  cvc: string
}
