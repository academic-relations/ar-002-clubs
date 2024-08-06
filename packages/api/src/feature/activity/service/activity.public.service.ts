import { Injectable } from "@nestjs/common";

import ActivityRepository from "../repository/activity.repository";

@Injectable()
export default class ActivityPublicService {
  constructor(private activityRepository: ActivityRepository) {}

  async getActivityNameById(id: number) {
    return this.activityRepository.selectActivityNameById(id);
  }
}
