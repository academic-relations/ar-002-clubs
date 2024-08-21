"use client";

import React, { useEffect, useState } from "react";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { ChangeDivisionPresidentStatusEnum } from "@sparcs-clubs/web/constants/changeDivisionPresident";
import MyChangeDivisionPresident, {
  MyChangeDivisionPresidentStatusEnum,
} from "@sparcs-clubs/web/features/my/components/MyChangeDivisionPresident";
import MyChangeRepresentative from "@sparcs-clubs/web/features/my/components/MyChangeRepresentative";
import MyClubFrame from "@sparcs-clubs/web/features/my/frames/MyClubFrame";
import MyInfoFrame from "@sparcs-clubs/web/features/my/frames/MyInfoFrame";
import MyRegisterFrame from "@sparcs-clubs/web/features/my/frames/MyRegisterFrame";
import MyServiceFrame from "@sparcs-clubs/web/features/my/frames/MyServiceFrame";
import { useGetMyDelegateRequest } from "@sparcs-clubs/web/features/my/services/getMyDelegateRequest";
import { useGetProfileNow } from "@sparcs-clubs/web/hooks/getProfileNow";

const ResponsiveWrapper = styled(FlexWrapper)`
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    gap: 40px;
  }
`;

const My: React.FC = () => {
  // TODO: clb014 api 구현되면 refetch 테스트
  const profile = useGetProfileNow();
  const isProfessor = profile === "professor";
  const { data, isLoading, isError, refetch } = useGetMyDelegateRequest();
  const fetchDivisionPresident = () => {}; // TODO

  const { data: myProfile } = useGetUserProfile();

  const [type, setType] = useState<"Requested" | "Finished">("Finished");
  const [
    mockHasDivisionPresidentChangeNotice,
    setMockHasDivisionPresidentChangeNotice,
  ] = useState(false);
  const mockIsDivisionPresident = true; // TODO: divisionPresident == user
  const mockChangeDivisionPresident = () => {}; // TODO: change divisionPresident
  const mockRejectDivisionPresidentChange = () => {}; // TODO: set divisionPresidentChange status to "Rejected"

  const [divisionChangeRequestStatus, setDivisionChangeRequestStatus] =
    useState<MyChangeDivisionPresidentStatusEnum>(
      ChangeDivisionPresidentStatusEnum.Requested,
    );

  const onDivisionPresidentChangeRequestConfirmed = () => {
    setDivisionChangeRequestStatus(ChangeDivisionPresidentStatusEnum.Confirmed); // TODO: 변경 요청 보내고 다시 받아오는 방식 (api 구현 이후)
    mockChangeDivisionPresident();
  };

  const onDivisionPresidentChangeRequestRejected = () => {
    setMockHasDivisionPresidentChangeNotice(false); // TODO: 변경 요청 보내고 다시 받아오는 방식 (api 구현 이후)
    mockRejectDivisionPresidentChange();
  };

  useEffect(() => {
    switch (data?.requests[0].clubDelegateChangeRequestStatusEnumId) {
      case ClubDelegateChangeRequestStatusEnum.Applied:
        setType("Requested");
        break;
      case ClubDelegateChangeRequestStatusEnum.Approved:
        setType("Finished");
        break;
      default:
        setType("Finished");
    }
  }, [data]);

  return !isProfessor ? (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ResponsiveWrapper direction="column" gap={60}>
        <PageHead
          items={[{ name: "마이페이지", path: "/my" }]}
          title="마이페이지"
        />
        {data?.requests && data?.requests.length > 0 && (
          <MyChangeRepresentative
            type={type}
            clubName={data?.requests[0].clubName}
            prevRepresentative={`${data?.requests[0].prevStudentId} ${data?.requests[0].prevStudentName}`}
            newRepresentative={`${myProfile?.studentNumber} ${myProfile?.name}`}
            refetch={refetch}
          />
        )}
        {mockHasDivisionPresidentChangeNotice && (
          <MyChangeDivisionPresident
            status={divisionChangeRequestStatus}
            change={["20210227 박병찬", "20200510 이지윤"]}
            fetch={fetchDivisionPresident}
            isDivisionPresident={mockIsDivisionPresident}
            onConfirmed={onDivisionPresidentChangeRequestConfirmed}
            onRejected={onDivisionPresidentChangeRequestRejected}
          />
        )}
        <MyInfoFrame />
        <MyClubFrame />
        <MyRegisterFrame isProfessor={isProfessor} />
        <MyServiceFrame />
      </ResponsiveWrapper>
    </AsyncBoundary>
  ) : (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "마이페이지", path: "/my" }]}
        title="마이페이지"
      />
      <MyInfoFrame />
      <MyClubFrame />
      <MyRegisterFrame isProfessor={isProfessor} />
    </FlexWrapper>
  );
};

export default My;
