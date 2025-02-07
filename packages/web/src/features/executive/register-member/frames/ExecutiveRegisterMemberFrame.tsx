"use client";

import { hangulIncludes } from "es-hangul";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MultiFilter from "@sparcs-clubs/web/common/components/MultiFilter/Index";
import { CategoryProps } from "@sparcs-clubs/web/common/components/MultiFilter/types/FilterCategories";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import RegistrationMemberTable from "@sparcs-clubs/web/common/components/RegisterMemberTable";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import { DivisionTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { useGetMemberRegistration } from "@sparcs-clubs/web/features/executive/register-member/services/getMemberRegistration";
import {
  getDisplayNameDivisions,
  getEnumDivisions,
} from "@sparcs-clubs/web/types/divisions.types";

interface ConvertedSelectedCategories {
  name: string;
  selectedContent: number[];
}

const ClubSearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ClubSearchAndFilter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ResetSearchAndFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const TableWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const DivisionTypeList = Object.keys(DivisionTypeTagList).map(key =>
  parseInt(key),
);

export const ExecutiveRegisterMember = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const { data, isLoading, isError } = useGetMemberRegistration({
    pageOffset: currentPage,
    itemCount: limit,
  });

  const [searchText, setSearchText] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /*
    동아리 구분에 대해서만 hardcoding  
    정동아리, 가동아리만 club.enum에 존재하고, 상임동아리(3)는 필터링을 위해 편의상 설정한 것이기 때문
  */
  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: "구분",
      content: ["정동아리", "가동아리", "상임동아리"],
      selectedContent: ["정동아리", "가동아리", "상임동아리"],
    },
    {
      name: "분과",
      content: DivisionTypeList.map(item => getDisplayNameDivisions(item)),
      selectedContent: DivisionTypeList.map(item =>
        getDisplayNameDivisions(item),
      ),
    },
  ]);

  const [convertedCategories, setConvertedCategories] = useState<
    ConvertedSelectedCategories[]
  >([
    {
      name: "구분",
      selectedContent: [1, 2, 3],
    },
    {
      name: "분과",
      selectedContent: DivisionTypeList,
    },
  ]);

  useMemo(() => {
    const convertedClubType = categories[0].selectedContent.map(item => {
      switch (item) {
        case "정동아리":
          return 1;
        case "가동아리":
          return 2;
        case "상임동아리":
          return 3;
        default:
          return 0;
      }
    });

    const convertedDivisionId = categories[1].selectedContent.map(item =>
      getEnumDivisions(item),
    );

    setConvertedCategories([
      {
        name: "구분",
        selectedContent: convertedClubType,
      },
      {
        name: "분과",
        selectedContent: convertedDivisionId,
      },
    ]);
  }, [categories]);

  const filterClubsWithSearch = useMemo(() => {
    const filteredRowsWithSearch = data?.items.filter(
      item =>
        (item.clubName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.clubName.toLowerCase().includes(searchText.toLowerCase()) ||
          hangulIncludes(item.clubName, searchText)) &&
        ((item.isPermanent &&
          convertedCategories[0].selectedContent.includes(3) &&
          convertedCategories[1].selectedContent.includes(item.division.id)) ||
          (!item.isPermanent &&
            convertedCategories[0].selectedContent.includes(
              item.clubTypeEnumId,
            ) &&
            convertedCategories[1].selectedContent.includes(item.division.id))),
    );

    return {
      total: filteredRowsWithSearch?.length ?? 0,
      items:
        filteredRowsWithSearch?.slice(
          10 * (currentPage - 1),
          10 * currentPage,
        ) ?? [],
      offset: data?.offset ?? 0,
    };
  }, [searchText, convertedCategories, currentPage, data]);

  const filterClubsWithoutSearch = useMemo(() => {
    const filteredRowsWithoutSearch = data?.items.filter(
      item =>
        (item.isPermanent &&
          convertedCategories[0].selectedContent.includes(3) &&
          convertedCategories[1].selectedContent.includes(item.division.id)) ||
        (!item.isPermanent &&
          convertedCategories[0].selectedContent.includes(
            item.clubTypeEnumId,
          ) &&
          convertedCategories[1].selectedContent.includes(item.division.id)),
    );

    return {
      total: filteredRowsWithoutSearch?.length ?? 0,
      items:
        filteredRowsWithoutSearch?.slice(
          10 * (currentPage - 1),
          10 * currentPage,
        ) ?? [],
      offset: data?.offset ?? 0,
    };
  }, [convertedCategories, currentPage, data]);

  const filteredClubs =
    searchText === "" ? filterClubsWithoutSearch : filterClubsWithSearch;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {data && filteredClubs && (
        <>
          <ClubSearchAndFilterWrapper>
            <ClubSearchAndFilter>
              <SearchInput
                searchText={searchText}
                handleChange={setSearchText}
                placeholder="동아리 이름으로 검색하세요"
              />
              <MultiFilter
                categories={categories}
                setCategories={setCategories}
              />
            </ClubSearchAndFilter>
            <ResetSearchAndFilterWrapper>
              <TextButton
                text="검색/필터 초기화"
                onClick={() => {
                  setSearchText("");
                  setCategories([
                    {
                      name: "구분",
                      content: ["정동아리", "가동아리", "상임동아리"],
                      selectedContent: ["정동아리", "가동아리", "상임동아리"],
                    },
                    {
                      name: "분과",
                      content: DivisionTypeList.map(item =>
                        getDisplayNameDivisions(item),
                      ),
                      selectedContent: DivisionTypeList.map(item =>
                        getDisplayNameDivisions(item),
                      ),
                    },
                  ]);
                }}
              />
            </ResetSearchAndFilterWrapper>
          </ClubSearchAndFilterWrapper>
          <TableWithPaginationWrapper>
            <RegistrationMemberTable registerMemberList={filteredClubs} />
            <FlexWrapper direction="row" gap={16} justify="center">
              <Pagination
                totalPage={Math.ceil(filteredClubs.total / limit)}
                currentPage={currentPage}
                limit={limit}
                setPage={handlePageChange}
              />
            </FlexWrapper>
          </TableWithPaginationWrapper>
        </>
      )}
    </AsyncBoundary>
  );
};
