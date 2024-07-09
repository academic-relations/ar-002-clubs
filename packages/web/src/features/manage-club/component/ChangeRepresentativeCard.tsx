import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ChangeRepresentative from "./ChangeRepresentative";

interface ChangeRepresentativeCardProps {
  selectItems: SelectItem[];
  president: string;
  setPresident: (value: string) => void;
  representative1: string;
  setRepresentative1: (value: string) => void;
  representative2: string;
  setRepresentative2: (value: string) => void;
}

const ChangeRepresentativeCard: React.FC<ChangeRepresentativeCardProps> = ({
  selectItems,
  president,
  setPresident,
  representative1,
  setRepresentative1,
  representative2,
  setRepresentative2,
}) => (
  <Card outline gap={32} style={{ flex: 1 }}>
    <Typography ff="PRETENDARD" fw="MEDIUM" fs={20} lh={24}>
      대표자 및 대의원
    </Typography>
    <ChangeRepresentative
      type="Requested"
      clubName="술박스"
      prevRepresentative="20210000 박병찬"
      newRepresentative="20200000 이지윤"
    />
    <ChangeRepresentative
      type="Refused"
      clubName="술박스"
      prevRepresentative="20210000 박병찬"
      newRepresentative="20200000 이지윤"
    />
    <ChangeRepresentative
      type="Canceled"
      clubName="술박스"
      prevRepresentative="20210000 박병찬"
      newRepresentative="20200000 이지윤"
    />
    <Select
      label="대표자"
      items={selectItems}
      selectedValue={president}
      onSelect={setPresident}
    />
    <Select
      label="대의원 1"
      items={selectItems}
      selectedValue={representative1}
      onSelect={setRepresentative1}
    />
    <Select
      label="대의원 2"
      items={selectItems}
      selectedValue={representative2}
      onSelect={setRepresentative2}
    />
  </Card>
);

export default ChangeRepresentativeCard;
