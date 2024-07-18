import apiAut003, {
  ApiAut003ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut003";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const usePostLogout = async () =>
  useQuery({
    queryKey: [apiAut003.url()],
    queryFn: async (): Promise<ApiAut003ResponseOk> => {
      const { data, status } = await axiosClient.post(apiAut003.url(), {});
      switch (status) {
        case 200:
          console.log("logout");
          return apiAut003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiAut003.url()).reply(() => [200, {}]);
});
export default usePostLogout;
