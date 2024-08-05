import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";

const DivisionCard = styled(Card)`
  align-self: start;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    align-self: auto;
  }
`;

export default DivisionCard;
