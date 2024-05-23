import React from "react";
import styled from "styled-components";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { ManageWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import Button from "@sparcs-clubs/web/common/components/Button";

const InfoManageMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 24px;
`;

const InfoManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  const [description, setDescription] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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
            <Button style={{ width: "max-content", alignSelf: "flex-end" }}>
              저장
            </Button>
          </Card>
          <Card outline gap={32} style={{ flex: 1 }}>
            <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
              대표자 및 대의원
            </Typography>
            <Select label="대표자" items={[]} />
            <Select label="대의원 1" items={[]} />
            <Select label="대의원 2" items={[]} />
          </Card>
        </InfoManageMainWrapper>
      )}
    </ManageWrapper>
  );
};

export default InfoManageFrame;
