import { useMemo } from "react";

import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import useHasAdvisor from "@sparcs-clubs/web/features/clubs/hooks/useHasAdvisor";
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
    isLoading: activityReportLoading,
    isError: activityReportError,
  } = useGetActivityReport(profile?.type ?? "undergraduate", activityId);
  const {
    data: hasProfessor,
    isLoading: hasProfessorLoading,
    isError: hasProfessorError,
  } = useHasAdvisor(activityReport?.clubId.toString() ?? "");

  const isLoading = activityReportLoading || hasProfessorLoading;
  const isError = activityReportError || hasProfessorError;

  const memoizedData = useMemo(() => {
    if (isLoading || isError || !activityReport) {
      return {} as CurrentActivityReport;
    }

    return {
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
        studentNumber: participant.studentNumber.toString(),
      })),
      professorApproval: (() => {
        if (!hasProfessor) {
          return null;
        }
        return activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending;
      })(),
      professorApprovedAt:
        activityReport.professorApprovedAt !== null
          ? activityReport.professorApprovedAt
          : undefined,
    };
  }, [activityReport, activityId, hasProfessor, isLoading, isError]);

  return {
    data: memoizedData,
    isLoading,
    isError,
  };
};

export default useGetActivityReportDetail;
