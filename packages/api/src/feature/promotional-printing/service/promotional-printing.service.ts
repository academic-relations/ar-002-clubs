import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type { ApiPrt001RequestQuery } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import { PromotionalPrintingRepository } from "../repository/promotional-printing.repository";

@Injectable()
export class PromotionalPrintingService {
  constructor(
    private readonly promotionalPrintingRepository: PromotionalPrintingRepository,
  ) {}

  async getStudentPromotionalPrintingsOrders(query: ApiPrt001RequestQuery) {
    const orders =
      await this.promotionalPrintingRepository.getPrintingOrderPagination(
        query.clubId,
        query.pageOffset,
        query.itemCount,
        query.startDate,
        query.endDate,
      );

    if (!orders) {
      throw new HttpException(
        "[getStudentPromotionalPrintingsOrders] Error occurs while getting orders",
        HttpStatus.NOT_FOUND,
      );
    }

    return orders;
  }
}
