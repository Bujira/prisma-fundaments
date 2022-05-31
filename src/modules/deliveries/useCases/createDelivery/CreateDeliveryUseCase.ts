import { Delivery } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { ICreateDeliveryDTO } from "../../dtos/ICreateDeliveryDTO";

class CreateDeliveryUseCase {
  async execute({
    item,
    clientId,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = await prisma.delivery.create({
      data: {
        item,
        clientId,
      }
    })

    return delivery
  }
}

export { CreateDeliveryUseCase }