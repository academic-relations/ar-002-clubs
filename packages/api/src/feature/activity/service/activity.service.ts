import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ActivityDeadlineEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import ActivityRepository from "../repository/activity.repository";

import type { ApiAct001RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import type { ApiAct002ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import type { ApiAct005ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

@Injectable()
export default class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private clubPublicService: ClubPublicService,
  ) {}

  async deleteStudentActivity(activityId: number, studentId: number) {
    const result =
      await this.activityRepository.selectActivityByActivityId(activityId);
    if (result.length !== 1) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
    const activity = result[0];

    if (
      !(await this.clubPublicService.isStudentDelegate(
        studentId,
        activity.clubId,
      ))
    )
      throw new HttpException(
        "It seems that you are not representative.",
        HttpStatus.FORBIDDEN,
      );

    // 오늘이 활동보고서 작성기간 | 수정기간 | 예외적 작성기간인지 확인합니다.
    const today = getKSTDate();
    const todayDeadline = await this.activityRepository
      .selectDeadlineByDate(today)
      .then(arr => {
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        return arr[0];
      });
    if (
      todayDeadline.deadlineEnumId !== ActivityDeadlineEnum.Upload &&
      todayDeadline.deadlineEnumId !== ActivityDeadlineEnum.Modification &&
      todayDeadline.deadlineEnumId !== ActivityDeadlineEnum.Exceptional
    )
      throw new HttpException(
        "Today is not a day for activity deletion",
        HttpStatus.BAD_REQUEST,
      );

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
    if (!(await this.clubPublicService.isStudentDelegate(studentId, clubId)))
      throw new HttpException(
        "It seems that student is not representative.",
        HttpStatus.FORBIDDEN,
      );
    const semesterId =
      await this.clubPublicService.dateToSemesterId(getKSTDate());
    if (semesterId === undefined)
      throw new HttpException(
        "Today is not in semester",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const activities =
      await this.activityRepository.selectActivityByClubIdAndSemesterId(
        clubId,
        semesterId,
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
    const activities =
      await this.activityRepository.selectActivityByActivityId(activityId);
    if (activities.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (activities.length === 0)
      throw new HttpException("No such activity", HttpStatus.NOT_FOUND);
    const activity = activities[0];

    if (
      !(await this.clubPublicService.isStudentDelegate(
        studentId,
        activity.clubId,
      ))
    )
      throw new HttpException(
        "It seems that you are not a delegate of the club",
        HttpStatus.FORBIDDEN,
      );

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

  async postStudentActivity(body: ApiAct001RequestBody): Promise<void> {
    const mockUpStudentId = 605;

    // 작성자가 해당 동아리의 대표자가 맞는지 검사합니다.
    if (
      !(await this.clubPublicService.isStudentDelegate(
        mockUpStudentId,
        body.clubId,
      ))
    )
      throw new HttpException(
        "It seems that student is not representative.",
        HttpStatus.FORBIDDEN,
      );
    // 오늘이 활동보고서 작성기간이거나, 예외적 작성기간인지 확인합니다.
    const today = getKSTDate();
    const todayDeadline = await this.activityRepository
      .selectDeadlineByDate(today)
      .then(arr => {
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        return arr[0];
      });
    if (
      todayDeadline.deadlineEnumId !== ActivityDeadlineEnum.Upload &&
      todayDeadline.deadlineEnumId !== ActivityDeadlineEnum.Exceptional
    )
      throw new HttpException(
        "Today is not a day for activity upload",
        HttpStatus.BAD_REQUEST,
      );
    // QUESTION: 신청내용중 startTerm과 endTerm이 이번 학기의 활동기간에 맞는지 검사해야 할까요?.
    // 활동 시작일 기준으로 semesterId를 가져옵니다.
    const semesterId = await this.clubPublicService
      .dateToSemesterId(
        body.duration.reduce(
          (prev, curr) => (prev < curr.startTerm ? prev : curr.startTerm),
          body.duration[0].startTerm,
        ),
      )
      .then(id => {
        if (id === undefined)
          throw new HttpException(
            "No matched semester",
            HttpStatus.BAD_REQUEST,
          );
        return id;
      });
    // 현재학기에 동아리원이 아니였던 참가자가 있는지 검사합니다.
    const participantIds = await Promise.all(
      body.participants.map(async ({ studentId }) => {
        if (
          !(await this.clubPublicService.isStudentBelongsTo(
            studentId,
            body.clubId,
          ))
        )
          throw new HttpException(
            "Some student is not belonged to the club",
            HttpStatus.BAD_REQUEST,
          );
        return studentId;
      }),
    );
    // TODO: 파일 유효한지 검사하는 로직도 필요해요! 이건 파일 모듈 구성되면 public할듯

    const isInsertionSucceed = await this.activityRepository.insertActivity({
      ...body,
      semesterId,
      evidenceFileIds: body.evidenceFiles.map(row => row.uid),
      participantIds,
    });

    if (!isInsertionSucceed)
      throw new HttpException(
        "Failed to insert",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
