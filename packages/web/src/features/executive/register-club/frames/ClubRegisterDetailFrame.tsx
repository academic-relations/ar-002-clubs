import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  DivisionTypeTagList,
  ProfessorIsApprovedTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import PastActivityReportList from "@sparcs-clubs/web/features/manage-club/activity-report/components/PastActivityReportList";
import { getActualYear } from "@sparcs-clubs/web/utils/Date/extractDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import { professorEnumToText } from "@sparcs-clubs/web/utils/getUserType";

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

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card padding="32px" gap={20} outline>
        <FlexWrapper gap={16} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            신청 상태
          </Typography>
          {/* TODO: progresschecksection */}
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
              data &&
              getTagDetail(data.registrationTypeEnumId, RegistrationTypeTagList)
                .color
            }
          >
            {data &&
              getTagDetail(data.registrationTypeEnumId, RegistrationTypeTagList)
                .text}
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
            {`\u2022  대표자 전화번호: ${data?.representative.phoneNumber}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  설립 연도: ${data && getActualYear(data?.foundedAt)}`}
          </Typography>
          <Typography lh={20} fs={16}>
            {`\u2022  소속 분과: ${data && getTagDetail(data?.divisionId, DivisionTypeTagList).text}`}
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
            {`\u2022  직급: ${professorEnumToText(data?.professor?.professorEnumId)}`}
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
            {`\u2022  주요 활동 계획: ${data?.activityPlan}`}
          </Typography>
          {data?.activityPlanFile && (
            <>
              <Typography lh={20} fs={16}>
                {`\u2022  활동 계획서`}
              </Typography>
              <Typography lh={20} fs={16}>
                {`\u2022  ${data?.activityPlanFile?.name}`}
              </Typography>
              {data?.activityPlanFile && (
                <ThumbnailPreviewList
                  fileList={[
                    {
                      src: data?.activityPlanFile?.url,
                      name: data?.activityPlanFile?.name,
                    },
                  ]}
                />
              )}
            </>
          )}
          {data?.clubRuleFile && (
            <>
              <Typography lh={20} fs={16}>
                {`\u2022  동아리 회칙`}
              </Typography>
              <Typography lh={20} fs={16}>
                {`\u2022  ${data?.clubRuleFile?.name}`}
              </Typography>
              {data?.clubRuleFile && (
                <ThumbnailPreviewList
                  fileList={[
                    {
                      src: data?.clubRuleFile?.url,
                      name: data?.clubRuleFile?.name,
                    },
                  ]}
                />
              )}
            </>
          )}
          {data?.externalInstructionFile && (
            <>
              <Typography lh={20} fs={16}>
                {`\u2022  (선택) 외부 강사 지도 계획서`}
              </Typography>
              <Typography lh={20} fs={16}>
                {`\u2022  ${data?.externalInstructionFile?.name}`}
              </Typography>
              {data?.externalInstructionFile && (
                <ThumbnailPreviewList
                  fileList={[
                    {
                      src: data?.externalInstructionFile?.url,
                      name: data?.externalInstructionFile?.name,
                    },
                  ]}
                />
              )}
            </>
          )}
        </FlexWrapper>
        {/* TODO: 활보 연결 */}
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
              data && ProfessorIsApprovedTagList(data?.isProfessorSigned).color
            }
          >
            {data && ProfessorIsApprovedTagList(data?.isProfessorSigned).text}
          </Tag>
        </FlexWrapper>
      </Card>
    </AsyncBoundary>
  );
};

export default ClubRegisterDetailFrame;
