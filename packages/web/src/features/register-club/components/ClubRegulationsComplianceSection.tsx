import React from "react";

import styled from "styled-components";

import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { CLUBS_COMPLIANCE_LIST } from "../constants/registerClub";

interface ClubRegulationsComplianceSectionProps {
  isProvisional?: boolean;
  isAgreed: boolean;
  setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClubRegulationsComplianceSectionInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;

  color: ${({ theme }) => theme.colors.BLACK};
`;

const ClubRegulationsComplianceSection: React.FC<
  ClubRegulationsComplianceSectionProps
> = ({ isProvisional = false, isAgreed, setIsAgreed }) => (
  <ClubRegulationsComplianceSectionInner>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20}>
      동아리연합회칙 준수 서약서
    </Typography>
    <div>
      {...CLUBS_COMPLIANCE_LIST.map((value, index) => {
        if (isProvisional && index === CLUBS_COMPLIANCE_LIST.length - 1) {
          return null;
        }
        return (
          <Typography key={value} ff="PRETENDARD" fw="REGULAR" fs={16} lh={28}>
            {value}
          </Typography>
        );
      })}
    </div>
    <CheckboxOption
      optionText="본 동아리는 다음을 따르고, 그러지 못할 경우 발생하는 불이익에 대해 책임을 질 것을 선서합니다."
      checked={isAgreed}
      onClick={() => setIsAgreed(!isAgreed)}
    />
  </ClubRegulationsComplianceSectionInner>
);

export default ClubRegulationsComplianceSection;
