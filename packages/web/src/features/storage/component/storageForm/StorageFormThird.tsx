/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useEffect } from "react";

import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

// eslint-disable-next-line no-restricted-imports, import/no-cycle
import type { StorageFormProps } from "../../frame/StorageMainFrame";

const ActivityCertificateThirdFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const BasicInfoSummaryFrameInner = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: flex;
`;

type StorageFormThirdProps = Pick<StorageFormProps, "username">;

const StorageFormThird: React.FC<StorageFormThirdProps> = ({
  username,
}: StorageFormThirdProps) => {
  const { getValues } = useFormContext<ApiSto001RequestBody>();

  const {
    data: clubData,
    isLoading,
    isError,
  } = useGetClubDetail(getValues().clubId.toString());

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

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ActivityCertificateThirdFrameInner>
        <Card outline gap={20}>
          <BasicInfoSummaryFrameInner>
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
              {`  •  동아리: ${clubData?.name_kr}`}{" "}
            </Typography>
            <Typography
              key="orderUserName"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  담당자: ${username}`}
            </Typography>
            <Typography
              key="orderUserPhoneNumber"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  연락처: ${getValues().studentPhoneNumber}`}
            </Typography>
            <Typography
              key="orderInfo"
              fs={16}
              lh={20}
              fw="MEDIUM"
              style={{ whiteSpace: "pre-wrap" }}
            >
              창고사용신청 정보
            </Typography>
            <Typography
              key="orderInfoBoxCount"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  필요한 상자 수량: ${getValues().numberOfBoxes}`}
            </Typography>
            <Typography
              key="orderInfoDesiredPickUpDate"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  상자 수령 일시: ${formatDate(getValues().desiredPickUpDate!)}`}
            </Typography>
            <Typography
              key="orderInfoDesiredStartDate"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  보관 시작 일시: ${formatDate(getValues().desiredStartDate!)}`}
            </Typography>
            <Typography
              key="orderInfoDesiredEndDate"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  보관 종료 일시: ${formatDate(getValues().desiredEndDate!)}`}
            </Typography>
            <Typography
              key="orderInfoDesiredEndDate"
              fs={16}
              lh={20}
              fw="REGULAR"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`  •  보관 개월: ${calculateMonthsDifference(getValues().desiredStartDate!, getValues().desiredEndDate!)}개월`}
            </Typography>

            {getValues().nonStandardItems ? (
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
                {getValues().nonStandardItems?.map((nonstandardItem, index) => (
                  <Typography
                    key="nonStandardItem"
                    fs={16}
                    lh={20}
                    fw="REGULAR"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {`  •  ${nonstandardItem.name}`}
                  </Typography>
                ))}
                {/* TODO: 규격 외 물품 사진 미리보기 기능이 필요합니다. */}
              </>
            ) : (
              ""
            )}
          </BasicInfoSummaryFrameInner>
        </Card>
        <Info text="활동확인서 발급이 완료되면 이메일 또는 문자를 통해 (방법은 동연에서 정해주세요) 연락이 갈 것이라는 안내 문구" />
      </ActivityCertificateThirdFrameInner>
    </AsyncBoundary>
  );
};

export default StorageFormThird;
