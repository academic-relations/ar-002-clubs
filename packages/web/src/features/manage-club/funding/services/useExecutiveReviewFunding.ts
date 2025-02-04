import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fundingDetailQueryKey } from "./useGetFunding";
import usePostFundingReview from "./usePostFundingReview";

const useExecutiveReviewFunding = (fundingId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync: approveFunding } = usePostFundingReview();

  return useMutation({
    mutationFn: ({
      fundingStatusEnum,
      approvedAmount,
      content,
    }: {
      fundingStatusEnum: FundingStatusEnum;
      approvedAmount: number;
      content: string;
    }) =>
      approveFunding(
        {
          param: { id: fundingId },
          body: { fundingStatusEnum, approvedAmount, content },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: fundingDetailQueryKey("executive", fundingId),
            });
          },
        },
      ),
  });
};

export default useExecutiveReviewFunding;
