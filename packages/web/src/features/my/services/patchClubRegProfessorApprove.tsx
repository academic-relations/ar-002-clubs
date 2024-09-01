import apiReg023, {
  ApiReg023RequestParam,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg023";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const patchClubRegProfessorApprove = async (param: ApiReg023RequestParam) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiReg023.url(param.applyId),
  );

  switch (status) {
    case 200:
    case 304:
      return apiReg023.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default patchClubRegProfessorApprove;

defineAxiosMock(mock => {
  mock.onPut(apiReg023.url(1)).reply(() => [200, {}]);
});
