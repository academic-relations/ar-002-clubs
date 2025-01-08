import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activityReportDetailQueryKey } from "../services/useGetActivityReport";
import { usePutActivityReport } from "../services/usePutActivityReport";
import { ActivityReportFormData } from "../types/form";

const useUpdateActivityReport = (activityId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateActivityReport } = usePutActivityReport();

  return useMutation({
    mutationFn: (data: ActivityReportFormData) =>
      updateActivityReport(
        {
          activityId,
          body: {
            ...data,
            evidenceFiles: data.evidenceFiles.map(file => ({
              fileId: file.id,
            })),
            participants: data.participants.map(participant => ({
              studentId: participant.id,
            })),
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: activityReportDetailQueryKey(
                "undergraduate",
                activityId,
              ),
            });
          },
        },
      ),
  });
};

export default useUpdateActivityReport;
