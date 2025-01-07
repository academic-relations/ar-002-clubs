import useHasAdvisor from "@sparcs-clubs/web/features/clubs/hooks/useHasAdvisor";
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
    isLoading: activityReportListLoading,
    isError: activityReportListError,
  } = useGetNewActivityReportList({
    clubId,
  });
  const {
    data: hasProfessor,
    isLoading: hasProfessorLoading,
    isError: hasProfessorError,
  } = useHasAdvisor(clubId.toString());

  const isLoading = activityReportListLoading || hasProfessorLoading;
  const isError = activityReportListError || hasProfessorError;

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
      hasProfessor,
      professorApproval: (() => {
        if (!hasProfessor) {
          return null;
        }
        return activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending;
      })(),
    })),
    isLoading,
    isError,
  };
};

export default useGetCurrentActivityReportList;
