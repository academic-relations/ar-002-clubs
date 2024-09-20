import apiReg009, {
  ApiReg009RequestBody,
  ApiReg009RequestParam,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiReg009.responseBodyMap)[200]>;

const usePutClubRegistration = () =>
  useMutation<
    ISuccessResponseType,
    Error,
    { requestParam: ApiReg009RequestParam; body: ApiReg009RequestBody }
  >({
    mutationFn: async ({
      requestParam,
      body,
    }): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiReg009.url(requestParam.applyId),
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
