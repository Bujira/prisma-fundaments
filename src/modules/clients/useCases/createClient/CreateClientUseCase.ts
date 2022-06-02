
import { Client } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";

class CreateClientUseCase {
  async execute({ username, password }: ICreateClientDTO): Promise<Client> {
    const clientExists = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      }
    })

    if (clientExists) {
      throw new AppError('Client already exists!')
    }

    const passwordHash = await hash(password, 10)

    const client = await prisma.client.create({
      data: {
        username,
        password: passwordHash,
      }
    })

    return client
  }
}

export { CreateClientUseCase }