import apiFnd014 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd014";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiFnd014RequestBody } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd014";

export const patchFundingStatus = async (requestBody: ApiFnd014RequestBody) => {
  const { data } = await axiosClientWithAuth.patch(
    apiFnd014.url(),
    requestBody,
  );

  return apiFnd014.responseBodyMap[200].parse(data);
};
