import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { mockClubDescription } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { useGetClubInfo } from "@sparcs-clubs/web/features/manage-club/services/getClubInfo";

const ChangeClubInfoCard = () => {
  const { data, isLoading, isError } = useGetClubInfo({ clubId: 1 });
  const [description, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const buttonType =
    (description === mockClubDescription.description &&
      password === mockClubDescription.roomPassword) ||
    errorDescription !== "" ||
    errorPassword !== ""
      ? "disabled"
      : "default";

  useEffect(() => {
    if (!isLoading && data?.description && data?.roomPassword) {
      setDescription(data.description);
      setPassword(data.roomPassword);
    }
  }, [isLoading, data?.description, data?.roomPassword]);

  useEffect(() => {
    if (description === "") {
      setErrorDescription("동아리 설명을 입력하세요");
    } else {
      setErrorDescription("");
    }
  }, [description, setErrorDescription]);

  useEffect(() => {
    if (password === "") {
      setErrorPassword("동아리방 비밀번호를 입력하세요");
    } else {
      setErrorPassword("");
    }
  }, [password, setErrorPassword]);
  // TODO: 동방 없는 곳은 비밀번호 입력 안 해도 에러 안 뜨게 수정

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
      >
        저장
      </Button>
    </Card>
  );
};

export default ChangeClubInfoCard;
