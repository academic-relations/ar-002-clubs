/*

아래 코드는 ApiAcf001이 유저 데이터(학번, 동아리 목록 등)를 가져오는 api인줄 알고 잘못 만든 코드입니다
TODO - 유저 데이터를 가져오는 api가 나오면 그걸 기반으로 아래 코드 정상적으로 바꿔주기

*/

import apiAcf001 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import mockUpUserInfo from "@sparcs-clubs/web/features/activity-certificate/services/_mock/mockupUserInfo";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAcf001.responseBodyMap)[201]>;

export const useGetUserInfo = () =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAcf001.url()],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiAcf001.url(), {});

      switch (status) {
        case 201:
          return apiAcf001.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiAcf001.url()).reply(() => {
    const dummy: z.infer<(typeof apiAcf001.responseBodyMap)[201]> =
      mockUpUserInfo;
    return [201, dummy];
  });
});
