import { FundingDto } from "./funding.dto.model";

export class FundingJointExpense {
  jointExpenseExplanation?: string;

  jointExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      jointExpenseExplanation: data.jointExpenseExplanation,
      jointExpenseFiles: data.jointExpenseFiles,
    });
  }
}
