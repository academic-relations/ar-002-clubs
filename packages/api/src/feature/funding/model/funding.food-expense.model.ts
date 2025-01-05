import { FundingDto } from "./funding.dto.model";

export class FundingFoodExpense {
  foodExpenseExplanation?: string;

  foodExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      foodExpenseExplanation: data.foodExpenseExplanation,
      foodExpenseFiles: data.foodExpenseFiles,
    });
  }
}
