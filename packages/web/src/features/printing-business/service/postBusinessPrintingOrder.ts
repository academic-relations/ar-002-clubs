import apiPrt002 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiPrt002RequestBody,
  ApiPrt002RequestParam,
  ApiPrt002ResponseCreated,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

const postBusinessPrintingOrder = async (
  requestParam: ApiPrt002RequestParam,
  reuestBody: ApiPrt002RequestBody,
): Promise<ApiPrt002ResponseCreated> => {
  const { data, status } = await axiosClient.post(
    apiPrt002.url(requestParam.clubId.toString()),
    reuestBody,
  );

  switch (status) {
    case 201:
      return apiPrt002.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default postBusinessPrintingOrder;
