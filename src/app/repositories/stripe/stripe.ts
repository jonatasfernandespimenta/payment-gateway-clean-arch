require('dotenv').config()
import Stripe from 'stripe';
import axios from 'axios';

const secretKey: string = process.env.STRIPE_SECRET_KEY ?? "";

export const stripe = new Stripe(secretKey);

export const stripeApi = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});
