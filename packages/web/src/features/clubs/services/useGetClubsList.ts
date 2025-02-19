import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import apiClb001 from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

import mockupData from "@sparcs-clubs/web/features/clubs/services/_mock/mockupClubData";
import { axiosClient, defineAxiosMock } from "@sparcs-clubs/web/lib/axios";

// ISuccessResponseType.clubs는 clubs.types.ts의 ClubInfo와 대응됩니다.
type ISuccessResponseType = z.infer<(typeof apiClb001.responseBodyMap)[200]>;

export const useGetClubsList = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiClb001.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data } = await axiosClient.get(apiClb001.url(), {});

      // return apiClb001.responseBodyMap[200].parse(data);
      return data;
    },
  });

// Mock response 설정
defineAxiosMock(mock => {
  mock.onGet(apiClb001.url()).reply(() => {
    const dummy: z.infer<(typeof apiClb001.responseBodyMap)[200]> = mockupData;
    return [200, dummy];
  });
});
