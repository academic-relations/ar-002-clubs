import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ClubButtonTextProps {
  id: number;
  text: string;
}

interface ClubButtonProps {
  title: string;
  buttonText: ClubButtonTextProps;
  onClick?: VoidFunction;
}

const ClubButtonInner = styled.div`
  display: flex;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
`;

const ClubButton: React.FC<ClubButtonProps> = ({
  title,
  buttonText,
  onClick = () => {},
}) => (
  <Card padding="20px 24px" gap={16} onClick={onClick}>
    <Typography fw="MEDIUM" fs={20} lh={24}>
      {title}
    </Typography>
    <ClubButtonInner>
      {buttonText &&
        buttonText.map(e => (
          <Typography fw="REGULAR" fs={12} lh={24} key={e.id}>
            {e.text}
          </Typography>
        ))}
    </ClubButtonInner>
  </Card>
);

export default ClubButton;
