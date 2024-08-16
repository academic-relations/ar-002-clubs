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
  console.log("Try to get token");
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  if (!accessToken) {
    console.log("No access tocken avalilable");
    throw new Error("No access token available");
  }

  const response = await axiosClientWithAuth.post<ApiReg005ResponseCreated>(
    apiReg005.url(),
    { clubId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    // 요청 본문
  );

  if (response.status === 201) {
    return apiReg005.responseBodyMap[201].parse(response.data);
  }
  throw new UnexpectedAPIResponseError();
};
