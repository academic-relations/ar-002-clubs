import React from "react";

// import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ClubButtonProps {
  title: string;
  buttonText?: string;
  onClick?: VoidFunction;
}

const ClubButton: React.FC<ClubButtonProps> = ({
  title,
  buttonText = "",
  onClick = () => {},
}) => (
  <Card padding="20px 24px" gap={16} onClick={onClick}>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
      {title}
    </Typography>
    {buttonText}
  </Card>
);

export default ClubButton;
