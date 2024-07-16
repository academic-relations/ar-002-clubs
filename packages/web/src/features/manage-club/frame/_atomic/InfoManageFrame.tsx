import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ChangeRepresentativeCard from "@sparcs-clubs/web/features/manage-club/component/ChangeRepresentativeCard";
import {
  mockClubDescription,
  mockClubMembers,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

import type { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const InfoManageMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 24px;
`;

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

  const [representative, setRepresentative] = useState<string>("");
  const [delegate1, setDelegate1] = useState<string>("");
  const [delegate2, setDelegate2] = useState<string>("");
  // TODO: 현재 대표자, 대의원으로 기본값 설정
  // TODO: 중복 선택 막는 로직 추가

  const buttonType =
    (description === mockClubDescription.description &&
      password === mockClubDescription.roomPassword) ||
    errorDescription === "" ||
    errorPassword === ""
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

  const selectItems: SelectItem[] = mockClubMembers.members.map(member => ({
    label: `${member.studentNumber} ${member.name} (${member.krPhoneNumber})`,
    value: member.studentNumber.toString(), // TODO: studentNumber 말고 studentId로 바꿔야하나?
    selectable: true,
  }));

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="동아리 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      >
        <InfoManageMainWrapper>
          <Card outline gap={32} style={{ flex: 1, height: "fit-content" }}>
            <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
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
          <ChangeRepresentativeCard
            type="Default"
            selectItems={selectItems}
            representative={representative}
            setRepresentative={setRepresentative}
            delegate1={delegate1}
            setDelegate1={setDelegate1}
            delegate2={delegate2}
            setDelegate2={setDelegate2}
          />
        </InfoManageMainWrapper>
      </FoldableSectionTitle>
    </FlexWrapper>
  );
};

export default InfoManageFrame;
