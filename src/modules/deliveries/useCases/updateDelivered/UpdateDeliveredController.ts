import { Request, Response } from "express";
import { UpdateDeliveredUseCase } from "./UpdateDeliveredUseCase";

class UpdateDeliveredController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request

    const updateDeliveredUseCase = new UpdateDeliveredUseCase()

    const delivery = await updateDeliveredUseCase.execute({
      deliverymanId
    })

    return response.status(200).json({
      message: 'Success',
      delivery,
    })
  }
}

export { UpdateDeliveredController }