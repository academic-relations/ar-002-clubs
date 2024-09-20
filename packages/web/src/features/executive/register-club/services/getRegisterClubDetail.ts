import apiReg015, {
  ApiReg015RequestParam,
  ApiReg015ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg015";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockRegisterClub } from "./_mock/mockRegisterClub";

const useRegisterClubDetail = (requestParam: ApiReg015RequestParam) =>
  useQuery<ApiReg015ResponseOk, Error>({
    queryKey: [apiReg015.url(requestParam.applyId.toString())],
    queryFn: async (): Promise<ApiReg015ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg015.url(requestParam.applyId.toString()),
        {},
      );

      switch (status) {
        case 200:
        case 304:
          // return apiReg015.responseBodyMap[200].parse(data);
          return data;
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useRegisterClubDetail;

defineAxiosMock(mock => {
  mock.onGet(apiReg015.url("1")).reply(() => [200, mockRegisterClub]);
});
