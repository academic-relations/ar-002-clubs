import React, { useCallback, useEffect, useState } from "react";

import { overlay } from "overlay-kit";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useGetClubInfo } from "@sparcs-clubs/web/features/manage-club/services/getClubInfo";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";
import { usePutClubInfo } from "@sparcs-clubs/web/features/manage-club/services/updateClubInfo";

interface MyManageClubData {
  clubId: number;
  delegateEnumId: number;
}

const ChangeClubInfoCard = () => {
  const { data: idData, isLoading: idIsLoading } = useGetMyManageClub() as {
    data: MyManageClubData;
    isLoading: boolean;
  };
  const [clubId, setClubId] = useState<number>(0);
  const { data, isLoading, isError, refetch } = useGetClubInfo({
    clubId,
  });

  // TODO: react hook form으로 변경
  const [description, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const { mutate: updateClubInfo } = usePutClubInfo();

  useEffect(() => {
    if (!idIsLoading && idData && Object.keys(idData).length > 0) {
      setClubId(idData.clubId);
      if (clubId && !isLoading && data) {
        if (data.description) setDescription(data.description);
        if (data.roomPassword) setPassword(data.roomPassword);
      }
    }
  }, [
    idIsLoading,
    idData,
    isLoading,
    clubId,
    data?.description,
    data?.roomPassword,
  ]);

  useEffect(() => {
    if (clubId && description === "") {
      setErrorDescription("동아리 설명을 입력하세요");
    } else {
      setErrorDescription("");
    }
  }, [clubId, description, setErrorDescription]);

  useEffect(() => {
    if (clubId && password === "") {
      // setErrorPassword("동아리방 비밀번호를 입력하세요");
    } else {
      setErrorPassword("");
    }
  }, [clubId, password, setErrorPassword]);
  // TODO: 동방 없는 곳은 비밀번호 입력 안 해도 에러 안 뜨게 수정

  const buttonType =
    (description === data?.description && password === data?.roomPassword) ||
    errorDescription !== ""
      ? // || errorPassword !== ""
        "disabled"
      : "default";

  const handleSave = useCallback(() => {
    updateClubInfo(
      {
        requestParam: { clubId },
        body: {
          description,
          roomPassword: password,
        },
      },
      {
        onSuccess: () => {
          overlay.open(({ isOpen, close }) => (
            <Modal isOpen={isOpen}>
              <ConfirmModalContent
                onConfirm={() => {
                  close();
                }}
              >
                저장이 완료되었습니다.
              </ConfirmModalContent>
            </Modal>
          ));
          refetch();
        },
      },
    );
  }, [clubId, description, password, updateClubInfo, refetch]);

  return (
    <Card outline gap={32} style={{ flex: 1, height: "fit-content" }}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        기본 정보
      </Typography>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <TextInput
          label="동아리 설명"
          placeholder="동아리 설명을 입력하세요"
          area
          value={description}
          handleChange={setDescription}
          errorMessage={errorDescription}
        />
        <TextInput
          label="동아리방 비밀번호"
          placeholder="동아리방 비밀번호를 입력하세요"
          value={password}
          handleChange={setPassword}
          errorMessage={errorPassword}
        />
      </AsyncBoundary>
      <Button
        type={buttonType}
        style={{ width: "max-content", alignSelf: "flex-end" }}
        onClick={handleSave}
      >
        저장
      </Button>
    </Card>
  );
};

export default ChangeClubInfoCard;
