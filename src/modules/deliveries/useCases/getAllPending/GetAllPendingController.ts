import { Request, Response } from "express";
import { GetAllPendingUseCase } from "./GetAllPendingUseCase";

class GetAllPendingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, perPage } = request.query

    const getAllPendingUseCase = new GetAllPendingUseCase()

    const result = await getAllPendingUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
    } as IGetAllPendingDTO)

    return response.status(200).json({
      messsage: 'Success!',
      result,
    })
  }
}

export { GetAllPendingController }