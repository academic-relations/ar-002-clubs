import React, { useState } from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { MoreInfo } from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface AllMemberListProps {
  semester: string;
  members: {
    studentNumber: number;
    name: string;
    email: string;
    phoneNumber?: string;
  }[];
  searchText?: string;
}

const AllMemberListTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
`;

const AllMemberList: React.FC<AllMemberListProps> = ({
  semester,
  members,
  searchText = "",
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => setToggle(!toggle);
  const searchedMembers = members.filter(member =>
    member.name.startsWith(searchText),
  );

  const memberCount = searchedMembers.length;
  return (
    <FlexWrapper direction="column" gap={20}>
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
      {toggle && (
        <TableWithCount>
          <Typography
            fw="REGULAR"
            fs={16}
            lh={20}
            ff="PRETENDARD"
            color="GRAY.600"
          >
            총 {memberCount}명
          </Typography>
          <TableWrapper>
            <FlexWrapper direction="row" gap={0}>
              <TableCell type="HeaderSort" width="20%">
                학번
              </TableCell>
              <TableCell type="HeaderSort" width="20%">
                신청자
              </TableCell>
              <TableCell type="Header" width="20%">
                전화번호
              </TableCell>
              <TableCell type="Header" width="20%">
                이메일
              </TableCell>
              <TableCell type="Header" width="20%">
                비고
              </TableCell>
            </FlexWrapper>
            {searchedMembers
              .sort((a, b) => a.studentNumber - b.studentNumber)
              .map(member => (
                <FlexWrapper direction="row" gap={0} key={member.studentNumber}>
                  <TableCell type="Default" width="20%">
                    {member.studentNumber}
                  </TableCell>
                  <TableCell type="Default" width="20%">
                    {member.name}
                  </TableCell>
                  <TableCell type="Default" width="20%">
                    {member.phoneNumber}
                  </TableCell>
                  <TableCell type="Default" width="20%">
                    {member.email}
                  </TableCell>
                  <TableCell type="Default" width="20%">
                    {" "}
                  </TableCell>
                </FlexWrapper>
              ))}
          </TableWrapper>
        </TableWithCount>
      )}
    </FlexWrapper>
  );
};

export default AllMemberList;
