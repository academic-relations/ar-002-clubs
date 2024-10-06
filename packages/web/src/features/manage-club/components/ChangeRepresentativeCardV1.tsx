import React, { useEffect, useState } from "react";

import { ApiClb006ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { ApiClb008ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { mockClubDelegateCandidates } from "../services/_mock/mockDelegate";
import { updateClubDelegates } from "../services/updateClubDelegate";

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 2px;
  justify-content: space-between;
`;

const ChangeRepresentativeCardV1: React.FC<{
  clubId: number;
  delegatesNow: ApiClb006ResponseOK;
  delegate1Candidates: ApiClb008ResponseOk;
  delegate2Candidates: ApiClb008ResponseOk;
  refetchDelegateNow: () => void;
  refetchDelegate1: () => void;
  refetchDelegate2: () => void;
}> = ({
  clubId,
  delegatesNow,
  delegate1Candidates,
  delegate2Candidates,
  refetchDelegateNow,
  refetchDelegate1,
  refetchDelegate2,
}) => {
  const [representative, setRepresentative] = useState<string>(
    delegatesNow?.delegates[0].studentId?.toString() ?? "",
  );
  const [delegate1, setDelegate1] = useState<string>(
    delegatesNow?.delegates[1]?.studentId === 0
      ? ""
      : delegatesNow?.delegates[1]?.studentId.toString() ?? "",
  );
  const [delegate2, setDelegate2] = useState<string>(
    delegatesNow?.delegates[2]?.studentId === 0
      ? ""
      : delegatesNow?.delegates[2]?.studentId.toString() ?? "",
  );

  const getSelectItems = (members: ApiClb008ResponseOk): SelectItem<string>[] =>
    members?.students.map(member => ({
      label: `${member.studentNumber} ${member.name} (${member.phoneNumber})`,
      value: member.id.toString(),
      selectable: true,
    })) ?? [];

  const representativeCandidates = mockClubDelegateCandidates;

  useEffect(() => {
    if (
      delegate1 !== delegatesNow?.delegates[1]?.studentId?.toString() &&
      delegate1 !== ""
    ) {
      updateClubDelegates(
        { clubId },
        {
          delegateEnumId: ClubDelegateEnum.Delegate1,
          studentId: Number(delegate1),
        },
      ).then(() => {
        refetchDelegate1();
        refetchDelegate2();
        refetchDelegateNow();
      });
    }
  }, [delegate1, refetchDelegate1, refetchDelegate2, refetchDelegateNow]);

  useEffect(() => {
    if (
      delegate2 !== delegatesNow?.delegates[2]?.studentId?.toString() &&
      delegate2 !== ""
    ) {
      updateClubDelegates(
        { clubId },
        {
          delegateEnumId: ClubDelegateEnum.Delegate2,
          studentId: Number(delegate2),
        },
      ).then(() => {
        refetchDelegate1();
        refetchDelegate2();
        refetchDelegateNow();
      });
    }
  }, [delegate2, refetchDelegate1, refetchDelegate2, refetchDelegateNow]);

  const deleteDelegate = async (delegateEnumId: ClubDelegateEnum) => {
    await updateClubDelegates({ clubId }, { delegateEnumId, studentId: 0 });
    if (delegateEnumId === ClubDelegateEnum.Delegate1) {
      setDelegate1("");
    } else if (delegateEnumId === ClubDelegateEnum.Delegate2) {
      setDelegate2("");
    }
    await refetchDelegate1();
    await refetchDelegate2();
    await refetchDelegateNow();
  };

  return (
    <Card outline gap={32} style={{ flex: 1 }}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        대표자 및 대의원
      </Typography>
      <FlexWrapper direction="column" gap={4}>
        <LabelWrapper>
          <Typography fw="MEDIUM" fs={16} lh={20}>
            대표자
          </Typography>
        </LabelWrapper>
        <Select
          items={getSelectItems(representativeCandidates)}
          value={representative}
          onChange={setRepresentative}
          disabled
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={4}>
        <LabelWrapper>
          <Typography fw="MEDIUM" fs={16} lh={20}>
            대의원 1
          </Typography>
          <TextButton
            text="대의원1 삭제"
            onClick={() => deleteDelegate(ClubDelegateEnum.Delegate1)}
            disabled={
              delegatesNow?.delegates[1]?.studentId === 0 || delegate1 === ""
            }
          />
        </LabelWrapper>
        <Select
          items={getSelectItems(delegate1Candidates)}
          value={delegate1}
          onChange={setDelegate1}
          isRequired={false}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={4}>
        <LabelWrapper>
          <Typography fw="MEDIUM" fs={16} lh={20}>
            대의원 2
          </Typography>
          <TextButton
            text="대의원2 삭제"
            onClick={() => deleteDelegate(ClubDelegateEnum.Delegate2)}
            disabled={
              delegatesNow?.delegates[2]?.studentId === 0 || delegate2 === ""
            }
          />
        </LabelWrapper>
        <Select
          items={getSelectItems(delegate2Candidates)}
          value={delegate2}
          onChange={setDelegate2}
          isRequired={false}
        />
      </FlexWrapper>
    </Card>
  );
};

export default ChangeRepresentativeCardV1;
