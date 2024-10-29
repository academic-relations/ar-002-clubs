import apiRnt002 from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type {
  ApiRnt002RequestBody,
  ApiRnt002RequestQuery,
  ApiRnt002ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";

const postRentalOrder = async (
  requestQuery: ApiRnt002RequestQuery,
  requestBody: ApiRnt002RequestBody,
): Promise<ApiRnt002ResponseOK> => {
  const { data } = await axiosClientWithAuth.post(
    apiRnt002.url(),
    requestBody,
    {
      params: requestQuery,
    },
  );

  return apiRnt002.responseBodyMap[201].parse(data);
};

export default postRentalOrder;
