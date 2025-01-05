import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingFoodExpense {
  foodExpenseExplanation?: string;

  foodExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      foodExpenseExplanation: data.foodExpenseExplanation,
      foodExpenseFiles: data.foodExpenseFiles,
    });
  }
}
