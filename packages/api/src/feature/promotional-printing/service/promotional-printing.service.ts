import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import { PromotionalPrintingRepository } from "../repository/promotional-printing.repository";

@Injectable()
export class PromotionalPrintingService {
  constructor(
    private readonly promotionalPrintingRepository: PromotionalPrintingRepository,
  ) {}

  async getStudentPromotionalPrintingsOrders(
    query: ApiPrt001RequestQuery,
  ): Promise<ApiPrt001ResponseOk> {
    const numberOfOrders =
      await this.promotionalPrintingRepository.countByCreatedAtIn(
        query.startDate,
        query.endDate,
      );

    const orders =
      await this.promotionalPrintingRepository.getStudentPromotionalPrintingsOrders(
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
          await this.promotionalPrintingRepository.findPromotionalPrintingOrderSizeBypromotionalPrintingOrderId(
            row.id,
          ),
      })),
    );

    if (!numberOfOrders || !orders || !ordersWithSizes) {
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
