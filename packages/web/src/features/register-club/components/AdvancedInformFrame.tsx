import React from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import SingleUploadWithTextAndTemplate from "./SingleUploadWithTextAndTemplate";

interface AdvancedInformFrameProps {
  type: RegistrationTypeEnum;
}

const AdvancedInformFrame: React.FC<AdvancedInformFrameProps> = ({ type }) => (
  <FlexWrapper direction="column" gap={40}>
    <SectionTitle>동아리 신청 정보</SectionTitle>
    <Card outline gap={32} style={{ marginLeft: 20 }}>
      <FormController
        name="divisionIntegrity"
        required
        renderItem={props => (
          <TextInput
            {...props}
            label="분과 정합성"
            placeholder="분과 정합성을 입력해주세요"
            area
          />
        )}
      />
      <FormController
        name="foundationPurpose"
        required
        renderItem={props => (
          <TextInput
            {...props}
            label="설립 목적"
            placeholder="설립 목적을 입력해주세요"
            area
          />
        )}
      />
      <FormController
        name="activityPlan"
        required
        renderItem={props => (
          <TextInput
            {...props}
            label="주요 활동 계획"
            placeholder="주요 활동 계획을 입력해주세요"
            style={{ height: 200 }}
            area
          />
        )}
      />

      {type !== RegistrationTypeEnum.Renewal && (
        <FormController
          name="activityPlanFileId"
          // required

          renderItem={props => (
            <SingleUploadWithTextAndTemplate
              {...props}
              title="활동 계획서"
              content={`* 활동 목적 및 대중사업 계획을 포함한 활동 계획서 1부 제출 필수
          * 활동마다 활동명, 활동 기간, 활동 내용, 운영 예산을 포함한 자유 양식으로 제출`}
            />
          )}
        />
      )}
      {type === RegistrationTypeEnum.Promotional && (
        <FormController
          name="clubRuleFileId"
          // required

          renderItem={props => (
            <SingleUploadWithTextAndTemplate {...props} title="동아리 회칙" />
          )}
        />
      )}
      {type !== RegistrationTypeEnum.Provisional && (
        <FormController
          name="externalInstructionFileId"
          renderItem={props => (
            <SingleUploadWithTextAndTemplate
              {...props}
              title="(선택) 외부 강사 지도 계획서"
              content="* 외부 강사가 직접 작성하여 제출"
            />
          )}
        />
      )}
    </Card>
  </FlexWrapper>
);

export default AdvancedInformFrame;
