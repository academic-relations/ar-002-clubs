export interface MeetingDetail {
  title: string;
  content: string;
  count: number;
  meetingType: string; // TODO. interface enum으로 변경
  startDate: Date;
  endDate?: Date;
  location?: string;
  isRegular: boolean;
}

export interface MeetingInform {
  title: string;
  content: string;
  count: number;
  meetingType: string; // TODO. interface enum으로 변경
  startDate: string;
  endDate?: string;
  location?: string;
  isRegular: boolean;
  date?: string;
  time?: string;
}
