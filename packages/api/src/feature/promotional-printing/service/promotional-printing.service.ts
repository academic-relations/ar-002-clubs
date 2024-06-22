import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import { PromotionalPrintingOrderSizeRepository } from "../repository/promotional-printing-order-size.repository";
import { PromotionalPrintingOrderRepository } from "../repository/promotional-printing-order.repository";

@Injectable()
export class PromotionalPrintingService {
  constructor(
    private readonly promotionalPrintingOrderRepository: PromotionalPrintingOrderRepository,
    private readonly promotionalPrintingOrderSizeRepository: PromotionalPrintingOrderSizeRepository,
  ) {}

  async getStudentPromotionalPrintingsOrders(
    query: ApiPrt001RequestQuery,
  ): Promise<ApiPrt001ResponseOk> {
    const numberOfOrders =
      await this.promotionalPrintingOrderRepository.countByCreatedAtIn(
        query.startDate,
        query.endDate,
      );

    const orders =
      await this.promotionalPrintingOrderRepository.getStudentPromotionalPrintingsOrders(
        query.clubId,
        query.pageOffset,
        query.itemCount,
        query.startDate,
        query.endDate,
      );

    const ordersWithSizes = await Promise.all(
      orders.map(async row => ({
        ...row,
        orders:
          await this.promotionalPrintingOrderSizeRepository.findPromotionalPrintingOrderSizeBypromotionalPrintingOrderId(
            row.id,
          ),
      })),
    );

    if (
      numberOfOrders === undefined ||
      orders === undefined ||
      ordersWithSizes === undefined
    ) {
      throw new HttpException(
        "[getStudentPromotionalPrintingsOrders] Error occurs while getting orders",
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      items: ordersWithSizes,
      offset: query.pageOffset,
      total: numberOfOrders,
    };
  }
}
