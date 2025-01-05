import { FundingDto } from "./funding.dto.model";

export class FundingEtcExpense {
  etcExpenseExplanation?: string;

  etcExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      etcExpenseExplanation: data.etcExpenseExplanation,
      etcExpenseFiles: data.etcExpenseFiles,
    });
  }
}
