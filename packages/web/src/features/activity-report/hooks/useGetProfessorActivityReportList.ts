import { useMemo } from "react";

import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import useGetProfessorCurrentActivityReportList from "../services/useGetProfessorCurrentActivityReportList";
import { ProfessorActivityReportTableData } from "../types/table";

const useGetProfessorActivityReportList = (
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

  const memoizedData = useMemo(() => {
    if (isLoading || isError || !activityReportList) {
      return [];
    }

    return activityReportList.map(activityReport => ({
      ...activityReport,
      professorApproval:
        activityReport.professorApprovedAt !== null
          ? ProfessorApprovalEnum.Approved
          : ProfessorApprovalEnum.Pending,
    }));
  }, [activityReportList, isLoading, isError]);

  return {
    data: memoizedData,
    isLoading,
    isError,
  };
};

export default useGetProfessorActivityReportList;
