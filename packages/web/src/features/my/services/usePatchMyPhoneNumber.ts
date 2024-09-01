import apiUsr003, {
  ApiUsr003RequestBody,
} from "@sparcs-clubs/interface/api/user/endpoint/apiUsr003";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const usePatchClubRegistration = async (body: ApiUsr003RequestBody) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiUsr003.url(),
    body,
  );

  switch (status) {
    case 200:
    case 304:
      return apiUsr003.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default usePatchClubRegistration;

defineAxiosMock(mock => {
  mock.onPut(apiUsr003.url()).reply(() => [200, {}]);
});
