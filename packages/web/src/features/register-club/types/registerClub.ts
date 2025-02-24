import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

export enum RegistrationType {
  Renewal = "renewalRegistration",
  Promotional = "promotionalRegistration",
  Provisional = "provisionalRegistration",
}

export interface ClubRegistrationInfo {
  id: number;
  clubNameKr: string;
  clubNameEn: string;
  professor?: ProfessorInfo;
}

export interface ProfessorInfo {
  name: string;
  email: string;
  professorEnumId: ProfessorEnum;
}

export interface Duration {
  startTerm: Date;
  endTerm: Date;
}

export type ActivityReport = {
  id: number;
  name: string;
  activityTypeEnumId: number;
  activityStatusEnumId: ActivityStatusEnum;
  durations: Duration[];
};
