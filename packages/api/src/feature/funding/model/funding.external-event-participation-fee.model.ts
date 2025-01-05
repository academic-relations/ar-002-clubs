import { FundingDto } from "./funding.dto.model";

export class FundingExternalEventParticipationFee {
  externalEventParticipationFeeExplanation?: string;

  externalEventParticipationFeeFiles: Array<{ fileId: string }>;

  constructor(data: FundingDto) {
    Object.assign(this, {
      externalEventParticipationFeeExplanation:
        data.externalEventParticipationFeeExplanation,
      externalEventParticipationFeeFiles:
        data.externalEventParticipationFeeFiles,
    });
  }
}
