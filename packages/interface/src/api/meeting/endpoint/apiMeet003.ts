import { HttpStatusCode } from "axios";
import { z } from "zod";

import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";

/**
 * @version v0.1
 * @description 회의공고 (=회의를 수정합니다)
 */

const url = (announcementId: number) =>
  `/executive/meetings/announcements/announcement/${announcementId}`;
const method = "PATCH";

const requestParam = z.object({
  announcementId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  meetingTypeId: z.nativeEnum(MeetingEnum),
  announcementTitle: z.coerce.string().optional(),
  announcementContent: z.coerce.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isRegular: z.coerce.boolean().optional(),
  location: z.coerce.string().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiMeet003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMeet003RequestParam = z.infer<typeof apiMeet003.requestParam>;
type ApiMeet003RequestQuery = z.infer<typeof apiMeet003.requestQuery>;
type ApiMeet003RequestBody = z.infer<typeof apiMeet003.requestBody>;
type ApiMeet003ResponseCreated = z.infer<
  (typeof apiMeet003.responseBodyMap)[201]
>;

export default apiMeet003;

export type {
  ApiMeet003RequestParam,
  ApiMeet003RequestQuery,
  ApiMeet003RequestBody,
  ApiMeet003ResponseCreated,
};
