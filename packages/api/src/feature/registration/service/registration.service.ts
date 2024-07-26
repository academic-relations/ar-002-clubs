import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import logger from "@sparcs-clubs/api/common/util/logger";

import { RegistrationRepository } from "../repository/registration.repository";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

// import type {
//   ApiReg002RequestParam,
//   ApiReg002ResponseOk
// } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async postRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    // clubId가 유효한지 확인
    if (body.clubId) {
      const clubList = await this.registrationRepository.findByClubId(
        body.clubId,
      );

      if (clubList.length !== 1) {
        throw new HttpException(
          "[postRegistration] invalid clubId",
          HttpStatus.BAD_REQUEST,
        );
      }
      logger.debug("[postRegistration] club existence checked");
    }

    await this.registrationRepository.createRegistration(body);

    return {};
  }

  // async getRegistrationAbleList(
  //   parameter: ApiReg002RequestParam,
  // ): Promise<ApiReg002ResponseOk> {
  //   const mockUpStudentId = 605; // 하승종 Id

  //   const search = await this.registrationRepository.findByClubId(
  //     parameter.,
  //   );

  //   if (search.length !== 1) {
  //     throw new HttpException("invalid order id", HttpStatus.BAD_REQUEST);
  //   }
  //   const order = search[0];

  //   // TODO: order.clubsId와 order.studentId 를 통해 조회 권한 확인 필요
  //   const representatives =
  //     await this.clubDelegateDRepository.findRepresentativeIdListByClubId(
  //       order.clubId,
  //     );
  //   logger.debug(
  //     `[getStudentPromotionalPrintingsOrder] ${order.clubId}'s current representatives are ${representatives}`,
  //   );
  //   if (
  //     order.studentId !== mockUpStudentId &&
  //     representatives.find(row => row.studentId === order.studentId) ===
  //       undefined
  //   ) {
  //     throw new HttpException("permission denied", HttpStatus.FORBIDDEN);
  //   }

  //   const orders =
  //     await this.promotionalPrintingOrderSizeRepository.findPromotionalPrintingOrderSizeByPromotionalPrintingOrderId(
  //       order.id,
  //     );
  //   if (orders.length === 0) {
  //     throw new HttpException(
  //       "[getStudentPromotionalPrintingsOrder] order exists, but order size not exists",
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }

  //   return {
  //     // order: {
  //     //   clubId: order.clubId,
  //     //   studentId: order.studentId,
  //     //   status: order.promotionalPrintingOrderStatusEnum,
  //     //   orders,
  //     //   isColorPrint: order.isColorPrint,
  //     //   fitPrintSizeToPaper: order.fitPrintSizeToPaper,
  //     //   requireMarginChopping: order.requireMarginChopping,
  //     //   desiredPickUpDate: order.desiredPickUpTime,
  //     //   createdAt: order.createdAt,
  //     // },
  //   };
  // }
}
