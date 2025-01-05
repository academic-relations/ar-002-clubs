import { FundingResponseDto } from "./funding.response-dto.model";

export class FundingExternalEventParticipationFee {
  externalEventParticipationFeeExplanation?: string;

  externalEventParticipationFeeFiles: Array<{ fileId: string }>;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      externalEventParticipationFeeExplanation:
        data.externalEventParticipationFeeExplanation,
      externalEventParticipationFeeFiles:
        data.externalEventParticipationFeeFiles,
    });
  }
}
