import { ComponentType } from "react";

import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { jwtDecode } from "jwt-decode";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import { getUserTypeEnumKeyByValue } from "@sparcs-clubs/web/utils/getUserType";
import { getLocalStorageItem } from "@sparcs-clubs/web/utils/localStorage";

import ErrorPageTemplate from "../frames/ErrorPageTemplate";
import LoginRequired from "../frames/LoginRequired";
import getLogin from "../services/getLogin";

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 48px;
  word-break: keep-all;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 28px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    font-size: 20px;
    line-height: 32px;
  }
`;

export const withAuthorization = <P extends object>(
  WrappedComponent: ComponentType<P>,
  acceptedAuthorization: UserTypeEnum[],
  redirectUrl?: string | -1,
) => {
  const login = async () => {
    try {
      const response = await getLogin();
      window.location.href = response.url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const WithAuth = (props: P) => {
    const token = getLocalStorageItem("accessToken");
    const router = useRouter();

    if (!token) {
      return <LoginRequired login={login} />;
    }

    const decoded: { name?: string; type?: string } = jwtDecode(token);
    const userTypeKey = getUserTypeEnumKeyByValue(decoded.type ?? "");

    if (
      !userTypeKey ||
      !acceptedAuthorization.includes(UserTypeEnum[userTypeKey])
    ) {
      return (
        <ErrorPageTemplate
          message={
            <ErrorMessage>
              현재 페이지에 대한
              <br />
              접근 권한이 없습니다
            </ErrorMessage>
          }
          buttons={[
            {
              text: "이동하기",
              onClick: () => {
                if (redirectUrl === -1) {
                  router.back();
                } else {
                  router.replace(redirectUrl ?? "/");
                }
              },
            },
          ]}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
