import React from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { useGetStorageContract } from "../services/useGetStorageContract";

const StorageDetailFrameInner = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: flex;
`;

export interface ClubStorageContractDetail {
  contractId: number;
}

export const ExecutiveStorageContractFrame: React.FC<
  ClubStorageContractDetail
> = ({ contractId }: ClubStorageContractDetail) => {
  const { data, isLoading, isError } = useGetStorageContract(contractId);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card padding="32px" gap={20} outline>
        <StorageDetailFrameInner>
          <Typography
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {data?.startDate &&
              `  •  보관 기한: ${formatDate(data?.startDate)} ~ ${formatDate(data?.endDate)}`}
          </Typography>
          <Typography
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  물품: 규격 내 ${data?.numberOfBoxes}개 ~ 규격 외 ${data?.numberOfNonStandardItems}개`}
          </Typography>
          <Typography
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  요금: ${data?.charge}원`}
          </Typography>
          <Typography
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {data?.startDate ? `  •  구역: ${data?.zone}` : ""}
          </Typography>
          <br />
          <Typography
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`${data?.clubNameKr} 대표자 ${data?.studentName}`}
          </Typography>
          <Typography
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`담당자: ${data?.executiveName}`}
          </Typography>
          <Typography
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {data?.createdAt ? `${formatDate(data?.createdAt)}` : ""}
          </Typography>
        </StorageDetailFrameInner>
      </Card>
    </AsyncBoundary>
  );
};
