import { z } from "zod";

import apiClb001 from "@sparcs-clubs/interface/api/clubs/endpoints/apiClb001";

const clubInfo =
  apiClb001.responseBodyMap[200].shape.divisions.element.shape.clubs.element;
type ClubInfo = z.infer<typeof clubInfo>;

export type { ClubInfo };
