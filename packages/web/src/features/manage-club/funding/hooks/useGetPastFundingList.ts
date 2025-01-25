import useGetTermFundingList from "../services/useGetTermFundingList";
import { PastFundingData } from "../types/funding";

const useGetPastFundingList = (
  termId: number,
  clubId: number,
): {
  data: PastFundingData[];
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: fundingList,
    isLoading,
    isError,
  } = useGetTermFundingList(termId, {
    clubId,
  });

  if (isLoading || isError || !fundingList) {
    return {
      data: [],
      isLoading,
      isError,
    };
  }

  return {
    data: fundingList.fundings.map(funding => ({
      id: funding.id,
      name: funding.name,
      expenditureAmount: funding.expenditureAmount,
      approvedAmount: funding.approvedAmount,
      activityName: funding.purposeActivity?.name ?? "-",
    })),
    isLoading,
    isError,
  };
};

export default useGetPastFundingList;
