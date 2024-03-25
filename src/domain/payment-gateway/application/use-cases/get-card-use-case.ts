import { Either, left, right } from "../../../../core/either";
import { Card } from "../../enterprise/interfaces/card";
import { CardRepository } from "../repositories/card-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCardUseCaseProps {
  cardId: string;
}

type GetCardUseCaseResponse = Either<Error, { card: Card }>;

export class GetCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute(props: GetCardUseCaseProps): Promise<GetCardUseCaseResponse> {
    const card = await this.cardRepository.get(props.cardId);

    if (!card) {
      return left(new ResourceNotFoundError())
    }

    return right({ card });
  }
}
