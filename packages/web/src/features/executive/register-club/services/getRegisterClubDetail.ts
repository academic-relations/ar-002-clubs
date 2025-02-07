import { useQuery } from "@tanstack/react-query";

import apiReg015, {
  ApiReg015RequestParam,
  ApiReg015ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg015";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import { mockRegisterClub } from "./_mock/mockRegisterClub";

const useRegisterClubDetail = (requestParam: ApiReg015RequestParam) =>
  useQuery<ApiReg015ResponseOk, Error>({
    queryKey: [apiReg015.url(requestParam.applyId.toString())],
    queryFn: async (): Promise<ApiReg015ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiReg015.url(requestParam.applyId.toString()),
        {},
      );

      // return apiReg015.responseBodyMap[200].parse(data);
      return data;
    },
  });

export default useRegisterClubDetail;

defineAxiosMock(mock => {
  mock.onGet(apiReg015.url("1")).reply(() => [200, mockRegisterClub]);
});
