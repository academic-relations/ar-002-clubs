import React from "react";

import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

// interface ProfessorInformProps {
//   control: Control<RegisterClubInterface>;
// }

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
`;

const ProfessorInformFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={40}>
    <SectionTitle>지도교수 정보</SectionTitle>
    <Card outline gap={32} style={{ marginLeft: 20 }}>
      <RowWrapper>
        <FormController
          name="professor.name"
          required
          renderItem={props => (
            <TextInput
              {...props}
              label="지도교수 성함"
              placeholder="지도교수 성함을 입력해주세요"
            />
          )}
        />
        <FormController
          name="professor.ProfessorEnumId"
          required
          renderItem={props => (
            <Select
              {...props}
              label="지도교수 직급"
              placeholder="직급을 선택해주세요"
              items={[
                {
                  value: ProfessorEnum.Full,
                  label: "정교수",
                },
                {
                  value: ProfessorEnum.Associate,
                  label: "부교수",
                },
                {
                  value: ProfessorEnum.Assistant,
                  label: "조교수",
                },
              ]}
            />
          )}
        />
      </RowWrapper>
      <FormController
        name="professor.mail"
        required
        renderItem={props => (
          <TextInput
            {...props}
            label="지도교수 카이스트 이메일"
            placeholder="xxxxx@kaist.ac.kr"
          />
        )}
      />
    </Card>
  </FlexWrapper>
);

export default ProfessorInformFrame;
