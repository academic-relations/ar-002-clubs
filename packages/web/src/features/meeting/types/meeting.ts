import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";

export interface MeetingAnnouncementModel {
  meetingEnumId: MeetingEnum;
  announcementTitle: string;
  announcementContent: string;
  startDate: Date;
  endDate?: Date;
  isRegular: string;
  location?: string;
  locationEn?: string;
}
