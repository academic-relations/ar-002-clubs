import { IClubSummary } from "@sparcs-clubs/interface/api/club/type/club.type";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

export class VClubSummary implements IClubSummary {
  id: number;

  name: string;

  typeEnum: ClubTypeEnum;

  division: {
    id: number;
    name: string;
  };

  professor: {
    id: number;
  };

  constructor(result: VClubSummary) {
    this.id = result.id;
    this.name = result.name;
  }

  static fromDBResult(result: {
    id: number;
    name_kr: string;
    type_enum: ClubTypeEnum;
    division_id: number;
    division_name: string;
    professor_id: number;
  }): VClubSummary {
    return new VClubSummary({
      id: result.id,
      name: result.name_kr,
      typeEnum: result.type_enum,
      division: {
        id: result.division_id,
        name: result.division_name,
      },
      professor: {
        id: result.professor_id,
      },
    });
  }
}
