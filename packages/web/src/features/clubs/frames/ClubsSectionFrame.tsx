"use client";

import React, { useCallback, useState } from "react";
import styled from "styled-components";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import DivisionSectionTitle from "@sparcs-clubs/web/features/clubs/components/DivisionSectionTitle";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const ClubDivisionSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type ClubsSectionFrameProps = {
  division: string; // 분과
  clubList: Array<ClubInfo>;
};

const ClubsSectionFrame: React.FC<ClubsSectionFrameProps> = ({
  division,
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
        division={division}
        clubList={clubList}
        toggle={toggle}
        toggleHandler={toggleHandler}
      />
      {toggle && <ClubListGrid clubList={clubList} />}
    </ClubDivisionSectionFrameInner>
  );
};

export default ClubsSectionFrame;
