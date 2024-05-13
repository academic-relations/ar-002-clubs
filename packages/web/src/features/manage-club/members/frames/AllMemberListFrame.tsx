import Button from "@sparcs-clubs/web/common/components/Button";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import React, { useState } from "react";
import styled from "styled-components";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MemberSearchAndFilter from "../components/MemberSearchAndFilter";
import AllMemberList from "../components/AllMemberList";

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
            semesters={["2024년 봄학기", "2023년 가을학기", "2023년 봄학기"]}
            selectedSemesters={selectedSemesters}
            setSelectedSemesters={setSelectedSemesters}
          />
          <AllMemberList />
        </AllMemberListWrapper>
      )}
    </AllMemberWrapper>
  );
};

export default AllMemberListFrame;
