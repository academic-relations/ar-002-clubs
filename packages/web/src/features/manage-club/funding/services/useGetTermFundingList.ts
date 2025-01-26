import apiFnd006, {
  ApiFnd006RequestQuery,
  ApiFnd006ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd006";
import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

export const pastFundingListQueryKey = (semesterId: number, clubId: number) => [
  apiFnd006.url(semesterId),
  clubId,
];

const useGetTermFundingList = (
  semesterId: number,
  query: ApiFnd006RequestQuery,
) =>
  useQuery<ApiFnd006ResponseOk, Error>({
    queryKey: pastFundingListQueryKey(semesterId, query.clubId),
    queryFn: async (): Promise<ApiFnd006ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiFnd006.url(semesterId),
        {
          params: query,
        },
      );

      return data;
    },
  });

export default useGetTermFundingList;

const baseUrl = `/student/fundings/semesters/semester/`;

defineAxiosMock(mock => {
  mock.onGet(new RegExp(`^${baseUrl}\\d+$`)).reply(() => [
    200,
    {
      fundings: [
        {
          id: 1,
          fundingStatusEnum: FundingStatusEnum.Applied,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
        {
          id: 2,
          fundingStatusEnum: FundingStatusEnum.Applied,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
        {
          id: 3,
          fundingStatusEnum: FundingStatusEnum.Applied,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
        {
          id: 4,
          fundingStatusEnum: FundingStatusEnum.Rejected,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
        {
          id: 5,
          fundingStatusEnum: FundingStatusEnum.Rejected,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
        {
          id: 6,
          fundingStatusEnum: FundingStatusEnum.Approved,
          name: "개발개발한 어떠한 활동",
          expenditureAmount: 300000,
          approvedAmount: 200000,
          purposeActivity: { id: 1, name: "지출목적" },
        },
      ],
    },
  ]);
});
