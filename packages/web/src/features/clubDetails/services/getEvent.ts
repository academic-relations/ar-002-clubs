import apiReg004 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupEvents } from "./_mock/mockupEvent";

import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

export const useGetEvents = () =>
  useQuery<ApiReg004ResponseOK, Error>({
    queryKey: [apiReg004.url()],

    queryFn: async (): Promise<ApiReg004ResponseOK> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg004.url(),
        {},
      );

      console.log(data);
      switch (status) {
        case 200:
          return apiReg004.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg004.url()).reply(() => [200, mockupEvents]);
});
