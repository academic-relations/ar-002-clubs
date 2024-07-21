import React, { useState } from "react";

import { jwtDecode } from "jwt-decode";
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
  const [selectedProfileName, setSelectedProfileName] = useState<string>(
    profiles[0].profileType,
  );

  const [selectedToken, setSelectedToken] = useState<string>(profiles[0].token);

  const handleProfileClick = (profile: {
    profileType: string;
    token: string;
  }) => {
    setSelectedProfileName(profile.profileType);
    setSelectedToken(profile.token);
    localStorage.setItem("accessToken", selectedToken);
    setIsMenuOpen(false);
  };

  return (
    <ProfileListWrapper>
      <Typography ff="PRETENDARD" fw="MEDIUM" fs={14} lh={16} color="BLACK">
        계정 선택
      </Typography>
      {profiles.map(profile => (
        <Profile
          key={profile.profileType}
          profileName={profile.profileType}
          profileNumber={jwtDecode(profile.token).studentNumber}
          email={jwtDecode(profile.token).email}
          isSelected={selectedProfileName === profile.profileType}
          onClick={() => handleProfileClick(profile)}
        />
      ))}
    </ProfileListWrapper>
  );
};
export default ProfileList;
