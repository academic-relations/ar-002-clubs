import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ActivityDeadlineEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import ActivityRepository from "../repository/activity.repositroy";

import type { ApiAct001RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import type { ApiAct005ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

@Injectable()
export default class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private clubPublicService: ClubPublicService,
  ) {}

  async getStudentActivity(
    clubId: number,
    studentId: number,
  ): Promise<ApiAct005ResponseOk> {
    if (
      !(await this.clubPublicService.isStudentRepresentative(studentId, clubId))
    )
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

    const result =
      await this.activityRepository.selectActivityByClubIdAndSemesterId(
        clubId,
        semesterId,
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

  async postStudentActivity(body: ApiAct001RequestBody): Promise<void> {
    const mockUpStudentId = 605;

    // 작성자가 해당 동아리의 대표자가 맞는지 검사합니다.
    if (
      !(await this.clubPublicService.isStudentRepresentative(
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
    // TODO: 신청내용중 startTerm과 endTerm이 이번 학기의 활동기간에 맞는지 검사해야 할까요?.
    // 활동 시작일 기준으로 semesterId를 가져옵니다.
    const semesterId = await this.clubPublicService
      .dateToSemesterId(body.startTerm)
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
