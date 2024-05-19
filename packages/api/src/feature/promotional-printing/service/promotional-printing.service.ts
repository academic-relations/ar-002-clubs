import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import type {
  ApiPrt002RequestParam,
  ApiPrt002RequestBody,
  ApiPrt002ResponseCreated,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

import logger from "@sparcs-clubs/api/common/util/logger";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { PromotionalPrintingOrderRepository } from "../repository/promotional-printing-order.repository";
import { PromotionalPrintingOrderSizeRepository } from "../repository/promotional-printing-order-size.repository";

@Injectable()
export class PromotionalPrintingService {
  constructor(
    private readonly clubRepository: ClubRepository,
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

  async postStudentPromotionalPrintingsOrder(
    parameter: ApiPrt002RequestParam & ApiPrt002RequestBody,
  ): Promise<ApiPrt002ResponseCreated> {
    // invalid한 clubdid를 검사하고싶은데, select했을때 해당 clubId가 없으면 무슨일이 일어나는지 잘 모르겠습니다..
    // 일단 clubId가 unique하기에 길이가 1 아니면 0이기는 합니다
    const clubList = await this.clubRepository.findByClubId(parameter.clubId);

    if (clubList.length !== 1) {
      throw new HttpException(
        "[postStudentPromotionalPrintingsOrder] invlaid clubId",
        HttpStatus.BAD_REQUEST,
      );
    }
    logger.debug(
      "[postStudentPromotionalPrintingsOrder] club existence checked",
    );

    // TODO: filelink validation은 어떻게 할까요?
    // TODO: desiredpickuptime이 executive의 근무일, 근무시간과 일치하는지 검사하는 로직이 필요합니다.

    await this.promotionalPrintingOrderRepository.postStudentPromotionalPrintingsOrder(
      parameter,
    );

    return {};
  }
}
