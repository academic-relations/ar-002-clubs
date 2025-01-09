import React, { useState } from "react";

import { overlay } from "overlay-kit";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ActivityReportStatistic from "../components/ActivityReportStatistic";
import ExecutiveActivityChargedTable from "../components/ExecutiveActivityChargedTable";
import ExecutiveActivityClubTable from "../components/ExecutiveActivityClubTable";
import useGetExecutiveActivities from "../services/useGetExecutiveActivities";

const ExecutiveActivityReportFrame = () => {
  const [isClubView, setIsClubView] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading, isError } = useGetExecutiveActivities();

  const [selectedClubIds, setSelectedClubIds] = useState<number[]>([]);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<
    number | null
  >();

  const openChargedChangeModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent onConfirm={close} onClose={close}>
          <FlexWrapper
            direction="column"
            gap={12}
            style={{ width: "min(600px, 80vw)" }}
          >
            <Select
              items={[]}
              value={selectedExecutiveId}
              onChange={setSelectedExecutiveId}
              label="동아리별 활동 보고서 담당자"
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
          <Button onClick={openChargedChangeModal}>담당자 변경</Button>
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
