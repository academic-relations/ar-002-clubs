import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiReg002ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

import logger from "@sparcs-clubs/api/common/util/logger";

// import ClubRepository from "@sparcs-clubs/api/feature/club/repository/club.repository";

import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import { RegistrationRepository } from "../repository/registration.repository";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import type { ApiReg003ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    // private readonly clubRepository: ClubRepository,
    private clubPublicService: ClubPublicService,
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
      const clubList = await this.clubPublicService.getClubByClubId({ clubId });
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

  async getReRegistrationAbleList(): Promise<ApiReg002ResponseOk> {
    const semesterId = await this.clubPublicService.dateToSemesterId(
      new Date(),
    );
    const reRegAbleList =
      await this.clubPublicService.getClubIdByClubStatusEnumId(1, semesterId);
    logger.debug(`[getReRegistrationAbleList] semester Id is ${semesterId}`);

    return {
      clubs: reRegAbleList,
    };
  }

  async getPromotionalRegistrationAbleList(): Promise<ApiReg003ResponseOk> {
    const semesterId = await this.clubPublicService.dateToSemesterId(
      new Date(),
    );
    const promAbleList =
      await this.clubPublicService.getEligibleClubsForRegistration(semesterId);
    return {
      clubs: promAbleList,
    };
  }
}
