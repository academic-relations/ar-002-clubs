import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import useGetProfessorCurrentActivityReportList from "../services/useGetProfessorCurrentActivityReportList";
import { ProfessorActivityReportTableData } from "../types/table";

const useGetProfessorManageClubActivityReportList = (
  clubId: number,
): {
  data: ProfessorActivityReportTableData[];
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
      id: activityReport.id,
      activityStatusEnumId: activityReport.activityStatusEnumId,
      name: activityReport.name,
      activityTypeEnumId: activityReport.activityTypeEnumId,
      durations: activityReport.durations.map(duration => ({
        startTerm: new Date(duration.startTerm),
        endTerm: new Date(duration.endTerm),
      })),
      professorApproval:
        activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending,
    })),
    isLoading,
    isError,
  };
};

export default useGetProfessorManageClubActivityReportList;
