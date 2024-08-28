import apiReg018, {
  ApiReg018ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg018";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { MockRegistrationAvailableClubList } from "./_mocks/RegistrationAvailableClubList";

const useGetClubsForReProvisional = () =>
  useQuery<ApiReg018ResponseOk, Error>({
    queryKey: [apiReg018.url()],
    queryFn: async (): Promise<ApiReg018ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg018.url(),
        {},
      );

      switch (status) {
        case 200:
          return apiReg018.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubsForReProvisional;

defineAxiosMock(mock => {
  mock
    .onGet(apiReg018.url())
    .reply(() => [200, { clubs: MockRegistrationAvailableClubList }]);
});
