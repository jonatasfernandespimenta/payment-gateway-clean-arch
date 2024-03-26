import { beforeEach, describe, expect, it } from "@jest/globals";
import { CustomerRepository } from "../repositories/customer-repository";
import { DeleteCustomerUseCase } from "./delete-customer-use-case";
import { CustomerBuilder } from "../../test/builders/customer-builder";
import { InMemoryCustomerRepository } from "../../test/repositories/in-memory-customer-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-errorr";

let customerRepository: CustomerRepository;
let sut: DeleteCustomerUseCase;

describe('Delete Customer UseCase', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    sut = new DeleteCustomerUseCase(customerRepository);
  });

  it('Should delete a customer', async () => {
    const newCustomer = new CustomerBuilder().makeSimpleCustomerWithoutId();
    const { id } = await customerRepository.save(newCustomer);

    const result = await sut.execute({ customerId: id });

    expect(result.isRight()).toBeTruthy();
  });

  it('Should return a ResourceNotFoundError if customer does not exist', async () => {
    const result = await sut.execute({ customerId: 'non-existing' });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
})
