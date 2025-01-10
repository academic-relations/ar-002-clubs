import { IExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

import { MExecutive } from "./executive.model";

export class MExecutiveSummary implements IExecutiveSummary {
  id: number;

  name: string;

  studentNumber: string;

  // 첫 번째 생성자: IExecutiveSummary로부터 초기화
  constructor(executiveSummary: IExecutiveSummary);
  // 두 번째 생성자: MExecutive로부터 초기화
  constructor(executive: MExecutive);

  constructor(param: IExecutiveSummary | MExecutive) {
    if ("userId" in param) {
      // MExecutive로부터 초기화
      this.id = param.id;
      this.name = param.name;
      this.studentNumber = param.studentNumber;
    } else {
      // IExecutiveSummary로부터 초기화
      this.id = param.id;
      this.name = param.name;
      this.studentNumber = param.studentNumber;
    }
  }
}
