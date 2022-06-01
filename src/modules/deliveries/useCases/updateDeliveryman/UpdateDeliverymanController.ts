import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

class UpdateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()

    const delivery = await updateDeliverymanUseCase.execute({
      deliverymanId
    })

    return response.status(200).json({
      message: 'Success!',
      delivery,
    })
  }
}

export { UpdateDeliverymanController }