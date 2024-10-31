"use client";

import React, { useMemo, useState } from "react";

import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MultiFilter from "@sparcs-clubs/web/common/components/MultiFilter/Index";
import { CategoryProps } from "@sparcs-clubs/web/common/components/MultiFilter/types/FilterCategories";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import RegistrationMemberTable from "@sparcs-clubs/web/common/components/RegisterMemberTable";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";

import { useGetMemberRegistration } from "@sparcs-clubs/web/features/executive/register-member/services/getMemberRegistration";

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

  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: "구분",
      content: ["정동아리", "가동아리", "상임동아리"],
      selectedContent: ["정동아리", "가동아리", "상임동아리"],
    },
    {
      name: "분과",
      content: [
        "생활문화",
        "연행예술",
        "전시창작",
        "밴드음악",
        "보컬음악",
        "연주음악",
        "사회",
        "종교",
        "구기체육",
        "생활체육",
        "이공학술",
        "인문학술",
      ],
      selectedContent: [
        "생활문화",
        "연행예술",
        "전시창작",
        "밴드음악",
        "보컬음악",
        "연주음악",
        "사회",
        "종교",
        "구기체육",
        "생활체육",
        "이공학술",
        "인문학술",
      ],
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
      selectedContent: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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

    const convertedDivisionId = categories[1].selectedContent.map(item => {
      switch (item) {
        case "생활문화":
          return 1;
        case "연행예술":
          return 2;
        case "전시창작":
          return 3;
        case "밴드음악":
          return 4;
        case "보컬음악":
          return 5;
        case "연주음악":
          return 6;
        case "사회":
          return 7;
        case "종교":
          return 8;
        case "구기체육":
          return 9;
        case "생활체육":
          return 10;
        case "이공학술":
          return 11;
        case "인문학술":
          return 12;
        default:
          return 0;
      }
    });

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
                      content: [
                        "생활문화",
                        "연행예술",
                        "전시창작",
                        "밴드음악",
                        "보컬음악",
                        "연주음악",
                        "사회",
                        "종교",
                        "구기체육",
                        "생활체육",
                        "이공학술",
                        "인문학술",
                      ],
                      selectedContent: [
                        "생활문화",
                        "연행예술",
                        "전시창작",
                        "밴드음악",
                        "보컬음악",
                        "연주음악",
                        "사회",
                        "종교",
                        "구기체육",
                        "생활체육",
                        "이공학술",
                        "인문학술",
                      ],
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
