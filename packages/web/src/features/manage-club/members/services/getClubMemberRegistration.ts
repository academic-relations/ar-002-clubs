import apiReg008 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";
import { useQuery } from "@tanstack/react-query";

import { mockRegisterMembers } from "@sparcs-clubs/web/features/manage-club/members/frames/_mock/mockMembers";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg008RequestParam,
  ApiReg008ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";

export const useGetMemberRegistration = (requestParam: ApiReg008RequestParam) =>
  useQuery<ApiReg008ResponseOk, Error>({
    queryKey: [apiReg008.url(requestParam.clubId.toString())],
    queryFn: async (): Promise<ApiReg008ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiReg008.url(requestParam.clubId.toString()),
      );

      if (data.applies.length === 0) return data;
      // return apiReg008.responseBodyMap[200].parse(data);
      return data;
    },
    enabled: !!requestParam.clubId,
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg008.url("1")).reply(() => [200, mockRegisterMembers]);
});
