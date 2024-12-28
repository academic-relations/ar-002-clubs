import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import useGetProfessorActivityReportApproval from "../services/useGetProfessorActivityReportApproval";
import useGetProfessorCurrentActivityReportList from "../services/useGetProfessorCurrentActivityReportList";
import { ProfessorActivityReportTableData } from "../types/table";

export const useGetProfessorActivityReportList = (
  clubId: number,
): {
  data: ProfessorActivityReportTableData[];
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: activityReportList,
    isLoading: activityReportListLoading,
    isError: activityReportListError,
  } = useGetProfessorCurrentActivityReportList({
    clubId,
  });

  const {
    data: approvalStatus,
    isLoading: approvalStatusLoading,
    isError: approvalStatusError,
  } = useGetProfessorActivityReportApproval({
    clubId,
  });

  const isLoading = approvalStatusLoading || activityReportListLoading;
  const isError = approvalStatusError || activityReportListError;

  if (isLoading || isError || !activityReportList || !approvalStatus) {
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
      professorApproval: approvalStatus.isApproved
        ? ActivityProfessorApprovalEnum.Approved
        : ActivityProfessorApprovalEnum.Requested,
    })),
    isLoading,
    isError,
  };
};
