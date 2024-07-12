import { apiTmp000 } from "@sparcs-clubs/interface/api/_example/endpoints/apiTmp000";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

// TODO: This might better work using z.discriminatedUnion
type ISuccessResponseType =
  | z.infer<(typeof apiTmp000.responseBodyMap)[200]>
  | z.infer<(typeof apiTmp000.responseBodyMap)[201]>;
type IRequestQueryType = z.infer<typeof apiTmp000.requestQuery>;

export const useGetTemporaryClubSubfeature = (
  id: string,
  page: string,
  limit: string,
  additional: string,
) => {
  const requestQuery: IRequestQueryType = { page, limit, additional };

  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiTmp000.url(id), requestQuery],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiTmp000.url(id), {
        params: requestQuery,
      });

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiTmp000.responseBodyMap[200].parse(data);
        case 201:
          return apiTmp000.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiTmp000.url("1")).reply(() => {
    const dummy: z.infer<(typeof apiTmp000.responseBodyMap)[200]> = {
      page: 1,
      total: 1,
      limit: 10,
      name: "dummy",
      age: 20,
    };

    return [200, dummy];
  });
});
