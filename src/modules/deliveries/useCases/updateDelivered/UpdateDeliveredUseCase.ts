import { Delivery } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { IUpdateDeliveredDTO } from "../../dtos/IUpdateDeliveredDTO";

class UpdateDeliveredUseCase {
  async execute({ deliverymanId }: IUpdateDeliveredDTO): Promise<Delivery> {
    const deliveryExists = await prisma.delivery.findFirst({
      where: {
        deliverymanId
      }
    })

    if (!deliveryExists) {
      throw new AppError('Deliveryman has no deliveries!')
    }

    const id = deliveryExists.id

    const delivery = await prisma.delivery.update({
      where: {
        id,
      },
      data: {
        deliveredAt: new Date(),
        updatedAt: new Date()
      },
    })

    return delivery
  }
}

export { UpdateDeliveredUseCase }