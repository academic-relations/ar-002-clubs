"use client";

import React, { useState } from "react";

import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { useGetClubsList } from "@sparcs-clubs/web/features/clubs/services/useGetClubsList";

const Clubs: React.FC = () => {
  const { data, isLoading, isError } = useGetClubsList();
  const isRegistrationPeriod = true;
  const [searchText, setSearchText] = useState<string>("");

  const ResponsiveWrapper = styled(FlexWrapper)`
    gap: 60px;
    direction: column;

    @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
      gap: 40px;
    }
  `;

  return (
    <ResponsiveWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "동아리 목록", path: "/clubs" }]}
        title="동아리 목록"
      />
      {isRegistrationPeriod && (
        <Info text="현재는 2024년 봄학기 동아리 신청 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
      )}
      <SearchInput
        searchText={searchText}
        handleChange={setSearchText}
        placeholder="동아리 이름으로 검색하세요"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper direction="column" gap={40}>
          {(data?.divisions ?? []).map(
            division =>
              division.clubs.filter(
                item =>
                  item.name_kr.includes(searchText.toLowerCase()) ||
                  item.name_kr.includes(searchText.toUpperCase()) ||
                  hangulIncludes(item.name_kr, searchText),
              ).length !== 0 && (
                <ClubsSectionFrame
                  title={division.name}
                  clubList={division.clubs
                    .filter(
                      item =>
                        item.name_kr.includes(searchText.toLowerCase()) ||
                        item.name_kr.includes(searchText.toUpperCase()) ||
                        hangulIncludes(item.name_kr, searchText),
                    )
                    .sort((a, b) => {
                      if (a.isPermanent && !b.isPermanent) return -1;
                      if (!a.isPermanent && b.isPermanent) return 1;
                      return (
                        a.type - b.type || a.name_kr.localeCompare(b.name_kr)
                      );
                    })}
                  key={division.name}
                  isRegistrationPeriod={isRegistrationPeriod}
                />
              ),
          )}
        </FlexWrapper>
      </AsyncBoundary>
    </ResponsiveWrapper>
  );
};

export default Clubs;
