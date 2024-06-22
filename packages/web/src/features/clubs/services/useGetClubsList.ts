import apiClb001 from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import mockupData from "@sparcs-clubs/web/features/clubs/services/_mock/mockupClubData";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

// ISuccessResponseType.clubs는 clubs.types.ts의 ClubInfo와 대응됩니다.
// ClubType의 타입이 불일치하기 때문에, 사용 이전에 ClubType Enum에 매칭하는 과정이 필요합니다.
type ISuccessResponseType = z.infer<(typeof apiClb001.responseBodyMap)[200]>;

export const useGetClubsList = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiClb001.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiClb001.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiClb001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb001.url()).reply(() => {
    const dummy: z.infer<(typeof apiClb001.responseBodyMap)[200]> = mockupData;
    return [200, dummy];
  });
});
