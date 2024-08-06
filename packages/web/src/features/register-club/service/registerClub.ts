import apiReg001, {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const registerClub = async (
  requestBody: ApiReg001RequestBody,
): Promise<ApiReg001ResponseCreated> => {
  const { data, status } = await axiosClient.post(apiReg001.url(), requestBody);

  switch (status) {
    case 201:
      return apiReg001.responseBodyMap[201].parse(data);

    default:
      throw new UnexpectedAPIResponseError();
  }
};

export default registerClub;
