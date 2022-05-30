import { Deliveryman } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { ICreateDeliverymanDTO } from "../../dtos/ICreateDeliverymanDTO";

class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliverymanExists = await prisma.deliveryman.findUnique({
      where: {
        username
      }
    })

    if (deliverymanExists) {
      throw new AppError('Deliveryman already exists!')
    }

    const passwordHash = await hash(password, 10)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      }
    })

    return deliveryman
  }
}

export { CreateDeliverymanUseCase }