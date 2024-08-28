import apiUsr005 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr005";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiUsr005ResponseOk } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr005";

const getUserAgree = async (): Promise<ApiUsr005ResponseOk> => {
  const { data, status } = await axiosClientWithAuth.get(apiUsr005.url(), {});

  switch (status) {
    case 200:
      return apiUsr005.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default getUserAgree;

defineAxiosMock(mock => {
  mock.onGet(apiUsr005.url()).reply(() => [200, { status: { isAgree: true } }]);
});
