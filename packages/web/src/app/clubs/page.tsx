"use client";

import React, { useState } from "react";

import { hangulIncludes } from "es-hangul";

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

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "동아리 목록", path: "/clubs" }]}
        title="동아리 목록"
      />
      <SearchInput
        searchText={searchText}
        handleChange={setSearchText}
        placeholder="동아리 이름으로 검색하세요"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {isRegistrationPeriod && (
          <Info text="현재는 2024년 봄학기 동아리 신청 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
        )}
        <FlexWrapper direction="column" gap={40}>
          {(data?.divisions ?? []).map(division => (
            <ClubsSectionFrame
              title={division.name}
              clubList={division.clubs
                .filter(
                  item =>
                    item.name.includes(searchText.toLowerCase()) ||
                    item.name.includes(searchText.toUpperCase()) ||
                    hangulIncludes(item.name, searchText),
                )
                .sort((a, b) => {
                  if (a.isPermanent && !b.isPermanent) return -1;
                  if (!a.isPermanent && b.isPermanent) return 1;
                  return a.type - b.type || a.name.localeCompare(b.name);
                })}
              key={division.name}
              isRegistrationPeriod={isRegistrationPeriod}
            />
          ))}
        </FlexWrapper>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default Clubs;
