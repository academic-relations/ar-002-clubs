import { z } from "zod";

enum ClubType {
  Senate, // 상임동아리
  Regular, // 정동아리
  Provisional, // 가동아리
}

const clubTypeEnum = z.nativeEnum(ClubType);

export { ClubType, clubTypeEnum };
