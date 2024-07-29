import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import logger from "@sparcs-clubs/api/common/util/logger";

import ClubRepository from "@sparcs-clubs/api/feature/club/repository/club.repository";

import { RegistrationRepository } from "../repository/registration.repository";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

// import {
//   ApiReg002RequestQuery,
//   ApiReg002ResponseOk
// } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly clubRepository: ClubRepository,
  ) {}

  async postRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    await this.validateDupelicateRegistration(body.clubId);
    await this.validateClubId(body.clubId, body.registrationTypeEnumId);

    // FIXME: 설립연도/연월은 지원 타입에 따라 변환될 필요가 있지만 no-param-reassign 문제가 있음. front에서 변환하나?
    // body.foundedAt = this.transformFoundedAt(body.foundedAt, body.registrationTypeEnumId);

    // FIXME: 활동 id 검증 로직 필요
    await this.registrationRepository.createRegistration(body);
    return {};
  }

  async validateReRegistration(body: ApiReg001RequestBody) {
    this.validateDupelicateRegistration(body.clubId);
  }

  async validateClubId(
    clubId: number | undefined,
    registrationTypeEnumId: number,
  ) {
    if (registrationTypeEnumId !== 3) {
      // club Id가 유효한지 확인
      const clubList = await this.clubRepository.findByClubId(clubId);
      if (clubList.length !== 1) {
        throw new HttpException(
          "[postRegistration] club doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      logger.debug("[postRegistration] club existence checked");
    } else if (clubId !== undefined) {
      // 가동아리 신청시 club id undefined check
      throw new HttpException(
        "[postRegistration] invalid club id. club id should be undefined",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateDupelicateRegistration(clubId: number | undefined) {
    if (clubId !== undefined) {
      // 신청 Id가 유효한지 확인
      const registrationList =
        await this.registrationRepository.findByClubId(clubId);

      if (registrationList.length === 1) {
        throw new HttpException(
          "[postRegistration] request already exists",
          HttpStatus.BAD_REQUEST,
        );
      }
      logger.debug("[postRegistration] registration existence checked");
    }
  }

  async transformFoundedAt(foundedAt: Date, registrationTypeEnumId: number) {
    let transformFoundedAt;
    if (registrationTypeEnumId === 3) {
      transformFoundedAt = `${foundedAt.getFullYear()}-${String(foundedAt.getMonth() + 1).padStart(2, "0")}`;
    } else {
      transformFoundedAt = new Date(foundedAt).getFullYear();
    }
    return transformFoundedAt;
  }

  // async getReRegistrationAbleList(
  //   parameter: ApiReg002RequestQuery,
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
  //     clubs: {
  //       clubId: clubs.clubId,
  //     },
  //   };
  // }
}
