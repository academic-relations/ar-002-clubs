import { IActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

export class VActivitySummary implements IActivitySummary {
  id: number;

  activityStatusEnum: ActivityStatusEnum;

  activityTypeEnum: ActivityTypeEnum;

  activityDuration: {
    id: number;
  };

  club: {
    id: number;
  };

  name: string;

  commentedAt: Date | null;

  editedAt: Date;

  updatedAt: Date;

  chargedExecutive: {
    id: number;
  };

  commentedExecutive: {
    id: number;
  };

  constructor(data: VActivitySummary) {
    Object.assign(this, data);
  }

  static fromDBResult(activity: {
    id: number;
    activityStatusEnumId: ActivityStatusEnum;
    activityTypeEnumId: ActivityTypeEnum;
    activityDId: number;
    clubId: number;
    name: string;
    commentedAt: Date | null;
    editedAt: Date;
    updatedAt: Date;
    chargedExecutiveId?: number;
    commentedExecutiveId?: number;
  }): VActivitySummary {
    return new VActivitySummary({
      id: activity.id,
      activityStatusEnum: activity.activityStatusEnumId,
      activityTypeEnum: activity.activityTypeEnumId,
      activityDuration: {
        id: activity.activityDId,
      },
      club: {
        id: activity.clubId,
      },
      name: activity.name,
      commentedAt: activity.commentedAt,
      editedAt: activity.editedAt,
      updatedAt: activity.updatedAt,
      chargedExecutive: activity.chargedExecutiveId
        ? {
            id: activity.chargedExecutiveId,
          }
        : undefined,
      commentedExecutive: activity.commentedExecutiveId
        ? {
            id: activity.commentedExecutiveId,
          }
        : undefined,
    });
  }
}
