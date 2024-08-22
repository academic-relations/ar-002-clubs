import apiReg014, {
  ApiReg014ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg014";
import { useQuery } from "@tanstack/react-query";

import { mockRegisterClub } from "@sparcs-clubs/web/features/executive/register-club/services/_mock/mockRegisterClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

export const useGetRegisterClub = () =>
  useQuery<ApiReg014ResponseOk, Error>({
    queryKey: [apiReg014.url()],
    queryFn: async (): Promise<ApiReg014ResponseOk> => {
      const { data, status } = await axiosClient.get(apiReg014.url(), {});

      switch (status) {
        case 200:
          return apiReg014.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

// Mock response 설정
defineAxiosMock(mock => {
  mock.onGet(apiReg014.url()).reply(() => [200, mockRegisterClub]);
});
