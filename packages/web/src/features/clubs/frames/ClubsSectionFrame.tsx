"use client";

import React, { useCallback, useState } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";

import type { ClubCardProps } from "@sparcs-clubs/web/features/clubs/components/ClubCard";

type ClubsSectionFrameProps = {
  showLength?: boolean; // section title에 길이 보여줄지 여부
  title: string; // 분과
  clubList: Array<ClubCardProps["club"]>;
  isRegistrationPeriod?: boolean;
};

const ClubsSectionFrame: React.FC<ClubsSectionFrameProps> = ({
  showLength = true,
  title,
  clubList,
  isRegistrationPeriod = false,
}) => {
  const [toggle, setToggle] = useState(true);
  const toggleHandler = useCallback(
    () => setToggle(!toggle),
    [toggle, setToggle],
  );

  return (
    <FlexWrapper direction="column" gap={20}>
      <FoldableSectionTitle
        title={`${title} ${showLength ? `(${clubList.length})` : ""}`}
        toggle={toggle}
        toggleHandler={toggleHandler}
      />
      {toggle && (
        <ClubListGrid
          clubList={clubList}
          isRegistrationPeriod={isRegistrationPeriod}
        />
      )}
    </FlexWrapper>
  );
};

export default ClubsSectionFrame;
