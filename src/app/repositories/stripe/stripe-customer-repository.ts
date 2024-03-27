import { CustomerRepository } from "../../../domain/payment-gateway/application/repositories/customer-repository";
import { CreateCustomer } from "../../../domain/payment-gateway/enterprise/interfaces/create-customer";
import { Customer } from "../../../domain/payment-gateway/enterprise/interfaces/customer";
import { UpdateCustomer } from "../../../domain/payment-gateway/enterprise/interfaces/update-customer";
import { stripe } from './stripe';

export class StripeCustomerRepository implements CustomerRepository {
  async get(id: string): Promise<Customer | null> {
    try {
      const response = await stripe.customers.retrieve(id);
  
      if(!response.id) {
        return null
      }
  
      if(response.deleted) {
        return null;
      }
  
      return {
        id: response.id,
        birthday: '',
        address: {
          city: response.address?.city || '',
          district: response.address?.postal_code || '',
          number: response.address?.postal_code || '',
          street: response.address?.line1 || '',
          uf: response.address?.state || '',
          zipCode: response.address?.postal_code || '',
          complement: response.address?.line2 || '',
        },
        document: response.metadata?.document || '',
        email: response.email || '',
        name: response.name || '',
        lastName: response.metadata?.lastName || '',
      }
    } catch (error) {
      return null
    }
  };
  
  async save(customer: CreateCustomer): Promise<Customer> {
    const response = await stripe.customers.create({
      name: customer.name,
      email: customer.email,
      metadata: {
        document: customer.document,
        lastName: customer.lastName,
      },
      address: {
        city: customer.address.city,
        country: 'BR',
        line1: customer.address.street,
        line2: customer.address.complement,
        postal_code: customer.address.zipCode,
        state: customer.address.uf,
      }
    });

    return {
      id: response.id,
      birthday: '',
      address: {
        city: response.address?.city || '',
        district: response.address?.postal_code || '',
        number: response.address?.postal_code || '',
        street: response.address?.line1 || '',
        uf: response.address?.state || '',
        zipCode: response.address?.postal_code || '',
        complement: response.address?.line2 || '',
      },
      document: response.metadata?.document || '',
      email: response.email || '',
      name: response.name || '',
      lastName: response.metadata?.lastName || '',
    }
  };

  async update(id: string, customer: UpdateCustomer): Promise<void> {
    await stripe.customers.update(id, {
      ...(customer.name && { name: customer.name }),
      ...(customer.email && { email: customer.email }),
      ...(customer.document && { metadata: { document: customer.document } }),
      ...(customer.lastName && { metadata: { lastName: customer.lastName } }),
      ...(customer.address && {
        address: {
          ...(customer.address.city && { city: customer.address.city }),
          ...(customer.address.street && { line1: customer.address.street }),
          ...(customer.address.complement && { line2: customer.address.complement }),
          ...(customer.address.zipCode && { postal_code: customer.address.zipCode }),
          ...(customer.address.uf && { state: customer.address.uf }),
        }
      })
    })
  };

  async delete(id: string): Promise<void> {
    await stripe.customers.del(id);
  };
}
