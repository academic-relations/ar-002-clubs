import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import { useGetFunding } from "../services/useGetFunding";
import { FundingFormData } from "../types/funding";

const useGetInitialFundingFormData = (
  fundingId: number,
): {
  data: FundingFormData;
  isLoading: boolean;
  isError: boolean;
} => {
  const { profile } = useAuth();
  const {
    data: funding,
    isLoading,
    isError,
  } = useGetFunding("undergraduate", fundingId);

  if (profile?.type !== "undergraduate") {
    return {
      data: {} as FundingFormData,
      isLoading: false,
      isError: true,
    };
  }

  if (isLoading || isError || !funding) {
    return {
      data: {} as FundingFormData,
      isLoading,
      isError,
    };
  }

  return {
    data: {
      ...funding,
      // 동아리 용품 증빙
      clubSuppliesName: funding.clubSupplies?.name,
      clubSuppliesEvidenceEnum: funding.clubSupplies?.evidenceEnum,
      clubSuppliesClassEnum: funding.clubSupplies?.classEnum,
      clubSuppliesPurpose: funding.clubSupplies?.purpose,
      clubSuppliesImageFiles: funding.clubSupplies?.imageFiles ?? [],
      clubSuppliesSoftwareEvidence: funding.clubSupplies?.softwareEvidence,
      clubSuppliesSoftwareEvidenceFiles:
        funding.clubSupplies?.softwareEvidenceFiles ?? [],
      numberOfClubSupplies: funding.clubSupplies?.number,
      priceOfClubSupplies: funding.clubSupplies?.price,

      // 비품 증빙
      fixtureName: funding.fixture?.name,
      fixtureEvidenceEnum: funding.fixture?.evidenceEnum,
      fixtureClassEnum: funding.fixture?.classEnum,
      fixturePurpose: funding.fixture?.purpose,
      fixtureImageFiles: funding.fixture?.imageFiles ?? [],
      fixtureSoftwareEvidence: funding.fixture?.softwareEvidence,
      fixtureSoftwareEvidenceFiles:
        funding.fixture?.softwareEvidenceFiles ?? [],
      numberOfFixture: funding.fixture?.number,
      priceOfFixture: funding.fixture?.price,

      // 교통비 증빙
      transportationEnum: funding.transportation?.enum,
      origin: funding.transportation?.origin,
      destination: funding.transportation?.destination,
      purposeOfTransportation: funding.transportation?.purpose,
      transportationPassengers: funding.transportation?.passengers ?? [],

      // 비법인 거래 증빙
      traderName: funding.nonCorporateTransaction?.traderName,
      traderAccountNumber: funding.nonCorporateTransaction?.traderAccountNumber,
      wasteExplanation: funding.nonCorporateTransaction?.wasteExplanation,
      nonCorporateTransactionFiles:
        funding.nonCorporateTransaction?.files ?? [],

      // 식비, 근로 계약, 외부 행사 참가비, 발간물, 수익 사업, 공동 경비, 기타 증빙
      foodExpenseExplanation: funding.foodExpense?.explanation,
      laborContractExplanation: funding.laborContract?.explanation,
      externalEventParticipationFeeExplanation:
        funding.externalEventParticipationFee?.explanation,
      publicationExplanation: funding.publication?.explanation,
      profitMakingActivityExplanation:
        funding.profitMakingActivity?.explanation,
      jointExpenseExplanation: funding.jointExpense?.explanation,
      etcExpenseExplanation: funding.etcExpense?.explanation,

      foodExpenseFiles: funding.foodExpense?.files ?? [],
      laborContractFiles: funding.laborContract?.files ?? [],
      externalEventParticipationFeeFiles:
        funding.externalEventParticipationFee?.files ?? [],
      publicationFiles: funding.publication?.files ?? [],
      profitMakingActivityFiles: funding.profitMakingActivity?.files ?? [],
      jointExpenseFiles: funding.jointExpense?.files ?? [],
      etcExpenseFiles: funding.etcExpense?.files ?? [],
    },
    isLoading,
    isError,
  };
};

export default useGetInitialFundingFormData;
