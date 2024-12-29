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
    mutationFn: ({
      purposeId,
      name,
      expenditureDate,
      expenditureAmount,
      tradeDetailExplanation,
      isFixture,
      isTransportation,
      isNonCorporateTransaction,
      isFoodExpense,
      isLaborContract,
      isExternalEventParticipationFee,
      isPublication,
      isProfitMakingActivity,
      isJointExpense,
      isEtcExpense,
      ...data
    }: FundingFormData) =>
      updateFunding(
        {
          fundingId,
          body: {
            clubId,
            purposeId: Number(purposeId),
            name,
            expenditureDate,
            expenditureAmount: Number(expenditureAmount),

            tradeEvidenceFiles: data.tradeEvidenceFiles.map(file => ({
              fileId: file.id,
            })),
            tradeDetailFiles: data.tradeDetailFiles.map(file => ({
              fileId: file.id,
            })),
            tradeDetailExplanation,

            isFixture,
            isTransportation,
            isNonCorporateTransaction,
            isFoodExpense,
            isLaborContract,
            isExternalEventParticipationFee,
            isPublication,
            isProfitMakingActivity,
            isJointExpense,
            isEtcExpense,

            ...(isActivityReportUnverifiable(Number(purposeId))
              ? {
                  clubSuppliesName: data.clubSuppliesName,
                  clubSuppliesEvidenceEnumId: data.clubSuppliesEvidenceEnumId,
                  clubSuppliesClassEnumId: data.clubSuppliesClassEnumId,
                  clubSuppliesPurpose: data.clubSuppliesPurpose,
                  clubSuppliesImageFiles: data.clubSuppliesImageFiles
                    ? data.clubSuppliesImageFiles.map(file => ({
                        fileId: file.id,
                      }))
                    : [],
                  clubSuppliesSoftwareEvidence:
                    data.clubSuppliesSoftwareEvidence,
                  clubSuppliesSoftwareEvidenceFiles:
                    data.clubSuppliesSoftwareEvidenceFiles
                      ? data.clubSuppliesSoftwareEvidenceFiles.map(file => ({
                          fileId: file.id,
                        }))
                      : [],
                  numberOfClubSupplies: Number(data.numberOfClubSupplies),
                  priceOfClubSupplies: Number(data.priceOfClubSupplies),
                }
              : {
                  clubSuppliesName: undefined,
                  clubSuppliesEvidenceEnumId: undefined,
                  clubSuppliesClassEnumId: undefined,
                  clubSuppliesPurpose: undefined,
                  clubSuppliesImageFiles: [],
                  clubSuppliesSoftwareEvidence: undefined,
                  clubSuppliesSoftwareEvidenceFiles: [],
                  numberOfClubSupplies: undefined,
                  priceOfClubSupplies: undefined,
                }),

            ...(isFixture
              ? {
                  fixtureName: data.fixtureName,
                  fixtureEvidenceEnumId: data.fixtureEvidenceEnumId,
                  fixtureClassEnumId: data.fixtureClassEnumId,
                  fixturePurpose: data.fixturePurpose,
                  fixtureImageFiles: data.fixtureImageFiles
                    ? data.fixtureImageFiles.map(file => ({
                        fileId: file.id,
                      }))
                    : [],
                  fixtureSoftwareEvidence: data.fixtureSoftwareEvidence,
                  fixtureSoftwareEvidenceFiles:
                    data.fixtureSoftwareEvidenceFiles
                      ? data.fixtureSoftwareEvidenceFiles.map(file => ({
                          fileId: file.id,
                        }))
                      : [],
                  numberOfFixture: data.numberOfFixture,
                  priceOfFixture: data.priceOfFixture,
                }
              : {
                  fixtureName: undefined,
                  fixtureEvidenceEnumId: undefined,
                  fixtureClassEnumId: undefined,
                  fixturePurpose: undefined,
                  fixtureImageFiles: [],
                  fixtureSoftwareEvidence: undefined,
                  fixtureSoftwareEvidenceFiles: [],
                  numberOfFixture: undefined,
                  priceOfFixture: undefined,
                }),

            ...(isTransportation
              ? {
                  transportationEnumId: data.transportationEnumId,
                  origin: data.origin,
                  destination: data.destination,
                  purposeOfTransportation: data.purposeOfTransportation,
                  placeValidity: data.placeValidity,
                }
              : {
                  transportationEnumId: undefined,
                  origin: undefined,
                  destination: undefined,
                  purposeOfTransportation: undefined,
                  placeValidity: undefined,
                }),

            ...(isTransportation &&
            isParticipantsRequired(data.transportationEnumId)
              ? {
                  transportationPassengers: data.transportationPassengers
                    ? data.transportationPassengers.map(participant => ({
                        studentNumber: participant.studentNumber.toString(),
                      }))
                    : [],
                }
              : { transportationPassengers: [] }),

            ...(isNonCorporateTransaction
              ? {
                  traderName: data.traderName,
                  traderAccountNumber: data.traderAccountNumber,
                  wasteExplanation: data.wasteExplanation,
                }
              : {
                  traderName: undefined,
                  traderAccountNumber: undefined,
                  wasteExplanation: undefined,
                }),

            ...(isFoodExpense
              ? {
                  foodExpenseExplanation: data.foodExpenseExplanation,
                  foodExpenseFiles: data.foodExpenseFiles.map(file => ({
                    fileId: file.id,
                  })),
                }
              : { foodExpenseExplanation: undefined, foodExpenseFiles: [] }),
            ...(isLaborContract
              ? {
                  laborContractExplanation: data.laborContractExplanation,
                  laborContractFiles: data.laborContractFiles.map(file => ({
                    fileId: file.id,
                  })),
                }
              : {
                  laborContractExplanation: undefined,
                  laborContractFiles: [],
                }),
            ...(isExternalEventParticipationFee
              ? {
                  externalEventParticipationFeeExplanation:
                    data.externalEventParticipationFeeExplanation,
                  externalEventParticipationFeeFiles:
                    data.externalEventParticipationFeeFiles.map(file => ({
                      fileId: file.id,
                    })),
                }
              : {
                  externalEventParticipationFeeExplanation: undefined,
                  externalEventParticipationFeeFiles: [],
                }),
            ...(isPublication
              ? {
                  publicationExplanation: data.publicationExplanation,
                  publicationFiles: data.publicationFiles.map(file => ({
                    fileId: file.id,
                  })),
                }
              : { publicationExplanation: undefined, publicationFiles: [] }),
            ...(isProfitMakingActivity
              ? {
                  profitMakingActivityExplanation:
                    data.profitMakingActivityExplanation,
                  profitMakingActivityFiles: data.profitMakingActivityFiles.map(
                    file => ({
                      fileId: file.id,
                    }),
                  ),
                }
              : {
                  profitMakingActivityExplanation: undefined,
                  profitMakingActivityFiles: [],
                }),
            ...(isJointExpense
              ? {
                  jointExpenseExplanation: data.jointExpenseExplanation,
                  jointExpenseFiles: data.jointExpenseFiles.map(file => ({
                    fileId: file.id,
                  })),
                }
              : { jointExpenseExplanation: undefined, jointExpenseFiles: [] }),
            ...(isEtcExpense
              ? {
                  etcExpenseExplanation: data.etcExpenseExplanation,
                  etcExpenseFiles: data.etcExpenseFiles.map(file => ({
                    fileId: file.id,
                  })),
                }
              : { etcExpenseExplanation: undefined, etcExpenseFiles: [] }),
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
