import apiUsr002, {
  ApiUsr002RequestQuery,
  ApiUsr002ResponseOk,
} from "@sparcs-clubs/interface/api/user/endpoint/apiUsr002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useUserPhoneNumber = (requestQuery: ApiUsr002RequestQuery) =>
  useQuery<ApiUsr002ResponseOk, Error>({
    queryKey: [apiUsr002.url(), requestQuery],
    queryFn: async (): Promise<ApiUsr002ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(apiUsr002.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiUsr002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useUserPhoneNumber;

defineAxiosMock(mock => {
  mock
    .onGet(apiUsr002.url())
    .reply(() => [200, { phoneNumber: "010-0000-0000" }]);
});
