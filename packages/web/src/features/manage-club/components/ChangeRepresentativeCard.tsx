import React, { useEffect, useState } from "react";

import { ApiClb008ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import {
  ClubDelegateChangeRequestStatusEnum,
  ClubDelegateEnum,
} from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { deleteChangeDelegateRequest } from "@sparcs-clubs/web/features/manage-club/services/deleteChangeDelegateRequest";
import { useGetChangeDelegateRequests } from "@sparcs-clubs/web/features/manage-club/services/getChangeDelegateRequests";
import { useGetClubDelegate } from "@sparcs-clubs/web/features/manage-club/services/getClubDelegate";
import { useGetDelegateCandidates } from "@sparcs-clubs/web/features/manage-club/services/getDelegateCandidates";
import { updateClubDelegates } from "@sparcs-clubs/web/features/manage-club/services/updateClubDelegate";

import ChangeRepresentative from "./ChangeRepresentative";

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 2px;
  justify-content: space-between;
`;

const ChangeRepresentativeCard: React.FC = () => {
  const clubId = 1; // TODO: 동아리 id 받아오기

  const {
    data: delegatesNow,
    isLoading,
    isError,
  } = useGetClubDelegate({ clubId });

  const [representative, setRepresentative] = useState<string>("");
  const [delegate1, setDelegate1] = useState<string>("");
  const [delegate2, setDelegate2] = useState<string>("");
  // TODO: 중복 선택 막는 로직 추가

  const [type, setType] = useState<
    "Default" | "Applied" | "Rejected" | "Canceled"
  >("Default");

  useEffect(() => {
    setRepresentative(delegatesNow?.delegates[0].studentId?.toString() ?? "");
    setDelegate1(delegatesNow?.delegates[1].studentId?.toString() ?? "");
    setDelegate2(delegatesNow?.delegates[2].studentId?.toString() ?? "");
  }, [delegatesNow]);

  const { data: requestStatus } = useGetChangeDelegateRequests({ clubId });

  useEffect(() => {
    switch (requestStatus?.requests[0].clubDelegateChangeRequestStatusEnumId) {
      case ClubDelegateChangeRequestStatusEnum.Applied:
        setType("Applied");
        break;
      case ClubDelegateChangeRequestStatusEnum.Approved:
        setType("Default");
        break;
      case ClubDelegateChangeRequestStatusEnum.Rejected:
        setType("Rejected");
        break;
      default:
        setType("Default");
    }
  }, [requestStatus]);

  const cancelRequest = () => {
    setType("Canceled");
    deleteChangeDelegateRequest({ clubId });
  };

  const getSelectItems = (
    members: ApiClb008ResponseOk | undefined,
  ): SelectItem[] =>
    members?.students.map(member => ({
      label: `${member.id} ${member.name} (${member.phoneNumber})`,
      value: member.id.toString(),
      selectable: true,
    })) ?? [];

  const { data: representativeCandidates } = useGetDelegateCandidates({
    clubId,
    delegateEnumId: ClubDelegateEnum.President,
  });

  const { data: delegate1Candidates } = useGetDelegateCandidates({
    clubId,
    delegateEnumId: ClubDelegateEnum.Representative1,
  });

  const { data: delegate2Candidates } = useGetDelegateCandidates({
    clubId,
    delegateEnumId: ClubDelegateEnum.Representative2,
  });

  const changeRepresentative = (studentId: number) => {
    updateClubDelegates(
      { clubId },
      { delegateEnumId: ClubDelegateEnum.President, studentId },
    );
  };

  return (
    <Card outline gap={32} style={{ flex: 1 }}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        대표자 및 대의원
      </Typography>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {type !== "Default" && (
          <ChangeRepresentative
            type={type}
            clubName="술박스"
            prevRepresentative="20210000 박병찬"
            newRepresentative="20200000 이지윤"
          />
        )}
        <FlexWrapper direction="column" gap={4}>
          <LabelWrapper>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              대표자
            </Typography>
            {type === "Applied" && (
              <TextButton
                text="대표자 변경 요청 취소"
                onClick={cancelRequest}
              />
            )}
          </LabelWrapper>
          <Select
            items={getSelectItems(representativeCandidates)}
            selectedValue={representative}
            onSelect={setRepresentative}
            disabled={type === "Applied"}
          />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={4}>
          <LabelWrapper>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              대의원 1
            </Typography>
            <TextButton
              text="대표자로 지정"
              disabled={type === "Applied"}
              onClick={() => changeRepresentative(Number(delegate1))}
            />
          </LabelWrapper>
          <Select
            items={getSelectItems(delegate1Candidates)}
            selectedValue={delegate1}
            onSelect={setDelegate1}
            disabled={type === "Applied"}
          />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={4}>
          <LabelWrapper>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              대의원 2
            </Typography>
            <TextButton
              text="대표자로 지정"
              disabled={type === "Applied"}
              onClick={() => changeRepresentative(Number(delegate2))}
            />
          </LabelWrapper>
          <Select
            items={getSelectItems(delegate2Candidates)}
            selectedValue={delegate2}
            onSelect={setDelegate2}
            disabled={type === "Applied"}
          />
        </FlexWrapper>
      </AsyncBoundary>
    </Card>
  );
};

export default ChangeRepresentativeCard;
