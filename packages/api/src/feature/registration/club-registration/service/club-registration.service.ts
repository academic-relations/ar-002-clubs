import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import type { ApiReg002ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import type { ApiReg003ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import type {
  ApiReg009RequestBody,
  ApiReg009ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import type { ApiReg010ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";
import type { ApiReg011ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import type { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";
import type { ApiReg014ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg014";
import type { ApiReg015ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg015";
import type { ApiReg016ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg016";
import type { ApiReg017ResponseCreated } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg017";
import type { ApiReg018ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg018";
import type { ApiReg021ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg021";
import type { ApiReg022ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg022";
import type {
  ApiReg023RequestParam,
  ApiReg023ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg023";
import type { ApiReg024ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg024";
import { ApiReg025ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg025";
import { IStudent } from "@sparcs-clubs/interface/api/user/type/user.type";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import {
  RegistrationDeadlineEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import DivisionPublicService from "@sparcs-clubs/api/feature/division/service/division.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";

import { ClubRegistrationRepository } from "../repository/club-registration.repository";
import { ClubRegistrationPublicService } from "./club-registration.public.service";

@Injectable()
export class ClubRegistrationService {
  constructor(
    private readonly clubRegistrationRepository: ClubRegistrationRepository,
    private clubPublicService: ClubPublicService,
    private divisionPublicService: DivisionPublicService,
    private filePublicService: FilePublicService,
    private clubRegistrationPublicService: ClubRegistrationPublicService,
  ) {}

  /**
   * @description 동아리 대표자인지 검증하는 로직은 repository쪽에서 진행됩니다.
   */
  async postStudentRegistrationClubRegistration(
    studentId: number,
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    // - 현재 동아리 등록 신청 기간이 맞는지 확인합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [RegistrationDeadlineEnum.ClubRegistrationApplication],
    });
    logger.debug(
      "[postStudentRegistrationClubRegistration] deadline check passed",
    );
    // - 신규 가동아리 신청을 제외하곤 기존 동아리 대표자 또는 대의원의 신청인지 검사합니다.
    // 위 검사는 repository transaction 첫 파트에서 검사됩니다.
    // - 신규 가동아리 신청을 제외하곤 기존 동아리 id를 제출해야 합니다.
    // 위 검사는 REG-001 인터페이스에서 검사합니다
    // - 이미 해당 동아리 id로 신청이 진행중일 경우 신청이 불가합니다.

    // const cur = getKSTDate();
    const cur = new Date("2025-03-01"); // TODO: 테스트용으로 날짜를 지정해뒀는데, 실제 배포 시엔 getKSTDate() 사용
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);
    const clubRegistrationList =
      await this.clubRegistrationRepository.findByClubAndSemesterId(
        body.clubId,
        semesterId,
      );
    if (clubRegistrationList.length !== 0) {
      throw new HttpException(
        "your club request already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const myRegistrationList =
      await this.clubRegistrationRepository.findByStudentAndSemesterId(
        studentId,
        semesterId,
      );
    if (myRegistrationList.length !== 0) {
      throw new HttpException(
        "your request already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    logger.debug(
      `[postRegistration] registration existence checked. ${clubRegistrationList} ${myRegistrationList}`,
    );
    // - foundedAt의 경우 가동아리 신청인 경우 설립연월의 정보가 처리됩니다. 신규등록|재등록인 경우 설립연도만을 처리합니다.
    const transformedBody = {
      ...body,
      foundedAt: await this.transformFoundedAt(
        body.foundedAt,
        body.registrationTypeEnumId,
      ),
    };
    // - 지도교수의 경우 기입시 신청, 미기입시 지도교수 없는 신청으로 처리됩니다.
    // - 존재하는 분과 id인지 검사합니다.
    const validateDivisionId =
      await this.divisionPublicService.findDivisionById(body.divisionId);
    if (!validateDivisionId)
      throw new HttpException("division not found", HttpStatus.NOT_FOUND);
    // - 제출한 file들이 유효한 fileId인지 검사합니다.
    const fileIds = [
      body.activityPlanFileId ? "activityPlanFileId" : null,
      body.clubRuleFileId ? "clubRuleFileId" : null,
      body.externalInstructionFileId ? "externalInstructionFileId" : null,
    ].filter(Boolean);
    await Promise.all(
      fileIds.map(key => this.filePublicService.getFileInfoById(body[key])),
    );
    // - 정동아리 재등록을 제외하고 활동계획서를 받아야합니다.
    await this.validateRegistration(
      studentId,
      body.clubId,
      body.registrationTypeEnumId,
    );

    const result = await this.clubRegistrationRepository.createRegistration(
      studentId,
      semesterId,
      transformedBody,
    );
    return result;
  }

  // 정동아리 재등록 신청
  async getStudentRegistrationClubRegistrationQualificationRenewal(
    studentId: number,
  ): Promise<ApiReg002ResponseOk> {
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [RegistrationDeadlineEnum.ClubRegistrationApplication],
    });
    const cur = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);
    const reRegAbleList =
      await this.clubPublicService.getClubIdByClubStatusEnumId(
        studentId,
        [ClubTypeEnum.Regular],
        semesterId,
      ); // 현재 학기 기준 정동아리 list
    logger.debug(`[getReRegistrationAbleList] semester Id is ${semesterId}`);
    return {
      clubs: reRegAbleList,
    };
  }

  // 가동아리 재등록 신청
  async getStudentRegistrationClubRegistrationQualificationProvisionalRenewal(
    studentId: number,
  ): Promise<ApiReg018ResponseOk> {
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [RegistrationDeadlineEnum.ClubRegistrationApplication],
    });
    const cur = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);
    const reRegAbleList =
      await this.clubPublicService.getClubIdByClubStatusEnumId(
        studentId,
        [ClubTypeEnum.Regular, ClubTypeEnum.Provisional],
        semesterId,
      );
    return {
      clubs: reRegAbleList,
    };
  }

  // 정동아리 신규 등록 신청
  async getStudentRegistrationClubRegistrationQualificationPromotional(
    studentId: number,
  ): Promise<ApiReg003ResponseOk> {
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [RegistrationDeadlineEnum.ClubRegistrationApplication],
    });
    const cur = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);
    const promAbleList =
      await this.clubPublicService.getEligibleClubsForRegistration(
        studentId,
        semesterId,
      ); // 2학기 연속 가동아리, 3학기 이내 정동아리 list

    return {
      clubs: promAbleList,
    };
  }

  /**
   * @description REG-001과 REG-009에서 공통적으로 검사하는 요소들에 대한 검사 메소드입니다.
   */
  private async validateRegistration(
    studentId: number,
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
      // // 정동아리 재등록/신규 등록, 가동아리 재등록 신청 시 clubId가 정의되어 있어야 함
      // if (clubId === undefined) {
      //   throw new HttpException(
      //     "[postRegistration] invalid club id. club id should NOT be undefined",
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      switch (registrationTypeEnumId) {
        case RegistrationTypeEnum.Renewal: // 정동아리 재등록 신청
          if (
            !(
              await this.getStudentRegistrationClubRegistrationQualificationRenewal(
                studentId,
              )
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
              await this.getStudentRegistrationClubRegistrationQualificationPromotional(
                studentId,
              )
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

  /**
   * @param foundedAt 설립일을 Date로 받습니다.
   * @param registrationTypeEnumId 등록 신청 유형에 따라 sanitization의 범위가 바뀝니다.
   * @returns 등록 신청 유형에 맞추어 설립일의 월일을 0으로 sanitizing 하여 리턴합니다.
   */
  private async transformFoundedAt(
    foundedAt: Date,
    registrationTypeEnumId: number,
  ) {
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

  /**
   * @description studentId가 유효한지에 대한 검증은 repository쪽에서 진행됩니다.
   */
  async putStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
    body: ApiReg009RequestBody,
  ): Promise<ApiReg009ResponseOk> {
    // divisionId가 유효한지 확인
    const validateDivisionId =
      await this.divisionPublicService.findDivisionById(body.divisionId);
    if (!validateDivisionId)
      throw new HttpException("division not found", HttpStatus.NOT_FOUND);
    // 각각의 fileid들이 실제로 존재하는지 확인
    const fileIds = [
      body.activityPlanFileId ? "activityPlanFileId" : null,
      body.clubRuleFileId ? "clubRuleFileId" : null,
      body.externalInstructionFileId ? "externalInstructionFileId" : null,
    ].filter(Boolean);
    await Promise.all(
      fileIds.map(key => this.filePublicService.getFileInfoById(body[key])),
    );
    // 동아리 등록 기간인지 확인
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
      ],
    });
    const result =
      await this.clubRegistrationRepository.putStudentRegistrationsClubRegistration(
        studentId,
        applyId,
        body,
      );
    return result;
  }

  /**
   * @description studentId가 유효한지에 대한 검증은 repository쪽에서 진행됩니다.
   */
  async deleteStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
  ): Promise<ApiReg010ResponseOk> {
    // 동아리 신청, 집행부원 피드백, 동아리 수정 기간인지 확인합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
        // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
      ],
    });
    await this.clubRegistrationRepository.deleteStudentRegistrationsClubRegistration(
      studentId,
      applyId,
    );
    return {};
  }

  /**
   * @description studentId가 유효한지에 대한 검증은 repository쪽에서 진행됩니다.
   */
  async getStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
  ): Promise<ApiReg011ResponseOk> {
    // 동아리 신청, 집행부원 피드백, 동아리 수정 기간인지 확인합니다.
    // await this.clubRegistrationPublicService.checkDeadline({
    //   enums: [
    //     RegistrationDeadlineEnum.ClubRegistrationApplication,
    //     // RegistrationDeadlineEnum.ClubRegistrationModification,
    //     // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
    //   ],
    // });
    const result =
      await this.clubRegistrationRepository.getStudentRegistrationsClubRegistration(
        studentId,
        applyId,
      );
    if (result.externalInstructionFile) {
      result.externalInstructionFile.url =
        await this.filePublicService.getFileUrl(
          result.externalInstructionFile.id,
        );
    }
    if (result.clubRuleFile) {
      result.clubRuleFile.url = await this.filePublicService.getFileUrl(
        result.clubRuleFile.id,
      );
    }
    if (result.activityPlanFile) {
      result.activityPlanFile.url = await this.filePublicService.getFileUrl(
        result.activityPlanFile.id,
      );
    }
    return result;
  }

  /**
   * @description studentId가 유효한지에 대한 검증은 repository쪽에서 진행됩니다.
   */
  async getStudentRegistrationsClubRegistrationsMy(
    studentId: number,
  ): Promise<ApiReg012ResponseOk> {
    // 동아리 신청, 집행부원 피드백, 동아리 수정 기간인지 확인합니다.
    // await this.clubRegistrationPublicService.checkDeadline({
    //   enums: [
    //     RegistrationDeadlineEnum.ClubRegistrationApplication,
    //     // RegistrationDeadlineEnum.ClubRegistrationModification,
    //     // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
    //   ],
    // });

    // const cur = getKSTDate();
    const cur = new Date("2025-03-01"); // TODO: 테스트용으로 날짜를 지정해뒀는데, 실제 배포 시엔 getKSTDate() 사용
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);

    const result =
      await this.clubRegistrationRepository.getStudentRegistrationsClubRegistrationsMy(
        studentId,
        semesterId,
      );
    return result;
  }

  async getExecutiveRegistrationsClubRegistrations(
    pageOffset: number,
    itemCount: number,
  ): Promise<ApiReg014ResponseOk> {
    const result =
      await this.clubRegistrationRepository.getRegistrationsClubRegistrations(
        pageOffset,
        itemCount,
      );
    return result;
  }

  async getStudentRegistrationsClubRegistrations(
    pageOffset: number,
    itemCount: number,
  ): Promise<ApiReg024ResponseOk> {
    const result =
      await this.clubRegistrationRepository.getRegistrationsClubRegistrations(
        pageOffset,
        itemCount,
      );
    return result;
  }

  async getExecutiveRegistrationsClubRegistration(
    applyId: number,
  ): Promise<ApiReg015ResponseOk> {
    const result =
      await this.clubRegistrationRepository.getExecutiveRegistrationsClubRegistration(
        applyId,
      );
    if (result.externalInstructionFile) {
      result.externalInstructionFile.url =
        await this.filePublicService.getFileUrl(
          result.externalInstructionFile.id,
        );
    }
    if (result.clubRuleFile) {
      result.clubRuleFile.url = await this.filePublicService.getFileUrl(
        result.clubRuleFile.id,
      );
    }
    if (result.activityPlanFile) {
      result.activityPlanFile.url = await this.filePublicService.getFileUrl(
        result.activityPlanFile.id,
      );
    }
    return result;
  }

  async patchExecutiveRegistrationsClubRegistrationApproval(
    applyId: number,
  ): Promise<ApiReg016ResponseOk> {
    // 동아리 신청, 집행부원 피드백, 동아리 수정 기간인지 확인합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
        // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
      ],
    });
    const result =
      await this.clubRegistrationRepository.patchExecutiveRegistrationsClubRegistrationApproval(
        applyId,
      );
    return result;
  }

  async postExecutiveRegistrationsClubRegistrationSendBack(
    applyId: number,
    executiveId: number,
    comment: string,
  ): Promise<ApiReg017ResponseCreated> {
    // 동아리 신청, 집행부원 피드백, 동아리 수정 기간인지 확인합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
        // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
      ],
    });
    const result =
      await this.clubRegistrationRepository.postExecutiveRegistrationsClubRegistrationSendBack(
        applyId,
        executiveId,
        comment,
      );
    return result;
  }

  /**
   * @param para
   * @description getProfessorRegistrationsClubRegistrationsBrief의 진입점입니다.
   */
  async getProfessorRegistrationsClubRegistrationsBrief(param: {
    professorId: number;
  }): Promise<ApiReg021ResponseOk> {
    const result =
      await this.clubRegistrationRepository.selectRegistrationsAndRepresentativeByProfessorId(
        {
          professorId: param.professorId,
        },
      );
    logger.debug(result);
    const registrations = result.sort((a, b) => {
      if (a.registration.divisionId !== b.registration.divisionId)
        return a.registration.divisionId - b.registration.divisionId;
      return a.registration.clubNameKr > b.registration.clubNameKr ? 1 : -1;
    });
    logger.debug(registrations);
    return {
      items: registrations.map(e => ({
        id: e.registration.id,
        clubId: e.registration.clubId,
        registrationStatusEnumId:
          e.registration.registrationApplicationStatusEnumId,
        division: {
          id: e.registration.divisionId,
          name: e.division.name,
        },
        clubNameKr: e.club.name_kr,
        newClubNameKr: e.registration.clubNameKr,
        clubNameEn: e.club.name_en,
        newClubNameEn: e.registration.clubNameEn,
        student: {
          id: e.student.id,
          studentNumber: e.student.number,
          name: e.student.name,
          phoneNumber: e.student.phoneNumber,
          email: e.student.email,
        },
        professorSignedAt: e.registration.professorApprovedAt,
      })),
    };
  }

  /**
   * @param para
   * @description getProfessorRegistrationsClubRegistration 서비스 진입점입니다.
   */
  async getProfessorRegistrationsClubRegistration(param: {
    registrationId: number;
    professorId: number;
  }): Promise<ApiReg022ResponseOk> {
    // 동아리 등록 기간인지 검사합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
        // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
      ],
    });

    const result =
      await this.clubRegistrationRepository.getProfessorRegistrationsClubRegistration(
        {
          registrationId: param.registrationId,
          professorId: param.professorId,
        },
      );
    const activityPlanFile =
      result.registration.registrationActivityPlanFileId !== null
        ? {
            name: await this.filePublicService
              .getFileInfoById(
                result.registration.registrationActivityPlanFileId,
              )
              .then(e => e.name),
            url: await this.filePublicService.getFileUrl(
              result.registration.registrationActivityPlanFileId,
            ),
          }
        : undefined;
    const clubRuleFile =
      result.registration.registrationClubRuleFileId !== null
        ? {
            name: await this.filePublicService
              .getFileInfoById(result.registration.registrationClubRuleFileId)
              .then(e => e.name),
            url: await this.filePublicService.getFileUrl(
              result.registration.registrationClubRuleFileId,
            ),
          }
        : undefined;
    const externalInstructionFile =
      result.registration.registrationExternalInstructionFileId !== null
        ? {
            name: await this.filePublicService
              .getFileInfoById(
                result.registration.registrationExternalInstructionFileId,
              )
              .then(e => e.name),
            url: await this.filePublicService.getFileUrl(
              result.registration.registrationExternalInstructionFileId,
            ),
          }
        : undefined;

    return {
      id: result.registration.id,
      registrationTypeEnumId:
        result.registration.registrationApplicationTypeEnumId,
      registrationStatusEnumId:
        result.registration.registrationApplicationStatusEnumId,
      clubId: result.registration.clubId,
      clubNameKr: result.club.name_kr,
      clubNameEn: result.club.name_en,
      newClubNameKr: result.registration.clubNameKr,
      newClubNameEn: result.registration.clubNameEn,
      representative: {
        studentNumber: result.student.number,
        name: result.student.name,
        phoneNumber: result.registration.phoneNumber,
      },
      foundedAt: result.registration.foundedAt,
      divisionId: result.registration.divisionId,
      activityFieldKr: result.registration.activityFieldKr,
      activityFieldEn: result.registration.activityFieldEn,
      professor: {
        name: result.professor.name,
        email: result.professor.email,
        professorEnumId: result.professor_t.professorEnum,
      },
      divisionConsistency: result.registration.divisionConsistency,
      foundationPurpose: result.registration.foundationPurpose,
      activityPlan: result.registration.activityPlan,
      activityPlanFile:
        result.registration.registrationActivityPlanFileId !== null
          ? {
              id: result.registration.registrationActivityPlanFileId,
              ...activityPlanFile,
            }
          : undefined,
      clubRuleFile:
        result.registration.registrationClubRuleFileId !== null
          ? {
              id: result.registration.registrationClubRuleFileId,
              ...clubRuleFile,
            }
          : undefined,
      externalInstructionFile:
        result.registration.registrationExternalInstructionFileId !== null
          ? {
              id: result.registration.registrationExternalInstructionFileId,
              ...externalInstructionFile,
            }
          : undefined,
      isProfessorSigned:
        result.registration.professorApprovedAt !== undefined &&
        result.registration.professorApprovedAt !== null,
      updatedAt: result.registration.updatedAt,
      comments: result.comments.map(e => ({
        content: e.content,
        createdAt: e.createdAt,
      })),
    };
  }

  /**
   * @description getProfessorRegistrationsClubRegistrationApproval 의 서비스 진입점입니다.
   */
  async getProfessorRegistrationsClubRegistrationApproval(param: {
    professorId: number;
    param: ApiReg023RequestParam;
  }): Promise<ApiReg023ResponseOk> {
    // 현재 동아리 등록 기간인지 검사합니다.
    await this.clubRegistrationPublicService.checkDeadline({
      enums: [
        RegistrationDeadlineEnum.ClubRegistrationApplication,
        // RegistrationDeadlineEnum.ClubRegistrationModification,
        // RegistrationDeadlineEnum.ClubRegistrationExecutiveFeedback,
      ],
    });

    const registrations =
      await this.clubRegistrationRepository.selectRegistrationsById({
        registrationId: param.param.applyId,
      });
    if (registrations.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (registrations.length === 0)
      throw new HttpException(
        "no such registration-apply",
        HttpStatus.NOT_FOUND,
      );
    // 해당 동아라의 등록 신청서상의 이번학기 지도교수가 professorId와 일치하는지 검사합니다.
    if (registrations[0].professorId !== param.professorId)
      throw new HttpException(
        "It seems that you are not a advisor of the club",
        HttpStatus.BAD_REQUEST,
      );
    // 해당 신청이 서명대기 상태인지 검사합니다. 쿼리가 null을주는것 같아 둘다 넣어두었어요.
    logger.debug(registrations[0].professorApprovedAt);
    if (
      registrations[0].professorApprovedAt !== undefined &&
      registrations[0].professorApprovedAt !== null
    )
      throw new HttpException(
        "It seems already approved",
        HttpStatus.BAD_REQUEST,
      );

    // 동아리 신청에 서명합니다.
    await this.clubRegistrationRepository.updateRegistrationProfessorApprovedAt(
      {
        registrationId: param.param.applyId,
        approvedAt: getKSTDate(),
      },
    );

    return {};
  }

  async getStudentRegistrationsAvailableClub(
    studentId: IStudent["id"],
  ): Promise<ApiReg025ResponseOk> {
    // student 가 delegate 인 동아리 가져오기
    const club =
      await this.clubPublicService.findStudentClubDelegate(studentId);

    const semester = await this.clubPublicService.fetchSemester(
      new Date("2025-03-01"), // TODO: 학기 변경 시 없애는 것으로 수정 필요
    );
    // 없을 경우 return null
    if (!club) return { club: null };

    // 있을 경우 해당 동아리의 이번 등록 여부 조회
    const registrations =
      await this.clubRegistrationRepository.findByClubAndSemesterId(
        club.id,
        semester.id,
      );

    const clubSummaryResponse =
      await this.clubPublicService.makeClubSummaryResponse(club);

    if (registrations.length > 0) {
      return {
        club: {
          ...clubSummaryResponse,
          availableRegistrationTypeEnums: [],
        },
      };
    }

    // 이번 등록이 없을 경우 해당 동아리의 등록 가능한 타입 조회
    const renewalList = (
      await this.getStudentRegistrationClubRegistrationQualificationRenewal(
        studentId,
      )
    ).clubs;
    const provisionalRenewalList = (
      await this.getStudentRegistrationClubRegistrationQualificationProvisionalRenewal(
        studentId,
      )
    ).clubs;
    const promotionalList = (
      await this.getStudentRegistrationClubRegistrationQualificationPromotional(
        studentId,
      )
    ).clubs;

    const availableRegistrationTypeEnums = [
      renewalList.some(e => e.id === club.id)
        ? RegistrationTypeEnum.Renewal
        : null,
      provisionalRenewalList.some(e => e.id === club.id)
        ? RegistrationTypeEnum.ReProvisional
        : null,
      promotionalList.some(e => e.id === club.id)
        ? RegistrationTypeEnum.Promotional
        : null,
    ].filter(Boolean);

    return {
      club: {
        ...clubSummaryResponse,
        availableRegistrationTypeEnums,
      },
    };
  }
}
