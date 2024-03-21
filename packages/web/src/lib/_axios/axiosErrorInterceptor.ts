import { AxiosError, InternalAxiosRequestConfig, HttpStatusCode } from "axios";

const errorInterceptor = {
  onFulfilled(config: InternalAxiosRequestConfig) {
    return config;
  },
  async onRejected(error: AxiosError) {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized: {
        // TODO: handle unauthorized error
        return Promise.reject(error);
      }
      case HttpStatusCode.Forbidden: {
        // TODO: handle forbidden error
        return Promise.reject(error);
      }
      default: {
        return Promise.reject(error);
      }
    }
  },
};

export default errorInterceptor;
