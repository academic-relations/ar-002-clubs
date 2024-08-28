"use client";

import React, { useMemo } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { useParams, useRouter } from "next/navigation";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import { fromUUID } from "@sparcs-clubs/web/common/components/File/attachment";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  DivisionTypeTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import MyRegisterClubAcfTable from "@sparcs-clubs/web/features/my/register-club/components/MyRegisterClubAcfTable";
import { mockMyClubRegisterAcf } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClubRegisterDetail";
import useGetClubRegistration from "@sparcs-clubs/web/features/my/services/useGetClubRegistration";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const FilePreviewContainerWrapper = styled(FlexWrapper)`
  padding-left: 24px;
  align-self: stretch;
`;

const FilePreviewContainer: React.FC<React.PropsWithChildren> = ({
  children = null,
}) => (
  <FilePreviewContainerWrapper direction="column" gap={12}>
    {children}
  </FilePreviewContainerWrapper>
);

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const MyRegisterClubDetailFrame: React.FC<{ profile: string }> = ({
  profile,
}) => {
  const router = useRouter();
  const { id } = useParams();

  const professorEnumToText = (profEnum?: ProfessorEnum) => {
    switch (profEnum) {
      case ProfessorEnum.Assistant:
        return "조교수";
      case ProfessorEnum.Associate:
        return "부교수";
      case ProfessorEnum.Full:
      default:
        return "정교수";
    }
  };
  const data = useMemo(() => mockMyClubRegisterAcf.items, []);
  const {
    data: clubDetail,
    isLoading,
    isError,
  } = useGetClubRegistration({ applyId: +id });

  return (
    <AsyncBoundary
      isLoading={isLoading}
      isError={isError || clubDetail == null}
    >
      <FlexWrapper direction="column" gap={60}>
        <PageHead
          items={[
            { name: "마이페이지", path: "/my" },
            {
              name: "동아리 등록",
              path: "/my/register-club",
            },
          ]}
          title="동아리 등록"
          enableLast
        />
        <Card outline gap={20}>
          <ProgressStatus
            labels={["신청 완료", "동아리 연합회 신청 반려"]}
            progress={[
              {
                status: ProgressCheckSectionStatusEnum.Approved,
                date: new Date(),
              },
              {
                status: ProgressCheckSectionStatusEnum.Canceled,
                date: new Date(),
              },
            ]}
            optional={
              <RejectReasonToast
                title="반려 사유"
                reasons={[
                  {
                    reason: "대충 어떤 반려 사유 어쩌고",
                    datetime: new Date(),
                  },
                ]}
              />
            }
          />
          <FlexWrapper direction="column" gap={16}>
            <TagWrapper>
              <Typography fw="MEDIUM" fs={16} lh={20}>
                등록 구분
              </Typography>
              <Tag
                color={
                  clubDetail &&
                  getTagDetail(
                    clubDetail.registrationTypeEnumId,
                    RegistrationTypeTagList,
                  ).color
                }
              >
                {clubDetail &&
                  getTagDetail(
                    clubDetail.registrationTypeEnumId,
                    RegistrationTypeTagList,
                  ).text}
              </Tag>
            </TagWrapper>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              기본 정보
            </Typography>
            <ListContainer>
              <ListItem>동아리: {clubDetail?.clubNameKr}</ListItem>
              <ListItem>
                대표자 이름: {clubDetail?.representative?.name}
              </ListItem>
              <ListItem>대표자 전화번호: {clubDetail?.phoneNumber}</ListItem>
              {/* <ListItem>
                설립 연도: {clubDetail?.foundedAt.getFullYear()}
                </ListItem> */}
              <ListItem>
                소속 분과:{" "}
                {clubDetail &&
                  getTagDetail(clubDetail.divisionId, DivisionTypeTagList).text}
              </ListItem>
              <ListItem>
                활동 분야 (국문): {clubDetail?.activityFieldKr}
              </ListItem>
              <ListItem>
                활동 분야 (영문): {clubDetail?.activityFieldEn}
              </ListItem>
            </ListContainer>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              지도교수 정보
            </Typography>
            <ListContainer>
              <ListItem>성함: {clubDetail?.professor?.name}</ListItem>
              <ListItem>
                직급:{" "}
                {professorEnumToText(clubDetail?.professor?.professorEnumId)}
              </ListItem>
              <ListItem>이메일: {clubDetail?.professor?.email}</ListItem>
            </ListContainer>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              동아리 정보
            </Typography>
            <ListContainer>
              <ListItem>
                분과 정합성: {clubDetail?.divisionConsistency}
              </ListItem>
              <ListItem>설립 목적: {clubDetail?.foundationPurpose}</ListItem>
              <ListItem>주요 활동 계획: {clubDetail?.activityPlan}</ListItem>
              {clubDetail?.registrationTypeEnumId ===
                RegistrationTypeEnum.Promotional && (
                <ListItem>활동계획서</ListItem>
              )}
              {clubDetail?.registrationTypeEnumId ===
                RegistrationTypeEnum.Promotional && (
                <ListItem>동아리 회칙</ListItem>
              )}
              {/* TODO: File Preview 잘 됐는지 확인 필요 */}
              <ListItem>(선택) 외부 강사 지도 계획서</ListItem>
              {clubDetail?.externalInstructionFileId && (
                <ListItem>
                  <FilePreviewContainer>
                    <ThumbnailPreviewList
                      fileList={[
                        fromUUID(clubDetail.externalInstructionFileId),
                      ]}
                    />
                  </FilePreviewContainer>
                </ListItem>
              )}
            </ListContainer>
            {/* TODO: Add File Preview */}
            {clubDetail?.registrationTypeEnumId !==
              RegistrationTypeEnum.Renewal && (
              <FlexWrapper direction="column" gap={16}>
                <Typography fw="MEDIUM" fs={16} lh={20}>
                  가등록 / 등록 취소 기간 활동 보고서 (총 {data.length}개)
                </Typography>
                <MyRegisterClubAcfTable
                  clubRegisterAcfList={mockMyClubRegisterAcf}
                />
              </FlexWrapper>
            )}
            <TagWrapper>
              <Typography fw="MEDIUM" fs={16} lh={20}>
                지도교수 승인
              </Typography>
              {clubDetail?.isProfessorSigned ? (
                <Tag color="GREEN">승인</Tag>
              ) : (
                <Tag color="GRAY">대기</Tag>
              )}
            </TagWrapper>
          </FlexWrapper>
        </Card>

        <ButtonWrapper>
          <Button
            style={{ width: "max-content" }}
            onClick={() => {
              router.push("/my/register-club");
            }}
          >
            목록으로 돌아가기
          </Button>
          {/* TODO: 집행부원은 다른 화면 보여야 하는지? */}
          {profile !== "professor" ? (
            <FlexWrapper direction="row" gap={10}>
              <Button style={{ width: "max-content" }} onClick={() => {}}>
                삭제
              </Button>
              <Button
                style={{ width: "max-content" }}
                onClick={() => {
                  router.push(`/my/register-club/${clubDetail!.id}/edit`);
                }}
              >
                수정
              </Button>
            </FlexWrapper>
          ) : (
            <FlexWrapper direction="row" gap={10}>
              <Button style={{ width: "max-content" }} onClick={() => {}}>
                승인
              </Button>
            </FlexWrapper>
          )}
        </ButtonWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};
export default MyRegisterClubDetailFrame;
