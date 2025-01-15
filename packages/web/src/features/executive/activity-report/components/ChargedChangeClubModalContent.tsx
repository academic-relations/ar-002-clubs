import React, { useEffect, useState } from "react";

import apiAct023 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct023";

import { useQueryClient } from "@tanstack/react-query";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { putClubActivitiesChargedExecutive } from "../services/putClubActivitiesChargedExecutive";
import useGetActivityClubChargeAvailableExecutives from "../services/useGetActivityClubChargeAvailableExecutives";

import ChargedChangeClubModalTable, {
  ChargedChangeClubProps,
} from "./ChargedChangeClubModalTable";

interface ChargedChangeClubModalContentProps {
  isOpen: boolean;
  close: VoidFunction;
  selectedClubIds: number[];
  selectedClubInfos: ChargedChangeClubProps[];
}

interface ChargeableExecutive {
  label: string;
  value: number;
}

const ChargedChangeClubModalContent: React.FC<
  ChargedChangeClubModalContentProps
> = ({ isOpen, close, selectedClubIds, selectedClubInfos }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } =
    useGetActivityClubChargeAvailableExecutives({ clubIds: selectedClubIds });
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<number | null>(
    null,
  );

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

  return (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        onConfirm={async () => {
          if (selectedExecutiveId !== null) {
            await putClubActivitiesChargedExecutive({
              clubIds: selectedClubIds,
              executiveId: selectedExecutiveId,
            });
            queryClient.invalidateQueries({ queryKey: [apiAct023.url()] });
            close();
          }
          setSelectedExecutiveId(null);
        }}
        onClose={() => {
          setSelectedExecutiveId(null);
          close();
        }}
      >
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <FlexWrapper
            direction="column"
            gap={12}
            style={{ width: "min(600px, 80vw)" }}
          >
            <Select
              items={chargeableExecutives}
              value={selectedExecutiveId}
              onChange={setSelectedExecutiveId}
              label="동아리별 활동 보고서 담당자"
              isTextAlignStart
            />
            <ChargedChangeClubModalTable
              data={selectedClubInfos}
              newExecutiveName={
                chargeableExecutives
                  .find(executive => executive.value === selectedExecutiveId)
                  ?.label.split(" ")[0] ?? ""
              }
            />
            <Typography
              fs={14}
              lh={20}
              fw="MEDIUM"
              style={{ textAlign: "left" }}
            >
              * 동아리별 활동 보고서 담당자를 변경할 경우, 해당 동아리가 작성한
              활동 보고서의 담당자가 모두 해당 담당자로 변경됩니다.
            </Typography>
          </FlexWrapper>
        </AsyncBoundary>
      </CancellableModalContent>
    </Modal>
  );
};

export default ChargedChangeClubModalContent;
