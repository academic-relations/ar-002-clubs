import apiRnt002 from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiRnt002RequestBody,
  ApiRnt002RequestQuery,
  ApiRnt002ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";

const postRentalOrder = async (
  requestQuery: ApiRnt002RequestQuery,
  requestBody: ApiRnt002RequestBody,
): Promise<ApiRnt002ResponseOK> => {
  const { data, status } = await axiosClient.post(
    apiRnt002.url(),
    requestBody,
    {
      params: requestQuery,
    },
  );

  switch (status) {
    case 201:
      return apiRnt002.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default postRentalOrder;
