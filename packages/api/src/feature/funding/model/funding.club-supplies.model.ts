import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingClubSupplies {
  clubSuppliesName?: string;

  clubSuppliesEvidenceEnumId?: number;

  clubSuppliesClassEnumId?: number;

  clubSuppliesPurpose?: string;

  clubSuppliesSoftwareEvidence?: string;

  clubSuppliesImageFiles?: Array<{ fileId: string }>;

  clubSuppliesSoftwareEvidenceFiles?: Array<{ fileId: string }>;

  numberOfClubSupplies?: number;

  priceOfClubSupplies?: number;

  constructor(data: FundingResponseDto) {
    Object.assign(this, data);
  }
}
