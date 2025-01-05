import { useMutation, useQueryClient } from "@tanstack/react-query";

import usePatchActivityExecutiveSendBack from "../services/patchActivityExecutiveSendBack";
import { activityReportDetailQueryKey } from "../services/useGetActivityReportForProfessor";

const useExecutiveRejectActivityReport = (activityId: number) => {
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
          },
        },
      ),
  });
};

export default useExecutiveRejectActivityReport;
