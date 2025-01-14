import React, { useEffect, useState } from "react";

import { overlay } from "overlay-kit";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";

import ActivityReportStatistic from "../components/ActivityReportStatistic";
import ChargedChangeClubModalContent from "../components/ChargedChangeClubModalContent";
import { ChargedChangeClubProps } from "../components/ChargedChangeClubModalTable";
import ExecutiveActivityChargedTable from "../components/ExecutiveActivityChargedTable";
import ExecutiveActivityClubTable from "../components/ExecutiveActivityClubTable";
import { putClubActivitiesChargedExecutive } from "../services/putClubActivitiesChargedExecutive";
import useGetExecutiveActivities from "../services/useGetExecutiveActivities";

const ExecutiveActivityReportFrame = () => {
  const [isClubView, setIsClubView] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading, isError } = useGetExecutiveActivities();

  const [selectedClubIds, setSelectedClubIds] = useState<number[]>([]);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<number | null>(
    null,
  );
  const [selectedClubInfos, setSelectedClubInfos] = useState<
    ChargedChangeClubProps[]
  >([]);
  // console.log(selectedExecutiveId);

  useEffect(() => {
    if (data) {
      setSelectedClubInfos(
        data.items
          .filter(item => selectedClubIds.includes(item.clubId))
          .map(item => ({
            clubId: item.clubId,
            clubNameKr: item.clubNameKr,
            clubNameEn: item.clubNameEn,
            prevExecutiveName: item.chargedExecutive?.name ?? "",
          })),
      );
    }
  }, [data, selectedClubIds]);

  const openChargedChangeModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          // TODO: 로직 확인 및 수정 필요
          onConfirm={async () => {
            if (selectedExecutiveId !== null) {
              await putClubActivitiesChargedExecutive({
                clubId: selectedClubIds[0],
                executiveId: selectedExecutiveId,
              });
              close();
            }
            // setSelectedExecutiveId(null);
          }}
          onClose={() => {
            // setSelectedExecutiveId(null);
            close();
          }}
        >
          <ChargedChangeClubModalContent
            selectedClubIds={selectedClubIds}
            selectedClubInfos={selectedClubInfos}
            selectedExecutiveId={selectedExecutiveId}
            setSelectedExecutiveId={setSelectedExecutiveId}
          />
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ActivityReportStatistic
        activities={data ?? { items: [], executiveProgresses: [] }}
      />
      <FlexWrapper direction="row" gap={12}>
        <Button
          style={{ flex: 1 }}
          type={isClubView ? "default" : "outlined"}
          onClick={() => setIsClubView(true)}
        >
          동아리별
        </Button>
        <Button
          style={{ flex: 1 }}
          type={isClubView ? "outlined" : "default"}
          onClick={() => setIsClubView(false)}
        >
          담당자별
        </Button>
      </FlexWrapper>
      <FlexWrapper direction="row" gap={16}>
        <SearchInput
          searchText={searchText}
          handleChange={setSearchText}
          placeholder=""
        />
        {isClubView && (
          <Button
            onClick={openChargedChangeModal}
            type={selectedClubIds.length === 0 ? "disabled" : "default"}
          >
            담당자 변경
          </Button>
        )}
      </FlexWrapper>
      {isClubView ? (
        <ExecutiveActivityClubTable
          activities={data ?? { items: [], executiveProgresses: [] }}
          searchText={searchText}
          selectedClubIds={selectedClubIds}
          setSelectedClubIds={setSelectedClubIds}
        />
      ) : (
        <ExecutiveActivityChargedTable
          activities={data ?? { items: [], executiveProgresses: [] }}
          searchText={searchText}
        />
      )}
    </AsyncBoundary>
  );
};

export default ExecutiveActivityReportFrame;
