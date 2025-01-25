import { IClubSummary } from "@sparcs-clubs/interface/api/club/type/club.type";

export class VClubSummary implements IClubSummary {
  id: number;

  name: string;

  constructor(result: VClubSummary) {
    this.id = result.id;
    this.name = result.name;
  }

  static fromDBResult(result: { id: number; name_kr: string }): VClubSummary {
    return new VClubSummary({
      id: result.id,
      name: result.name_kr,
    });
  }
}
