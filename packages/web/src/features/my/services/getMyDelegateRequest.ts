import apiClb013 from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockMyDelegateChange } from "./_mock/mockMyDelegateChange";

import type { ApiClb013ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";

export const useGetMyDelegateRequest = () =>
  useQuery<ApiClb013ResponseOk, Error>({
    queryKey: [apiClb013.url()],
    queryFn: async (): Promise<ApiClb013ResponseOk> => {
      const { data, status } = await axiosClient.get(apiClb013.url());

      switch (status) {
        case 200:
          return apiClb013.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb013.url()).reply(() => [200, mockMyDelegateChange]);
});