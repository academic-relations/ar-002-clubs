import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingJointExpense {
  jointExpenseExplanation?: string;

  jointExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      jointExpenseExplanation: data.jointExpenseExplanation,
      jointExpenseFiles: data.jointExpenseFiles,
    });
  }
}
