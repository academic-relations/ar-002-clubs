import apiReg022, {
  ApiReg022RequestParam,
  ApiReg022ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg022";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockMyClubRegisterDetail } from "./_mock/mockMyClubRegisterDetail";

const useGetClubRegistrationProfessor = (param: ApiReg022RequestParam) =>
  useQuery<ApiReg022ResponseOk, Error>({
    queryKey: [apiReg022.url(param.applyId.toString())],
    queryFn: async (): Promise<ApiReg022ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg022.url(param.applyId.toString()),
        {},
      );

      switch (status) {
        case 200:
        case 304:
          return data;
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubRegistrationProfessor;

defineAxiosMock(mock => {
  mock.onGet(apiReg022.url("1")).reply(() => [200, mockMyClubRegisterDetail]);
});
