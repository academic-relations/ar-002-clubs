import apiFnd002, {
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

export const fundingDetailQueryKey = (fundingId: number) => [
  apiFnd002.url(fundingId),
];

export const useGetFunding = (fundingId: number) =>
  useQuery<ApiFnd002ResponseOk, Error>({
    queryKey: fundingDetailQueryKey(fundingId),
    queryFn: async (): Promise<ApiFnd002ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiFnd002.url(fundingId),
        {},
      );

      return data;
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiFnd002.url(1)).reply(() => [200, {}]);
});
