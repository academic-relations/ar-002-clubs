import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiClb008ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { ClubDelegateDRepository } from "../repository/club.club-delegate-d.repository";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import type {
  ApiClb015ResponseNoContent,
  ApiClb015ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

interface ApiClb015ResponseType {
  status: number;
  data: ApiClb015ResponseOk | ApiClb015ResponseNoContent;
}
@Injectable()
export class ClubDelegateService {
  constructor(
    private clubDelegateDRepository: ClubDelegateDRepository,
    private userPublicService: UserPublicService,
  ) {}

  async getStudentClubDelegates(
    param: { studentId: number } & ApiClb006RequestParam,
  ): Promise<ApiClb006ResponseOK> {
    // clubId 동아리의 현재 대표자와 대의원 목록을 가져옵니다.
    const delegates = await this.clubDelegateDRepository.findDelegateByClubId(
      param.clubId,
    );

    // studentId가 해당 clubId 동아리의 대표자 또는 대의원인지 확인합니다.
    if (delegates.find(e => e.studentId === param.studentId) === undefined)
      throw new HttpException(
        "The api is allowed for delegates",
        HttpStatus.FORBIDDEN,
      );

    const delegateInfos = await Promise.all(
      delegates.map(async e => {
        const student = await this.userPublicService.getStudentById({
          id: e.studentId,
        });

        if (student === undefined)
          throw new HttpException(
            "unreachable",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );

        return {
          name: student.name,
          studentId: student.id,
          delegateEnumId: e.ClubDelegateEnumId,
          phoneNumber:
            student.phoneNumber === null
              ? "010-0000-0000"
              : student.phoneNumber,
        };
      }),
    );

    return { delegates: delegateInfos };
  }

  /**
   * @param studentId 신청자 학생 Id
   * @param targetStudentId 변경 대상 학생 Id
   * @param clubId 동아리 Id
   * @param clubDelegateEnumId 대표자 지위 Id
   *
   * @description 동아리 대표자의 변경을 적용합니다.
   */
  async putStudentClubDelegate(param: {
    studentId: number;
    targetStudentId: number;
    clubId: number;
    clubDelegateEnumId: number;
  }) {
    const currentDelegates =
      await this.clubDelegateDRepository.findDelegateByClubId(param.clubId);

    // clubDelegateEnumId가 대표자일 경우, 신청자가 현재 동아리의 대표자가 맞는지 검사합니다.
    // clubDelegateEnumId가 대의원일 경우, 신청자가 현재 동아리의 대의원이 맞는지 검사합니다.
    const studentStatus = currentDelegates.find(
      e => e.studentId === param.studentId,
    );
    if (
      studentStatus === undefined ||
      (param.clubDelegateEnumId === ClubDelegateEnum.Representative &&
        studentStatus.ClubDelegateEnumId !== ClubDelegateEnum.Representative)
    )
      throw new HttpException(
        "This api is allowed for delegates",
        HttpStatus.FORBIDDEN,
      );

    // 신청자가 이미 다른 요청을 생성하지 않았는지 검사합니다.
    const requests =
      await this.clubDelegateDRepository.findDelegateChangeRequestByPrevStudentId(
        { studentId: param.studentId },
      );
    if (requests.length > 1)
      throw new HttpException("unreahable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (requests.length === 1)
      throw new HttpException(
        "You already made a request",
        HttpStatus.BAD_REQUEST,
      );

    // targetStudent가 현재 대표자로 활동 중인지 검사합니다.
    const targetStatus =
      await this.clubDelegateDRepository.findDelegateByStudentId(
        param.targetStudentId,
      );
    if (targetStatus.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (targetStatus.length === 1)
      throw new HttpException(
        "target student is already delegate",
        HttpStatus.BAD_REQUEST,
      );

    // targetStudent가 이미 다른 요청을 받은 상태인지 검사합니다.
    const targetRequests =
      await this.clubDelegateDRepository.findDelegateChangeRequestByStudentId({
        studentId: param.targetStudentId,
      });
    if (targetRequests.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (targetRequests.length === 1)
      throw new HttpException(
        "Target Student already processing other request",
        HttpStatus.BAD_REQUEST,
      );

    if (
      !(await this.clubDelegateDRepository.insertClubDelegateChangeRequest({
        clubId: param.clubId,
        clubDelegateEnumId: param.clubDelegateEnumId,
        studentId: param.studentId,
        targetStudentId: param.targetStudentId,
      }))
    )
      throw new HttpException(
        "Failed to insert request",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  /**
   * @param studentId 신청자 학생 Id
   *
   * @description 동아리 대표자의 변경을 적용합니다.
   */
  // 내가 대표자 또는 대의원으로 있는 동아리의 clubId를 가져옵니다. 대표자 또는 대의원이 아닐 경우 204 No Content를 반환합니다.
  async getStudentClubDelegate(
    studentId: number,
  ): Promise<ApiClb015ResponseType> {
    const result =
      await this.clubDelegateDRepository.findDelegateByStudentId(studentId);

    if (result.length === 0)
      return {
        status: HttpStatus.NO_CONTENT,
        data: {},
      };
    if (result.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    return {
      status: HttpStatus.OK,
      data: {
        clubId: result[0].clubId,
        delegateEnumId: result[0].ClubDelegateEnumId,
      },
    };
  }

  async getStudentClubDelegateCandidates(
    studentId: number,
    clubId: number,
    clubDelegateEnumId: ClubDelegateEnum,
  ): Promise<ApiClb008ResponseOk> {
    const isRepresentative =
      await this.clubDelegateDRepository.isPresidentByStudentIdAndClubId(
        studentId,
        clubId,
      );
    if (!isRepresentative) {
      throw new HttpException(
        "This api is allowed for representatives",
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.clubDelegateDRepository.findDelegateCandidates(
      clubId,
      clubDelegateEnumId,
    );

    return { students: result };
  }
}
