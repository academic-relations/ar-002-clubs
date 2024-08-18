import apiReg002, {
  ApiReg002ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useGetClubsForRenewal = () =>
  useQuery<ApiReg002ResponseOk, Error>({
    queryKey: [apiReg002.url()],
    queryFn: async (): Promise<ApiReg002ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg002.url(),
        {},
      );

      switch (status) {
        case 200:
          return apiReg002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubsForRenewal;

defineAxiosMock(mock => {
  mock
    .onGet(apiReg002.url())
    .reply(() => [
      200,
      { clubs: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] },
    ]);
});
