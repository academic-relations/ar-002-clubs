import { FundingDto } from "./funding.dto.model";

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

  constructor(data: FundingDto) {
    Object.assign(this, data);
  }
}
