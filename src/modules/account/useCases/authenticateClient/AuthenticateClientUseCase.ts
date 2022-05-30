import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";

class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateUserDTO) {
    const client = await prisma.client.findUnique({
      where: {
        username
      }
    })

    if (!client) {
      throw new AppError('Invalid client or password!')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new AppError('Invalid client or password!')
    }

    const token = sign({ username }, String(process.env.TOKEN_SECRET_KEY), {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateClientUseCase }