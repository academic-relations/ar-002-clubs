import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiReg005ResponseCreated } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg005";
import {
  ApiReg006ResponseNoContent,
  ApiReg006ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

import { ApiReg007ResponseNoContent } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg007";
import { ApiReg008ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";
import { ApiReg013ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg013";
import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { MemberRegistrationRepository } from "../repository/member-registration.repository";

import type {
  ApiReg019RequestQuery,
  ApiReg019ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg019";
import type {
  ApiReg020RequestQuery,
  ApiReg020ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg020";

interface ApiReg006ResponseType {
  status: number;
  data: ApiReg006ResponseOk | ApiReg006ResponseNoContent;
}
@Injectable()
export class MemberRegistrationService {
  constructor(
    private readonly memberRegistrationRepository: MemberRegistrationRepository,
    private readonly clubPublicService: ClubPublicService,
    private readonly userPublicService: UserPublicService,
  ) {}

  async postStudentMemberRegistration(
    studentId: number,
    clubId: number,
  ): Promise<ApiReg005ResponseCreated> {
    // 현재 회원등록 신청 기간인지 확인하기
    const ismemberRegistrationEvent =
      await this.memberRegistrationRepository.isMemberRegistrationEvent();
    if (!ismemberRegistrationEvent)
      throw new HttpException(
        "Not a member registration event duration",
        HttpStatus.BAD_REQUEST,
      );
    // 해당 학생이 신청 자격이 존재하는지 확인하기
    const cur = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(cur);
    if (semesterId === undefined)
      throw new HttpException(
        "Semester Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const ismemberRegistrationAvailable =
      await this.userPublicService.isNotGraduateStudent(studentId, semesterId);
    if (!ismemberRegistrationAvailable)
      throw new HttpException(
        "Not a member registration available",
        HttpStatus.BAD_REQUEST,
      );

    // 해당 동아리가 존재하는지 확인
    const club = await this.clubPublicService.getClubByClubId({ clubId });
    if (club.length === 0) {
      throw new HttpException("The club does not exist.", HttpStatus.NOT_FOUND);
    }

    // 해당 동아리가 이번 학기에 활동중이어서 신청이 가능한 지 확인
    const clubExistedSemesters =
      await this.clubPublicService.getClubsExistedSemesters({ clubId });
    const isClubOperatingThisSemester = clubExistedSemesters.some(
      semester => semester.id === semesterId,
    );

    if (!isClubOperatingThisSemester) {
      throw new HttpException(
        "The club is not operating in the current semester.",
        HttpStatus.BAD_REQUEST,
      );
    }

    // 이미 해당 동아리에 해당 학생의 반려되지 않은 신청이 존재하는지 확인하기
    const isAlreadyApplied =
      await this.memberRegistrationRepository.getMemberClubRegistrationExceptRejected(
        studentId,
        clubId,
      );
    if (!isAlreadyApplied)
      throw new HttpException("Already applied", HttpStatus.BAD_REQUEST);
    // 동아리 가입 신청
    const createRegistration =
      await this.memberRegistrationRepository.postMemberRegistration(
        studentId,
        clubId,
      );
    return createRegistration;
  }

  async getStudentRegistrationsMemberRegistrationsMy(
    studentId: number,
  ): Promise<ApiReg006ResponseType> {
    const ismemberRegistrationEvent =
      await this.memberRegistrationRepository.isMemberRegistrationEvent();
    if (!ismemberRegistrationEvent)
      return { status: HttpStatus.NO_CONTENT, data: { applies: [] } };
    const result =
      await this.memberRegistrationRepository.getStudentRegistrationsMemberRegistrationsMy(
        studentId,
      );
    return { status: HttpStatus.OK, data: result };
  }

  async deleteStudentRegistrationsMemberRegistration(
    studentId: number,
    applyId: number,
  ): Promise<ApiReg013ResponseOk> {
    const ismemberRegistrationEvent =
      await this.memberRegistrationRepository.isMemberRegistrationEvent();
    if (!ismemberRegistrationEvent)
      throw new HttpException(
        "Not a member registration event duration",
        HttpStatus.BAD_REQUEST,
      );
    const result =
      await this.memberRegistrationRepository.deleteMemberRegistration(
        studentId,
        applyId,
      );
    return result;
  }

  async patchStudentRegistrationsMemberRegistration(
    studentId: number,
    applyId: number,
    clubId: number,
    applyStatusEnumId: number,
  ): Promise<ApiReg007ResponseNoContent> {
    if (
      applyStatusEnumId !== RegistrationApplicationStudentStatusEnum.Approved &&
      applyStatusEnumId !== RegistrationApplicationStudentStatusEnum.Rejected
    )
      throw new HttpException("Invalid status enum", HttpStatus.BAD_REQUEST);
    const isDelegate = await this.clubPublicService.isStudentDelegate(
      studentId,
      clubId,
    );
    if (!isDelegate)
      throw new HttpException("Not a club delegate", HttpStatus.FORBIDDEN);
    const ismemberRegistrationEvent =
      await this.memberRegistrationRepository.isMemberRegistrationEvent();
    if (!ismemberRegistrationEvent)
      throw new HttpException(
        "Not a member registration event duration",
        HttpStatus.BAD_REQUEST,
      );

    const application =
      await this.memberRegistrationRepository.findMemberRegistrationById(
        applyId,
      );
    if (!application) {
      throw new HttpException("Application not found", HttpStatus.NOT_FOUND);
    }

    const applicationStudentId = application.studentId;
    const isAlreadyMember = await this.clubPublicService.isStudentBelongsTo(
      applicationStudentId, // 동아리 가입 신청 내부의 studentId 사용
      clubId,
    );

    if (
      applyStatusEnumId === RegistrationApplicationStudentStatusEnum.Approved
    ) {
      if (isAlreadyMember)
        throw new HttpException(
          "student is already belongs to this club",
          HttpStatus.BAD_REQUEST,
        );
      else
        await this.clubPublicService.addStudentToClub(
          applicationStudentId,
          clubId,
        );
    } else if (
      applyStatusEnumId === RegistrationApplicationStudentStatusEnum.Rejected
    ) {
      const isAplicatedStudentDelegate =
        await this.clubPublicService.isStudentDelegate(
          applicationStudentId,
          clubId,
        );
      if (isAplicatedStudentDelegate)
        throw new HttpException(
          "club delegate cannot be rejected",
          HttpStatus.BAD_REQUEST,
        );
      else
        await this.clubPublicService.removeStudentFromClub(
          applicationStudentId,
          clubId,
        );
    }
    const result =
      await this.memberRegistrationRepository.patchMemberRegistration(
        applyId,
        clubId,
        applyStatusEnumId,
      );
    return result;
  }

  async getStudentRegistrationsMemberRegistrationsClub(
    studentId: number,
    clubId: number,
  ): Promise<ApiReg008ResponseOk> {
    const isDelegate = await this.clubPublicService.isStudentDelegate(
      studentId,
      clubId,
    );
    if (!isDelegate)
      throw new HttpException("Not a club delegate", HttpStatus.FORBIDDEN);
    const ismemberRegistrationEvent =
      await this.memberRegistrationRepository.isMemberRegistrationEvent();
    if (!ismemberRegistrationEvent)
      throw new HttpException(
        "Not a member registration event duration",
        HttpStatus.BAD_REQUEST,
      );
    const result =
      await this.memberRegistrationRepository.getMemberRegistrationClub(clubId);
    return result;
  }

  async getExecutiveRegistrationsMemberRegistrations(param: {
    executiveId: number;
    query: ApiReg020RequestQuery;
  }): Promise<ApiReg020ResponseOk> {
    const semesterId =
      await this.clubPublicService.dateToSemesterId(getKSTDate());
    logger.debug(semesterId);
    const memberRegistrations =
      await this.memberRegistrationRepository.getExecutiveRegistrationsMemberRegistrations(
        {
          clubId: param.query.clubId,
          pageOffset: param.query.pageOffset,
          itemCount: param.query.itemCount,
          semesterId,
        },
      );
    return {
      totalRegistrations: memberRegistrations.length,
      totalWaitings: memberRegistrations.filter(
        e =>
          e.registrationApplicationStudentEnumId ===
          RegistrationApplicationStudentStatusEnum.Pending,
      ).length,
      totalApprovals: memberRegistrations.filter(
        e =>
          e.registrationApplicationStudentEnumId ===
          RegistrationApplicationStudentStatusEnum.Approved,
      ).length,
      totalRejections: memberRegistrations.filter(
        e =>
          e.registrationApplicationStudentEnumId ===
          RegistrationApplicationStudentStatusEnum.Rejected,
      ).length,
      regularMemberRegistrations: memberRegistrations.filter(
        e => e.student.StudentEnumId === 1,
      ).length,
      regularMemberApprovals: memberRegistrations.filter(
        e =>
          e.student.StudentEnumId === 1 &&
          e.registrationApplicationStudentEnumId ===
            RegistrationApplicationStudentStatusEnum.Approved,
      ).length,
      regularMemberWaitings: memberRegistrations.filter(
        e =>
          e.student.StudentEnumId === 1 &&
          e.registrationApplicationStudentEnumId ===
            RegistrationApplicationStudentStatusEnum.Pending,
      ).length,
      regularMemberRejections: memberRegistrations.filter(
        e =>
          e.student.StudentEnumId === 1 &&
          e.registrationApplicationStudentEnumId ===
            RegistrationApplicationStudentStatusEnum.Rejected,
      ).length,
      items: memberRegistrations.map(e => ({
        memberRegistrationId: e.id,
        RegistrationApplicationStudentStatusEnumId:
          e.registrationApplicationStudentEnumId,
        isRegularMemberRegistration: e.student.StudentEnumId === 1,
        student: {
          id: e.student.id,
          studentNumber: e.student.studentNumber,
          name: e.student.name,
          phoneNumber:
            e.student.phoneNumber === null ? undefined : e.student.phoneNumber,
          email: e.student.email,
        },
      })),
      total: memberRegistrations.length,
      offset: param.query.pageOffset,
    };
  }

  /**
   * @description getExecutiveRegistrationsMemberRegistrations의
   * 서비스 진입점입니다.
   * 굉장히 못짠 코드이니 언젠가 누군가 고쳐주세요... 참고하지 말아주세요...
   */
  async getExecutiveRegistrationsMemberRegistrationsBrief(param: {
    executiveId: number;
    query: ApiReg019RequestQuery;
  }): Promise<ApiReg019ResponseOk> {
    const semesterId =
      await this.clubPublicService.dateToSemesterId(getKSTDate());
    logger.debug(semesterId);
    const memberRegistrations =
      await this.memberRegistrationRepository.getExecutiveRegistrationsMemberRegistrationsBrief(
        {
          pageOffset: param.query.pageOffset,
          itemCount: param.query.itemCount,
          semesterId,
        },
      );
    logger.debug(memberRegistrations);
    const clubs = memberRegistrations
      .filter((item, pos) => memberRegistrations.indexOf(item) === pos)
      .map(e => ({
        clubId: e.clubId,
        clubName: e.clubName,
        clubTypeEnumId: e.clubTypeEnumId,
        isPermanent: e.permanent !== null,
        division: e.division,
      }));

    const totalItems = clubs.map(e => ({
      ...e,
      totalRegistrations: memberRegistrations.filter(
        e2 => e2.clubId === e.clubId,
      ).length,
      // 정회원의 enum이 1이라고 가정
      regularMemberRegistrations: memberRegistrations.filter(
        e2 => e2.student.StudentEnumId === 1 && e2.clubId === e.clubId,
      ).length,
      totalApprovals: memberRegistrations.filter(
        e2 =>
          e2.clubId === e.clubId &&
          e2.registrationApplicationStudentEnumId ===
            RegistrationApplicationStudentStatusEnum.Approved,
      ).length,
      regularMemberApprovals: memberRegistrations.filter(
        e2 =>
          e2.student.StudentEnumId === 1 &&
          e2.clubId === e.clubId &&
          e2.registrationApplicationStudentEnumId ===
            RegistrationApplicationStudentStatusEnum.Approved,
      ).length,
    }));

    return {
      total: totalItems.length,
      items: totalItems,
      offset: param.query.pageOffset,
    };
  }
}
