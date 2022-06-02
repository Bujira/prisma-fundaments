import { Request, Response } from "express";
import { IGetAllDeliverymanDeliveriesDTO } from "../../dtos/IGetAllDeliverymanDeliveriesDTO";
import { GetAllDeliverymanDeliveriesUseCase } from "./GetAllDeliverymanDeliveriesUseCase";

class GetAllDeliverymanDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request
    const { page, perPage } = request.query

    const getAllDeliverymanDeliveriesUseCase = new GetAllDeliverymanDeliveriesUseCase()

    const deliveries = await getAllDeliverymanDeliveriesUseCase.execute({
      deliverymanId,
      page: Number(page),
      perPage: Number(perPage),
    } as IGetAllDeliverymanDeliveriesDTO)

    return response.status(200).json({
      message: 'Success!',
      deliveries,
    })
  }
}

export { GetAllDeliverymanDeliveriesController }