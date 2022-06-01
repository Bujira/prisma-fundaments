import { Delivery } from "@prisma/client";

interface IGetAllPendingResponse {
  deliveries: Delivery[];
  currentPage?: number;
  totalPages?: number;
  total: number;
}

export { IGetAllPendingResponse }