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

import { updateClubDelegates } from "../services/updateClubDelegate";

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 2px;
  justify-content: space-between;
`;

// ChangeRepresentativeCardV1은 대표자 변경 기능 제외하고 대의원 변경 기능만 구현한 버젼
const ChangeRepresentativeCardV1: React.FC<{
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

  const [representative, setRepresentative] = useState<string>(
    delegatesNow?.delegates
      .find(delegate => delegate.delegateEnumId === 1)
      ?.studentId?.toString() ?? "",
  );
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

  const deleteDelegate = async (
    delegateEnumId: ClubDelegateEnum,
    studentId: string,
  ) => {
    await updateClubDelegates({ clubId }, { delegateEnumId, studentId: 0 });
    if (delegateEnumId === ClubDelegateEnum.Delegate1) {
      setDelegate1("");
    } else if (delegateEnumId === ClubDelegateEnum.Delegate2) {
      setDelegate2("");
    }
    setDelegate1Items(prevItems =>
      prevItems.map(item =>
        item.value === studentId ? { ...item, selectable: true } : item,
      ),
    );
    setDelegate2Items(prevItems =>
      prevItems.map(item =>
        item.value === studentId ? { ...item, selectable: true } : item,
      ),
    );
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
          items={representativeItems}
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
            onClick={() =>
              deleteDelegate(ClubDelegateEnum.Delegate1, delegate1)
            }
            disabled={
              delegatesNow?.delegates.find(
                delegate => delegate.delegateEnumId === 2,
              )?.studentId === 0 || delegate1 === ""
            }
          />
        </LabelWrapper>
        <Select
          items={delegate1Items}
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
            onClick={() =>
              deleteDelegate(ClubDelegateEnum.Delegate2, delegate2)
            }
            disabled={
              delegatesNow?.delegates.find(
                delegate => delegate.delegateEnumId === 3,
              )?.studentId === 0 || delegate2 === ""
            }
          />
        </LabelWrapper>
        <Select
          items={delegate2Items}
          value={delegate2}
          onChange={setDelegate2}
          isRequired={false}
        />
      </FlexWrapper>
    </Card>
  );
};

export default ChangeRepresentativeCardV1;
