"use client";

import React, { useMemo, useState } from "react";

import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import ExecutiveRegistrationTable from "@sparcs-clubs/web/common/components/ExecutiveRegistrationTable";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MultiFilter from "@sparcs-clubs/web/common/components/MultiFilter/Index";
import { CategoryProps } from "@sparcs-clubs/web/common/components/MultiFilter/types/FilterCategories";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import { useGetRegisterClub } from "@sparcs-clubs/web/features/executive/register-club/services/useGetRegisterClub";

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

export const ExecutiveRegistrationClubFrame = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, isError } = useGetRegisterClub({
    pageOffset: currentPage,
    itemCount: limit,
  });

  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: "등록 구분",
      content: ["재등록", "신규 등록", "가등록"],
      selectedContent: ["재등록", "신규 등록", "가등록"], // chacha: 가동아리 신규등록 / 가동아리 재등록 태그로 구분해야 하나요?
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
      name: "등록 구분",
      selectedContent: [1, 2, 3],
    },
    {
      name: "분과",
      selectedContent: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  ]);

  useMemo(() => {
    const convertedRegistrationType = categories[0].selectedContent.flatMap(
      item => {
        switch (item) {
          case "재등록":
            return [1];
          case "신규 등록":
            return [2];
          case "가등록":
            return [3, 4];
          default:
            return 0;
        }
      },
    );

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
        name: "등록 구분",
        selectedContent: convertedRegistrationType,
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
        (item.newClubNameKr.toLowerCase().includes(searchText.toLowerCase()) ||
          item.newClubNameEn.toLowerCase().includes(searchText.toLowerCase()) ||
          hangulIncludes(item.newClubNameKr, searchText)) &&
        convertedCategories[0].selectedContent.includes(
          item.registrationTypeEnumId,
        ) &&
        convertedCategories[1].selectedContent.includes(item.divisionId),
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
        convertedCategories[0].selectedContent.includes(
          item.registrationTypeEnumId,
        ) && convertedCategories[1].selectedContent.includes(item.divisionId),
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ClubSearchAndFilterWrapper>
        <ClubSearchAndFilter>
          <SearchInput
            searchText={searchText}
            handleChange={setSearchText}
            placeholder="동아리 이름으로 검색하세요"
          />
          <MultiFilter categories={categories} setCategories={setCategories} />
        </ClubSearchAndFilter>
        <ResetSearchAndFilterWrapper>
          <TextButton
            text="검색/필터 초기화"
            onClick={() => {
              setSearchText("");
              setCategories([
                {
                  name: "등록 구분",
                  content: ["재등록", "신규 등록", "가등록"],
                  selectedContent: ["재등록", "신규 등록", "가등록"],
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
        <ExecutiveRegistrationTable
          registerList={filteredClubs ?? { total: 0, items: [], offset: 0 }}
        />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil((filteredClubs?.total ?? 0) / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </TableWithPaginationWrapper>
    </AsyncBoundary>
  );
};
