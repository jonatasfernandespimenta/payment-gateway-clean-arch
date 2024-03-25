import { describe, expect, it, beforeEach } from '@jest/globals';

import { CustomerRepository } from '../repositories/customer-repository';
import { UpdateCustomerUseCase } from './update-customer-use-case';
import { InMemoryCustomerRepository } from '../../test/repositories/in-memory-customer-repository';
import { CustomerBuilder } from '../../test/builders/customer-builder';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-errorr';

let customerRepository: CustomerRepository;
let sut: UpdateCustomerUseCase;

describe('Update Customer UseCase', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    sut = new UpdateCustomerUseCase(customerRepository);
  });

  it('Should update a customer', async () => {
    const newCustomer = new CustomerBuilder().makeSimpleCustomerWithoutId();
    const { id } = await customerRepository.save(newCustomer);

    const result = await sut.execute({ customerId: id, customer: { name: 'test' } });

    const customer = await customerRepository.get(id);

    expect(result.isRight()).toBeTruthy();
    expect(customer?.name).toBe('test');
    expect(customer?.lastName).toBe(newCustomer.lastName);
  });

  it('Should return a ResourceNotFoundError if customer does not exist', async () => {
    const result = await sut.execute({ customerId: 'non-existing', customer: { name: 'test' } });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  })

  it('Should return a NotAllowedError if customer id does not match', async () => {
    const newCustomer = new CustomerBuilder().makeSimpleCustomerWithoutId();
    await customerRepository.save(newCustomer);

    const result = await sut.execute({ customerId: 'non-existing', customer: { name: 'test' } });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
});
