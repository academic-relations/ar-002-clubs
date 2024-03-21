"use client";

import React, { useCallback, useState } from "react";
import styled from "styled-components";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import DivisionSectionTitle from "@sparcs-clubs/web/features/clubs/components/FoldableSectionTitle";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const ClubDivisionSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type ClubsSectionFrameProps = {
  showLength?: boolean; // section title에 길이 보여줄지 여부
  title: string; // 분과
  clubList: Array<ClubInfo>;
};

const ClubsSectionFrame: React.FC<ClubsSectionFrameProps> = ({
  showLength = true,
  title,
  clubList,
}) => {
  const [toggle, setToggle] = useState(true);
  const toggleHandler = useCallback(
    () => setToggle(!toggle),
    [toggle, setToggle],
  );

  return (
    <ClubDivisionSectionFrameInner>
      <DivisionSectionTitle
        title={title}
        clubList={clubList}
        toggle={toggle}
        showLength={showLength}
        toggleHandler={toggleHandler}
      />
      {toggle && <ClubListGrid clubList={clubList} />}
    </ClubDivisionSectionFrameInner>
  );
};

export default ClubsSectionFrame;
