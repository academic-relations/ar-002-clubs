import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import type {
  ApiAct006RequestParam,
  ApiAct006RequestQuery,
  ApiAct006ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import type {
  ApiAct009RequestQuery,
  ApiAct009ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";
import { ApiAct030ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct030";
import { IStudent } from "@sparcs-clubs/interface/api/user/type/user.type";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import logger from "@sparcs-clubs/api/common/util/logger";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import ActivityActivityTermRepository from "../repository/activity.activity-term.repository";
import ActivityRepository from "../repository/activity.repository";

@Injectable()
export default class ActivityActivityTermService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityActivityTermRepository: ActivityActivityTermRepository,
    private clubPublicService: ClubPublicService,
    private userPublicService: UserPublicService,
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
    query: ApiAct006RequestQuery,
    studentId: number,
  ): Promise<ApiAct006ResponseOk> {
    // 요청한 학생이 동아리의 대표자인지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: query.clubId });
    const activities =
      await this.activityRepository.selectActivityByClubIdAndActivityDId(
        query.clubId,
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
          durations: duration.sort((a, b) =>
            a.startTerm.getTime() === b.startTerm.getTime()
              ? a.endTerm.getTime() - b.endTerm.getTime()
              : a.startTerm.getTime() - b.startTerm.getTime(),
          ),
        };
      }),
    );
    return {
      activities: result.sort((a, b) =>
        a.durations[0].startTerm.getTime() ===
        b.durations[0].startTerm.getTime()
          ? a.durations[0].endTerm.getTime() - b.durations[0].endTerm.getTime()
          : a.durations[0].startTerm.getTime() -
            b.durations[0].startTerm.getTime(),
      ),
    };
  }

  async getStudentActivitiesActivityTerms(
    query: ApiAct009RequestQuery,
    studentId: number,
  ): Promise<ApiAct009ResponseOk> {
    // 요청한 학생이 동아리의 대표자인지 확인합니다.
    await this.checkIsStudentDelegate({ studentId, clubId: query.clubId });
    // 해당 동아리가 등록되었던 학기 정보를 가져오고, startTerm과 endTerm에 대응되는 활동기간을 조회합니다.
    const semesters = await this.clubPublicService.getClubsExistedSemesters({
      clubId: query.clubId,
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
          activityTerms.find(e => e.id === startActivityTerm.id) ===
            undefined &&
          startActivityTerm.endTerm < new Date()
        )
          activityTerms.push({
            id: startActivityTerm.id,
            year: startActivityTerm.year,
            name: startActivityTerm.name,
            startTerm: startActivityTerm.startTerm,
            endTerm: startActivityTerm.endTerm,
          });
        if (
          activityTerms.find(e => e.id === endActivityTerm.id) === undefined &&
          endActivityTerm.endTerm < new Date()
        )
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
      terms: activityTerms.sort(
        (a, b) => a.startTerm.getTime() - b.startTerm.getTime(),
      ),
    };
  }

  async getStudentActivitiesProvisionalAvailableDurations(
    studentId: IStudent["id"],
  ): Promise<ApiAct030ResponseOk> {
    const club =
      await this.clubPublicService.findStudentClubDelegate(studentId);

    if (!club)
      throw new HttpException(
        "Student is not a delegate of any club",
        HttpStatus.FORBIDDEN,
      );
    const semesters = await this.clubPublicService.getSemesterByClubIdAndTypes(
      club.id,
      [ClubTypeEnum.Provisional],
    );

    // 가등록 기간 확인 로직
    /* TODO: 지금은 가등록 기간이 있는지만 판단하는데, 더 세분화한 검토 필요
     * 가등록 기간이 최근에서 세서 2번인건 지 같은 것들
     */
    if (semesters.length === 0)
      throw new HttpException(
        `Student's club's provisional duration is only ${semesters.length} semester`,
        HttpStatus.NOT_FOUND,
      );

    // 가등록 기간
    const dates = semesters.flatMap(e => [e.startTerm, e.endTerm]);
    const activityDurations = (
      await Promise.all(
        dates.map(date =>
          this.activityActivityTermRepository.selectActivityDByDate(date),
        ),
      )
    ).flatMap(x => x);
    const uniqueActivityDurations = activityDurations.filter(
      (duration, index, self) =>
        index === self.findIndex(d => d.id === duration.id),
    );

    return {
      activityDurations: uniqueActivityDurations,
    };
  }
}
