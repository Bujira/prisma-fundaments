import { Delivery } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { IGetAllClientDeliveriesResponse } from "../../dtos/IGetAllCientDeliveriesResponseDTO";
import { IGetAllClientDeliveriesDTO } from "../../dtos/IGetAllClientDeliveriesDTO";

class GetAllClientDeliveriesUseCase {
  async execute({ clientId, page = 1, perPage = 10 }: IGetAllClientDeliveriesDTO): Promise<IGetAllClientDeliveriesResponse> {
    const filter = {
      clientId
    }

    const [deliveries, total] = await prisma.$transaction([
      prisma.delivery.findMany({
        where: filter,
        skip: (page && perPage) ? ((page - 1) * perPage) : 0,
        take: (page && perPage) ? perPage : 10,
        orderBy: {
          createdAt: 'asc'
        }
      }),
      prisma.delivery.count({
        where: filter,
      }),
    ])


    const currentPage = page ? page : 1
    const totalPages = total > perPage ? Math.ceil(total / Number(perPage)) : 1

    const result: IGetAllClientDeliveriesResponse = {
      deliveries,
      currentPage,
      totalPages,
      total,
    }

    return result

  }
}

export { GetAllClientDeliveriesUseCase }