import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingEtcExpense {
  etcExpenseExplanation?: string;

  etcExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      etcExpenseExplanation: data.etcExpenseExplanation,
      etcExpenseFiles: data.etcExpenseFiles,
    });
  }
}
