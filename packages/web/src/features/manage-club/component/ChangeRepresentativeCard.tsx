import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ChangeRepresentative from "./ChangeRepresentative";

interface ChangeRepresentativeCardProps {
  type: "Default" | "Requested" | "Refused" | "Canceled";
  selectItems: SelectItem[];
  representative: string;
  setRepresentative: (value: string) => void;
  delegate1: string;
  setDelegate1: (value: string) => void;
  delegate2: string;
  setDelegate2: (value: string) => void;
}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 2px;
  justify-content: space-between;
`;

const ChangeRepresentativeCard: React.FC<ChangeRepresentativeCardProps> = ({
  type,
  selectItems,
  representative,
  setRepresentative,
  delegate1,
  setDelegate1,
  delegate2,
  setDelegate2,
}) => (
  <Card outline gap={32} style={{ flex: 1 }}>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
      대표자 및 대의원
    </Typography>
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
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          대표자
        </Typography>
        {type === "Requested" && <TextButton text="대표자 변경 요청 취소" />}
      </LabelWrapper>
      <Select
        items={selectItems}
        selectedValue={representative}
        onSelect={setRepresentative}
        disabled={type === "Requested"}
      />
    </FlexWrapper>
    <FlexWrapper direction="column" gap={4}>
      <LabelWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          대의원 1
        </Typography>
        <TextButton text="대표자로 지정" disabled={type === "Requested"} />
      </LabelWrapper>
      <Select
        items={selectItems}
        selectedValue={delegate1}
        onSelect={setDelegate1}
        disabled={type === "Requested"}
      />
    </FlexWrapper>
    <FlexWrapper direction="column" gap={4}>
      <LabelWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          대의원 2
        </Typography>
        <TextButton text="대표자로 지정" disabled={type === "Requested"} />
      </LabelWrapper>
      <Select
        items={selectItems}
        selectedValue={delegate2}
        onSelect={setDelegate2}
        disabled={type === "Requested"}
      />
    </FlexWrapper>
  </Card>
);

export default ChangeRepresentativeCard;
