import { HttpStatusCode } from "axios";
import { z } from "zod";

import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";

/**
 * @version v0.1
 * @description 회의와 회의 공고를 생성합니다
 */

const url = () => `/executive/meetings/announcements/announcement`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  meetingTypeId: z.nativeEnum(MeetingEnum),
  announcementTitle: z.coerce.string(),
  announcementContent: z.coerce.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  isRegular: z.coerce.boolean(),
  location: z.coerce.string(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiMeet001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMeet001RequestParam = z.infer<typeof apiMeet001.requestParam>;
type ApiMeet001RequestQuery = z.infer<typeof apiMeet001.requestQuery>;
type ApiMeet001RequestBody = z.infer<typeof apiMeet001.requestBody>;
type ApiMeet001ResponseCreated = z.infer<
  (typeof apiMeet001.responseBodyMap)[201]
>;

export default apiMeet001;

export type {
  ApiMeet001RequestParam,
  ApiMeet001RequestQuery,
  ApiMeet001RequestBody,
  ApiMeet001ResponseCreated,
};
