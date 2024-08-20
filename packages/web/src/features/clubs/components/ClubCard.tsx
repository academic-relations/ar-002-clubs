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

const ClubCardRow = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubCardNameRow = styled(ClubCardRow)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ClubCardTagRow = styled(ClubCardRow)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ClubName = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubCard: React.FC<
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
    <Card gap={16} padding="16px 20px">
      <ClubCardNameRow>
        <ClubName>{club.name}</ClubName>
        <FlexWrapper direction="row" gap={4}>
          <Icon type="person" size={16} />
          <Typography fs={14} lh={16}>
            {club.totalMemberCnt}
          </Typography>
        </FlexWrapper>
      </ClubCardNameRow>

      <ClubCardRow>
        {club.advisor === "null" ||
        club.advisor === "undefined" ||
        club.advisor === undefined ||
        club.advisor === null ||
        club.advisor === ""
          ? `회장 ${club.representative}`
          : `회장 ${club.representative} | 지도교수 ${club.advisor}`}
      </ClubCardRow>
      <ClubCardRow>{club.characteristic}</ClubCardRow>

      <ClubCardTagRow>
        <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
          {getClubType(club, false)}
        </Tag>
        {isRegistrationPeriod && isLoggedIn && (
          <TextButton
            text={isRegistered ? "신청 취소" : "등록 신청"}
            onClick={handleRegister}
          />
        )}
        {!isRegistrationPeriod && isRegistered && isLoggedIn && (
          <TextButton text="승인 대기" disabled />
        )}
      </ClubCardTagRow>
    </Card>
  );
};

export default ClubCard;

export type { ClubCardProps };
