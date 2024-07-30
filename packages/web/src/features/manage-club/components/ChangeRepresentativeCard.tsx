import React, { useEffect, useState } from "react";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockClubMembers } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { useGetChangeDelegateRequests } from "@sparcs-clubs/web/features/manage-club/services/getChangeDelegateRequests";
import { useGetClubDelegate } from "@sparcs-clubs/web/features/manage-club/services/getClubDelegate";

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

  useEffect(() => {
    setRepresentative(delegatesNow?.delegates[0].studentId?.toString() ?? "");
    setDelegate1(delegatesNow?.delegates[1].studentId?.toString() ?? "");
    setDelegate2(delegatesNow?.delegates[2].studentId?.toString() ?? "");
  }, [delegatesNow]);

  const selectItems: SelectItem[] = mockClubMembers.members.map(member => ({
    label: `${member.studentNumber} ${member.name} (${member.krPhoneNumber})`,
    value: member.studentNumber.toString(), // TODO: studentNumber 말고 studentId?
    selectable: true,
  }));

  const { data: requestStatus } = useGetChangeDelegateRequests({ clubId });

  useEffect(() => {
    console.log(requestStatus);
  }, [requestStatus]);
  const type = (() => {
    console.log(
      requestStatus?.requests[0].clubDelegateChangeRequestStatusEnumId,
    );
    switch (requestStatus?.requests[0].clubDelegateChangeRequestStatusEnumId) {
      case ClubDelegateChangeRequestStatusEnum.Applied:
        return "Applied";
      case ClubDelegateChangeRequestStatusEnum.Approved:
        return "Default";
      case ClubDelegateChangeRequestStatusEnum.Rejected:
        return "Rejected";
      default:
        return "Default";
    }
  })();

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
            {type === "Applied" && <TextButton text="대표자 변경 요청 취소" />}
          </LabelWrapper>
          <Select
            items={selectItems}
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
            <TextButton text="대표자로 지정" disabled={type === "Applied"} />
          </LabelWrapper>
          <Select
            items={selectItems}
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
            <TextButton text="대표자로 지정" disabled={type === "Applied"} />
          </LabelWrapper>
          <Select
            items={selectItems}
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
