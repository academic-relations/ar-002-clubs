import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";
import {
  MeetingEnum,
  MeetingStatusEnum,
} from "@sparcs-clubs/interface/common/enum/meeting.enum";

export interface CreateMeetingModel extends ApiMee001RequestBody {
  count: number;
}

export interface MeetingDetail extends CreateMeetingModel {
  id: number;
}

export const getMeetingEnumFromValue = (value: string | null) => {
  switch (value) {
    case "1":
      return MeetingEnum.clubRepresentativesCouncilMeeting;
    case "2":
      return MeetingEnum.expansiveOperativeCommittee;
    case "3":
      return MeetingEnum.operativeCommittee;
    case "4":
      return MeetingEnum.divisionMeeting;
    default:
      return undefined;
  }
};

export interface MeetingNoticeItemType {
  id: number;
  meetingEnumId: MeetingEnum;
  isRegular: boolean;
  meetingTitle: string;
  meetingDate: Date;
  meetingStatus: MeetingStatusEnum;
}
