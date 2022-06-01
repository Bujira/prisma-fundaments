import { prisma } from "../../../../database/prismaClient";
import { IGetAllPendingResponse } from "../../dtos/IGetAllPendingResponseDTO";

class GetAllPendingUseCase {
  async execute({ page = 1, perPage = 10 }: IGetAllPendingDTO): Promise<IGetAllPendingResponse> {
    const filter = {
      deliveredAt: null,
      deliverymanId: null,
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

    const result: IGetAllPendingResponse = {
      deliveries,
      currentPage,
      totalPages,
      total,
    }

    return result

  }
}

export { GetAllPendingUseCase }