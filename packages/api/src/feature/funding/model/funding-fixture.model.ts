import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingFixture {
  fixtureName: string;

  fixtureEvidenceEnumId: number;

  fixtureClassEnumId: number;

  fixturePurpose: string;

  fixtureSoftwareEvidence?: string;

  fixtureImageFiles: Array<{ fileId: string }>;

  fixtureSoftwareEvidenceFiles: Array<{ fileId: string }>;

  numberOfFixture: number;

  priceOfFixture: number;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      fixtureName: data.fixtureName,
      fixtureEvidenceEnumId: data.fixtureEvidenceEnumId,
      fixtureClassEnumId: data.fixtureClassEnumId,
      fixturePurpose: data.fixturePurpose,
      fixtureSoftwareEvidence: data.fixtureSoftwareEvidence,
      fixtureImageFiles: data.fixtureImageFiles,
      fixtureSoftwareEvidenceFiles: data.fixtureSoftwareEvidenceFiles,
      numberOfFixture: data.numberOfFixture,
      priceOfFixture: data.priceOfFixture,
    });
  }
}
