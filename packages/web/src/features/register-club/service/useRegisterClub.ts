import apiReg001, {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useRegisterClub = () =>
  useMutation<ApiReg001ResponseCreated, Error, { body: ApiReg001RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiReg001ResponseCreated> => {
      const { data, status } = await axiosClient.post(apiReg001.url(), body);

      switch (status) {
        case 201:
          return apiReg001.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useRegisterClub;

defineAxiosMock(mock => {
  mock.onPost(apiReg001.url()).reply(() => [201, {}]);
});
