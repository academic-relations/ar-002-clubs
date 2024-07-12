import React, { useState } from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import Profile from "./Profile";

interface ProfileListProps {
  profiles: {
    profileName: string;
    profileNumber: number;
    email: string;
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
    "학부생", // TODO: 나중에는 기본값 제대로 설정하기
  );

  const handleProfileClick = (profileName: string) => {
    setSelectedProfileName(profileName);
    setIsMenuOpen(false);
  };

  return (
    <ProfileListWrapper>
      <Typography ff="PRETENDARD" fw="MEDIUM" fs={14} lh={16} color="BLACK">
        계정 선택
      </Typography>
      {profiles.map(profile => (
        <Profile
          key={profile.profileName}
          profileName={profile.profileName}
          profileNumber={profile.profileNumber}
          email={profile.email}
          isSelected={selectedProfileName === profile.profileName}
          onClick={() => handleProfileClick(profile.profileName)}
        />
      ))}
    </ProfileListWrapper>
  );
};
export default ProfileList;
