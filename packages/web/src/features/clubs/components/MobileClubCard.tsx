"use client";

import React, { useEffect, useState } from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import {
  getClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/features/clubs/services/clubTypeControl";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

interface ClubCardProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
}

const ClubName = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubCardNameWithTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`;

const ClubCardNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const ClubCharacteristic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;

const ClubCardRow = styled.div`
  display: flex;
  flex: 1 0 0;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  align-self: stretch;
`;

const MobileClubCard: React.FC<
  ClubCardProps & { isRegistrationPeriod?: boolean }
> = ({ club, isRegistrationPeriod = false }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  useEffect(() => {}, [isLoggedIn]);

  const handleRegister = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        {isRegistered ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              setIsRegistered(!isRegistered);
              close();
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name}의
            <br />
            회원 등록을 취소합니다.
          </CancellableModalContent>
        ) : (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              setIsRegistered(!isRegistered);
              close();
            }}
          >
            2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name}의
            <br />
            회원 등록 신청을 진행합니다.
          </CancellableModalContent>
        )}
      </Modal>
    ));
  };
  return (
    <Card gap={12} padding="16px 20px">
      <ClubCardNameRow>
        <ClubCardNameWithTag>
          <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
            {getClubType(club, true)}
          </Tag>
          <ClubName>{club.name}</ClubName>
        </ClubCardNameWithTag>
        <FlexWrapper direction="row" gap={4}>
          <Icon type="person" size={16} />
          <Typography fs={14} lh={16}>
            {club.totalMemberCnt}
          </Typography>
        </FlexWrapper>
      </ClubCardNameRow>
      <ClubCardRow>
        <ClubCharacteristic>{club.characteristic}</ClubCharacteristic>
        {isRegistrationPeriod && isLoggedIn && (
          <TextButton
            text={isRegistered ? "신청 취소" : "등록 신청"}
            onClick={handleRegister}
            fs={14}
          />
        )}
        {!isRegistrationPeriod && isRegistered && isLoggedIn && (
          <TextButton text="승인 대기" disabled fs={14} />
        )}
      </ClubCardRow>
    </Card>
  );
};

export default MobileClubCard;
