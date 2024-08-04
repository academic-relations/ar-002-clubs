import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import ClubRegulationsComplianceSection from "./ClubRegulationsComplianceSection";
import RulesButton from "./RulesButton";

interface ClubRulesFrameProps {
  isProvisional?: boolean;
}

const ClubRulesFrame: React.FC<ClubRulesFrameProps> = ({
  isProvisional = false,
}) => (
  <FlexWrapper direction="column" gap={40}>
    <SectionTitle>동아리 연합 회칙</SectionTitle>
    <Card outline gap={32} style={{ marginLeft: 24 }}>
      <RulesButton title="동아리연합회칙" />
      {!isProvisional && <RulesButton title="분과자치규칙" />}
      <ClubRegulationsComplianceSection isProvisional={isProvisional} />
    </Card>
  </FlexWrapper>
);

export default ClubRulesFrame;
