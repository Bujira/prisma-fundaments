import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createclientUseCase = new CreateClientUseCase()

    const client = await createclientUseCase.execute({
      username,
      password,
    })

    return response.status(201).json({
      message: 'Success!',
      client
    })
  }
}

export { CreateClientController }