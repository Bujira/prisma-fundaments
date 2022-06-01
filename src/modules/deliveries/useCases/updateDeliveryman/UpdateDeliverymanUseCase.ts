import { Delivery } from "@prisma/client"
import { prisma } from "../../../../database/prismaClient"
import { AppError } from "../../../../errors/AppError"
import { IUpdateDeliverymanDTO } from "../../dtos/IUpdateDeliverymanDTO"
import { GetAllPendingUseCase } from "../getAllPending/GetAllPendingUseCase"

class UpdateDeliverymanUseCase {
  async execute({ deliverymanId }: IUpdateDeliverymanDTO): Promise<Delivery> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id: deliverymanId
      }
    })

    const busy = deliveryman?.busy === true

    if (busy) {
      throw new AppError('Deliveryman currently busy!')
    }

    const EMPTY = 0

    const getAllPendingUseCase = new GetAllPendingUseCase()

    const { deliveries } = await getAllPendingUseCase.execute({})

    if (deliveries.length === EMPTY) {
      throw new AppError('No deliveries available at the moment!', 404)
    }

    const id = deliveries[0].id

    const delivery = await prisma.delivery.update({
      where: {
        id
      },
      data: {
        deliverymanId,
        updatedAt: new Date(),
      }
    })

    await prisma.deliveryman.update({
      where: {
        id: deliverymanId
      },
      data: {
        busy: true,
        updatedAt: new Date()
      }
    })

    return delivery
  }
}

export { UpdateDeliverymanUseCase }