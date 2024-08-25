import apiReg009, {
  ApiReg009RequestBody,
  ApiReg009RequestParam,
  ApiReg009ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const usePutClubRegistration = (param: ApiReg009RequestParam) =>
  useMutation<ApiReg009ResponseOk, Error, { body: ApiReg009RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiReg009ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiReg009.url(param.applyId.toString()),
        body,
      );

      switch (status) {
        case 200:
          return apiReg009.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default usePutClubRegistration;

defineAxiosMock(mock => {
  mock.onPut(apiReg009.url("1")).reply(() => [200, {}]);
});
