import apiClb015 from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

export const useGetDelegateId = () =>
  useQuery<ApiClb015ResponseOk, Error>({
    queryKey: [apiClb015.url()],
    queryFn: async (): Promise<ApiClb015ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(apiClb015.url());
      switch (status) {
        case 200:
          return apiClb015.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock
    .onGet(apiClb015.url())
    .reply(() => [200, { clubId: 1, delegateEnumId: 1 }]);
});
