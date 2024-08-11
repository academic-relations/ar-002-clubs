import apiReg003, {
  ApiReg003ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useGetClubsForPromotional = () =>
  useQuery<ApiReg003ResponseOk, Error>({
    queryKey: [apiReg003.url()],
    queryFn: async (): Promise<ApiReg003ResponseOk> => {
      const { data, status } = await axiosClient.get(apiReg003.url(), {});

      switch (status) {
        case 200:
          return apiReg003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubsForPromotional;

defineAxiosMock(mock => {
  mock
    .onGet(apiReg003.url())
    .reply(() => [200, { clubs: [{ id: 1 }, { id: 2 }, { id: 3 }] }]);
});
