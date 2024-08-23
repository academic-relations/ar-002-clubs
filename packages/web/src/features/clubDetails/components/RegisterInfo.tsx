import React, { useEffect, useState } from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { overlay } from "overlay-kit";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useIsInClub } from "@sparcs-clubs/web/hooks/isInClub";

import { useGetMyMemberRegistration } from "../services/getMyMemberRegistration";
import { useRegisterClub } from "../services/registerClub";
import { useUnregisterClub } from "../services/unregisterClub";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface RegisterInfoProps {
  club: ApiClb002ResponseOK;
}
const RegisterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex: 1 0 0;
  align-items: center;
`;

export const RegisterInfo: React.FC<RegisterInfoProps> = ({ club }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInClub, setIsInclub] = useState(
    RegistrationApplicationStudentStatusEnum.Rejected,
  );
  const [isInClubFromHook, clubLoading] = useIsInClub(club.id);

  const {
    data: myRegistrationList,
    isLoading,
    isError,
    refetch,
  } = useGetMyMemberRegistration();

  useEffect(() => {
    if (!myRegistrationList) return;
    if (myRegistrationList.applies.length > 0) {
      const thisRegistration = myRegistrationList.applies.find(
        apply => apply.clubId === club.id,
      );
      if (thisRegistration) {
        setIsInclub(thisRegistration.applyStatusEnumId);
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    }
  }, [myRegistrationList]);

  useEffect(() => {
    // 초기값 설정
    if (!clubLoading) {
      setIsInclub(isInClubFromHook);
    }
  }, [isInClubFromHook, clubLoading]);

  const ToggleRegistered = async (close: () => void) => {
    close();
    await useRegisterClub(club.id);
    await refetch();
    setIsInclub(RegistrationApplicationStudentStatusEnum.Pending);
    setIsRegistered(true);
  };

  const ToggleUnregistered = async (close: () => void) => {
    const thisRegistration = (
      myRegistrationList as {
        applies: {
          id: number;
          clubId: number;
          applyStatusEnumId: RegistrationApplicationStudentStatusEnum;
        }[];
      }
    ).applies.find(apply => apply.clubId === club.id);
    await useUnregisterClub({
      applyId: (
        thisRegistration as {
          id: number;
          clubId: number;
          applyStatusEnumId: RegistrationApplicationStudentStatusEnum;
        }
      ).id,
    });
    await refetch();
    setIsRegistered(false);

    close();
  };

  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Modal isOpen={isOpen} onClose={close}>
          {isRegistered ? (
            <CancellableModalContent
              onClose={close}
              onConfirm={() => {
                ToggleUnregistered(close);
              }}
            >
              2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
              {club.name_kr}의<br />
              회원 등록을 취소합니다.
            </CancellableModalContent>
          ) : (
            <CancellableModalContent
              onClose={close}
              onConfirm={() => {
                ToggleRegistered(close);
              }}
            >
              2024학년도 봄학기 {club.type === 1 ? "정동아리" : "가동아리"}{" "}
              {club.name_kr}의<br />
              회원 등록 신청을 진행합니다.
            </CancellableModalContent>
          )}
        </Modal>
      </AsyncBoundary>
    ));
  };
  const renderButton = () => {
    if (isInClub === RegistrationApplicationStudentStatusEnum.Pending) {
      return (
        <Button type="default" onClick={submitHandler}>
          회원 등록 취소
        </Button>
      );
    }
    if (isInClub === RegistrationApplicationStudentStatusEnum.Approved) {
      return (
        <Button type="disabled" onClick={submitHandler}>
          회장 승인 완료
        </Button>
      );
    }
    return (
      <Button type="default" onClick={submitHandler}>
        회원 등록 신청
      </Button>
    );
  };
  return (
    <RegisterInfoWrapper>
      <Typography fs={16} color="GRAY.600" fw="REGULAR">
        등록 신청 {club.totalMemberCnt}명
      </Typography>
      {renderButton()}
    </RegisterInfoWrapper>
  );
};
