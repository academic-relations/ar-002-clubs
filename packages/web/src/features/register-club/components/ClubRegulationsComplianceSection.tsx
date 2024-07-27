import React, { useState } from "react";

import styled from "styled-components";

import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ClubRegulationsComplianceSectionProps {
  isProvisional?: boolean;
}

const ClubRegulationsComplianceSectionInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;

  color: ${({ theme }) => theme.colors.BLACK};
`;

const clubsComplianceList = [
  "1. 동아리연합회칙을 준수하겠습니다.",
  "2. KAIST의 대학 문화 발전을 위해 이바지하겠습니다.",
  "3. 본 회의 민주적 의사결정에 성실히 참여하겠습니다.",
  "4. 분과자치규칙을 준수하겠습니다.",
];

const ClubRegulationsComplianceSection: React.FC<
  ClubRegulationsComplianceSectionProps
> = ({ isProvisional = false }) => {
  const [checked, setChecked] = useState(false);
  return (
    <ClubRegulationsComplianceSectionInner>
      <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20}>
        동아리연합회칙 준수 서약서
      </Typography>
      <div>
        {...clubsComplianceList.map((value, index) => {
          if (isProvisional && index === clubsComplianceList.length - 1) {
            return null;
          }
          return (
            <Typography
              key={value}
              ff="PRETENDARD"
              fw="REGULAR"
              fs={16}
              lh={28}
            >
              {value}
            </Typography>
          );
        })}
      </div>
      <CheckboxOption
        optionText="본 동아리는 다음을 따르고, 그러지 못할 경우 발생하는 불이익에 대해 책임을 질 것을 선서합니다."
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    </ClubRegulationsComplianceSectionInner>
  );
};

export default ClubRegulationsComplianceSection;
