import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface ClubButtonProps {
  title: string;
  buttonText: string[];
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

const ClubButtonDot = styled(Typography)`
  flex-shrink: 0;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  width: fit-content;
`;

const ClubButtonDescription = styled(Typography)`
  flex-grow: 1;
  white-space: pre-wrap;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
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
      flex: "1 0 0",
      flexDirection: "column",
    }}
  >
    <Typography fw="MEDIUM" fs={20} lh={24}>
      {title}
    </Typography>
    {buttonText.map((text, index) => (
      <FlexWrapper direction="row" gap={16} key={index}>
        <ClubButtonDot>•</ClubButtonDot>
        <ClubButtonDescription>{text}</ClubButtonDescription>
      </FlexWrapper>
    ))}

    <ClubButtonTextInner />
  </Card>
);

export default ClubButton;
