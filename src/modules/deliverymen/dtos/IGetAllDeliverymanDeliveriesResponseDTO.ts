import { Delivery } from "@prisma/client";

interface IGetAllDeliverymanDeliveriesResponse {
  deliveries: Delivery[];
  currentPage?: number;
  totalPages?: number;
  total: number;
}

export { IGetAllDeliverymanDeliveriesResponse }