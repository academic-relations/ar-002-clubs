import apiAut001, {
  ApiAut001ResponseFound,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const getLogin = async (): Promise<ApiAut001ResponseFound> => {
  const next = window.location.pathname;
  const { data, status } = await axiosClient.get(apiAut001.url(), {
    params: { next },
  });

  switch (status) {
    case 302:
      return {
        redirect: data.redirect,
      };
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPost(apiAut001.url()).reply(() => [200, {}]);
});
export default getLogin;
