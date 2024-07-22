import React from "react";

import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import { getUserType } from "@sparcs-clubs/web/utils/getUserType";

import Button from "../Button";
import Icon from "../Icon";

import ProfileList from "./_atomic/ProfileList";

const MyMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 320px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  align-items: center;
  position: absolute;
  top: 50px;
  right: 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
`;

const MyMenu: React.FC<{
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsMenuOpen }) => {
  const router = useRouter();

  const handleMyPageClick = () => {
    router.push("/my");
    setIsMenuOpen(false);
  };
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const parsedToken = JSON.parse(localStorage.getItem("responseToken") || "{}");

  const profiles = Object.keys(parsedToken).map(type => ({
    profileType: getUserType(type),
    token: parsedToken[type],
  }));

  return (
    <MyMenuWrapper>
      <ProfileList profiles={profiles} setIsMenuOpen={setIsMenuOpen} />
      <Divider />
      {/* TODO: #333333으로 써놓은거 수정하기 */}
      <Button
        type="outlined"
        onClick={handleMyPageClick}
        style={{ gap: "4px", color: "#333333", width: "100%" }}
      >
        <Icon type="person" size={16} color="#333333" />
        마이페이지
      </Button>
      <Button
        type="outlined"
        onClick={handleLogout}
        style={{ gap: "4px", color: "#333333", width: "100%" }}
      >
        <Icon type="logout" size={16} color="#333333" />
        로그아웃
      </Button>
    </MyMenuWrapper>
  );
};

export default MyMenu;
