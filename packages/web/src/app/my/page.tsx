"use client";

import React, { useEffect, useState } from "react";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import MyChangeDivisionPresident from "@sparcs-clubs/web/features/my/components/MyChangeDivisionPresident";
import MyChangeRepresentative from "@sparcs-clubs/web/features/my/components/MyChangeRepresentative";
import MyClubFrame from "@sparcs-clubs/web/features/my/frames/MyClubFrame";
import MyInfoFrame from "@sparcs-clubs/web/features/my/frames/MyInfoFrame";
import MyServiceFrame from "@sparcs-clubs/web/features/my/frames/MyServiceFrame";
import { useGetMyDelegateRequest } from "@sparcs-clubs/web/features/my/services/getMyDelegateRequest";

const My: React.FC = () => {
  // TODO: clb014 api 구현되면 refetch 테스트
  const { data, isLoading, isError, refetch } = useGetMyDelegateRequest();
  const fetchDivisionPresident = () => {}; // TODO

  const { data: myProfile } = useGetUserProfile();

  const [type, setType] = useState<"Requested" | "Finished">("Finished");
  const mockHasDivisionPresidentChangeNotice = true;

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

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={60}>
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
            status="Requested"
            change={["20210227 박병찬", "20200510 이지윤"]}
            fetch={fetchDivisionPresident}
          />
        )}
        <MyInfoFrame />
        <MyClubFrame />
        <MyServiceFrame />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default My;
