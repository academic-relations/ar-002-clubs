import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import logger from "@sparcs-clubs/api/common/util/logger";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative-d.repository";

import { PromotionalPrintingOrderSizeRepository } from "../repository/promotional-printing-order-size.repository";
import { PromotionalPrintingOrderRepository } from "../repository/promotional-printing-order.repository";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import type {
  ApiPrt002RequestBody,
  ApiPrt002RequestParam,
  ApiPrt002ResponseCreated,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";
import type {
  ApiPrt003RequestParam,
  ApiPrt003ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt003";
import type {
  ApiPrt005RequestQuery,
  ApiPrt005ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";

@Injectable()
export class PromotionalPrintingService {
  constructor(
    private readonly clubRepository: ClubRepository,
    private readonly clubRepresentativeDRepository: ClubRepresentativeDRepository,
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
          await this.promotionalPrintingOrderSizeRepository.findPromotionalPrintingOrderSizeByPromotionalPrintingOrderId(
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

  async getStudentPromotionalPrintingsOrder(
    parameter: ApiPrt003RequestParam,
  ): Promise<ApiPrt003ResponseOk> {
    const mockUpStudentId = 605; // 하승종 Id

    const search = await this.promotionalPrintingOrderRepository.findByOrderId(
      parameter.orderId,
    );

    if (search.length !== 1) {
      throw new HttpException("invalid order id", HttpStatus.BAD_REQUEST);
    }
    const order = search[0];

    // TODO: order.clubsId와 order.studentId 를 통해 조회 권한 확인 필요
    const representatives =
      await this.clubRepresentativeDRepository.findRepresentativeIdListByClubId(
        order.clubId,
      );
    logger.debug(
      `[getStudentPromotionalPrintingsOrder] ${order.clubId}'s current representatives are ${representatives}`,
    );
    if (
      order.studentId !== mockUpStudentId &&
      representatives.find(row => row.studentId === order.studentId) ===
        undefined
    ) {
      throw new HttpException("permission denied", HttpStatus.FORBIDDEN);
    }

    const orders =
      await this.promotionalPrintingOrderSizeRepository.findPromotionalPrintingOrderSizeByPromotionalPrintingOrderId(
        order.id,
      );
    if (orders.length === 0) {
      throw new HttpException(
        "[getStudentPromotionalPrintingsOrder] order exists, but order size not exists",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      order: {
        clubId: order.clubId,
        studentId: order.studentId,
        status: order.promotionalPrintingOrderStatusEnum,
        orders,
        isColorPrint: order.isColorPrint,
        fitPrintSizeToPaper: order.fitPrintSizeToPaper,
        requireMarginChopping: order.requireMarginChopping,
        desiredPickUpDate: order.desiredPickUpTime,
        createdAt: order.createdAt,
      },
    };
  }

  async getStudentPromotionalPrintingsOrdersMy(
    query: ApiPrt005RequestQuery,
  ): Promise<ApiPrt005ResponseOk> {
    const numberOfOrders =
      await this.promotionalPrintingOrderRepository.countByStudentIdAndCreatedAtIn(
        1,
        query.startDate,
        query.endDate,
      );

    const orders =
      await this.promotionalPrintingOrderRepository.getStudentPromotionalPrintingsOrders(
        1,
        query.pageOffset,
        query.itemCount,
        query.startDate,
        query.endDate,
      );

    const ordersWithSizes = await Promise.all(
      orders.map(async row => ({
        ...row,
        orders:
          await this.promotionalPrintingOrderSizeRepository.findPromotionalPrintingOrderSizeByPromotionalPrintingOrderId(
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
