import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  ClubDelegateChangeRequestStatusEnum,
  ClubDelegateEnum,
} from "@sparcs-clubs/interface/common/enum/club.enum";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { ClubDelegateDRepository } from "../repository/club.club-delegate-d.repository";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import type {
  ApiClb008RequestParam,
  ApiClb008ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import type {
  ApiClb011RequestParam,
  ApiClb011ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb011";
import type { ApiClb012RequestParam } from "@sparcs-clubs/interface/api/club/endpoint/apiClb012";
import type {
  ApiClb013RequestParam,
  ApiClb013ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";
import type {
  ApiClb014RequestBody,
  ApiClb014RequestParam,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb014";
import type {
  ApiClb015ResponseNoContent,
  ApiClb015ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

interface ApiClb015ResponseType {
  status: number;
  data: ApiClb015ResponseOk | ApiClb015ResponseNoContent;
}
@Injectable()
export default class ClubDelegateService {
  constructor(
    private clubDelegateDRepository: ClubDelegateDRepository,
    private userPublicService: UserPublicService,
    private clubPublicService: ClubPublicService,
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
          studentNumber: student.number,
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
   * @description putStudentClubDelegate의 서비스 진입점입니다.
   * 동아리 대표자의 변경을 적용합니다.
   */
  async putStudentClubDelegate(param: {
    studentId: number;
    targetStudentId: number;
    clubId: number;
    clubDelegateEnumId: number;
  }): Promise<void> {
    const currentDelegates =
      await this.clubDelegateDRepository.findDelegateByClubId(param.clubId);

    // clubDelegateEnumId가 대표자일 경우, 신청자가 현재 동아리의 대표자가 맞는지 검사합니다.
    // clubDelegateEnumId가 대의원일 경우, 신청자가 현재 동아리의 대의원이 맞는지 검사합니다.
    // 24.09.24 변경사항: 동아리 대표자만 사용 가능하도록 변경합니다.
    const studentStatus = currentDelegates.find(
      e => e.studentId === param.studentId,
    );
    logger.debug(`${studentStatus}`);
    // if (
    //   studentStatus === undefined ||
    //   (param.clubDelegateEnumId === ClubDelegateEnum.Representative &&
    //     studentStatus.ClubDelegateEnumId !== ClubDelegateEnum.Representative)
    // )
    //   throw new HttpException(
    //     "This api is allowed for delegates",
    //     HttpStatus.FORBIDDEN,
    //   );
    if (studentStatus.ClubDelegateEnumId !== ClubDelegateEnum.Representative)
      throw new HttpException(
        "This api is allowed for the club representative",
        HttpStatus.FORBIDDEN,
      );

    // 신청자가 이미 다른 요청을 생성하지 않았는지 검사합니다.
    // 대의원 변경의 경우 요청을 생성하지 않고 바로 변경되기에 항상 통과해야 합니다.
    const requests =
      await this.clubDelegateDRepository.findDelegateChangeRequestByPrevStudentId(
        { studentId: param.studentId },
      );
    if (requests.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (requests.length === 1)
      throw new HttpException(
        "You already made a request",
        HttpStatus.BAD_REQUEST,
      );

    // targetStudent가 현재 대표자로 활동 중인지 검사합니다.
    const targetStatus =
      param.targetStudentId !== 0
        ? await this.clubDelegateDRepository.findDelegateByStudentId(
            param.targetStudentId,
          )
        : [];
    if (targetStatus.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (targetStatus.length === 1)
      throw new HttpException(
        "target student is already delegate",
        HttpStatus.BAD_REQUEST,
      );

    // targetStudent가 이미 다른 요청을 받은 상태인지 검사합니다.
    const targetRequests =
      param.targetStudentId !== 0
        ? await this.clubDelegateDRepository.findDelegateChangeRequestByStudentId(
            {
              studentId: param.targetStudentId,
            },
          )
        : [];
    if (targetRequests.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (targetRequests.length === 1)
      throw new HttpException(
        "Target Student already processing other request",
        HttpStatus.BAD_REQUEST,
      );

    // 대표자 변경 신청의 경우 targetStudentId가 0인지 검사합니다.
    if (
      param.clubDelegateEnumId === ClubDelegateEnum.Representative &&
      param.targetStudentId === 0
    )
      throw new HttpException(
        "representative can;t be empty",
        HttpStatus.BAD_REQUEST,
      );

    // 대의원의 경우 즉시 변경하고, 대표자의 경우 변경 요청을 생성합니다.
    switch (param.clubDelegateEnumId) {
      case ClubDelegateEnum.Representative:
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
        break;
      default:
        if (
          !this.clubDelegateDRepository.updateDelegate({
            clubId: param.clubId,
            clubDelegateEnumId: param.clubDelegateEnumId,
            studentId: param.targetStudentId,
          })
        )
          throw new HttpException(
            "Failed to change delegate",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        break;
    }
  }

  /**
   * @param param ApiClb011RequestParam
   * @param stduentId 조회를 요청한 학생 Id
   *
   * @description getStudentClubDelegateRequests의 서비스 진입점입니다.
   * 동아리 대표자 변경 요청을 조회합니다.
   */
  async getStudentClubDelegateRequests(param: {
    param: ApiClb011RequestParam;
    studentId: number;
  }): Promise<ApiClb011ResponseOk> {
    // clubId 동아리의 현재 대표자와 대의원 목록을 가져옵니다.
    const delegates = await this.clubDelegateDRepository.findDelegateByClubId(
      param.param.clubId,
    );

    logger.debug(`${delegates} ${param.studentId}}`);
    // studentId가 해당 clubId 동아리의 대표자 또는 대의원인지 확인합니다.
    if (delegates.find(e => e.studentId === param.studentId) === undefined)
      throw new HttpException(
        "The api is allowed for delegates",
        HttpStatus.FORBIDDEN,
      );

    const result =
      await this.clubDelegateDRepository.findDelegateChangeRequestByClubId({
        clubId: param.param.clubId,
      });

    const requests = await Promise.all(
      result.map(async e => {
        const student = await this.userPublicService.getStudentById({
          id: e.studentId,
        });
        return {
          studentId: e.studentId,
          studentName: student.name,
          clubDelegateChangeRequestStatusEnumId:
            e.clubDelegateChangeRequestStatusEnumId,
        };
      }),
    );

    return {
      requests,
    };
  }

  /**
   * @param param ApiClb013RequestParam
   * @param studentId 조회를 요청한 학생 Id
   *
   * @description deleteStudentClubDelegateRequests의 서비스 진입점입니다.
   * 학생이 자신이 받은 동아리 대표자 요청이 존재하는지 조회합니다.
   */
  async getStudentClubsDelegatesRequests(param: {
    studentId: number;
    param: ApiClb013RequestParam;
  }): Promise<ApiClb013ResponseOk> {
    const result =
      await this.clubDelegateDRepository.findDelegateChangeRequestByStudentId({
        studentId: param.studentId,
      });

    const resultWithClubInfos = await Promise.all(
      result.map(async e => {
        const club = await this.clubPublicService
          .getClubByClubId({
            clubId: e.clubId,
          })
          .then(arr => {
            if (arr.length !== 1)
              throw new HttpException(
                "unreachable",
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            return arr[0];
          });

        return {
          clubId: e.clubId,
          clubDelegateChangeRequestStatusEnumId:
            e.clubDelegateChangeRequestStatusEnumId,
          prevStudentId: e.prevStudentId,
          clubName: club.name_kr,
        };
      }),
    );

    const requests = await Promise.all(
      resultWithClubInfos.map(async e => {
        const student = await this.userPublicService.getStudentById({
          id: e.prevStudentId,
        });
        return {
          ...e,
          prevStudentName: student.name,
        };
      }),
    );

    return {
      requests,
    };
  }

  async deleteStudentClubDelegateRequests(param: {
    param: ApiClb012RequestParam;
    studentId: number;
  }): Promise<void> {
    // clubId 동아리의 현재 대표자와 대의원 목록을 가져옵니다.
    const delegates = await this.clubDelegateDRepository.findDelegateByClubId(
      param.param.clubId,
    );

    logger.debug(`${delegates} ${param.studentId}}`);
    // studentId가 해당 clubId 동아리의 대표자 인지 확인합니다.
    if (
      delegates.find(
        e => e.studentId === param.studentId && e.ClubDelegateEnumId === 1,
      ) === undefined
    )
      throw new HttpException(
        "The api is allowed for delegates",
        HttpStatus.FORBIDDEN,
      );

    // 대표자 변경 요청을 삭제합니다.
    // 해당 동아리 대표자만이 요청 가능하기에 동시성을 고려하지 않았습니다.
    const requests =
      await this.clubDelegateDRepository.findDelegateChangeRequestByClubId({
        clubId: param.param.clubId,
      });
    const request = requests.find(
      e =>
        e.clubDelegateChangeRequestStatusEnumId ===
        ClubDelegateChangeRequestStatusEnum.Applied,
    );
    if (request === undefined)
      throw new HttpException("No request", HttpStatus.BAD_REQUEST);

    await this.clubDelegateDRepository.deleteDelegatChangeRequestById({
      id: request.id,
    });
  }

  /**
   * @param studentId 조회를 요청한 학생 Id
   * @param param ApiClb014RequestParam
   * @param body ApiClb014RequestBody
   *
   * @description patchStudentClubsDelegatesRequestApprove의 서비스 진입점입니다.
   * 동아리 대표자 변경 요청을 승인합니다.
   */
  async patchStudentClubsDelegatesRequestApprove(param: {
    studentId: number;
    param: ApiClb014RequestParam;
    body: ApiClb014RequestBody;
  }): Promise<void> {
    const request = await this.clubDelegateDRepository
      .findDelegateChangeRequestById({
        id: param.param.requestId,
      })
      .then(arr => {
        if (arr.length !== 1)
          throw new HttpException(
            "unreachable",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        return arr[0];
      });

    // 해당 학생과 매치되는 요청이 맞는지 검사합니다.
    if (request.studentId !== param.studentId)
      throw new HttpException(
        "It seems that target student is not you",
        HttpStatus.BAD_REQUEST,
      );

    // 대표자 변경 요청을 승인합니다.
    if (
      !this.clubDelegateDRepository.updateDelegate({
        clubId: request.clubId,
        clubDelegateEnumId: ClubDelegateEnum.Representative,
        studentId: param.studentId,
      })
    )
      throw new HttpException(
        "Failed to change delegate",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    // 대표자 변경 요청을 승인으로 변경합니다.
    if (
      !this.clubDelegateDRepository.updateClubDelegateChangeRequest({
        id: request.id,
        clubDelegateChangeRequestStatusEnumId:
          ClubDelegateChangeRequestStatusEnum.Approved,
      })
    )
      throw new HttpException(
        "Failed to modify request status",
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

  /**
   * @param studentId 학생 Id
   * @param param
   * @description getStudentClubDelegateCandidates 의 서비스 진입점입니다.
   */
  async getStudentClubDelegateCandidates(param: {
    studentId: number;
    param: ApiClb008RequestParam;
  }): Promise<ApiClb008ResponseOk> {
    // 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    if (param.param.delegateEnumId === ClubDelegateEnum.Representative) {
      const isPresident = await this.clubPublicService.isStudentPresident(
        param.studentId,
        param.param.clubId,
      );
      if (!isPresident)
        throw new HttpException(
          "It seems that you are not a representative of the club",
          HttpStatus.UNAUTHORIZED,
        );
    } else {
      const isDelegate = await this.clubPublicService.isStudentDelegate(
        param.studentId,
        param.param.clubId,
      );
      if (!isDelegate)
        throw new HttpException(
          "It seems that you are not a delegate of the club",
          HttpStatus.UNAUTHORIZED,
        );
    }

    const semesterId =
      await this.clubPublicService.dateToSemesterId(getKSTDate());
    logger.debug(semesterId);
    const result =
      await this.clubDelegateDRepository.selectDelegateCandidatesByClubId({
        clubId: param.param.clubId,
        semesterId,
        filterClubDelegateEnum:
          param.param.delegateEnumId === ClubDelegateEnum.Representative
            ? []
            : [
                ClubDelegateEnum.Representative,
                // ClubDelegateEnum.Delegate1,
                // ClubDelegateEnum.Delegate2,
                param.param.delegateEnumId === ClubDelegateEnum.Delegate1
                  ? ClubDelegateEnum.Delegate2
                  : ClubDelegateEnum.Delegate1,
              ],
      });

    const response = {
      students: result.map(e => ({
        id: e.student.id,
        studentNumber: String(e.student.number),
        name: e.student.name,
        phoneNumber: e.student.phoneNumber,
      })),
    };
    return response;
  }
}
