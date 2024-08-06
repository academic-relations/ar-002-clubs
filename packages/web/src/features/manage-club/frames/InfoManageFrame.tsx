import React, { useEffect, useState } from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ChangeRepresentativeCard from "@sparcs-clubs/web/features/manage-club/components/ChangeRepresentativeCard";
import { mockClubDescription } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const InfoManageFrame: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(
    mockClubDescription.description,
  );
  const [password, setPassword] = useState<string>(
    mockClubDescription.roomPassword,
  );
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
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="동아리 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      >
        <FlexWrapper direction="row" gap={20}>
          <Card outline gap={32} style={{ flex: 1, height: "fit-content" }}>
            <Typography fw="MEDIUM" fs={20} lh={24}>
              기본 정보
            </Typography>
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
            <Button
              type={buttonType}
              style={{ width: "max-content", alignSelf: "flex-end" }}
            >
              저장
            </Button>
          </Card>
          <ChangeRepresentativeCard />
        </FlexWrapper>
      </FoldableSectionTitle>
    </FlexWrapper>
  );
};

export default InfoManageFrame;
