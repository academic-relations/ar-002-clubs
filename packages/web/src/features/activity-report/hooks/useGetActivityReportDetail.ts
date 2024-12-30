import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import { useGetActivityReport } from "../services/useGetActivityReport";
import { CurrentActivityReport } from "../types/activityReport";

const useGetActivityReportDetail = (
  activityId: number,
): {
  data: CurrentActivityReport;
  isLoading: boolean;
  isError: boolean;
} => {
  const { profile } = useAuth();
  const {
    data: activityReport,
    isLoading,
    isError,
  } = useGetActivityReport(profile?.type ?? "undergraduate", activityId);

  if (isLoading || isError || !activityReport) {
    return {
      data: {} as CurrentActivityReport,
      isLoading,
      isError,
    };
  }

  return {
    data: {
      ...activityReport,
      id: activityId,
      evidenceFiles: activityReport.evidenceFiles.map(file => ({
        id: file.fileId,
        name: file.name,
        url: file.url,
      })),
      participants: activityReport.participants.map(participant => ({
        id: participant.studentId,
        name: participant.name,
        studentNumber: participant.studentNumber,
      })),
      professorApproval:
        activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending,
      professorApprovedAt:
        activityReport.professorApprovedAt !== null
          ? activityReport.professorApprovedAt
          : undefined,
    },
    isLoading,
    isError,
  };
};

export default useGetActivityReportDetail;
