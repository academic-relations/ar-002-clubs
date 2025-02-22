import { InferSelectModel } from "drizzle-orm";

import { IDistrict } from "@sparcs-clubs/interface/api/division/type/division.type";

import { MEntity } from "@sparcs-clubs/api/common/model/entity.model";
import { District } from "@sparcs-clubs/api/drizzle/schema/division.schema";

export type DistrictDBResult = InferSelectModel<typeof District>;

export class MDistrict extends MEntity implements IDistrict {
  // id: IDistrict["id"];

  name: IDistrict["name"];

  constructor(data: IDistrict) {
    super();
    Object.assign(this, data);
  }

  static fromDB(result: DistrictDBResult): MDistrict {
    return new MDistrict({
      ...result,
    });
  }
}
