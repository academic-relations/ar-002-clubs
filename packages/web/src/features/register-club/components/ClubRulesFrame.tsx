import React from "react";

import { overlay } from "overlay-kit";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import {
  CLUB_ASSOCIATION_RULES,
  DEPARTMENT_AUTONOMY_RULES,
} from "../constants/registerClub";

import ClubRegulationsComplianceSection from "./ClubRegulationsComplianceSection";
import RulesButton from "./RulesButton";

interface ClubRulesFrameProps {
  isProvisional?: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ClubRulesFrame: React.FC<ClubRulesFrameProps> = ({
  isProvisional = false,
}) => {
  const openModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <FlexWrapper direction="column" gap={12}>
          <Typography
            fs={16}
            lh={28}
            fw="MEDIUM"
            style={{ textAlign: "start", whiteSpace: "pre-line" }}
          >
            {DEPARTMENT_AUTONOMY_RULES}
          </Typography>
          <ButtonWrapper>
            <Button onClick={close}>확인</Button>
          </ButtonWrapper>
        </FlexWrapper>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>동아리 연합 회칙</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 24 }}>
        <RulesButton
          title="동아리연합회칙"
          onClick={() => window.open(CLUB_ASSOCIATION_RULES)}
        />
        {!isProvisional && (
          <RulesButton title="분과자치규칙" onClick={openModal} />
        )}
        <ClubRegulationsComplianceSection isProvisional={isProvisional} />
      </Card>
    </FlexWrapper>
  );
};

export default ClubRulesFrame;
