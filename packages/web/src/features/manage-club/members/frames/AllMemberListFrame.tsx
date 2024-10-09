import React, { useState } from "react";

import styled from "styled-components";

// import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import AllMemberList from "../components/AllMemberList";
import MemberSearchAndFilter from "../components/MemberSearchAndFilter";

import { useGetClubSemesters } from "../services/getClubSemesters";
import { SemesterProps } from "../types/semesterList";

interface AllMemberListFrameProps {
  clubId: number;
}

const AllMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// const IconButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   align-items: flex-end;
// `;

const AllMemberListFrame: React.FC<AllMemberListFrameProps> = ({ clubId }) => {
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: semesterData,
    isLoading,
    isError,
  } = useGetClubSemesters({ clubId });

  const [selectedSemesters, setSelectedSemesters] = useState<SemesterProps[]>(
    semesterData.semesters,
  );

  return (
    <FoldableSectionTitle title="전체 회원 명단" childrenMargin="20px">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <AllMemberListWrapper>
          {semesterData.semesters.length > 0 && (
            <>
              {/* <IconButtonWrapper> */}
              {/*  <IconButton */}
              {/*    type="default" */}
              {/*    icon="save_alt" */}
              {/*    onClick={() => { */}
              {/*      TODO: 엑셀 다운로드 기능 구현  */}
              {/*    }} */}
              {/*  > */}
              {/*    엑셀로 다운로드 */}
              {/*  </IconButton> */}
              {/* </IconButtonWrapper> */}
              <MemberSearchAndFilter
                semesters={semesterData.semesters}
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
              .map(semester => (
                <AllMemberList
                  key={semester.id}
                  semester={semester}
                  clubId={clubId}
                  searchText={searchText}
                />
              ))
          )}
        </AllMemberListWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default AllMemberListFrame;
