import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";


class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request
    const { item } = request.body

    const createDeliveryUseCase = new CreateDeliveryUseCase()

    const delivery = await createDeliveryUseCase.execute({
      item,
      clientId,
    })

    return response.status(201).json({
      messsage: 'Success!',
      delivery,
    })
  }
}

export { CreateDeliveryController }