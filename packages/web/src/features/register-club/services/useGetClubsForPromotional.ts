import apiReg003, {
  ApiReg003ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { MockRegistrationAvailableClubList } from "./_mocks/RegistrationAvailableClubList";

const useGetClubsForPromotional = () =>
  useQuery<ApiReg003ResponseOk, Error>({
    queryKey: [apiReg003.url()],
    queryFn: async (): Promise<ApiReg003ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg003.url(),
        {},
      );

      switch (status) {
        case 200:
        case 304:
          return data;
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubsForPromotional;

defineAxiosMock(mock => {
  mock
    .onGet(apiReg003.url())
    .reply(() => [200, { clubs: MockRegistrationAvailableClubList }]);
});
