import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";

class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateUserDTO) {
    const deliveryman = await prisma.deliveryman.findUnique({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new AppError('Invalid username or password!')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new AppError('Invalid username or password!')
    }

    const token = sign({ username }, String(process.env.TOKEN_DELIVERYMAN_SECRET_KEY), {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateDeliverymanUseCase }