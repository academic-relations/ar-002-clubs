"use client";

import React, { useMemo, useState } from "react";

// import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
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

  // const data: {
  // total: number;
  // items: {
  //     id: number;
  //     registrationTypeEnumId: RegistrationTypeEnum;
  //     divisionId: number;
  //     activityFieldKr: string;
  //     activityFieldEn: string;
  //     registrationStatusEnumId: RegistrationStatusEnum;
  //     newClubNameKr: string;
  //     newClubNameEn: string;
  //     representativeName: string;
  //     professorName?: string | undefined;
  // }[];
  // offset: number;
  // } | undefined

  // enum DivisionType
  //   LifeCulture = 1, // 생활문화
  //   PerformingArts, // 연행예술
  //   ExhibitionCreation, // 전시창작
  //   BandMusic, // 밴드음악
  //   VocalMusic, // 보컬음악
  //   InstrumentalMusic, // 연주음악
  //   Society, // 사회
  //   Religion, // 종교
  //   BallSports, // 구기체육
  //   LifeSports, // 생활체육
  //   ScienceEngineeringAcademics, // 이공학술
  //   HumanitiesAcademics, // 인문학술
  // }

  const { data, isLoading, isError } = useGetRegisterClub({
    pageOffset: currentPage,
    itemCount: limit,
  });

  const [searchText, setSearchText] = useState<string>("");

  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: "등록 구분",
      content: ["재등록", "신규 등록", "가등록"],
      selectedContent: ["재등록", "신규 등록", "가등록"], // chacha: 가동아리 신규 / 가동아리 재등록 구분해야 하나요?
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
    // selectedContent를 숫자로 바꾸기! 근데 필터 바뀔 때마다 해야 함
    const result0 = categories[0].selectedContent.map(item => {
      switch (item) {
        case "재등록":
          return 1;
        case "신규 등록":
          return 2;
        case "가등록":
          return 3;
        default:
          return 0;
      }
    }) ?? [0];

    const result1 = categories[1].selectedContent.map(item => {
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
    }) ?? [0];

    setConvertedCategories([
      {
        name: "등록 구분",
        selectedContent: result0,
      },
      {
        name: "분과",
        selectedContent: result1,
      },
    ]);
  }, [categories]);

  const filteredClubsWithSearch = useMemo(() => {
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
      total: data?.total ?? 0,
      items: filteredRowsWithSearch ?? [],
      offset: data?.offset ?? 0,
    };
  }, [searchText, convertedCategories, data]);

  const filteredClubsWithoutSearch = useMemo(() => {
    const filteredRowsWithoutSearch = data?.items.filter(
      item =>
        convertedCategories[0].selectedContent.includes(
          item.registrationTypeEnumId,
        ) && convertedCategories[1].selectedContent.includes(item.divisionId),
    );

    return {
      total: data?.total ?? 0,
      items: filteredRowsWithoutSearch ?? [],
      offset: data?.offset ?? 0,
    };
  }, [convertedCategories, data]);

  const filteredClubs =
    searchText === "" ? filteredClubsWithoutSearch : filteredClubsWithSearch;

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
      </ClubSearchAndFilterWrapper>
      <TableWithPaginationWrapper>
        <ExecutiveRegistrationTable
          registerList={filteredClubs ?? { total: 0, items: [], offset: 0 }}
        />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil((data?.total ?? 0) / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </TableWithPaginationWrapper>
    </AsyncBoundary>
  );
};
