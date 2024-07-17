import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface RulesButtonProps {
  title: string;
  buttonText?: string;
  onClick?: VoidFunction;
}

const RulesButtonInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const RulesButton: React.FC<RulesButtonProps> = ({
  title,
  buttonText = "원문 보기",
  onClick = () => {},
}) => (
  <RulesButtonInner>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
      {title}
    </Typography>
    <Button onClick={onClick}>{buttonText}</Button>
  </RulesButtonInner>
);

export default RulesButton;
