"use client";

import React, { useEffect, useState } from "react";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { ChangeDivisionPresidentStatusEnum } from "@sparcs-clubs/web/constants/changeDivisionPresident";
import MyChangeDivisionPresident, {
  MyChangeDivisionPresidentStatusEnum,
} from "@sparcs-clubs/web/features/my/components/MyChangeDivisionPresident";
import MyChangeRepresentative from "@sparcs-clubs/web/features/my/components/MyChangeRepresentative";
import { useGetMyDelegateRequest } from "@sparcs-clubs/web/features/my/services/getMyDelegateRequest";

export const MyChangesFrame = () => {
  // TODO: clb014 api 구현되면 refetch 테스트

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
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
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
    </AsyncBoundary>
  );
};
