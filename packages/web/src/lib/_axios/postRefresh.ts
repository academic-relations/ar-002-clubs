import apiAut002, {
  ApiAut002ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";

import axios from "axios";

const postRefresh = async (): Promise<ApiAut002ResponseOk> => {
  const { data, status } = await axios.post(apiAut002.url(), {});

  switch (status) {
    case 200:
      return apiAut002.responseBodyMap[200].parse(data);
    default:
      throw new Error("Unexpected API response");
  }
};

export default postRefresh;
