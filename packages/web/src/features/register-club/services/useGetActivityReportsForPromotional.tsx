import apiAct011, {
  ApiAct011RequestQuery,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAct011.responseBodyMap)[200]>;
export const useGetActivityReportsForPromotional = (
  query: ApiAct011RequestQuery,
) =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAct011.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.get(apiAct011.url(), {
        params: query,
      });

      switch (status) {
        case 200:
          return apiAct011.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
