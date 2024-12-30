import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import useGetProfessorCurrentActivityReportList from "../services/useGetProfessorCurrentActivityReportList";
import { ActivityReportTableData } from "../types/table";

const useGetProfessorActivityReportList = (
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
  } = useGetProfessorCurrentActivityReportList({
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

export default useGetProfessorActivityReportList;
