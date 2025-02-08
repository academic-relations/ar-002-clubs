import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiAct024 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct024";

import usePatchActivityExecutiveSendBack from "../services/patchActivityExecutiveSendBack";
import { activityReportDetailQueryKey } from "../services/useGetActivityReport";

const useExecutiveRejectActivityReport = (
  activityId: number,
  clubId: number,
) => {
  const queryClient = useQueryClient();
  const { mutateAsync: rejectActivityReport } =
    usePatchActivityExecutiveSendBack({ activityId });

  return useMutation({
    mutationFn: (comment: string) =>
      rejectActivityReport(
        { body: { comment } },
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

export default useExecutiveRejectActivityReport;
