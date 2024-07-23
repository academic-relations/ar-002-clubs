import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import logger from "@sparcs-clubs/api/common/util/logger";

import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import ActivityActivityTermRepository from "../repository/activity.activity-term.repository";
import ActivityRepository from "../repository/activity.repository";

import type {
  ApiAct006RequestParam,
  ApiAct006ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import type {
  ApiAct009RequestBody,
  ApiAct009ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";

@Injectable()
export default class ActivityActivityTermService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityActivityTermRepository: ActivityActivityTermRepository,
    private clubPublicService: ClubPublicService,
  ) {}

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

  /**
   * @param date 조회하고 싶은 활동기간 내부의 임의 날짜
   * @returns 해당 날짜를 포함하는 활동 기간 정보를 리턴합니다.
   */
  private async getActivityD(param: { date: Date }) {
    const activityDs =
      await this.activityActivityTermRepository.selectActivityDByDate(
        param.date,
      );
    logger.debug(
      `date is ${param.date.toDateString()}, activityDs is ${activityDs.toString()}`,
    );
    if (activityDs.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (activityDs.length === 0) {
      logger.debug(`date is ${param.date.toDateString()}`);
      throw new HttpException(
        "ActivityD is not set for today",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return activityDs[0];
  }

  async getStudentActivitiesActivityTerm(
    param: ApiAct006RequestParam,
    body: ApiAct009RequestBody,
    studentId: number,
  ): Promise<ApiAct006ResponseOk> {
    // 요청한 학생이 동아리의 대표자인지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: body.clubId });
    const activities =
      await this.activityRepository.selectActivityByClubIdAndActivityDId(
        body.clubId,
        param.activityTermId,
      );
    const result = await Promise.all(
      activities.map(async row => {
        const duration =
          await this.activityRepository.selectDurationByActivityId(row.id);
        return {
          id: row.id,
          name: row.name,
          activityTypeEnumId: row.activityTypeEnumId,
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
    return {
      activities: result,
    };
  }

  async getStudentActivitiesActivityTerms(
    body: ApiAct009RequestBody,
    studentId: number,
  ): Promise<ApiAct009ResponseOk> {
    // 요청한 학생이 동아리의 대표자인지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: body.clubId });
    // 해당 동아리가 등록되었던 학기 정보를 가져오고, startTerm과 endTerm에 대응되는 활동기간을 조회합니다.
    const semesters = await this.clubPublicService.getClubsExistedSemesters({
      clubId: body.clubId,
    });
    const activityTerms: ApiAct009ResponseOk["terms"] = [];
    await Promise.all(
      semesters.map(async semester => {
        const startActivityTerm = await this.getActivityD({
          date: semester.startTerm,
        });
        const endActivityTerm = await this.getActivityD({
          date: semester.endTerm,
        });
        if (
          activityTerms.find(e => e.id === startActivityTerm.id) === undefined
        )
          activityTerms.push({
            id: startActivityTerm.id,
            year: startActivityTerm.year,
            name: startActivityTerm.name,
            startTerm: startActivityTerm.startTerm,
            endTerm: startActivityTerm.endTerm,
          });
        if (activityTerms.find(e => e.id === endActivityTerm.id) === undefined)
          activityTerms.push({
            id: endActivityTerm.id,
            year: endActivityTerm.year,
            name: endActivityTerm.name,
            startTerm: endActivityTerm.startTerm,
            endTerm: endActivityTerm.endTerm,
          });
      }),
    );

    return {
      terms: activityTerms.sort((a, b) => a.id - b.id),
    };
  }
}
