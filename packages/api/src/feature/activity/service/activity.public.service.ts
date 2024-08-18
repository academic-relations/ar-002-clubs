import { Injectable } from "@nestjs/common";

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
}
