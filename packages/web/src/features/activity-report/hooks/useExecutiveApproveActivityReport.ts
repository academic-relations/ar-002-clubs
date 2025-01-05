import { useMutation, useQueryClient } from "@tanstack/react-query";

import usePatchActivityExecutive from "../services/patchActivityExecutive";
import { activityReportDetailQueryKey } from "../services/useGetActivityReportForProfessor";

const useExecutiveApproveActivityReport = (activityId: number) => {
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
          },
        },
      ),
  });
};

export default useExecutiveApproveActivityReport;
