import { FundingDto } from "./funding.dto.model";

export class FundingNonCorporateTransaction {
  traderName?: string;

  traderAccountNumber?: string;

  wasteExplanation?: string;

  constructor(data: FundingDto) {
    Object.assign(this, {
      traderName: data.traderName,
      traderAccountNumber: data.traderAccountNumber,
      wasteExplanation: data.wasteExplanation,
    });
  }
}
