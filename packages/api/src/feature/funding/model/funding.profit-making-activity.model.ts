import { FundingDto } from "./funding.dto.model";

export class FundingProfitMakingActivity {
  profitMakingActivityExplanation?: string;

  profitMakingActivityFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      profitMakingActivityExplanation: data.profitMakingActivityExplanation,
      profitMakingActivityFiles: data.profitMakingActivityFiles,
    });
  }
}
