import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiAct007RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";
import {
  ApiAct008RequestBody,
  ApiAct008RequestParam,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";
import { ActivityDeadlineEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";

import ActivityActivityTermRepository from "../repository/activity.activity-term.repository";
import ActivityRepository from "../repository/activity.repository";

import type { ApiAct001RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import type { ApiAct002ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import type {
  ApiAct003RequestBody,
  ApiAct003RequestParam,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";
import type { ApiAct005ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";
import type {
  ApiAct011RequestQuery,
  ApiAct011ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import type {
  ApiAct012RequestQuery,
  ApiAct012ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct012";
import type {
  ApiAct013RequestQuery,
  ApiAct013ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct013";

@Injectable()
export default class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityActivityTermRepository: ActivityActivityTermRepository,
    private clubPublicService: ClubPublicService,
    private filePublicService: FilePublicService,
  ) {}

  /**
   * @param activityId 활동 id
   * @returns 해당id의 활동이 존재할 경우 그 정보를 리턴합니다.
   * 존재하지 않을 경우 not found exception을 throw합니다.
   */
  private async getActivity(param: { activityId: number }) {
    const activities = await this.activityRepository.selectActivityByActivityId(
      param.activityId,
    );
    if (activities.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (activities.length === 0)
      throw new HttpException("No such activity", HttpStatus.NOT_FOUND);

    return activities[0];
  }

  /**
   * @param date 조회하고 싶은 활동기간 내부의 임의 날짜
   * @returns 해당 날짜를 포함하는 활동 기간 정보를 리턴합니다.
   */
  private async getActivityD(param: { date: Date }) {
    const activityDs =
      await this.activityActivityTermRepository.selectActivityDByDate(
        param.date,
      );
    if (activityDs.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (activityDs.length === 0)
      throw new HttpException(
        "ActivityD is not set for today",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return activityDs[0];
  }

  /**
   * @returns 현재 활동보고서를 작성해야 하는 직전학기 정보를 리턴합니다.
   * ex. 현재 겨울학기일 경우, 여름-가을학기 활동기간을 리턴해야 합니다.
   */
  private async getLastActivityD() {
    const today = getKSTDate();
    const [activityD] =
      await this.activityActivityTermRepository.selectLastActivityDByDate(
        today,
      );
    return activityD;
  }

  /**
   * @param studentId 학생 id
   * @param clubId 동아리 id
   * @description 학생이 해당 동아리의 대표자 또는 대의원이 아닌 경우 403 exception을 throw 합니다.
   */
  private async checkIsStudentDelegate(param: {
    studentId: number;
    clubId: number;
  }) {
    if (
      !(await this.clubPublicService.isStudentDelegate(
        param.studentId,
        param.clubId,
      ))
    )
      throw new HttpException(
        "It seems that you are not the delegate of the club.",
        HttpStatus.FORBIDDEN,
      );
  }

  private async checkDeadline(param: { enums: Array<ActivityDeadlineEnum> }) {
    const today = getKSTDate();
    const todayDeadline = await this.activityRepository
      .selectDeadlineByDate(today)
      .then(arr => {
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.BAD_REQUEST,
          );
        return arr[0];
      });
    if (
      param.enums.find(e => Number(e) === todayDeadline.deadlineEnumId) ===
      undefined
    )
      throw new HttpException(
        "Today is not a day for activity deletion",
        HttpStatus.BAD_REQUEST,
      );
  }

  async deleteStudentActivity(activityId: number, studentId: number) {
    const activity = await this.getActivity({ activityId });
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: activity.clubId });
    // 오늘이 활동보고서 작성기간 | 수정기간 | 예외적 작성기간인지 확인합니다.
    await this.checkDeadline({
      enums: [
        ActivityDeadlineEnum.Upload,
        ActivityDeadlineEnum.Modification,
        ActivityDeadlineEnum.Exceptional,
      ],
    });

    if (!(await this.activityRepository.deleteActivity({ activityId }))) {
      throw new HttpException(
        "Something got wrong...",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudentActivities(
    clubId: number,
    studentId: number,
  ): Promise<ApiAct005ResponseOk> {
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId });

    const today = getKSTDate();
    const activityD = await this.getActivityD({ date: today });

    const activities =
      await this.activityRepository.selectActivityByClubIdAndActivityDId(
        clubId,
        activityD.id,
      );

    const result = await Promise.all(
      activities.map(async row => {
        const duration =
          await this.activityRepository.selectDurationByActivityId(row.id);
        return {
          ...row,
          startTerm: duration.reduce(
            (prev, curr) => (prev < curr.startTerm ? prev : curr.startTerm),
            duration[0].startTerm,
          ),
          endTerm: duration.reduce(
            (prev, curr) => (prev > curr.endTerm ? prev : curr.endTerm),
            duration[0].endTerm,
          ),
        };
      }),
    );

    return result.map(row => ({
      id: row.id,
      activityStatusEnumId: row.activityStatusEnumId,
      name: row.name,
      activityTypeEnumId: row.activityTypeEnumId,
      startTerm: row.startTerm,
      endTerm: row.endTerm,
    }));
  }

  async getStudentActivity(
    activityId: number,
    studentId: number,
  ): Promise<ApiAct002ResponseOk> {
    const activity = await this.getActivity({ activityId });

    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: activity.clubId });

    const evidence = await this.activityRepository.selectFileByActivityId(
      activity.id,
    );
    const participants =
      await this.activityRepository.selectParticipantByActivityId(activity.id);
    const duration = await this.activityRepository.selectDurationByActivityId(
      activity.id,
    );

    return {
      clubId: activity.clubId,
      name: activity.name,
      originalName: activity.originalName,
      activityTypeEnumId: activity.activityTypeEnumId,
      location: activity.location,
      purpose: activity.purpose,
      detail: activity.detail,
      evidence: activity.evidence,
      evidenceFiles: evidence.map(e => ({
        uuid: e.fileId,
      })),
      participants: participants.map(e => ({
        studentId: e.studentId,
      })),
      durations: duration.map(e => ({
        startTerm: e.startTerm,
        endTerm: e.endTerm,
      })),
    };
  }

  async postStudentActivity(
    body: ApiAct001RequestBody,
    studentId: number,
  ): Promise<void> {
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: body.clubId });

    // 오늘이 활동보고서 작성기간이거나, 예외적 작성기간인지 확인합니다.
    await this.checkDeadline({
      enums: [ActivityDeadlineEnum.Upload, ActivityDeadlineEnum.Exceptional],
    });
    // QUESTION: 신청내용중 startTerm과 endTerm이 이번 학기의 활동기간에 맞는지 검사해야 할까요?.
    const activityD = await this.getLastActivityD();
    // 현재학기에 동아리원이 아니였던 참가자가 있는지 검사합니다.
    const participantIds = await Promise.all(
      body.participants.map(async e => {
        if (
          !(await this.clubPublicService.isStudentBelongsTo(
            e.studentId,
            body.clubId,
          ))
        )
          throw new HttpException(
            "Some student is not belonged to the club",
            HttpStatus.BAD_REQUEST,
          );
        return e.studentId;
      }),
    );
    // TODO: 파일 유효한지 검사하는 로직도 필요해요! 이건 파일 모듈 구성되면 public할듯

    const isInsertionSucceed = await this.activityRepository.insertActivity({
      ...body,
      evidenceFileIds: body.evidenceFiles.map(row => row.uid),
      participantIds,
      activityDId: activityD.id,
    });

    if (!isInsertionSucceed)
      throw new HttpException(
        "Failed to insert",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async putStudentActivity(
    param: ApiAct003RequestParam,
    body: ApiAct003RequestBody,
    studentId: number,
  ): Promise<void> {
    const activity = await this.getActivity({ activityId: param.activityId });
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: activity.clubId });
    // 오늘이 활동보고서 작성기간이거나, 예외적 작성기간인지 확인합니다.
    await this.checkDeadline({
      enums: [
        ActivityDeadlineEnum.Upload,
        ActivityDeadlineEnum.Modification,
        ActivityDeadlineEnum.Exceptional,
      ],
    });
    // 해당 활동이 지난 활동기간에 대한 활동인지 확인합니다.
    const lastActivityD = await this.getLastActivityD();
    if (activity.activityDId !== lastActivityD.id)
      throw new HttpException(
        "The activity is not the activity of the last activity duration ",
        HttpStatus.BAD_REQUEST,
      );
    // 제출한 활동 기간들이 지난 활동기간 이내인지 확인합니다.
    body.durations.forEach(duration => {
      if (
        lastActivityD.startTerm <= duration.startTerm &&
        duration.endTerm <= lastActivityD.endTerm
      ) {
        return duration;
      }
      throw new HttpException(
        "Some duration is not in the last activity duration",
        HttpStatus.BAD_REQUEST,
      );
    });
    // 파일 uuid의 유효성을 검사하지 않습니다.
    // 참여 학생이 지난 활동기간 동아리의 소속원이였는지 확인합니다.
    const activityDStartSemester =
      await this.clubPublicService.dateToSemesterId(lastActivityD.startTerm);
    const activityDEndSemester = await this.clubPublicService.dateToSemesterId(
      lastActivityD.endTerm,
    );
    const members = (
      await this.clubPublicService.getMemberFromSemester({
        semesterId: activityDStartSemester,
        clubId: activity.clubId,
      })
    ).concat(
      await this.clubPublicService.getMemberFromSemester({
        semesterId: activityDEndSemester,
        clubId: activity.clubId,
      }),
    );
    body.participants.forEach(participant => {
      if (
        members.find(e => e.studentId === participant.studentId) === undefined
      )
        throw new HttpException(
          "Some participant is not belonged to the club in the activity duration",
          HttpStatus.BAD_REQUEST,
        );
    });

    // PUT 처리를 시작합니다.
    const isUpdateSucceed = this.activityRepository.updateActivity({
      activityId: param.activityId,
      name: body.name,
      activityTypeEnumId: body.activityTypeEnumId,
      duration: body.durations,
      location: body.location,
      purpose: body.purpose,
      detail: body.detail,
      evidence: body.evidence,
      evidenceFileIds: body.evidenceFiles.map(e => e.uuid),
      participantIds: body.participants.map(e => e.studentId),
      activityDId: activity.activityDId,
    });
    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async postStudentActivityProvisional(
    body: ApiAct007RequestBody,
    studentId: number,
  ): Promise<void> {
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: body.clubId });

    // 오늘이 활동보고서 작성기간이거나, 예외적 작성기간인지 확인하지 않습니다.

    const activityD = await this.getLastActivityD();
    // 현재학기에 동아리원이 아니였던 참가자가 있는지 검사합니다.
    const participantIds = await Promise.all(
      body.participants.map(
        async e =>
          // if (
          //   !(await this.clubPublicService.isStudentBelongsTo(
          //     e.studentId,
          //     body.clubId,
          //   ))
          // )
          //   throw new HttpException(
          //     "Some student is not belonged to the club",
          //     HttpStatus.BAD_REQUEST,
          //   );
          e.studentId,
      ),
    );
    // 파일 유효한지 검사합니다.
    const evidenceFiles = await Promise.all(
      body.evidenceFiles.map(key =>
        this.filePublicService.getFileInfoById(key.fileId),
      ),
    );

    const isInsertionSucceed = await this.activityRepository.insertActivity({
      ...body,
      evidenceFileIds: evidenceFiles.map(row => row.id),
      participantIds,
      activityDId: activityD.id,
      duration: body.durations,
    });

    if (!isInsertionSucceed)
      throw new HttpException(
        "Failed to insert",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async putStudentActivityProvisional(
    param: ApiAct008RequestParam,
    body: ApiAct008RequestBody,
    studentId: number,
  ): Promise<void> {
    const activity = await this.getActivity({ activityId: param.activityId });
    // 학생이 동아리 대표자 또는 대의원이 맞는지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: activity.clubId });
    // 오늘이 활동보고서 작성기간이거나, 예외적 작성기간인지 확인하지 않습니다.
    // 해당 활동이 지난 활동기간에 대한 활동인지 확인하지 않습니다.
    const lastActivityD = await this.getLastActivityD();

    // 제출한 활동 기간들이 지난 활동기간 이내인지 확인하지 않습니다.

    // 파일 uuid의 유효성을 검사합니다.
    const evidenceFiles = await Promise.all(
      body.evidenceFiles.map(key =>
        this.filePublicService.getFileInfoById(key.fileId),
      ),
    );
    // 참여 학생이 지난 활동기간 동아리의 소속원이였는지 확인합니다.
    const activityDStartSemester =
      await this.clubPublicService.dateToSemesterId(lastActivityD.startTerm);
    const activityDEndSemester = await this.clubPublicService.dateToSemesterId(
      lastActivityD.endTerm,
    );
    const members = (
      await this.clubPublicService.getMemberFromSemester({
        semesterId: activityDStartSemester,
        clubId: activity.clubId,
      })
    ).concat(
      await this.clubPublicService.getMemberFromSemester({
        semesterId: activityDEndSemester,
        clubId: activity.clubId,
      }),
    );
    body.participants.forEach(participant => {
      if (
        members.find(e => e.studentId === participant.studentId) === undefined
      )
        throw new HttpException(
          "Some participant is not belonged to the club in the activity duration",
          HttpStatus.BAD_REQUEST,
        );
    });

    // PUT 처리를 시작합니다.
    const isUpdateSucceed = this.activityRepository.updateActivity({
      activityId: param.activityId,
      name: body.name,
      activityTypeEnumId: body.activityTypeEnumId,
      duration: body.durations,
      location: body.location,
      purpose: body.purpose,
      detail: body.detail,
      evidence: body.evidence,
      evidenceFileIds: evidenceFiles.map(e => e.id),
      participantIds: body.participants.map(e => e.studentId),
      activityDId: activity.activityDId,
    });
    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  /**
   * @param clubId 동아리 ID
   * @description REG-011, 012, 013에서 공통적으로 이용하는 동아리 활동 전체조회 입니다.
   * @returns 해당 동아리가 작성한 모든 활동을 REG-011의 리턴 타입에 맞추어 가져옵니다.
   */
  private async getProvisionalActivities(param: { clubId: number }) {
    const result = await this.activityRepository.selectActivityByClubId({
      clubId: param.clubId,
    });
    const activities = await Promise.all(
      result.map(async activity => {
        const duration =
          await this.activityRepository.selectDurationByActivityId(activity.id);
        return {
          name: activity.name,
          activityTypeEnumId: activity.activityTypeEnumId,
          duration: {
            startTerm: duration.reduce(
              (prev, curr) => (prev < curr.startTerm ? prev : curr.startTerm),
              duration[0].startTerm,
            ),
            endTerm: duration.reduce(
              (prev, curr) => (prev > curr.endTerm ? prev : curr.endTerm),
              duration[0].endTerm,
            ),
          },
        };
      }),
    ).then(arr =>
      arr.sort((a, b) => (a.duration.startTerm < b.duration.endTerm ? -1 : 1)),
    );

    return activities;
  }

  /**
   * @param param
   * @description getStudentProvisionalActivities와 대응되는 서비스 진입점 입니다.
   */
  async getStudentProvisionalActivities(param: {
    studentId: number;
    query: ApiAct011RequestQuery;
  }): Promise<ApiAct011ResponseOk> {
    // 해당 학생이 동아리 대표자가 맞는지 검사합니다.
    await this.checkIsStudentDelegate({
      studentId: param.studentId,
      clubId: param.query.clubId,
    });
    const activities = await this.getProvisionalActivities({
      clubId: param.query.clubId,
    });
    return { activities };
  }

  /**
   * @param param
   * @description getStudentProvisionalActivities와 대응되는 서비스 진입점 입니다.
   */
  async getExecutiveProvisionalActivities(param: {
    query: ApiAct012RequestQuery;
  }): Promise<ApiAct012ResponseOk> {
    // 집행부원은 아직 검사하는 권한이 없습니다.
    const activities = await this.getProvisionalActivities({
      clubId: param.query.clubId,
    });
    return { activities };
  }

  async getProfessorProvisionalActivities(param: {
    query: ApiAct013RequestQuery;
  }): Promise<ApiAct013ResponseOk> {
    // 교수님은 아직 검사하는 권한이 없습니다.
    const activities = await this.getProvisionalActivities({
      clubId: param.query.clubId,
    });
    return { activities };
  }

  async getExecutiveActivity(activityId: number): Promise<ApiAct002ResponseOk> {
    const activity = await this.getActivity({ activityId });

    const evidence = await this.activityRepository.selectFileByActivityId(
      activity.id,
    );
    const participants =
      await this.activityRepository.selectParticipantByActivityId(activity.id);
    const duration = await this.activityRepository.selectDurationByActivityId(
      activity.id,
    );

    return {
      clubId: activity.clubId,
      name: activity.name,
      originalName: activity.originalName,
      activityTypeEnumId: activity.activityTypeEnumId,
      location: activity.location,
      purpose: activity.purpose,
      detail: activity.detail,
      evidence: activity.evidence,
      evidenceFiles: evidence.map(e => ({
        uuid: e.fileId,
      })),
      participants: participants.map(e => ({
        studentId: e.studentId,
      })),
      durations: duration.map(e => ({
        startTerm: e.startTerm,
        endTerm: e.endTerm,
      })),
    };
  }

  async getProfessorActivity(activityId: number): Promise<ApiAct002ResponseOk> {
    const activity = await this.getActivity({ activityId });

    const evidence = await this.activityRepository.selectFileByActivityId(
      activity.id,
    );
    const participants =
      await this.activityRepository.selectParticipantByActivityId(activity.id);
    const duration = await this.activityRepository.selectDurationByActivityId(
      activity.id,
    );

    return {
      clubId: activity.clubId,
      name: activity.name,
      originalName: activity.originalName,
      activityTypeEnumId: activity.activityTypeEnumId,
      location: activity.location,
      purpose: activity.purpose,
      detail: activity.detail,
      evidence: activity.evidence,
      evidenceFiles: evidence.map(e => ({
        uuid: e.fileId,
      })),
      participants: participants.map(e => ({
        studentId: e.studentId,
      })),
      durations: duration.map(e => ({
        startTerm: e.startTerm,
        endTerm: e.endTerm,
      })),
    };
  }
}
