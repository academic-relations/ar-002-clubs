import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";

export const meetingEnumToText = (meetingEnum: string) => {
  switch (meetingEnum) {
    case MeetingEnum.clubRepresentativesCouncilMeeting.toString():
      return "전동대회";
    case MeetingEnum.expansiveOperativeCommittee.toString():
      return "확대운영위원회";
    case MeetingEnum.operativeCommittee.toString():
      return "운영위원회";
    default:
      return "분과회의";
  }
};
