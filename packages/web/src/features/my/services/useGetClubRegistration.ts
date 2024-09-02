import apiReg011, {
  ApiReg011RequestParam,
  ApiReg011ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockMyClubRegisterDetail } from "./_mock/mockMyClubRegisterDetail";

const useGetClubRegistration = (param: ApiReg011RequestParam) =>
  useQuery<ApiReg011ResponseOk, Error>({
    queryKey: [apiReg011.url(param.applyId.toString())],
    queryFn: async (): Promise<ApiReg011ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg011.url(param.applyId.toString()),
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

export default useGetClubRegistration;

defineAxiosMock(mock => {
  mock.onGet(apiReg011.url("1")).reply(() => [200, mockMyClubRegisterDetail]);
});
