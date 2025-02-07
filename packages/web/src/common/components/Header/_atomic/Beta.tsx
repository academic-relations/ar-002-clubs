import React from "react";
import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

const Container = styled.div`
  position: absolute;
  top: -8px;
  right: -20px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  border-radius: 4px;
  padding: 0 4px;
  cursor: default;
`;

const Beta: React.FC = () => (
  <Container>
    <Typography fs={12} lh={14} color="WHITE">
      Beta
    </Typography>
  </Container>
);

export default Beta;
