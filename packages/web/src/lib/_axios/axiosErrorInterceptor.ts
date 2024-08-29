import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

import {
  removeLocalstorageItem,
  setLocalstorageItem,
} from "@sparcs-clubs/web/utils/localstorage";

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
          setLocalstorageItem(
            "responseToken",
            JSON.stringify(response.accessToken),
          );
          if (response.accessToken) {
            setLocalstorageItem(
              "accessToken",
              response.accessToken.professor ??
                response.accessToken.doctor ??
                response.accessToken.master ??
                response.accessToken.undergraduate ??
                response.accessToken.employee ??
                response.accessToken.executive ??
                "",
            );
            console.log("Logged in successfully.");
          }
        } catch (refreshError) {
          console.error("Login failed", refreshError);
          removeLocalstorageItem("accessToken");
          removeLocalstorageItem("responseToken");
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
