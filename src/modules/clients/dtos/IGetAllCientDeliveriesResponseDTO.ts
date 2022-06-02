import { Delivery } from "@prisma/client";

type DeliveryResponse = Omit<Delivery,
  'deleted' |
  'deletedAt'
>
interface IGetAllClientDeliveriesResponse {
  deliveries: DeliveryResponse[];
  currentPage?: number;
  totalPages?: number;
  total: number;
}

export { Delivery, IGetAllClientDeliveriesResponse }