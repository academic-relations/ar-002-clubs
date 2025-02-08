import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiAct024 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct024";

import usePatchActivityExecutive from "../services/patchActivityExecutive";
import { activityReportDetailQueryKey } from "../services/useGetActivityReport";

const useExecutiveApproveActivityReport = (
  activityId: number,
  clubId: number,
) => {
  const queryClient = useQueryClient();
  const { mutateAsync: approveActivityReport } = usePatchActivityExecutive({
    activityId,
  });

  return useMutation({
    mutationFn: () =>
      approveActivityReport(
        { body: {} },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: activityReportDetailQueryKey("executive", activityId),
            });
            queryClient.invalidateQueries({
              queryKey: ["executiveChargedActivities"],
            });
            queryClient.invalidateQueries({
              queryKey: [apiAct024.url(), clubId],
            });
          },
        },
      ),
  });
};

export default useExecutiveApproveActivityReport;
