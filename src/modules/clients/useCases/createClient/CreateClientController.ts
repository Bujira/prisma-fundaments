import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createclientUseCase = new CreateClientUseCase()

    const result = await createclientUseCase.execute({
      username,
      password,
    })

    return response.status(201).json({
      message: 'Success!',
      result
    })
  }
}

export { CreateClientController }