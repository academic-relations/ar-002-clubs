import { MoreInfo } from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import React, { useState } from "react";
import styled from "styled-components";

interface AllMemberListProps {
  semester: string;
  members: {
    studentNumber: number;
    name: string;
    email: string;
    phoneNumber?: string;
  }[];
}

const AllMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AllMemberListTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const AllMemberList: React.FC<AllMemberListProps> = ({ semester, members }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => setToggle(!toggle);
  const memberCount = members.length;
  return (
    <AllMemberListWrapper>
      <AllMemberListTitle>
        <Typography
          fs={20}
          fw="MEDIUM"
          lh={24}
          ff="PRETENDARD"
          color="BLACK"
          style={{ flex: 1 }}
        >
          {semester} (총 {memberCount}명)
        </Typography>
        <MoreInfo onClick={toggleHandler}>
          {toggle ? `접기` : `펼치기`}
        </MoreInfo>
      </AllMemberListTitle>
      {toggle && <div>table</div>}
    </AllMemberListWrapper>
  );
};

export default AllMemberList;
