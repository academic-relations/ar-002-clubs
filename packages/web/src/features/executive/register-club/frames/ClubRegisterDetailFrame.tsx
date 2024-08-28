import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ProfessorApprovalTagList } from "@sparcs-clubs/web/constants/tableTagList";
import PastActivityReportList from "@sparcs-clubs/web/features/manage-club/activity-report/components/PastActivityReportList";

import {
  RegisterClubTypeName,
  RegisterClubTypeTagColor,
} from "../constants/registerClubType";
import { mockActivityData } from "../services/_mock/mockActivityList";
import { mockClubRegisterDetail } from "../services/_mock/mockClubRegisterDetail";
import useRegisterClubDetail from "../services/getRegisterClubDetail";

export interface ClubRegisterDetail {
  applyId: number;
}

const ClubRegisterDetailFrame: React.FC<ClubRegisterDetail> = ({
  applyId,
}: ClubRegisterDetail) => {
  const progressCheckSectionLabel = () => {
    switch (mockClubRegisterDetail.statusAndDate[1].status) {
      case ProgressCheckSectionStatusEnum.Approved:
        return "동아리 연합회 승인 완료";
      case ProgressCheckSectionStatusEnum.Canceled:
        return "동아리 연합회 신청 반려";
      default:
        return "승인 대기";
    }
  };

  const { data, isLoading, isError } = useRegisterClubDetail({
    applyId: +applyId,
  });

  const { attachmentList } = mockClubRegisterDetail;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card padding="32px" gap={20} outline>
        <FlexWrapper gap={16} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            신청 상태
          </Typography>
          <ProgressCheckSection
            labels={["신청 완료", progressCheckSectionLabel()]}
            progress={mockClubRegisterDetail.statusAndDate}
          />
        </FlexWrapper>
        <FlexWrapper gap={20} direction="row">
          <Typography fw="MEDIUM" lh={20} fs={16} style={{ flex: 1 }}>
            등록 구분
          </Typography>
          <Tag
            color={
              RegisterClubTypeTagColor[mockClubRegisterDetail.registerClubType]
            }
          >
            {RegisterClubTypeName[mockClubRegisterDetail.registerClubType]}
          </Tag>
        </FlexWrapper>
        <FlexWrapper gap={12} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            기본 정보
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  동아리명: ${data?.clubNameKr}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  대표자 이름: ${data?.representative.name}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  대표자 전화번호: ${data?.phoneNumber}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  설립 연도: ${data?.foundedAt.getFullYear()}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  소속 분과: ${mockClubRegisterDetail.divisionName}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  활동 분야 (국문): ${data?.activityFieldKr}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  활동 분야 (영문): ${data?.activityFieldEn}`}
          </Typography>
        </FlexWrapper>
        <FlexWrapper gap={12} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            지도교수 정보
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  성함: ${data?.professor?.name}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  직급: ${mockClubRegisterDetail.professorPosition}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  이메일: ${data?.professor?.email}`}
          </Typography>
        </FlexWrapper>
        <FlexWrapper gap={12} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            동아리 정보
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  분과 정합성: ${data?.divisionConsistency}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  설립 목적: ${data?.foundationPurpose}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  주요 활동 계획: ${data?.divisionConsistency}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  (선택) 외부 강사 지도 계획서: ${data?.divisionConsistency}`}
          </Typography>
          {Object.keys(attachmentList).map((key, index) => (
            <>
              <Typography lh={20} fs={16} key={`${index.toString()}`}>
                {`\u2022  ${key}`}
              </Typography>
              <ThumbnailPreviewList
                fileList={attachmentList[key as keyof typeof attachmentList]}
              />
            </>
          ))}
        </FlexWrapper>
        {mockClubRegisterDetail.activityReports && (
          <FlexWrapper direction="column" gap={16}>
            <Typography fw="MEDIUM" lh={20} fs={16}>
              가등록 / 등록 취소 기간 활동 보고서 (총 6개)
            </Typography>
            <PastActivityReportList
              data={mockActivityData}
              showItemCount={false}
            />
          </FlexWrapper>
        )}
        <FlexWrapper gap={20} direction="row">
          <Typography fw="MEDIUM" lh={20} fs={16} style={{ flex: 1 }}>
            지도교수 승인
          </Typography>
          <Tag
            color={
              ProfessorApprovalTagList[mockClubRegisterDetail.professorApproval]
                .color
            }
          >
            {
              ProfessorApprovalTagList[mockClubRegisterDetail.professorApproval]
                .text
            }
          </Tag>
        </FlexWrapper>
      </Card>
    </AsyncBoundary>
  );
};

export default ClubRegisterDetailFrame;
