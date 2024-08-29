import apiAcf002 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf002";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockupUserClubs from "./_mock/mockupUserClubs";

type ISuccessResponseType = z.infer<(typeof apiAcf002.responseBodyMap)[200]>;

export const useGetUserClubs = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAcf002.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiAcf002.url(),
        {},
      );

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiAcf002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiAcf002.url()).reply(() => {
    const dummy: z.infer<(typeof apiAcf002.responseBodyMap)[200]> =
      mockupUserClubs;
    return [200, dummy];
  });
});
