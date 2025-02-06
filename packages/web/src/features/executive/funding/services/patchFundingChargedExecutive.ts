import apiFnd015 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd015";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiFnd015RequestBody } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd015";

export const patchFundingChargedExecutive = async (
  requestBody: ApiFnd015RequestBody,
) => {
  const { data } = await axiosClientWithAuth.post(apiFnd015.url(), requestBody);

  return apiFnd015.responseBodyMap[200].parse(data);
};
