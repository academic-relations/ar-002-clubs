import apiAut001, {
  ApiAut001ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";
import { Cookies } from "react-cookie";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockAccessToken from "./_mock/mockAccessToken";

const getLogin = async (): Promise<ApiAut001ResponseOk> => {
  const currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;

  const { data, status } = await axiosClient.get(apiAut001.url(), {
    params: { next: currentUrl },
  });

  switch (status) {
    case 200:
      return apiAut001.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onGet(apiAut001.url()).reply(() => [200, { url: "/" }]);
  const cookies = new Cookies();
  cookies.set("accessToken", mockAccessToken.accessToken);
});
export default getLogin;