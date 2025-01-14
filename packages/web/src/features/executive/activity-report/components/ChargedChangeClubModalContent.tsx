import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetActivityClubChargeAvailableExecutives from "../services/useGetActivityClubChargeAvailableExecutives";

// import ChargedChangeClubModalTable from "./ChargedChangeClubModalTable";

interface ChargedChangeClubModalContentProps {
  selectedClubIds: number[];
  selectedExecutiveId: number | null;
  setSelectedExecutiveId: (value: number | null) => void;
}

interface ChargeableExecutive {
  label: string;
  value: number;
}

const ChargedChangeClubModalContent: React.FC<
  ChargedChangeClubModalContentProps
> = ({ selectedClubIds, selectedExecutiveId, setSelectedExecutiveId }) => {
  const { data, isLoading, isError } =
    useGetActivityClubChargeAvailableExecutives({ clubIds: selectedClubIds });
  const [selectedExecutiveIdModal, setSelectedExecutiveIdModal] = useState<
    number | null
  >(selectedExecutiveId);

  const [chargeableExecutives, setChargeableExecutives] = useState<
    ChargeableExecutive[]
  >([]);

  useEffect(() => {
    if (data) {
      setChargeableExecutives(
        data.executives.map(executive => ({
          label: `${executive.name} (${executive.studentNumber})`,
          value: executive.id,
        })),
      );
    }
  }, [data]);

  useEffect(() => {
    if (selectedExecutiveIdModal !== null) {
      setSelectedExecutiveId(selectedExecutiveIdModal);
    }
  }, [selectedExecutiveIdModal]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper
        direction="column"
        gap={12}
        style={{ width: "min(600px, 80vw)" }}
      >
        <Select
          items={chargeableExecutives}
          value={selectedExecutiveIdModal}
          onChange={setSelectedExecutiveIdModal}
          label="동아리별 활동 보고서 담당자"
          isTextAlignStart
        />
        {/* <ChargedChangeClubModalTable/> */}
        <Typography fs={14} lh={20} fw="MEDIUM" style={{ textAlign: "left" }}>
          * 동아리별 활동 보고서 담당자를 변경할 경우, 해당 동아리가 작성한 활동
          보고서의 담당자가 모두 해당 담당자로 변경됩니다.
        </Typography>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ChargedChangeClubModalContent;
