import { Delivery } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";

interface IGetAllPendingResponse {
  deliveries: Delivery[];
  currentPage: number;
  totalPages: number;
  total: number;
}

class GetAllPendingUseCase {
  async execute({ page, perPage }: IGetAllPendingDTO): Promise<IGetAllPendingResponse> {
    const filter = {
      deliveredAt: null,
    }

    const [deliveries, total] = await prisma.$transaction([
      prisma.delivery.findMany({
        where: filter,
        skip: ((page - 1) * perPage),
        take: perPage,
        orderBy: {
          createdAt: 'asc'
        }
      }),
      prisma.delivery.count({
        where: filter,
      }),
    ])

    const currentPage = page
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