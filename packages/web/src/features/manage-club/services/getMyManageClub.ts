import apiClb015 from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb015ResponseNoContent,
  ApiClb015ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

export const useGetMyManageClub = () =>
  useQuery<ApiClb015ResponseOk | ApiClb015ResponseNoContent, Error>({
    queryKey: [apiClb015.url()],
    queryFn: async (): Promise<
      ApiClb015ResponseOk | ApiClb015ResponseNoContent
    > => {
      const { data, status } = await axiosClientWithAuth.get(apiClb015.url());
      switch (status) {
        case 200:
        case 304:
          return apiClb015.responseBodyMap[200].parse(data);
        case 204:
          return {};
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb015.url()).reply(() => [
    200,
    {
      clubId: 1,
      delegateEnumId: 2,
    },
  ]);
});
