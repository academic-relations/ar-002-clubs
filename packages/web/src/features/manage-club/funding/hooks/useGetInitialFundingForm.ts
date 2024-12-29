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
  const { data: funding, isLoading, isError } = useGetFunding(fundingId);

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
      tradeEvidenceFiles: funding.tradeEvidenceFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      tradeDetailFiles: funding.tradeDetailFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      clubSuppliesImageFiles: funding.clubSuppliesImageFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      clubSuppliesSoftwareEvidenceFiles:
        funding.clubSuppliesSoftwareEvidenceFiles.map(file => ({
          id: file.id,
          name: file.name,
          url: file.link,
        })),
      fixtureImageFiles: funding.fixtureImageFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      fixtureSoftwareEvidenceFiles: funding.fixtureSoftwareEvidenceFiles.map(
        file => ({
          id: file.id,
          name: file.name,
          url: file.link,
        }),
      ),
      transportationPassengers: funding.transportationPassengers.map(
        participant => ({
          id: participant.id,
          name: participant.name,
          studentNumber: participant.studentNumber,
        }),
      ),

      foodExpenseFiles: funding.foodExpenseFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      laborContractFiles: funding.laborContractFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      externalEventParticipationFeeFiles:
        funding.externalEventParticipationFeeFiles.map(file => ({
          id: file.id,
          name: file.name,
          url: file.link,
        })),
      publicationFiles: funding.publicationFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      profitMakingActivityFiles: funding.profitMakingActivityFiles.map(
        file => ({
          id: file.id,
          name: file.name,
          url: file.link,
        }),
      ),
      jointExpenseFiles: funding.jointExpenseFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
      etcExpenseFiles: funding.etcExpenseFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: file.link,
      })),
    },
    isLoading,
    isError,
  };
};

export default useGetInitialFundingFormData;
