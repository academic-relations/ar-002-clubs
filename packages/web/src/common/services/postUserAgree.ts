import apiUsr004, {
  ApiUsr004ResponseCreated,
} from "@sparcs-clubs/interface/api/user/endpoint/apiUsr004";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const postUserAgree = async (): Promise<ApiUsr004ResponseCreated> => {
  const { status } = await axiosClientWithAuth.post(apiUsr004.url(), {});

  switch (status) {
    case 201:
      return apiUsr004.responseBodyMap[201];
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPost(apiUsr004.url()).reply(() => [201, {}]);
});
export default postUserAgree;
