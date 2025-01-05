import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingProfitMakingActivity {
  profitMakingActivityExplanation?: string;

  profitMakingActivityFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      profitMakingActivityExplanation: data.profitMakingActivityExplanation,
      profitMakingActivityFiles: data.profitMakingActivityFiles,
    });
  }
}
