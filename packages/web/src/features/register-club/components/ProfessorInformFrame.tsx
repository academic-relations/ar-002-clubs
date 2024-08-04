import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
`;

const ProfessorInformFrame: React.FC = () => {
  const [professorType, setProfessorType] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>지도교수 정보</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 20 }}>
        <RowWrapper>
          <TextInput
            label="지도교수 성함"
            placeholder="지도교수 성함을 입력해주세요"
            value={name}
            handleChange={setName}
          />
          <Select
            label="지도교수 직급"
            placeholder="직급을 선택해주세요"
            selectedValue={professorType}
            onSelect={setProfessorType}
            items={[
              {
                value: "professor",
                label: "정교수",
                selectable: true,
              },
              {
                value: "associateProfessor",
                label: "부교수",
                selectable: true,
              },
              {
                value: "assistantProfessor",
                label: "조교수",
                selectable: true,
              },
            ]}
          />
        </RowWrapper>
        <TextInput
          label="지도교수 카이스트 이메일"
          placeholder="xxxxx@kaist.ac.kr"
          value={email}
          handleChange={setEmail}
        />
      </Card>
    </FlexWrapper>
  );
};

export default ProfessorInformFrame;
