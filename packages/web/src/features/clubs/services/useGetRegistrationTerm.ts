import apiReg004 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import mockupData from "@sparcs-clubs/web/features/clubs/services/_mock/mockupRegisTermData";
import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiReg004.responseBodyMap)[200]>;
export const useGetRegistrationTerm = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiReg004.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg004.url(),
        {},
      );

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiReg004.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg004.url()).reply(() => {
    const dummy: z.infer<(typeof apiReg004.responseBodyMap)[200]> = mockupData;
    return [200, dummy];
  });
});
