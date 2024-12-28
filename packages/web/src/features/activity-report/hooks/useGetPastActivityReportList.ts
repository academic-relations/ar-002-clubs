import useGetTermActivityReportList from "../services/useGetTermActivityReportList";
import { PastActivityReportTableData } from "../types/table";

const useGetPastActivityReportList = (
  termId: number,
  clubId: number,
): {
  data: PastActivityReportTableData[];
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: activityReportList,
    isLoading,
    isError,
  } = useGetTermActivityReportList(termId, {
    clubId,
  });

  if (isLoading || isError || !activityReportList) {
    return {
      data: [],
      isLoading,
      isError,
    };
  }

  return {
    data: activityReportList.activities,
    isLoading,
    isError,
  };
};

export default useGetPastActivityReportList;
