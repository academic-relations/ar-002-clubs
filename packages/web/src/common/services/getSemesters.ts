import { useQuery } from "@tanstack/react-query";

import apiSem001, {
  ApiSem001RequestQuery,
  ApiSem001ResponseOK,
} from "@sparcs-clubs/interface/api/semester/apiSem001";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

const useGetSemesters = (requestQuery: ApiSem001RequestQuery) =>
  useQuery<ApiSem001ResponseOK, Error>({
    queryKey: [apiSem001.url(), requestQuery],
    queryFn: async (): Promise<ApiSem001ResponseOK> => {
      const { data } = await axiosClientWithAuth.get(apiSem001.url(), {
        params: requestQuery,
      });

      return data;
    },
  });

export default useGetSemesters;
