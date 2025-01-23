import { Injectable, NotFoundException } from "@nestjs/common";

import {
  IActivityD,
  IActivitySummary,
} from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { IStudentSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import ActivityActivityTermRepository from "../repository/activity.activity-term.repository";
import ActivityRepository from "../repository/activity.repository";

import ActivityService from "./activity.service";

@Injectable()
export default class ActivityPublicService {
  constructor(
    private activityRepository: ActivityRepository,
    private activityService: ActivityService,
    private userPublicService: UserPublicService,
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

  // API Fnd 007
  async fetchAvailableSummaries(clubId: number): Promise<IActivitySummary[]>;
  async fetchAvailableSummaries(
    clubId: number,
    activityDId: number,
  ): Promise<IActivitySummary[]>;
  async fetchAvailableSummaries(
    arg1: number,
    arg2?: number,
  ): Promise<IActivitySummary[]> {
    if (arg2 === undefined) {
      const activityDId = (await this.activityService.getLastActivityD()).id;
      return this.activityRepository.fetchAvailableSummaries(arg1, activityDId);
    }
    return this.activityRepository.fetchAvailableSummaries(arg1, arg2);
  }

  // API Fnd 008
  async fetchParticipantSummaries(
    activityId: number,
  ): Promise<IStudentSummary[]> {
    const participantIds =
      await this.activityRepository.fetchParticipantIds(activityId);
    return this.userPublicService.fetchStudentSummaries(participantIds);
  }

  async fetchLastActivityD(date: Date): Promise<IActivityD> {
    const result =
      await this.activityActivityTermRepository.selectLastActivityDByDate(date);
    if (result.length === 0) {
      throw new NotFoundException("No such activityD");
    }
    return result[0];
  }
}
