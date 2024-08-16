import apiReg005 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg005";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiReg005ResponseCreated } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg005";

// 동아리 가입을 생성하는 요청을 처리하는 함수
export const useRegisterClub = async (
  clubId: number,
): Promise<ApiReg005ResponseCreated> => {
  const { data, status } = await axiosClientWithAuth.post(apiReg005.url(), {
    clubId,
  });

  switch (status) {
    case 201:
      return apiReg005.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};
