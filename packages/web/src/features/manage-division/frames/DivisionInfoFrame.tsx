import React from "react";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ChangeDivisionPresidentCard from "@sparcs-clubs/web/features/manage-division/components/ChangeDivisionPresidentCard";
import DivisionInformationCard from "@sparcs-clubs/web/features/manage-division/components/DivisionInformationCard";

const DivisionCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const DivisionInfoFrame: React.FC = () => (
  <FlexWrapper gap={40} direction="column">
    <FoldableSectionTitle title="분과 정보">
      <DivisionCardWrapper>
        <DivisionInformationCard />
        <ChangeDivisionPresidentCard />
      </DivisionCardWrapper>
    </FoldableSectionTitle>
  </FlexWrapper>
);

export default DivisionInfoFrame;
