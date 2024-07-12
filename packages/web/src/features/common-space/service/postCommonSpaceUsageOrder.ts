import apiCms003 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiCms003Error423,
  ApiCms003RequestBody,
  ApiCms003RequestParam,
  ApiCms003ResponseCreated,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";

const postCommonSpaceUsageOrder = async (
  requestParam: ApiCms003RequestParam,
  requestBody: ApiCms003RequestBody,
): Promise<ApiCms003ResponseCreated | ApiCms003Error423> => {
  const { data, status } = await axiosClient.post(
    apiCms003.url(requestParam.spaceId),
    requestBody,
  );

  switch (status) {
    case 201:
      return apiCms003.responseBodyMap[201].parse(data);
    case 423:
      return apiCms003.responseErrorMap[423].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default postCommonSpaceUsageOrder;
