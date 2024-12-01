import React from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreview from "@sparcs-clubs/web/common/components/File/ThumbnailPreview";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { FilePreviewContainer } from "@sparcs-clubs/web/features/my/register-club/frames/MyRegisterClubDetailFrame";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { useGetStorageApplication } from "../services/useGetStorageApplication";

const StorageDetailFrameInner = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: flex;
`;

function calculateMonthsDifference(date1: Date, date2: Date): number {
  const yearsDiff = date2.getFullYear() - date1.getFullYear();
  const monthsDiff = date2.getMonth() - date1.getMonth();
  const daysDiff = date2.getDate() - date1.getDate();
  let totalMonths = yearsDiff * 12 + monthsDiff;
  if (daysDiff > 0) {
    totalMonths += 1;
  }

  return totalMonths;
}

export interface ClubRegisterDetail {
  applicationId: number;
}

const ExecutiveStorageDetailFrame: React.FC<ClubRegisterDetail> = ({
  applicationId,
}: ClubRegisterDetail) => {
  const { data, isLoading, isError } = useGetStorageApplication(applicationId);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card padding="32px" gap={20} outline>
        <StorageDetailFrameInner>
          <Typography
            key="orderUserInfo"
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            신청자 정보
          </Typography>
          <Typography
            key="orderInfoClub"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  동아리: ${data?.clubNameKr}`}{" "}
          </Typography>
          <Typography
            key="orderUserName"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  신청자: ${data?.studentName}`}
          </Typography>
          <Typography
            key="orderUserPhoneNumber"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  연락처: ${data?.studentPhoneNumber}`}
          </Typography>
          <Typography
            key="orderInfo"
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ whiteSpace: "pre-wrap" }}
          >
            창고 사용 신청 정보
          </Typography>
          <Typography
            key="orderInfoBoxCount"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  필요한 상자 수량: ${data?.numberOfBoxes}`}
          </Typography>
          <Typography
            key="orderInfoDesiredPickUpDate"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  상자 수령 일시: ${data?.desiredPickUpDate ? formatDate(data.desiredPickUpDate) : "오류가 발생했습니다. 관리자에게 문의주세요."}`}
          </Typography>
          <Typography
            key="orderInfoDesiredStartDate"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  보관 시작 일시: ${data?.desiredStartDate ? formatDate(data.desiredStartDate) : "오류가 발생했습니다. 관리자에게 문의주세요."}`}
          </Typography>
          <Typography
            key="orderInfoDesiredEndDate"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  보관 종료 일시: ${data?.desiredEndDate ? formatDate(data.desiredEndDate) : "오류가 발생했습니다. 관리자에게 문의주세요."}`}
          </Typography>
          <Typography
            key="orderInfoDesiredEndDate"
            fs={16}
            lh={20}
            fw="REGULAR"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {`  •  보관 개월: ${data?.desiredStartDate && data?.desiredEndDate ? calculateMonthsDifference(new Date(data.desiredStartDate), new Date(data.desiredEndDate)) : "오류가 발생했습니다. 관리자에게 문의주세요."}개월`}
          </Typography>

          {data?.nonStandardItems.length &&
          data?.nonStandardItems.length > 0 ? (
            <>
              <Typography
                key="orderInfo"
                fs={16}
                lh={20}
                fw="MEDIUM"
                style={{ whiteSpace: "pre-wrap" }}
              >
                규격 외 물품 목록
              </Typography>
              {data?.nonStandardItems?.map(nonstandardItem => (
                <Typography
                  key="nonStandardItem"
                  fs={16}
                  lh={20}
                  fw="REGULAR"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {`  •  ${nonstandardItem.name}`}
                  {nonstandardItem?.fileId && nonstandardItem?.fileUrl && (
                    <FilePreviewContainer>
                      <ThumbnailPreview
                        key={`${nonstandardItem.fileId.toString()}`}
                        file={{
                          id: nonstandardItem.fileId,
                          name: "",
                          url: nonstandardItem.fileUrl,
                        }}
                        onClick={() => {}}
                        disabled
                      />
                    </FilePreviewContainer>
                  )}
                </Typography>
              ))}
            </>
          ) : (
            ""
          )}
        </StorageDetailFrameInner>
      </Card>
    </AsyncBoundary>
  );
};

export default ExecutiveStorageDetailFrame;
