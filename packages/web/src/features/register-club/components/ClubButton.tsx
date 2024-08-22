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
  align-self: stretch;
  align-items: flex-start;
  min-height: 120px;
  height: auto;
  gap: 16px;
`;

const ClubButtonDot = styled(Typography)`
  flex-shrink: 0;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  width: fit-content;
  font-family: "Pretendard";
`;

const ClubButtonDescription = styled(Typography)`
  flex-grow: 1;
  white-space: pre-wrap;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  font-family: "Pretendard";
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
    <ClubButtonTextInner>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        {title}
      </Typography>
      <FlexWrapper direction="column" gap={16} style={{ height: "100%" }}>
        {buttonText.map((text, index) => (
          <FlexWrapper
            direction="row"
            gap={16}
            key={index}
            style={{ alignItems: "flex-start", height: "100%" }}
          >
            <ClubButtonDot>•</ClubButtonDot>
            <ClubButtonDescription>{text}</ClubButtonDescription>
          </FlexWrapper>
        ))}
      </FlexWrapper>
    </ClubButtonTextInner>
  </Card>
);

export default ClubButton;
