"use client";

import { hangulIncludes } from "es-hangul";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

import {
  getDisplayNameRegistration,
  getEnumRegistration,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import ExecutiveRegistrationTable from "@sparcs-clubs/web/common/components/ExecutiveRegistrationTable";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MultiFilter from "@sparcs-clubs/web/common/components/MultiFilter/Index";
import { CategoryProps } from "@sparcs-clubs/web/common/components/MultiFilter/types/FilterCategories";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import {
  DivisionTypeTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { useGetRegisterClub } from "@sparcs-clubs/web/features/executive/register-club/services/useGetRegisterClub";
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

const RegistrationTypeList = Object.keys(RegistrationTypeTagList).map(key =>
  parseInt(key),
);

const DivisionTypeList = Object.keys(DivisionTypeTagList).map(key =>
  parseInt(key),
);

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
      content: Array.from(
        new Set(
          RegistrationTypeList.map(item => getDisplayNameRegistration(item)),
        ),
      ),
      selectedContent: Array.from(
        new Set(
          RegistrationTypeList.map(item => getDisplayNameRegistration(item)),
        ),
      ),
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
      name: "등록 구분",
      selectedContent: RegistrationTypeList,
    },
    {
      name: "분과",
      selectedContent: DivisionTypeList,
    },
  ]);

  useMemo(() => {
    const convertedRegistrationType = categories[0].selectedContent.flatMap(
      item => getEnumRegistration(item),
    );

    const convertedDivisionId = categories[1].selectedContent.map(item =>
      getEnumDivisions(item),
    );

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
                  content: Array.from(
                    new Set(
                      RegistrationTypeList.map(item =>
                        getDisplayNameRegistration(item),
                      ),
                    ),
                  ),
                  selectedContent: Array.from(
                    new Set(
                      RegistrationTypeList.map(item =>
                        getDisplayNameRegistration(item),
                      ),
                    ),
                  ),
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
