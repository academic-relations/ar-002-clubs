import { useEffect, useState } from "react";

import apiFnd008 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd008";
import apiFnd015 from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd015";
import { ApiFnd016ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd016";
import { useQueryClient } from "@tanstack/react-query";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import useGetFundingClubChargeAvailableExecutives from "../services/useGetFundingClubChargeAvailableExecutives";

import ChargedChangeFundingModalTable, {
  ChargedChangeFundingProps,
} from "./ChargedChangeFundingModalTable";

interface ChargedChangeFundingModalContentProps {
  isOpen: boolean;
  close: () => void;
  selectedClubIds: number[];
  selectedClubInfos: ChargedChangeFundingProps[];
}

interface ChargeableExecutive {
  label: string;
  value: number;
}

const ChargedChangeFundingModalContent = ({
  isOpen,
  close,
  selectedClubIds,
  selectedClubInfos,
}: ChargedChangeFundingModalContentProps) => {
  const queryClient = useQueryClient();
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<number | null>(
    null,
  );
  const [chargeableExecutives, setChargeableExecutives] = useState<
    ChargeableExecutive[]
  >([]);

  const { data, isLoading, isError } =
    useGetFundingClubChargeAvailableExecutives({
      clubIds: selectedClubIds,
    });

  useEffect(() => {
    if (data) {
      setChargeableExecutives(
        data.executives
          .map((executive: ApiFnd016ResponseOk["executives"][number]) => ({
            label: `${executive.name} (${executive.studentNumber})`,
            value: executive.id,
          }))
          .sort((a: ChargeableExecutive, b: ChargeableExecutive) =>
            a.label.localeCompare(b.label),
          ),
      );
    }
  }, [data]);

  const handleSubmit = async () => {
    if (selectedExecutiveId === null) return;

    await axiosClientWithAuth.post(apiFnd015.url(), {
      clubIds: selectedClubIds,
      executiveId: selectedExecutiveId,
    });

    await queryClient.invalidateQueries({
      queryKey: [apiFnd008.url()],
    });
    close();
    setSelectedExecutiveId(null);
  };

  const handleClose = () => {
    setSelectedExecutiveId(null);
    close();
  };

  return (
    <Modal isOpen={isOpen}>
      <CancellableModalContent onConfirm={handleSubmit} onClose={handleClose}>
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <FlexWrapper
            direction="column"
            gap={16}
            style={{ width: "min(600px, 80vw)" }}
          >
            <Typography fs={16} lh={28} fw="MEDIUM">
              담당자 변경
            </Typography>
            <Select
              items={chargeableExecutives}
              value={selectedExecutiveId}
              onChange={setSelectedExecutiveId}
              label="지원금 담당자"
              isTextAlignStart
            />
            <ChargedChangeFundingModalTable
              selectedClubInfos={selectedClubInfos}
            />
          </FlexWrapper>
        </AsyncBoundary>
      </CancellableModalContent>
    </Modal>
  );
};

export default ChargedChangeFundingModalContent;
