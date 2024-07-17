import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import shadow from "@sparcs-clubs/web/styles/themes/shadow";

interface ClubButtonProps {
  title: string;
  buttonText?: string;
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
  buttonText = "직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능",
  onClick = () => {},
}) => (
  <Card
    padding="20px 24px"
    gap={16}
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flex: "1 0 0",
      borderRadius: "8px",
      background: "WHITE",
      boxShadow: shadow,
      width: "360px",
    }}
    onClick={onClick}
  >
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24} color="BLACK">
      {title}
    </Typography>
    <ClubButtonInner>
      <Typography ff="PRETENDARD" fw="REGULAR" fs={12} lh={24} color="BLACK">
        {buttonText}
      </Typography>
    </ClubButtonInner>
  </Card>
);

export default ClubButton;
