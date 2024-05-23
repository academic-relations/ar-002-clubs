import React from "react";
import styled from "styled-components";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { ManageWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select, {
  SelectItem,
} from "@sparcs-clubs/web/common/components/Forms/Select";
import Button from "@sparcs-clubs/web/common/components/Button";
import {
  mockClubDescription,
  mockClubMembers,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

const InfoManageMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 24px;
`;

const InfoManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [description, setDescription] = React.useState<string>(
    mockClubDescription.description,
  );
  const [password, setPassword] = React.useState<string>(
    mockClubDescription.roomPassword,
  );
  const [president, setPresident] = React.useState<string>("");
  const [representative1, setRepresentative1] = React.useState<string>("");
  const [representative2, setRepresentative2] = React.useState<string>("");

  const buttonType =
    description === mockClubDescription.description &&
    password === mockClubDescription.roomPassword
      ? "disabled"
      : "default";

  const selectItems: SelectItem[] = mockClubMembers.members.map(member => ({
    label: `${member.studentNumber} ${member.name} (${member.krPhoneNumber})`,
    value: member.studentNumber.toString(),
    selectable: true,
  }));

  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="동아리 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <InfoManageMainWrapper>
          <Card outline gap={32} style={{ flex: 1 }}>
            <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
              기본 정보
            </Typography>
            <TextInput
              label="동아리 설명"
              placeholder="동아리 설명을 입력하세요"
              area
              value={description}
              handleChange={setDescription}
            />
            <TextInput
              label="동아리방 비밀번호"
              placeholder="동아리방 비밀번호를 입력하세요"
              value={password}
              handleChange={setPassword}
            />
            <Button
              type={buttonType}
              style={{ width: "max-content", alignSelf: "flex-end" }}
            >
              저장
            </Button>
          </Card>
          <Card outline gap={32} style={{ flex: 1 }}>
            <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
              대표자 및 대의원
            </Typography>
            <Select
              label="대표자"
              items={selectItems}
              selectedValue={president}
              onSelect={setPresident}
            />
            <Select
              label="대의원 1"
              items={selectItems}
              selectedValue={representative1}
              onSelect={setRepresentative1}
            />
            <Select
              label="대의원 2"
              items={selectItems}
              selectedValue={representative2}
              onSelect={setRepresentative2}
            />
          </Card>
        </InfoManageMainWrapper>
      )}
    </ManageWrapper>
  );
};

export default InfoManageFrame;
