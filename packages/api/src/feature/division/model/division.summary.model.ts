import { InferSelectModel } from "drizzle-orm";

import { IDivisionSummary } from "@sparcs-clubs/interface/api/division/type/division.type";

import { MEntity } from "@sparcs-clubs/api/common/model/entity.model";
import { Division } from "@sparcs-clubs/api/drizzle/schema/division.schema";

import { MDivision } from "./division.model";

export type DivisionDBResult = InferSelectModel<typeof Division>;

export class VDivisionSummary extends MEntity implements IDivisionSummary {
  // id: IDivision["id"];

  name: IDivisionSummary["name"];

  // 첫 번째 생성자: IDivision\Summary로부터 초기화
  constructor(divisionSummary: IDivisionSummary);

  // 두 번째 생성자: MDivision로부터 초기화
  constructor(division: MDivision);

  constructor(param: IDivisionSummary | MDivision) {
    super();
    if (param instanceof MDivision) {
      this.id = param.id;
      this.name = param.name;
    } else {
      Object.assign(this, param);
    }
  }

  static fromDB(result: DivisionDBResult): VDivisionSummary {
    return new VDivisionSummary({
      ...result,
    });
  }
}
