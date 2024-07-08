"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const EvidenceBlockTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const EvidenceBlockTitle: React.FC<{
  title: string;
  toggle?: boolean;
  toggleHandler?: () => void;
  children?: React.ReactNode;
}> = ({ title, toggle = null, toggleHandler = null, children = null }) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const openHandler = () => setOpen(!open);

  return (
    <FlexWrapper direction="column" gap={4}>
      <EvidenceBlockTitleInner>
        <Typography
          ff="PRETENDARD"
          fs={20}
          fw="MEDIUM"
          lh={24}
          color="BLACK"
          style={{ paddingLeft: 4 }}
        >
          {title}
        </Typography>
        <Typography
          ff="PRETENDARD"
          fw="REGULAR"
          fs={14}
          lh={20}
          color="BLACK"
          onClick={toggleHandler ?? openHandler}
          style={{ textDecorationLine: "underline", cursor: "pointer" }}
        >
          {toggle ?? open ? `접기` : `펼치기`}
        </Typography>
      </EvidenceBlockTitleInner>
      {(toggle ?? open) && children && children}
    </FlexWrapper>
  );
};

export default EvidenceBlockTitle;
