import Button from "@sparcs-clubs/web/common/components/Button";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import React, { useState } from "react";
import styled from "styled-components";
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

const ClubCategoryTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
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
  return (
    <AllMemberWrapper>
      <ClubCategoryTitle>
        <SectionTitle>전체 회원 명단</SectionTitle>
        <TextButton onClick={() => setToggle(!toggle)} text="임시 토글" />
        {/* TODO: funding 머지 되면 foldable section title 가져오기 */}
      </ClubCategoryTitle>
      {toggle ? (
        <AllMemberListWrapper>
          <ExcelButtonWrapper>
            <ExcelButton onClick={() => {}}>
              {/* TODO: 엑셀 다운로드 기능 구현 */}
              <Icon type="save_alt" size={16} color={colors.WHITE} />
              엑셀로 다운로드
            </ExcelButton>
          </ExcelButtonWrapper>
          <MemberSearchAndFilter />
          <AllMemberList />
        </AllMemberListWrapper>
      ) : null}
    </AllMemberWrapper>
  );
};

export default AllMemberListFrame;
