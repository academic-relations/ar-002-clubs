import React, { useEffect, useState } from "react";

import { ApiClb006ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { ApiClb008ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import {
  ClubDelegateChangeRequestStatusEnum,
  ClubDelegateEnum,
} from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { deleteChangeDelegateRequest } from "../services/deleteChangeDelegateRequest";
import { useGetChangeDelegateRequests } from "../services/getChangeDelegateRequests";
import { updateClubDelegates } from "../services/updateClubDelegate";

import ChangeRepresentativeInfo from "./ChangeRepresentativeInfo";

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 2px;
  justify-content: space-between;
`;

const ChangeRepresentativeCard: React.FC<{
  clubId: number;
  delegatesNow: ApiClb006ResponseOK;
  clubMembers: ApiClb008ResponseOk;
}> = ({ clubId, delegatesNow, clubMembers }) => {
  const getSelectItems = (members: ApiClb008ResponseOk): SelectItem<string>[] =>
    members?.students.map(member => ({
      label: `${member.studentNumber} ${member.name}${
        member.phoneNumber ? ` (${member.phoneNumber})` : ""
      }`,
      value: member.id.toString(),
      selectable: !delegatesNow.delegates.some(
        delegate => delegate.studentId === member.id,
      ),
    })) ?? [];

  // TODO: 대표자 items 필터링
  const [representativeItems, setRepresentativeItems] = useState<
    SelectItem<string>[]
  >(getSelectItems(clubMembers));

  const [delegate1Items, setDelegate1Items] = useState<SelectItem<string>[]>(
    getSelectItems(clubMembers).filter(
      item =>
        item.value !==
        delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 1)
          ?.studentId?.toString(),
    ),
  );
  const [delegate2Items, setDelegate2Items] = useState<SelectItem<string>[]>(
    getSelectItems(clubMembers).filter(
      item =>
        item.value !==
        delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 1)
          ?.studentId?.toString(),
    ),
  );

  const representative =
    delegatesNow?.delegates
      .find(delegate => delegate.delegateEnumId === 1)
      ?.studentId?.toString() ?? "";

  const representativeName =
    delegatesNow?.delegates.find(delegate => delegate.delegateEnumId === 1)
      ?.name ?? "";

  const [delegate1, setDelegate1] = useState<string>(
    delegatesNow?.delegates.find(delegate => delegate.delegateEnumId === 2)
      ?.studentId === 0
      ? ""
      : delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 2)
          ?.studentId.toString() ?? "",
  );
  const [delegate2, setDelegate2] = useState<string>(
    delegatesNow?.delegates.find(delegate => delegate.delegateEnumId === 3)
      ?.studentId === 0
      ? ""
      : delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 3)
          ?.studentId.toString() ?? "",
  );

  const [type, setType] = useState<
    "Default" | "Applied" | "Rejected" | "Canceled"
  >("Default");

  const { data: requestStatus, refetch } = useGetChangeDelegateRequests({
    clubId,
  });

  useEffect(() => {
    switch (requestStatus?.requests[0]?.clubDelegateChangeRequestStatusEnumId) {
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

  const updateCandidateItems = () => {
    setRepresentativeItems(getSelectItems(clubMembers));
    setDelegate1Items(prevItems =>
      prevItems.map(item =>
        item.value === delegate1 ||
        item.value === delegate2 ||
        item.value === representative
          ? { ...item, selectable: false }
          : { ...item, selectable: true },
      ),
    );
    setDelegate2Items(prevItems =>
      prevItems.map(item =>
        item.value === delegate1 ||
        item.value === delegate2 ||
        item.value === representative
          ? { ...item, selectable: false }
          : { ...item, selectable: true },
      ),
    );
  };

  useEffect(() => {
    if (
      delegate1 !==
        delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 2)
          ?.studentId?.toString() &&
      delegate1 !== ""
    ) {
      updateClubDelegates(
        { clubId },
        {
          delegateEnumId: ClubDelegateEnum.Delegate1,
          studentId: Number(delegate1),
        },
      );
      updateCandidateItems();
    }
  }, [delegate1, delegatesNow]);

  useEffect(() => {
    if (
      delegate2 !==
        delegatesNow?.delegates
          .find(delegate => delegate.delegateEnumId === 3)
          ?.studentId?.toString() &&
      delegate2 !== ""
    ) {
      updateClubDelegates(
        { clubId },
        {
          delegateEnumId: ClubDelegateEnum.Delegate2,
          studentId: Number(delegate2),
        },
      );
      updateCandidateItems();
    }
  }, [delegate2, delegatesNow]);

  const cancelRequest = () => {
    setType("Canceled");
    deleteChangeDelegateRequest({ clubId });
    refetch();
  };

  const changeRepresentativeRequest = (studentId: number) => {
    updateClubDelegates(
      { clubId },
      { delegateEnumId: ClubDelegateEnum.Representative, studentId },
    );
    setType("Applied");
    refetch();
  };

  return (
    <Card outline gap={32} style={{ flex: 1 }}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        대표자 및 대의원
      </Typography>
      {type !== "Default" && (
        <ChangeRepresentativeInfo
          type={type}
          clubName="술박스"
          prevRepresentative={`${representative} ${representativeName}`}
          newRepresentative={`${requestStatus?.requests[0]?.studentId} ${requestStatus?.requests[0]?.studentName}`}
        />
      )}
      <FlexWrapper direction="column" gap={4}>
        <LabelWrapper>
          <Typography fw="MEDIUM" fs={16} lh={20}>
            대표자
          </Typography>
          {type === "Applied" && (
            <TextButton text="대표자 변경 요청 취소" onClick={cancelRequest} />
          )}
        </LabelWrapper>
        <Select
          items={representativeItems}
          value={representative}
          onChange={value => {
            changeRepresentativeRequest(Number(value));
          }}
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
            onClick={() => changeRepresentativeRequest(Number(delegate1))}
            disabled={type === "Applied"}
          />
        </LabelWrapper>
        <Select
          items={delegate1Items}
          value={delegate1}
          onChange={setDelegate1}
          isRequired={false}
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
            onClick={() => changeRepresentativeRequest(Number(delegate2))}
            disabled={type === "Applied"}
          />
        </LabelWrapper>
        <Select
          items={delegate2Items}
          value={delegate2}
          onChange={setDelegate2}
          isRequired={false}
          disabled={type === "Applied"}
        />
      </FlexWrapper>
    </Card>
  );
};

export default ChangeRepresentativeCard;
