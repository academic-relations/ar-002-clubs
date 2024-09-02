import apiReg004, {
  ApiReg004ResponseOK,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";
import { useQuery } from "@tanstack/react-query";

import mockupData from "@sparcs-clubs/web/features/clubs/services/_mock/mockupRegisTermData";
import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

export const useGetRegistrationTerm = () =>
  useQuery<ApiReg004ResponseOK, Error>({
    queryKey: [apiReg004.url()],
    queryFn: async (): Promise<ApiReg004ResponseOK> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg004.url(),
        {},
      );

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
        case 304:
          return apiReg004.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg004.url()).reply(() => [200, mockupData]);
});
