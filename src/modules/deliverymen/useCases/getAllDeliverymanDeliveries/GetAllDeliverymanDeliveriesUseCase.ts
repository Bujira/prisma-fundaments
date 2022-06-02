import { prisma } from "../../../../database/prismaClient";
import { IGetAllDeliverymanDeliveriesDTO } from "../../dtos/IGetAllDeliverymanDeliveriesDTO";
import { IGetAllDeliverymanDeliveriesResponse } from "../../dtos/IGetAllDeliverymanDeliveriesResponseDTO";

class GetAllDeliverymanDeliveriesUseCase {
  async execute({ deliverymanId, page = 1, perPage = 10 }: IGetAllDeliverymanDeliveriesDTO): Promise<IGetAllDeliverymanDeliveriesResponse> {
    const filter = {
      deliverymanId
    }

    const [deliveries, total] = await prisma.$transaction([
      prisma.delivery.findMany({
        where: filter,
        skip: (page && perPage) ? ((page - 1) * perPage) : 0,
        take: (page && perPage) ? perPage : 10,
        orderBy: {
          createdAt: 'asc'
        },
      }),
      prisma.delivery.count({
        where: filter,
      }),
    ])


    const currentPage = page ? page : 1
    const totalPages = total > perPage ? Math.ceil(total / Number(perPage)) : 1

    const result: IGetAllDeliverymanDeliveriesResponse = {
      deliveries,
      currentPage,
      totalPages,
      total,
    }

    return result
  }
}

export { GetAllDeliverymanDeliveriesUseCase }