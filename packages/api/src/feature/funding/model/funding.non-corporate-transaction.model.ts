import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingNonCorporateTransaction {
  traderName?: string;

  traderAccountNumber?: string;

  wasteExplanation?: string;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      traderName: data.traderName,
      traderAccountNumber: data.traderAccountNumber,
      wasteExplanation: data.wasteExplanation,
    });
  }
}
