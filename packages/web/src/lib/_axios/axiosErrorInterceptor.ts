import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

import postRefresh from "./postRefresh";

const errorInterceptor = {
  onFulfilled(values: AxiosResponse) {
    return values;
  },
  async onRejected(error: AxiosError) {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized: {
        try {
          const response = await postRefresh();
          // TODO: 로그인시 기본 프로필 선택
          localStorage.setItem(
            "responseToken",
            JSON.stringify(response.accessToken),
          );
          if (response.accessToken) {
            localStorage.setItem(
              "accessToken",
              response.accessToken.undergraduate ??
                response.accessToken.master ??
                response.accessToken.doctor ??
                response.accessToken.professor ??
                response.accessToken.employee ??
                response.accessToken.executive ??
                "",
            );
            console.log("Logged in successfully.");
          }
        } catch (refreshError) {
          console.error("Login failed", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("responseToken");
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
      case HttpStatusCode.Forbidden: {
        const previousPage = document.referrer;

        if (previousPage.startsWith(window.location.origin)) {
          window.history.back();
        } else {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
      default: {
        return Promise.reject(error);
      }
    }
  },
};

export default errorInterceptor;
