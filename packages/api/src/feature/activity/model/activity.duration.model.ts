import { IActivityDuration } from "@sparcs-clubs/interface/api/activity/type/activity.duration.type";

export class MActivityDuration implements IActivityDuration {
  id: number;

  year: number;

  name: string;

  startTerm: Date;

  endTerm: Date;

  createdAt: Date;

  deletedAt: Date | null;

  constructor(data: IActivityDuration) {
    Object.assign(this, data);
  }
}
