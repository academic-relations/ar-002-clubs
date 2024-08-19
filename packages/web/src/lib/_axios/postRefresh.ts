import apiAut002, {
  ApiAut002ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";
import axios from "axios";

import { env } from "@sparcs-clubs/web/env";

const postRefresh = async (): Promise<ApiAut002ResponseOk> => {
  const instance = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

  const { data, status } = await instance.post(apiAut002.url(), {});

  switch (status) {
    case 200:
      return apiAut002.responseBodyMap[200].parse(data);
    default:
      throw new Error("Unexpected API response");
  }
};

export default postRefresh;
