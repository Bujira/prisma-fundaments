import { Request, Response } from "express";
import { IGetAllClientDeliveriesDTO } from "../../dtos/IGetAllClientDeliveriesDTO";
import { GetAllClientDeliveriesUseCase } from "./GetAllClientDeliveriesUseCase";

class GetAllClientDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request
    const { page, perPage } = request.query

    const getAllClientDeliveriesUseCase = new GetAllClientDeliveriesUseCase()

    const deliveries = await getAllClientDeliveriesUseCase.execute({
      clientId,
      page: Number(page),
      perPage: Number(perPage),
    } as IGetAllClientDeliveriesDTO)

    return response.status(200).json({
      message: 'Success!',
      deliveries,
    })
  }
}

export { GetAllClientDeliveriesController }