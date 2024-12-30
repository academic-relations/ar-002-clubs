import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityReportDetailQueryKey } from "../services/useGetActivityReport";
import usePostProfessorApproveActivityReport from "../services/useProfessorApproveActivityReport";

const useProfessorApproveSingleActivityReport = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: approveActivityReport } =
    usePostProfessorApproveActivityReport();

  return useMutation({
    mutationFn: (activityId: number) =>
      approveActivityReport(
        {
          body: {
            activities: [{ id: activityId }],
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: activityReportDetailQueryKey("professor", activityId),
            });
          },
        },
      ),
  });
};

export default useProfessorApproveSingleActivityReport;
