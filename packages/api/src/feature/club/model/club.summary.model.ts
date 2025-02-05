import { IClubSummary } from "@sparcs-clubs/interface/api/club/type/club.type";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

export class VClubSummary implements IClubSummary {
  id: number;

  name: string;

  typeEnum: ClubTypeEnum;

  division: {
    id: number;
  };

  professor: {
    id: number;
  } | null;

  constructor(result: VClubSummary) {
    this.id = result.id;
    this.name = result.name;
    this.typeEnum = result.typeEnum;
    this.division = result.division;
    this.professor = result.professor;
  }

  static fromDBResult(result: {
    club: {
      id: number;
      name_kr: string;
      divisionId: number;
    };
    club_t: {
      clubStatusEnumId: ClubTypeEnum;
      professorId: number | null;
    };
  }): VClubSummary {
    return new VClubSummary({
      id: result.club.id,
      name: result.club.name_kr,
      typeEnum: result.club_t.clubStatusEnumId,
      division: {
        id: result.club.divisionId,
      },
      professor: result.club_t.professorId
        ? {
            id: result.club_t.professorId,
          }
        : null,
    });
  }
}
