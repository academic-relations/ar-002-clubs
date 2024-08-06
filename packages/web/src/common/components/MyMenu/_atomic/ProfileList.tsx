import React, { useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import Profile from "./Profile";

interface ProfileListProps {
  profiles: {
    profileType: string;
    token: string;
  }[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DecodedToken extends JwtPayload {
  studentNumber: number;
  email: string;
}

const ProfileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  setIsMenuOpen,
}) => {
  const [selectedToken, setSelectedToken] = useState<string>(profiles[0].token);

  const handleProfileClick = (profile: {
    profileType: string;
    token: string;
  }) => {
    setSelectedToken(profile.token);
    localStorage.setItem("accessToken", selectedToken);
    setIsMenuOpen(false);
  };

  return (
    <ProfileListWrapper>
      <Typography fw="MEDIUM" fs={14} lh={16}>
        계정 선택
      </Typography>
      {profiles.map(profile => {
        const decodedToken: DecodedToken = jwtDecode(profile.token);
        return (
          <Profile
            key={profile.profileType}
            profileName={profile.profileType}
            profileNumber={decodedToken.studentNumber}
            email={decodedToken.email}
            isSelected={selectedToken === profile.token}
            onClick={() => handleProfileClick(profile)}
          />
        );
      })}
    </ProfileListWrapper>
  );
};
export default ProfileList;
