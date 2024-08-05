export interface MeetingDetail {
  id: number;
  title: string;
  content: string;
}

export interface MeetingTemplateInfo {
  count: number;
  meetingType: string; // TODO. interface enum으로 변경
  startDate: Date;
  endDate?: Date;
  location?: string;
  isRegular: boolean;
}
