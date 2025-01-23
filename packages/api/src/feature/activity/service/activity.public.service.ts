import { Injectable, NotFoundException } from "@nestjs/common";

import { IActivityDuration } from "@sparcs-clubs/interface/api/activity/type/activity.duration.type";
import { IActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import ActivityActivityTermRepository from "../repository/activity.activity-term.repository";
import ActivityRepository from "../repository/activity.repository";

@Injectable()
export default class ActivityPublicService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityActivityTermRepository: ActivityActivityTermRepository,
  ) {}

  /**
   * @param id activity id
   * @returns activity id에 해당하는 활동 이름을 리턴합니다.
   */
  async getActivityNameById(id: number) {
    return this.activityRepository.selectActivityNameById(id);
  }

  async getActivitySummary(id: number): Promise<IActivitySummary> {
    return this.activityRepository.selectActivityById(id);
  }

  async fetchSummaries(activityIds: number[]): Promise<IActivitySummary[]> {
    return this.activityRepository.fetchSummaries(activityIds);
  }

  async fetchLastActivityD(): Promise<IActivityDuration>;
  async fetchLastActivityD(date: Date): Promise<IActivityDuration>;
  async fetchLastActivityD(arg1?: Date): Promise<IActivityDuration> {
    if (arg1 === undefined) {
      const date = getKSTDate();
      const result =
        await this.activityActivityTermRepository.selectLastActivityDByDate(
          date,
        );
      if (result.length === 0) {
        throw new NotFoundException("No such activityD");
      }
      return result[0];
    }

    const result =
      await this.activityActivityTermRepository.selectLastActivityDByDate(arg1);
    if (result.length === 0) {
      throw new NotFoundException("No such activityD");
    }
    return result[0];
  }
}
