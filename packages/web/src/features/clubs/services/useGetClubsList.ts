import apiClb001 from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import mockupData from "@sparcs-clubs/web/features/clubs/services/_mock/mockupClubData";
import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

// ISuccessResponseType.clubs는 clubs.types.ts의 ClubInfo와 대응됩니다.
type ISuccessResponseType = z.infer<(typeof apiClb001.responseBodyMap)[200]>;

export const useGetClubsList = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiClb001.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      console.log("Try to get token");
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      if (!accessToken) {
        console.log("No access tocken avalilable");
        throw new Error("No access token available");
      }

      // Authorization 헤더에 토큰 설정
      const { data, status } = await axiosClientWithAuth.get(apiClb001.url(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiClb001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

// Mock response 설정
defineAxiosMock(mock => {
  mock.onGet(apiClb001.url()).reply(() => {
    const dummy: z.infer<(typeof apiClb001.responseBodyMap)[200]> = mockupData;
    return [200, dummy];
  });
});
