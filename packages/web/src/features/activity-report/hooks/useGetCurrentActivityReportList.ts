import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import useGetNewActivityReportList from "../services/useGetNewActivityReportList";
import { ActivityReportTableData } from "../types/table";

const useGetCurrentActivityReportList = (
  clubId: number,
): {
  data: ActivityReportTableData[];
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: activityReportList,
    isLoading,
    isError,
  } = useGetNewActivityReportList({
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
    data: activityReportList.map(activityReport => ({
      ...activityReport,
      professorApproval:
        activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending,
    })),
    isLoading,
    isError,
  };
};

export default useGetCurrentActivityReportList;
