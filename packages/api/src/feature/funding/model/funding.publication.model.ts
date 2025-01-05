import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingPublication {
  publicationExplanation?: string;

  foodExpenseFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      publicationExplanation: data.publicationExplanation,
      publicationFiles: data.publicationFiles,
    });
  }
}
