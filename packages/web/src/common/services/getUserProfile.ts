import apiUsr001 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockupUserProfile from "./_mock/mockupUserProfile";

import type { ApiUsr001ResponseOK } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";

const useGetUserProfile = () =>
  useQuery<ApiUsr001ResponseOK, Error>({
    queryKey: [apiUsr001.url()],
    queryFn: async (): Promise<ApiUsr001ResponseOK> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiUsr001.url(),
        {},
      );

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
        case 304:
          // return apiUsr001.responseBodyMap[200].parse(data);
          return data;
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiUsr001.url()).reply(() => [200, mockupUserProfile]);
});

export default useGetUserProfile;
