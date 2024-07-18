import apiAut001, {
  ApiAut001ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const usePostLogin = async () =>
  useQuery({
    queryKey: [apiAut001.url()],
    queryFn: async (): Promise<ApiAut001ResponseOk> => {
      const { data, status } = await axiosClient.post(apiAut001.url(), {});
      switch (status) {
        case 201:
          return apiAut001.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
export default usePostLogin;
