import apiAut002, {
  ApiAut002ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockAccessToken from "./_mock/mockAccessToken";

const usePostRefresh = async () =>
  useQuery({
    queryKey: [apiAut002.url()],
    queryFn: async (): Promise<ApiAut002ResponseOk> => {
      const { data, status } = await axiosClient.post(apiAut002.url(), {});
      switch (status) {
        case 200:
          console.log("refresh");
          return apiAut002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiAut002.url()).reply(() => [200, mockAccessToken]);
});
export default usePostRefresh;
