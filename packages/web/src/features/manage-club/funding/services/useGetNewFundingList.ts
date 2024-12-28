import apiFnd005, {
  ApiFnd005RequestQuery,
  ApiFnd005ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd005";
import { useQuery } from "@tanstack/react-query";

import { mockupManageFunding } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

export const newActivityReportListQueryKey = (clubId: number) => [
  apiFnd005.url(),
  clubId,
];

const useGetNewFundingList = (query: ApiFnd005RequestQuery) =>
  useQuery<ApiFnd005ResponseOk, Error>({
    queryKey: newActivityReportListQueryKey(query.clubId),
    queryFn: async (): Promise<ApiFnd005ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiFnd005.url(), {
        params: query,
      });

      return apiFnd005.responseBodyMap[200].parse(data);
    },
  });

export default useGetNewFundingList;

defineAxiosMock(mock => {
  mock.onGet(apiFnd005.url()).reply(() => [
    200,
    {
      fundings: mockupManageFunding,
    },
  ]);
});
