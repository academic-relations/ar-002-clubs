import { InferSelectModel } from "drizzle-orm";

import { IClubSummary } from "@sparcs-clubs/interface/api/club/type/club.type";

import { Club, ClubT } from "@sparcs-clubs/api/drizzle/schema/club.schema";

type ClubSummaryDBResult = {
  club: InferSelectModel<typeof Club>;
  club_t: InferSelectModel<typeof ClubT>;
};

export class VClubSummary implements IClubSummary {
  id: IClubSummary["id"];

  name: IClubSummary["name"];

  nameEn: IClubSummary["nameEn"];

  typeEnum: IClubSummary["typeEnum"];

  division: IClubSummary["division"];

  constructor(result: VClubSummary) {
    this.id = result.id;
    this.name = result.name;
    this.typeEnum = result.typeEnum;
    this.division = result.division;
  }

  static fromDBResult(result: ClubSummaryDBResult): VClubSummary {
    return new VClubSummary({
      id: result.club.id,
      name: result.club.nameKr,
      nameEn: result.club.nameEn,
      typeEnum: result.club_t.clubStatusEnumId,
      division: {
        id: result.club.divisionId,
      },
    });
  }
}
