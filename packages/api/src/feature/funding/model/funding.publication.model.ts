import { FundingDto } from "./funding.dto.model";

export class FundingPublication {
  publicationExplanation?: string;

  publicationFiles: Array<{ fileId: string; name: string; link: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      publicationExplanation: data.publicationExplanation,
      publicationFiles: data.publicationFiles,
    });
  }
}
