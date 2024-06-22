import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

import { env } from "@sparcs-clubs/web/env";

import tokenInterceptor from "./_axios/axiosAuthTokenInterceptor";
import errorInterceptor from "./_axios/axiosErrorInterceptor";
import mockInterceptor from "./_axios/axiosMockInterceptor";

/**
 * @name axiosClient
 * @author Jiho Park (night@sparcs.org)
 * @description Axios Client used for backend API requests that require NO authentication
 */
export const axiosClient = axios.create({
  withCredentials: true,
});

// Defines middleware for axiosClient
axiosClient.interceptors.request.use(
  mockInterceptor.onFulfilled,
  mockInterceptor.onRejected,
);

axiosClient.interceptors.request.use(
  errorInterceptor.onFulfilled,
  errorInterceptor.onRejected,
);

/**
 * @name.axiosClientWithCredentials
 * @author Jiho Park
 * @description Axios Client used for backend API requests that REQUIRE authentication
 */

export const axiosClientWithAuth = axios.create({
  withCredentials: true,
});

axiosClientWithAuth.interceptors.request.use(
  mockInterceptor.onFulfilled,
  mockInterceptor.onRejected,
);

axiosClientWithAuth.interceptors.request.use(
  tokenInterceptor.onFulfilled,
  tokenInterceptor.onRejected,
);

axiosClientWithAuth.interceptors.request.use(
  errorInterceptor.onFulfilled,
  errorInterceptor.onRejected,
);

/**
 * @name defineAxiosMock
 * @author Jiho Park (night@sparcs.org)
 * @description Defines the mock mode for axiosClient
 */
export const defineAxiosMock = (() => {
  if (env.NEXT_PUBLIC_API_MOCK_MODE) {
    const mockAxiosClient = new MockAdapter(axiosClient, {
      onNoMatch: "passthrough",
      delayResponse: 1500,
    });

    const mockAxiosClientWithAuth = new MockAdapter(axiosClientWithAuth, {
      onNoMatch: "passthrough",
      delayResponse: 1500,
    });

    return (_builder: (mock: MockAdapter) => void) => {
      _builder(mockAxiosClient);
      _builder(mockAxiosClientWithAuth);
    };
  }

  return (_builder: (mock: MockAdapter) => void) => {};
})();

export type LibAxiosErrorType = AxiosError;
export const LibAxiosError = AxiosError;

export class UnexpectedAPIResponseError extends Error {
  constructor(response: unknown = "Unexpected API response.") {
    super(`Unexpected API response: ${response}`);
  }
}
