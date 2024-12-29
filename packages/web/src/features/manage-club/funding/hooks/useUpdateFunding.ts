import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isParticipantsRequired } from "@sparcs-clubs/web/utils/isTransportation";

import { fundingDetailQueryKey } from "../services/useGetFunding";
import { usePutFunding } from "../services/usePutFunding";
import {
  FundingFormData,
  isActivityReportUnverifiable,
} from "../types/funding";

const useUpdateFunding = (fundingId: number, clubId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateFunding } = usePutFunding();

  return useMutation({
    mutationFn: (data: FundingFormData) =>
      updateFunding(
        {
          fundingId,
          body: {
            ...data,
            clubId,

            tradeEvidenceFiles: data.tradeEvidenceFiles.map(file => ({
              fileId: file.id,
            })),
            tradeDetailFiles: data.tradeDetailFiles.map(file => ({
              fileId: file.id,
            })),

            ...(isActivityReportUnverifiable(Number(data.purposeId))
              ? {
                  clubSuppliesName: data.clubSuppliesName,
                  clubSuppliesEvidenceEnumId: data.clubSuppliesEvidenceEnumId,
                  clubSuppliesClassEnumId: data.clubSuppliesClassEnumId,
                  clubSuppliesPurpose: data.clubSuppliesPurpose,
                  clubSuppliesImageFiles: data.clubSuppliesImageFiles.map(
                    file => ({
                      fileId: file.id,
                    }),
                  ),
                  clubSuppliesSoftwareEvidence:
                    data.clubSuppliesSoftwareEvidence,
                  clubSuppliesSoftwareEvidenceFiles:
                    data.clubSuppliesSoftwareEvidenceFiles.map(file => ({
                      fileId: file.id,
                    })),
                  numberOfClubSupplies: data.numberOfClubSupplies,
                  priceOfClubSupplies: data.priceOfClubSupplies,
                }
              : {
                  clubSuppliesImageFiles: [],
                  clubSuppliesSoftwareEvidenceFiles: [],
                }),

            ...(data.isFixture
              ? {
                  fixtureName: data.fixtureName,
                  fixtureEvidenceEnumId: data.fixtureEvidenceEnumId,
                  fixtureClassEnumId: data.fixtureClassEnumId,
                  fixturePurpose: data.fixturePurpose,
                  fixtureImageFiles: data.fixtureImageFiles.map(file => ({
                    fileId: file.id,
                  })),
                  fixtureSoftwareEvidence: data.fixtureSoftwareEvidence,
                  fixtureSoftwareEvidenceFiles:
                    data.fixtureSoftwareEvidenceFiles.map(file => ({
                      fileId: file.id,
                    })),
                  numberOfFixture: data.numberOfFixture,
                  priceOfFixture: data.priceOfFixture,
                }
              : { fixtureImageFiles: [], fixtureSoftwareEvidenceFiles: [] }),

            ...(data.isTransportation
              ? {
                  transportationEnumId: data.transportationEnumId,
                  origin: data.origin,
                  destination: data.destination,
                  purposeOfTransportation: data.purposeOfTransportation,
                  placeValidity: data.placeValidity,
                }
              : {}),

            ...(data.isTransportation &&
            isParticipantsRequired(data.transportationEnumId)
              ? {
                  transportationPassengers: data.transportationPassengers.map(
                    participant => ({
                      studentNumber: participant.studentNumber.toString(),
                    }),
                  ),
                }
              : { transportationPassengers: [] }),

            ...(data.isNonCorporateTransaction
              ? {
                  traderName: data.traderName,
                  traderAccountNumber: data.traderAccountNumber,
                  wasteExplanation: data.wasteExplanation,
                }
              : {}),

            foodExpenseFiles: data.isFoodExpense
              ? data.foodExpenseFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
            laborContractFiles: data.isLaborContract
              ? data.laborContractFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
            externalEventParticipationFeeFiles:
              data.isExternalEventParticipationFee
                ? data.externalEventParticipationFeeFiles.map(file => ({
                    fileId: file.id,
                  }))
                : [],
            publicationFiles: data.isPublication
              ? data.publicationFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
            profitMakingActivityFiles: data.isProfitMakingActivity
              ? data.profitMakingActivityFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
            jointExpenseFiles: data.isJointExpense
              ? data.jointExpenseFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
            etcExpenseFiles: data.isEtcExpense
              ? data.etcExpenseFiles.map(file => ({
                  fileId: file.id,
                }))
              : [],
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: fundingDetailQueryKey(fundingId),
            });
          },
        },
      ),
  });
};

export default useUpdateFunding;
