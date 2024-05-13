import Button from "@sparcs-clubs/web/common/components/Button";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import React, { useState } from "react";
import styled from "styled-components";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MemberSearchAndFilter from "../components/MemberSearchAndFilter";
import AllMemberList from "../components/AllMemberList";
import { mockAllSemesters, mockSemesterMembers } from "./_mock/mockMembers";

const AllMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  const semesters = mockAllSemesters.semesters.map(
    semester => `${semester.year}년 ${semester.name}학기`,
  );

  return (
    <AllMemberWrapper>
      <FoldableSectionTitle
        title="전체 회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <AllMemberListWrapper>
          <ExcelButtonWrapper>
            <ExcelButton onClick={() => {}}>
              {/* TODO: 엑셀 다운로드 기능 구현 */}
              <Icon type="save_alt" size={16} color={colors.WHITE} />
              엑셀로 다운로드
            </ExcelButton>
          </ExcelButtonWrapper>
          <MemberSearchAndFilter
            semesters={semesters}
            selectedSemesters={selectedSemesters}
            setSelectedSemesters={setSelectedSemesters}
          />
          {/* TODO: 필터랑 연동하기 */}
          {mockAllSemesters.semesters
            .sort((a, b) => b.id - a.id) // 최신 학기부터 정렬(ID가 클수록 최신 학기라고 가정)
            .map(semester => (
              <AllMemberList
                key={semester.id}
                semester={`${semester.year}년 ${semester.name}학기`}
                members={mockSemesterMembers.members}
              />
            ))}
        </AllMemberListWrapper>
      )}
    </AllMemberWrapper>
  );
};

export default AllMemberListFrame;
