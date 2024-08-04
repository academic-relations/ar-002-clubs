import apiAut003, {
  ApiAut003ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut003";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const postLogout = async (): Promise<ApiAut003ResponseOk> => {
  const { status } = await axiosClientWithAuth.post(
    apiAut003.url(),
    {},
    { withCredentials: true },
  );

  switch (status) {
    case 201:
      return apiAut003.responseBodyMap[201];
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPost(apiAut003.url()).reply(() => [201, {}]);
});
export default postLogout;
