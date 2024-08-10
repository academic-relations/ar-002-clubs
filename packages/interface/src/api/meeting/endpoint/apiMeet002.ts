import { HttpStatusCode } from "axios";
import { z } from "zod";

import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";

/**
 * @version v0.1
 * @description 회의공고 (=회의를 조회합니다)
 */

const url = (announcementId: number) =>
  `/meetings/announcements/announcement/${announcementId}`;
const method = "GET";

const requestParam = z.object({
  announcementId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    meetingTypeId: z.nativeEnum(MeetingEnum),
    announcementTitle: z.coerce.string(),
    announcementContent: z.coerce.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    isRegular: z.coerce.boolean(),
    location: z.coerce.string(),
  }),
};

const responseErrorMap = {};

const apiMeet002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMeet002RequestParam = z.infer<typeof apiMeet002.requestParam>;
type ApiMeet002RequestQuery = z.infer<typeof apiMeet002.requestQuery>;
type ApiMeet002RequestBody = z.infer<typeof apiMeet002.requestBody>;
type ApiMeet002ResponseOk = z.infer<(typeof apiMeet002.responseBodyMap)[200]>;

export default apiMeet002;

export type {
  ApiMeet002RequestParam,
  ApiMeet002RequestQuery,
  ApiMeet002RequestBody,
  ApiMeet002ResponseOk,
};
