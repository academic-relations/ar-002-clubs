import { FundingDto } from "./funding.dto.model";

export class FundingLaborContract {
  laborContractExplanation?: string;

  laborContractFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      laborContractExplanation: data.laborContractExplanation,
      laborContractFiles: data.laborContractFiles,
    });
  }
}
