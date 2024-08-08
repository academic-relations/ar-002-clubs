import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { ApiReg002ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import { ApiReg003ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import logger from "@sparcs-clubs/api/common/util/logger";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import { ClubRegistrationRepository } from "../repository/club-registration.repository";

@Injectable()
export class ClubRegistrationService {
  constructor(
    private readonly clubRegistrationRepository: ClubRegistrationRepository,
    private clubPublicService: ClubPublicService,
  ) {}

  async postStudentRegistrationClubRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    await this.validateRegistration(body.clubId, body.registrationTypeEnumId);

    const transformedBody = {
      ...body,
      foundedAt: await this.transformFoundedAt(
        body.foundedAt,
        body.registrationTypeEnumId,
      ),
    };

    // TODO: 활동 id 검증 로직 필요
    await this.clubRegistrationRepository.createRegistration(transformedBody);
    return {};
  }

  // 정동아리 재등록 신청
  async getStudentRegistrationClubRegistrationQualificationRenewal(): Promise<ApiReg002ResponseOk> {
    const semesterId = await this.clubPublicService.dateToSemesterId(
      new Date(),
    );
    const reRegAbleList =
      await this.clubPublicService.getClubIdByClubStatusEnumId(
        ClubTypeEnum.Regular,
        semesterId,
      ); // 현재 학기 기준 정동아리 list
    logger.debug(`[getReRegistrationAbleList] semester Id is ${semesterId}`);
    return {
      clubs: reRegAbleList,
    };
  }

  // 정동아리 신규 등록 신청
  async getStudentRegistrationClubRegistrationQualificationPromotional(): Promise<ApiReg003ResponseOk> {
    const semesterId = await this.clubPublicService.dateToSemesterId(
      new Date(),
    );
    const promAbleList =
      await this.clubPublicService.getEligibleClubsForRegistration(semesterId); // 2학기 연속 가동아리, 3학기 이내 정동아리 list
    return {
      clubs: promAbleList,
    };
  }

  async validateRegistration(
    clubId: number | undefined,
    registrationTypeEnumId: number,
  ) {
    if (registrationTypeEnumId === RegistrationTypeEnum.NewProvisional) {
      // 가동아리 신규 신청 시 clubId는 undefined여야 함
      if (clubId !== undefined) {
        throw new HttpException(
          "[postRegistration] invalid club id. club id should be undefined",
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      // 정동아리 재등록/신규 등록, 가동아리 재등록 신청 시 clubId가 정의되어 있어야 함
      if (clubId === undefined) {
        throw new HttpException(
          "[postRegistration] invalid club id. club id should NOT be undefined",
          HttpStatus.BAD_REQUEST,
        );
      }
      switch (registrationTypeEnumId) {
        case RegistrationTypeEnum.Renewal: // 정동아리 재등록 신청
          if (
            !(
              await this.getStudentRegistrationClubRegistrationQualificationRenewal()
            ).clubs.find(club => club.id === clubId)
          ) {
            // clubId가 목록에 포함되지 않았을 때의 처리
            throw new HttpException(
              "The clubId is not eligible for promotional registration",
              HttpStatus.BAD_REQUEST,
            );
          }
          break;
        case RegistrationTypeEnum.Promotional: // 정동아리 신규 등록 신청
          if (
            !(
              await this.getStudentRegistrationClubRegistrationQualificationPromotional()
            ).clubs.find(club => club.id === clubId)
          ) {
            // clubId가 목록에 포함되지 않았을 때의 처리
            throw new HttpException(
              "The clubId is not eligible for promotional registration",
              HttpStatus.BAD_REQUEST,
            );
          }
          break;
        default:
          break;
      }
      await this.validateExistClub(clubId); // 기존에 존재하는지 club 확인
      logger.debug("[postRegistration] club existence checked");
      await this.validateDuplicateRegistration(clubId); // 중복 신청인지 확인
      logger.debug("[postRegistration] registration existence checked");
    }
  }

  async validateDuplicateRegistration(clubId: number) {
    // 신청 ClubId가 중복인지 확인
    const registrationList =
      await this.clubRegistrationRepository.findByClubId(clubId);
    if (registrationList.length === 1) {
      throw new HttpException(
        "[postRegistration] request already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateExistClub(clubId: number) {
    // 신청 ClubId가 기존에 있는지 확인
    const clubList = await this.clubPublicService.getClubByClubId({ clubId });
    if (clubList.length !== 1) {
      throw new HttpException(
        "[postRegistration] club doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async transformFoundedAt(foundedAt: Date, registrationTypeEnumId: number) {
    const year = foundedAt.getUTCFullYear();
    const month =
      registrationTypeEnumId === RegistrationTypeEnum.NewProvisional
        ? foundedAt.getUTCMonth()
        : 0;
    const day =
      registrationTypeEnumId === RegistrationTypeEnum.NewProvisional ? 1 : 1;

    // 시간 부분을 00:00:00으로 설정
    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  }
}
