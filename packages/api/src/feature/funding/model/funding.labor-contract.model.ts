import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingLaborContract {
  laborContractExplanation?: string;

  laborContractFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      laborContractExplanation: data.laborContractExplanation,
      laborContractFiles: data.laborContractFiles,
    });
  }
}
