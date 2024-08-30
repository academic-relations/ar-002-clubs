import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { ListItem } from "@sparcs-clubs/web/common/components/ListItem";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  DivisionTypeTagList,
  ProfessorIsApprovedTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import PastActivityReportList from "@sparcs-clubs/web/features/manage-club/activity-report/components/PastActivityReportList";
import { FilePreviewContainer } from "@sparcs-clubs/web/features/my/register-club/frames/MyRegisterClubDetailFrame";
import { getRegisterClubProgress } from "@sparcs-clubs/web/features/register-club/constants/registerClubProgress";
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
          {data && (
            <ProgressCheckSection
              labels={
                getRegisterClubProgress(
                  data?.registrationStatusEnumId,
                  data?.updatedAt,
                ).labels
              }
              progress={
                getRegisterClubProgress(
                  data?.registrationStatusEnumId,
                  data?.updatedAt,
                ).progress
              }
            />
          )}
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
          <ListItem>
            동아리명 (국문): {data?.clubNameKr ?? data?.newClubNameKr}
          </ListItem>
          <ListItem>
            동아리명 (영문): {data?.clubNameEn ?? data?.newClubNameEn}
          </ListItem>
          {data?.clubNameKr && (
            <ListItem>신규 동아리명 (국문): {data?.newClubNameKr}</ListItem>
          )}
          {data?.clubNameEn && (
            <ListItem>신규 동아리명 (영문): {data?.newClubNameEn}</ListItem>
          )}
          <ListItem>{`대표자 이름: ${data?.representative.name}`}</ListItem>
          <ListItem>
            {`대표자 전화번호: ${data?.representative.phoneNumber}`}
          </ListItem>
          <ListItem>
            {`설립 연도: ${data && getActualYear(data?.foundedAt)}`}
          </ListItem>
          <ListItem>
            {`소속 분과: ${data && getTagDetail(data?.divisionId, DivisionTypeTagList).text}`}
          </ListItem>
          <ListItem>{`활동 분야 (국문): ${data?.activityFieldKr}`}</ListItem>
          <ListItem>{`활동 분야 (영문): ${data?.activityFieldEn}`}</ListItem>
        </FlexWrapper>
        {data?.professor && (
          <FlexWrapper gap={12} direction="column">
            <Typography fw="MEDIUM" lh={20} fs={16}>
              지도교수 정보
            </Typography>
            <ListItem>{`성함: ${data?.professor?.name}`}</ListItem>
            <ListItem>
              {`직급: ${professorEnumToText(data?.professor?.professorEnumId)}`}
            </ListItem>
            <ListItem>{`이메일: ${data?.professor?.email}`}</ListItem>
          </FlexWrapper>
        )}
        <FlexWrapper gap={12} direction="column">
          <Typography fw="MEDIUM" lh={20} fs={16}>
            동아리 정보
          </Typography>
          <ListItem>{`분과 정합성: ${data?.divisionConsistency}`}</ListItem>
          <ListItem>{`설립 목적: ${data?.foundationPurpose}`}</ListItem>
          <ListItem>{`주요 활동 계획: ${data?.activityPlan}`}</ListItem>
          {data?.activityPlanFile && (
            <>
              <ListItem>활동계획서</ListItem>
              {data?.activityPlanFile && (
                <FilePreviewContainer>
                  <ThumbnailPreviewList
                    fileList={[
                      {
                        src: data?.activityPlanFile?.url,
                        name: data?.activityPlanFile?.name,
                      },
                    ]}
                  />
                </FilePreviewContainer>
              )}
            </>
          )}
          {data?.clubRuleFile && (
            <>
              <ListItem>동아리 회칙</ListItem>
              {data?.clubRuleFile && (
                <FilePreviewContainer>
                  <ThumbnailPreviewList
                    fileList={[
                      {
                        src: data?.clubRuleFile?.url,
                        name: data?.clubRuleFile?.name,
                      },
                    ]}
                  />
                </FilePreviewContainer>
              )}
            </>
          )}
          {data?.externalInstructionFile && (
            <>
              <ListItem>(선택) 외부 강사 지도 계획서</ListItem>
              {data?.externalInstructionFile && (
                <FilePreviewContainer>
                  <ThumbnailPreviewList
                    fileList={[
                      {
                        src: data?.externalInstructionFile?.url,
                        name: data?.externalInstructionFile?.name,
                      },
                    ]}
                  />
                </FilePreviewContainer>
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
              data={mockActivityData.activities}
              showItemCount={false}
            />
          </FlexWrapper>
        )}
        {data?.professor && (
          <FlexWrapper gap={20} direction="row">
            <Typography fw="MEDIUM" lh={20} fs={16} style={{ flex: 1 }}>
              지도교수 승인
            </Typography>
            <Tag
              color={
                data &&
                ProfessorIsApprovedTagList(data?.isProfessorSigned).color
              }
            >
              {data && ProfessorIsApprovedTagList(data?.isProfessorSigned).text}
            </Tag>
          </FlexWrapper>
        )}
      </Card>
    </AsyncBoundary>
  );
};

export default ClubRegisterDetailFrame;
