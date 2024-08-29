"use client";

import React, { useMemo } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { useParams, useRouter } from "next/navigation";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
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
import { deleteMyClubRegistration } from "@sparcs-clubs/web/features/my/services/deleteMyClubRegistration";
import useGetClubRegistration from "@sparcs-clubs/web/features/my/services/useGetClubRegistration";
import { getRegisterClubProgress } from "@sparcs-clubs/web/features/register-club/constants/registerClubProgress";
import { getActualYear } from "@sparcs-clubs/web/utils/Date/extractDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import { professorEnumToText } from "@sparcs-clubs/web/utils/getUserType";

const FilePreviewContainerWrapper = styled(FlexWrapper)`
  padding-left: 24px;
  align-self: stretch;
`;

export const FilePreviewContainer: React.FC<React.PropsWithChildren> = ({
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

  const data = useMemo(() => mockMyClubRegisterAcf.items, []);
  const {
    data: clubDetail,
    isLoading,
    isError,
  } = useGetClubRegistration({ applyId: +id });

  const deleteHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={async () => {
            await deleteMyClubRegistration({ applyId: +id });
            close();
            router.push("/my");
          }}
          onClose={close}
          confirmButtonText="삭제"
        >
          동아리 등록 신청을 삭제하면 복구할 수 없습니다.
          <br />
          삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const editHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            router.push(`/my/register-club/${clubDetail!.id}/edit`);
            close();
          }}
          onClose={close}
          confirmButtonText="수정"
        >
          동아리 등록 신청을 수정하면 신청 상태 및 지도교수 승인 여부가 모두
          초기화됩니다.
          <br />
          수정하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const professorApproveHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            // TODO: reg023 구현 후 연결
            close();
          }}
          onClose={close}
          confirmButtonText="승인"
        >
          동아리 등록을 승인하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

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
        />
        <Card outline gap={20}>
          {clubDetail && (
            <ProgressStatus
              labels={
                getRegisterClubProgress(
                  clubDetail?.registrationStatusEnumId,
                  clubDetail?.updatedAt,
                ).labels
              }
              progress={
                getRegisterClubProgress(
                  clubDetail?.registrationStatusEnumId,
                  clubDetail?.updatedAt,
                ).progress
              }
              optional={
                clubDetail?.comments &&
                clubDetail?.comments.length > 0 && (
                  <RejectReasonToast
                    title="반려 사유"
                    reasons={clubDetail?.comments.map(comment => ({
                      datetime: comment.createdAt,
                      reason: comment.content,
                    }))}
                  />
                )
              }
            />
          )}
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
              <ListItem>
                동아리명 (국문):{" "}
                {clubDetail?.clubNameKr ?? clubDetail?.newClubNameKr}
              </ListItem>
              <ListItem>
                동아리명 (영문):{" "}
                {clubDetail?.clubNameEn ?? clubDetail?.newClubNameEn}
              </ListItem>
              {clubDetail?.clubNameKr && (
                <ListItem>
                  신규 동아리명 (국문): {clubDetail?.newClubNameKr}
                </ListItem>
              )}
              {clubDetail?.clubNameEn && (
                <ListItem>
                  신규 동아리명 (영문): {clubDetail?.newClubNameEn}
                </ListItem>
              )}
              <ListItem>
                대표자 이름: {clubDetail?.representative?.name}
              </ListItem>
              <ListItem>
                대표자 전화번호: {clubDetail?.representative?.phoneNumber}
              </ListItem>
              <ListItem>
                설립 연도: {clubDetail && getActualYear(clubDetail?.foundedAt)}
              </ListItem>
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
            {clubDetail?.professor && (
              <>
                <Typography fw="MEDIUM" fs={16} lh={20}>
                  지도교수 정보
                </Typography>
                <ListContainer>
                  <ListItem>성함: {clubDetail?.professor?.name}</ListItem>
                  <ListItem>
                    직급:{" "}
                    {professorEnumToText(
                      clubDetail?.professor?.professorEnumId,
                    )}
                  </ListItem>
                  <ListItem>이메일: {clubDetail?.professor?.email}</ListItem>
                </ListContainer>
              </>
            )}
            <Typography fw="MEDIUM" fs={16} lh={20}>
              동아리 정보
            </Typography>
            <ListContainer>
              <ListItem>
                분과 정합성: {clubDetail?.divisionConsistency}
              </ListItem>
              <ListItem>설립 목적: {clubDetail?.foundationPurpose}</ListItem>
              <ListItem>주요 활동 계획: {clubDetail?.activityPlan}</ListItem>
              {clubDetail?.activityPlanFile && (
                <>
                  <ListItem>활동계획서</ListItem>
                  {clubDetail?.activityPlanFile && (
                    <FilePreviewContainer>
                      <ThumbnailPreviewList
                        fileList={[
                          {
                            src: clubDetail?.activityPlanFile?.url,
                            name: clubDetail?.activityPlanFile?.name,
                          },
                        ]}
                      />
                    </FilePreviewContainer>
                  )}
                </>
              )}
              {clubDetail?.clubRuleFile && (
                <>
                  <ListItem>동아리 회칙</ListItem>
                  {clubDetail?.clubRuleFile && (
                    <FilePreviewContainer>
                      <ThumbnailPreviewList
                        fileList={[
                          {
                            src: clubDetail?.clubRuleFile?.url,
                            name: clubDetail?.clubRuleFile?.name,
                          },
                        ]}
                      />
                    </FilePreviewContainer>
                  )}
                </>
              )}
              {clubDetail?.externalInstructionFile?.id && (
                <>
                  <ListItem>(선택) 외부 강사 지도 계획서</ListItem>
                  <FilePreviewContainer>
                    <ThumbnailPreviewList
                      fileList={[
                        {
                          src: clubDetail.externalInstructionFile.url,
                          name: clubDetail.externalInstructionFile.name,
                        },
                      ]}
                    />
                  </FilePreviewContainer>
                </>
              )}
            </ListContainer>
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
            {clubDetail?.professor && (
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
            )}
          </FlexWrapper>
        </Card>

        <ButtonWrapper>
          <Button
            style={{ width: "max-content" }}
            onClick={() => {
              router.push("/my");
            }}
          >
            목록으로 돌아가기
          </Button>
          {profile !== "professor" ? (
            <FlexWrapper direction="row" gap={10}>
              <Button style={{ width: "max-content" }} onClick={deleteHandler}>
                삭제
              </Button>
              <Button style={{ width: "max-content" }} onClick={editHandler}>
                수정
              </Button>
            </FlexWrapper>
          ) : (
            <FlexWrapper direction="row" gap={10}>
              <Button
                style={{ width: "max-content" }}
                onClick={professorApproveHandler}
              >
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
