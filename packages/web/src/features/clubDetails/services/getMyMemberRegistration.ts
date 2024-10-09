import apiReg006 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

import { useQuery } from "@tanstack/react-query";

import { mockMemberRegister } from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

export const useGetMyMemberRegistration = () =>
  useQuery<ApiReg006ResponseOk, Error>({
    queryKey: [apiReg006.url()],

    queryFn: async (): Promise<ApiReg006ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg006.url(),
        {},
      );

      switch (status) {
        case 200:
        case 304:
          return apiReg006.responseBodyMap[200].parse(data);
        case 204:
          return { applies: [] };
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg006.url()).reply(() => [200, mockMemberRegister]);
});
