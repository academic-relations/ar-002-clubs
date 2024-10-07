import apiReg014, {
  ApiReg014RequestQuery,
  ApiReg014ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg014";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

// TODO: change to apiReg024
export const useGetRegisterClub = (requestQuery: ApiReg014RequestQuery) =>
  useQuery<ApiReg014ResponseOk, Error>({
    queryKey: [apiReg014.url(), requestQuery],
    queryFn: async (): Promise<ApiReg014ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(apiReg014.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
        case 304: {
          if (data.total === 0 && data.items.length === 0 && data.offset)
            // items = []일 때 isError = true 방지
            return data;
          return data;
          // return apiReg014.responseBodyMap[200].parse(data);
        }

        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg014.url()).reply(() => [200, {}]);
});
