import React, { useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import { getEnumStorage } from "@sparcs-clubs/web/types/storage.types";

import { ManageStorageProgress } from "../components/ManageStorageProgress";
import { useGetStorageApplication } from "../services/useGetStorageApplication";

import { ManageStorageApplicationFrame } from "./ManageStorageApplicationFrame";
import { ManageStorageContractFrame } from "./ManageStorageContractFrame";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
`;

export interface ClubStorageDetail {
  applicationId: number;
}

const ManageStorageDetailFrame: React.FC<ClubStorageDetail> = ({
  applicationId,
}: ClubStorageDetail) => {
  const { data, isLoading, isError } = useGetStorageApplication(applicationId);

  const [isContractView, setIsContractView] = useState(false);

  const ApplicationHandler = () => {
    setIsContractView(false);
  };

  const ContractHandler = () => {
    setIsContractView(true);
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card outline gap={20}>
        <ManageStorageProgress
          status={getEnumStorage(data?.status ? data?.status : "")}
          applicationId={applicationId}
        />

        {data?.contractId ? (
          <ButtonWrapper>
            <Button
              type={isContractView ? "outlined" : "default"}
              onClick={ApplicationHandler}
            >
              신청서 정보
            </Button>
            <Button
              type={isContractView ? "default" : "outlined"}
              onClick={ContractHandler}
            >
              계약서 정보
            </Button>
          </ButtonWrapper>
        ) : (
          ""
        )}

        {!isContractView ? (
          <>{data ? <ManageStorageApplicationFrame data={data} /> : ""}</>
        ) : (
          <ManageStorageContractFrame
            contractId={data?.contractId ? data?.contractId : 0}
          />
        )}
      </Card>
    </AsyncBoundary>
  );
};

export default ManageStorageDetailFrame;
