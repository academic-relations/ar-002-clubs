import { AxiosError, InternalAxiosRequestConfig } from "axios";
import log from "loglevel";

import { env } from "@sparcs-clubs/web/env";

export const BASE_URL = env.NEXT_PUBLIC_API_URL ?? "";

const mockInterceptor = {
  async onFulfilled(config: InternalAxiosRequestConfig) {
    const responseConfig = { ...config };
    try {
      const parsedUrl = new URL(config.url ?? "");

      if (parsedUrl.host != null) {
        return responseConfig;
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}

    if (env.NEXT_PUBLIC_API_MOCK_MODE) {
      const method = config?.method;
      const url = config?.url;
      const requestBody = config?.data || {};
      const queryParams = config?.params || {};
      log.debug(config);
      log.debug(
        `${method} ${url}\nbody: ${JSON.stringify(
          requestBody,
        )}\nqueryParams: ${JSON.stringify(queryParams)}`,
      );
      return responseConfig;
    }

    responseConfig.baseURL = BASE_URL;

    return responseConfig;
  },
  onRejected(error: AxiosError) {
    return Promise.reject(error);
  },
};

export default mockInterceptor;
