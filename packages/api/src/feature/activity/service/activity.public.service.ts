import { Injectable } from "@nestjs/common";

import { IActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";

import ActivityRepository from "../repository/activity.repository";

@Injectable()
export default class ActivityPublicService {
  constructor(private activityRepository: ActivityRepository) {}

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
}
