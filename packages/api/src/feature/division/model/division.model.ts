import { InferSelectModel } from "drizzle-orm";

import { IDivision } from "@sparcs-clubs/interface/api/division/type/division.type";

import { MEntity } from "@sparcs-clubs/api/common/model/entity.model";
import { Division } from "@sparcs-clubs/api/drizzle/schema/division.schema";

export type DivisionDBResult = InferSelectModel<typeof Division>;

export class MDivision extends MEntity implements IDivision {
  // id: IDivision["id"];

  name: IDivision["name"];

  startTerm: IDivision["startTerm"];

  endTerm: IDivision["endTerm"];

  district: IDivision["district"];

  constructor(data: IDivision) {
    super();
    Object.assign(this, data);
  }

  static fromDB(result: DivisionDBResult): MDivision {
    return new MDivision({
      ...result,
      district: {
        id: result.districtId,
      },
    });
  }
}
