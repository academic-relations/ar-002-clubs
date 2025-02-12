import { useQuery } from "@tanstack/react-query";

import apiReg011, {
  ApiReg011RequestParam,
  ApiReg011ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import { mockMyClubRegisterDetail } from "./_mock/mockMyClubRegisterDetail";

const useGetClubRegistration = (param: ApiReg011RequestParam) =>
  useQuery<ApiReg011ResponseOk, Error>({
    queryKey: [apiReg011.url(param.applyId.toString())],
    queryFn: async (): Promise<ApiReg011ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiReg011.url(param.applyId.toString()),
        {},
      );

      return data;
    },
  });

export default useGetClubRegistration;

defineAxiosMock(mock => {
  mock.onGet(apiReg011.url("1")).reply(() => [200, mockMyClubRegisterDetail]);
});
