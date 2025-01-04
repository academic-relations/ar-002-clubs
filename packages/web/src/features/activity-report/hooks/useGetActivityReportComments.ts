import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import { useGetActivityReport } from "../services/useGetActivityReport";
import { Comment } from "../types/activityReport";

const useGetActivityReportComments = (
  activityId: number,
): {
  data: Comment[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { profile } = useAuth();
  const { data, isLoading, isError } = useGetActivityReport(
    profile?.type ?? "undergraduate",
    activityId,
  );

  if (isLoading || isError || !data) {
    return {
      data: [],
      isLoading,
      isError,
    };
  }

  return {
    data: data.comments,
    isLoading,
    isError,
  };
};

export default useGetActivityReportComments;
