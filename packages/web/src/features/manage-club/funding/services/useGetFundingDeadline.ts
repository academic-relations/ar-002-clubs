import apiFnd007, {
  ApiFnd007ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd007";
import { FundingDeadlineEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import { useQuery } from "@tanstack/react-query";

import { axiosClient, defineAxiosMock } from "@sparcs-clubs/web/lib/axios";

const useGetFundingDeadline = () =>
  useQuery<ApiFnd007ResponseOk, Error>({
    queryKey: [apiFnd007.url()],
    queryFn: async (): Promise<ApiFnd007ResponseOk> => {
      const { data } = await axiosClient.get(apiFnd007.url(), {});

      return data;
    },
  });

export default useGetFundingDeadline;

defineAxiosMock(mock => {
  mock.onGet(apiFnd007.url()).reply(() => [
    200,
    {
      targetTerm: {
        id: 1,
        year: 2023,
        name: "여름가을",
        startTerm: new Date("2024-07-01"),
        endTerm: new Date("2024-12-30"),
      },
      deadline: {
        id: 1,
        activityDeadlineEnum: FundingDeadlineEnum.Revision,
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-12-30"),
      },
    },
  ]);
});
