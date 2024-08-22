"use client";

import React, { useEffect, useMemo, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { useGetClubsList } from "@sparcs-clubs/web/features/clubs/services/useGetClubsList";
import { useGetRegisTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegisTerm";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

const ResponsiveWrapper = styled(FlexWrapper)`
  gap: 60px;
  direction: column;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    gap: 40px;
  }
`;

const Clubs: React.FC = () => {
  const { data, isLoading, isError } = useGetClubsList();
  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegisTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] = useState<boolean>();
  const [memberRegisPeriodEnd, setMemberRegisPeriodEnd] = useState<Date>(
    new Date(),
  );
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvent = termData.events.find(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (!currentEvent) {
        setIsRegistrationPeriod(false);
        return;
      }
      if (
        currentEvent.registrationEventEnumId ===
        RegistrationDeadlineEnum.StudentRegistrationApplication
      ) {
        setIsRegistrationPeriod(true);
      } else {
        setIsRegistrationPeriod(false);
      }
      setMemberRegisPeriodEnd(currentEvent.endTerm);
    }
  }, [termData]);

  const filteredDivisions = useMemo(
    () =>
      (data?.divisions ?? [])
        .map(division => {
          const filteredClubs = division.clubs
            .filter(
              item =>
                item.name_kr.includes(searchText.toLowerCase()) ||
                item.name_kr.includes(searchText.toUpperCase()) ||
                hangulIncludes(item.name_kr, searchText),
            )
            .sort((a, b) => {
              if (a.isPermanent && !b.isPermanent) return -1;
              if (!a.isPermanent && b.isPermanent) return 1;
              return a.type - b.type || a.name_kr.localeCompare(b.name_kr);
            });

          return { ...division, clubs: filteredClubs };
        })
        .filter(division => division.clubs.length > 0),
    [data, searchText],
  );

  return (
    <ResponsiveWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "동아리 목록", path: "/clubs" }]}
        title="동아리 목록"
      />
      <AsyncBoundary isLoading={isLoadingTerm} isError={isErrorTerm}>
        {isRegistrationPeriod && (
          <Info
            text={`현재는 2024년 가을학기 동아리 신청 기간입니다 (신청 마감 : ${formatDateTime(memberRegisPeriodEnd)})`}
          />
        )}
      </AsyncBoundary>

      <SearchInput
        searchText={searchText}
        handleChange={setSearchText}
        placeholder="동아리 이름으로 검색하세요"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper direction="column" gap={40}>
          {filteredDivisions.map(division => (
            <ClubsSectionFrame
              title={division.name}
              clubList={division.clubs}
              key={division.name}
              isRegistrationPeriod={isRegistrationPeriod}
            />
          ))}
        </FlexWrapper>
      </AsyncBoundary>
    </ResponsiveWrapper>
  );
};

export default Clubs;
