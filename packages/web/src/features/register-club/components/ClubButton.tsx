import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface ClubButtonProps {
  title: string;
  buttonText: string;
  selected: boolean;
  onClick?: VoidFunction;
}

const ClubButtonTextInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  height: 120px;
`;

const ClubButton: React.FC<ClubButtonProps> = ({
  title,
  buttonText,
  selected,
  onClick = () => {},
}) => (
  <Card
    padding="20px 24px"
    gap={16}
    onClick={onClick}
    style={{
      border: selected
        ? `1px solid ${colors.PRIMARY}`
        : `1px solid ${colors.GRAY[200]}`,
    }}
  >
    <Typography fw="MEDIUM" fs={20} lh={24}>
      {title}
    </Typography>
    <ClubButtonTextInner>
      <Typography
        fw="REGULAR"
        fs={12}
        lh={24}
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {buttonText}
      </Typography>
    </ClubButtonTextInner>
  </Card>
);

export default ClubButton;
