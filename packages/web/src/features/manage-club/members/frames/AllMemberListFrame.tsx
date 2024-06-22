import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import AllMemberList from "../components/AllMemberList";
import MemberSearchAndFilter from "../components/MemberSearchAndFilter";

import { mockAllSemesters, mockSemesterMembers } from "./_mock/mockMembers";

const AllMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 24px;
`;

const ExcelButton = styled(Button)`
  width: max-content;
  gap: 4px;
`;

const ExcelButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
`;

const AllMemberListFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const [selectedSemesters, setSelectedSemesters] = useState<
    { id: number; year: number; name: string }[]
  >(mockAllSemesters.semesters);

  return (
    <FlexWrapper direction="column" gap={20}>
      <FoldableSectionTitle
        title="전체 회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <AllMemberListWrapper>
          {mockAllSemesters.semesters.length > 0 && (
            <>
              <ExcelButtonWrapper>
                {/* TODO: IconButton 리팩토링 되면 수정하기 */}
                <ExcelButton onClick={() => {}}>
                  {/* TODO: 엑셀 다운로드 기능 구현 */}
                  <Icon type="save_alt" size={16} color={colors.WHITE} />
                  엑셀로 다운로드
                </ExcelButton>
              </ExcelButtonWrapper>
              <MemberSearchAndFilter
                semesters={mockAllSemesters.semesters}
                selectedSemesters={selectedSemesters}
                setSelectedSemesters={setSelectedSemesters}
                searchText={searchText}
                handleChange={setSearchText}
              />
            </>
          )}
          {selectedSemesters.length === 0 ? (
            <Typography
              ff="PRETENDARD"
              fw="REGULAR"
              fs={16}
              lh={24}
              color="GRAY.300"
              style={{ textAlign: "center" }}
            >
              표시할 명단이 없습니다.
            </Typography>
          ) : (
            selectedSemesters
              .sort((a, b) => b.id - a.id) // 최신 학기부터 정렬(ID가 클수록 최신 학기라고 가정)
              .map(
                semester =>
                  mockSemesterMembers.members.length > 0 && (
                    <AllMemberList
                      key={semester.id}
                      semester={`${semester.year}년 ${semester.name}학기`}
                      members={mockSemesterMembers.members} // TODO: 지금은 학기 상관없이 다 똑같은 멤버 불러오고 있음. 실제 API 연결하면 수정해야함
                      searchText={searchText}
                    />
                  ),
              )
          )}
        </AllMemberListWrapper>
      )}
    </FlexWrapper>
  );
};

export default AllMemberListFrame;
