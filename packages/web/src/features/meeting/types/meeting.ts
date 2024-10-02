import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";

export interface CreateMeetingModel extends ApiMee001RequestBody {
  count: number;
}

export interface MeetingDetail extends CreateMeetingModel {
  id: number;
}
