import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { IStudentSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

import ActivityRepository from "../repository/activity.repository";

import ActivityService from "./activity.service";

@Injectable()
export default class ActivityPublicService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityService: ActivityService,
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

  async fetchActivitySummaries(
    activityIds: number[],
  ): Promise<IActivitySummary[]> {
    return this.activityRepository.fetchActivitySummaries(activityIds);
  }

  // API Fnd 007
  async fetchAvailableActivitySummaries(
    clubId: number,
  ): Promise<IActivitySummary[]>;
  async fetchAvailableActivitySummaries(
    clubId: number,
    activityDId: number,
  ): Promise<IActivitySummary[]>;
  async fetchAvailableActivitySummaries(
    arg1: number,
    arg2?: number,
  ): Promise<IActivitySummary[]> {
    if (arg2 === undefined) {
      const activityDId = (await this.activityService.getLastActivityD()).id;
      return this.activityRepository.fetchAvailableActivitySummaries(
        arg1,
        activityDId,
      );
    }
    return this.activityRepository.fetchAvailableActivitySummaries(arg1, arg2);
  }

  // API Fnd 008
  async fetchParticipantStudentSummaries(
    activityId: number,
  ): Promise<IStudentSummary[]> {
    const participants =
      await this.activityRepository.fetchParticipantStudentSummaries(
        activityId,
      );

    if (participants.length === 0) {
      throw new HttpException(
        `Participants not found for activity ${activityId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return participants;
  }
}
