import React, { useState } from "react";

import Image from "next/image";
import styled from "styled-components";

import SparcsLogo from "@sparcs-clubs/web/assets/sparcs-orange.svg";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import type { Member } from "../credits";

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
`;

const MemberCard = ({ member }: { member: Member }) => {
  const [displayText, setDisplayText] = useState(member.role);

  const handleMouseEnter = () => {
    if (member.comment) {
      setDisplayText(member.comment);
    }
  };

  const handleMouseLeave = () => {
    setDisplayText(member.role);
  };

  return (
    <Card padding="16px 20px" gap={8}>
      <MemberWrapper>
        <Image src={SparcsLogo} alt="SPARCS Logo" height={24} />
        <Typography
          ff="RALEWAY"
          fw="EXTRABOLD"
          fs={16}
          lh={24}
          color="SPARCS.main"
        >
          {member.nickname}
        </Typography>
        <Typography
          ff="NANUM_SQUARE"
          fw="EXTRABOLD" // TODO: 현재 NANUM_SQUARE는 EXTRABOLD만 존재함
          fs={12}
          lh={20}
          color="SPARCS.member"
        >
          {member.name}
        </Typography>
      </MemberWrapper>
      <Typography
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ff="RALEWAY"
        fw="BOLD"
        fs={10}
        lh={16}
        color="GRAY.600"
      >
        {displayText}
      </Typography>
    </Card>
  );
};

export default MemberCard;
