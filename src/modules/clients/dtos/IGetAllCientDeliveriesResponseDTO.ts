import { Delivery } from "@prisma/client";

interface IGetAllClientDeliveriesResponse {
  deliveries: Delivery[];
  currentPage?: number;
  totalPages?: number;
  total: number;
}

export { IGetAllClientDeliveriesResponse }