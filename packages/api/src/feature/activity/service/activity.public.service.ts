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
  async findAvailableActivitySummariesWithClubId(
    clubId: number,
  ): Promise<IActivitySummary[]> {
    // TS 오버로딩 너무 구림
    // 인수 개수 다른건 어떻게 처리하지?
    //     if (clubId !== undefined && startTerm && endTerm) {
    // 저렇게 할 것도 아니고.
    // 쓸 때는 또 undefined, clubId, startTerm 이렇게 써야하고.
    // param 이라고 이름 붙이면 그게 더 쓰기 고역인데
    const activityDId = (await this.activityService.getLastActivityD()).id;
    return this.activityRepository.findAvailableActivitySummariesWithClubId(
      clubId,
      activityDId,
    );
  }

  // API Fnd 008
  async fetchActivityParticipants(
    activityId: number,
  ): Promise<IStudentSummary[]> {
    const participants =
      await this.activityRepository.findParticipantsSummaryByActivityId(
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
