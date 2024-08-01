import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiReg002ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

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

  async postStudentRegistrationClubRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    await this.validateDuplicateRegistration(body.clubId);
    await this.validateClubId(body.clubId, body.registrationTypeEnumId);

    const transformedBody = {
      ...body,
      foundedAt: await this.transformFoundedAt(
        body.foundedAt,
        body.registrationTypeEnumId,
      ),
    };
    // FIXME: 활동 id 검증 로직 필요
    await this.registrationRepository.createRegistration(transformedBody);
    return {};
  }

  async getStudentRegistrationClubRegistrationQualificationRenewal(): Promise<ApiReg002ResponseOk> {
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

  async getStudentRegistrationClubRegistrationQualificationPromotional(): Promise<ApiReg003ResponseOk> {
    const semesterId = await this.clubPublicService.dateToSemesterId(
      new Date(),
    );
    const promAbleList =
      await this.clubPublicService.getEligibleClubsForRegistration(semesterId);
    return {
      clubs: promAbleList,
    };
  }

  async validateReRegistration(body: ApiReg001RequestBody) {
    this.validateDuplicateRegistration(body.clubId);
  }

  async validateClubId(
    clubId: number | undefined,
    registrationTypeEnumId: number,
  ) {
    if (registrationTypeEnumId !== RegistrationTypeEnum.Provisional) {
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

  async validateDuplicateRegistration(clubId: number | undefined) {
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
    const year = foundedAt.getUTCFullYear();
    const month = registrationTypeEnumId === 3 ? foundedAt.getUTCMonth() : 0;
    const day = registrationTypeEnumId === 3 ? 1 : 1;

    // 시간 부분을 00:00:00으로 설정
    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  }
}
