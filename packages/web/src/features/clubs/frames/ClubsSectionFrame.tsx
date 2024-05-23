"use client";

import React, { useCallback, useState } from "react";
import styled from "styled-components";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import ClubCategoryTitle from "@sparcs-clubs/web/common/components/ClubCategoryTitle";

import type { ClubCardProps } from "@sparcs-clubs/web/features/clubs/components/ClubCard";

type ClubsSectionFrameProps = {
  showLength?: boolean; // section title에 길이 보여줄지 여부
  title: string; // 분과
  clubList: Array<ClubCardProps["club"]>;
};

const ClubDivisionSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
      <ClubCategoryTitle
        title={title}
        clubList={clubList}
        toggle={toggle}
        toggleHandler={toggleHandler}
        showLength={showLength}
      />
      {toggle && <ClubListGrid clubList={clubList} />}
    </ClubDivisionSectionFrameInner>
  );
};

export default ClubsSectionFrame;
