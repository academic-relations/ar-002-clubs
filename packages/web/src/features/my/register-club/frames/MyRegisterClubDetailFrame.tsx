"use client";

import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React from "react";
import styled from "styled-components";

import { ApiReg011ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  IndentedItem,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import RejectReasonToast from "@sparcs-clubs/web/common/components/Toast/RejectReasonToast";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  DivisionTypeTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { deleteMyClubRegistration } from "@sparcs-clubs/web/features/my/services/deleteMyClubRegistration";
import patchClubRegProfessorApprove from "@sparcs-clubs/web/features/my/services/patchClubRegProfessorApprove";
import { getRegisterClubProgress } from "@sparcs-clubs/web/features/register-club/constants/registerClubProgress";
import { isProvisional } from "@sparcs-clubs/web/features/register-club/utils/registrationType";
import {
  getActualMonth,
  getActualYear,
} from "@sparcs-clubs/web/utils/Date/extractDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import { professorEnumToText } from "@sparcs-clubs/web/utils/getUserType";

import MyRegisterClubActFrame from "./MyRegisterClubActFrame";

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

const MyRegisterClubDetailFrame: React.FC<{
  clubDetail: ApiReg011ResponseOk;
  profile: string;
  refetch: () => void;
}> = ({ clubDetail, profile, refetch }) => {
  const router = useRouter();
  const { id } = useParams();

  const isProfessor = profile === "professor";

  const deleteHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={async () => {
            await deleteMyClubRegistration({ applyId: +id });
            close();
            window.location.href = "/my";
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
          onConfirm={async () => {
            await patchClubRegProfessorApprove({ applyId: +id });
            close();
            refetch();
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
        {!isProfessor && (
          <ProgressStatus
            labels={
              getRegisterClubProgress(
                clubDetail.registrationStatusEnumId,
                clubDetail.updatedAt,
              ).labels
            }
            progress={
              getRegisterClubProgress(
                clubDetail.registrationStatusEnumId,
                clubDetail.updatedAt,
              ).progress
            }
            optional={
              clubDetail.comments &&
              clubDetail.comments.length > 0 && (
                <RejectReasonToast
                  title="반려 사유"
                  reasons={clubDetail.comments.map(comment => ({
                    datetime: comment.createdAt,
                    reason: comment.content,
                  }))}
                />
              )
            }
          />
        )}
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
        <FlexWrapper gap={16} direction="column">
          <Typography fw="MEDIUM" fs={16} lh={20}>
            기본 정보
          </Typography>
          <FlexWrapper gap={12} direction="column">
            <ListItem>
              동아리명 (국문):{" "}
              {clubDetail.clubNameKr ?? clubDetail.newClubNameKr}
            </ListItem>
            <ListItem>
              동아리명 (영문):{" "}
              {clubDetail.clubNameEn ?? clubDetail.newClubNameEn}
            </ListItem>
            {clubDetail.clubNameKr && clubDetail.newClubNameKr !== "" && (
              <ListItem>
                신규 동아리명 (국문): {clubDetail.newClubNameKr}
              </ListItem>
            )}
            {clubDetail.clubNameEn && clubDetail.newClubNameEn !== "" && (
              <ListItem>
                신규 동아리명 (영문): {clubDetail.newClubNameEn}
              </ListItem>
            )}
            <ListItem>대표자 이름: {clubDetail.representative?.name}</ListItem>
            <ListItem>
              대표자 전화번호: {clubDetail.representative?.phoneNumber}
            </ListItem>
            {clubDetail &&
              (isProvisional(clubDetail.registrationTypeEnumId) ? (
                <ListItem>
                  설립 연월: {getActualYear(clubDetail.foundedAt)}년{" "}
                  {getActualMonth(clubDetail?.foundedAt)}월
                </ListItem>
              ) : (
                <ListItem>
                  설립 연도: {getActualYear(clubDetail.foundedAt)}
                </ListItem>
              ))}
            <ListItem>
              소속 분과:{" "}
              {clubDetail &&
                getTagDetail(clubDetail.divisionId, DivisionTypeTagList).text}
            </ListItem>
            <ListItem>활동 분야 (국문): {clubDetail.activityFieldKr}</ListItem>
            <ListItem>활동 분야 (영문): {clubDetail.activityFieldEn}</ListItem>
          </FlexWrapper>
        </FlexWrapper>
        {clubDetail.professor && (
          <FlexWrapper gap={12} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              지도교수 정보
            </Typography>
            <FlexWrapper gap={12} direction="column">
              <ListItem>성함: {clubDetail.professor?.name}</ListItem>
              <ListItem>
                직급:{" "}
                {professorEnumToText(clubDetail.professor?.professorEnumId)}
              </ListItem>
              <ListItem>이메일: {clubDetail.professor?.email}</ListItem>
            </FlexWrapper>
          </FlexWrapper>
        )}
        <FlexWrapper gap={16} direction="column">
          <Typography fw="MEDIUM" fs={16} lh={20}>
            동아리 정보
          </Typography>
          <FlexWrapper gap={12} direction="column">
            <ListItem>분과 정합성:</ListItem>
            <IndentedItem>{clubDetail.divisionConsistency}</IndentedItem>
            <ListItem>설립 목적:</ListItem>
            <IndentedItem>{clubDetail.foundationPurpose}</IndentedItem>
            <ListItem>주요 활동 계획:</ListItem>
            <IndentedItem>{clubDetail.activityPlan}</IndentedItem>
            {clubDetail.activityPlanFile && (
              <>
                <ListItem>활동계획서</ListItem>
                {clubDetail.activityPlanFile && (
                  <FilePreviewContainer>
                    <ThumbnailPreviewList
                      fileList={[clubDetail.activityPlanFile]}
                      disabled
                    />
                  </FilePreviewContainer>
                )}
              </>
            )}
            {clubDetail.clubRuleFile && (
              <>
                <ListItem>동아리 회칙</ListItem>
                {clubDetail.clubRuleFile && (
                  <FilePreviewContainer>
                    <ThumbnailPreviewList
                      fileList={[clubDetail.clubRuleFile]}
                      disabled
                    />
                  </FilePreviewContainer>
                )}
              </>
            )}
            {clubDetail.externalInstructionFile && (
              <>
                <ListItem>(선택) 외부 강사 지도 계획서</ListItem>
                <FilePreviewContainer>
                  <ThumbnailPreviewList
                    fileList={[clubDetail.externalInstructionFile]}
                    disabled
                  />
                </FilePreviewContainer>
              </>
            )}
          </FlexWrapper>
        </FlexWrapper>
        {clubDetail.registrationTypeEnumId ===
          RegistrationTypeEnum.Promotional &&
          clubDetail.clubId && (
            <MyRegisterClubActFrame
              profile={profile}
              clubId={clubDetail.clubId}
            />
          )}
        {clubDetail.professor && (
          <TagWrapper>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              지도교수 승인
            </Typography>
            {clubDetail.isProfessorSigned ? (
              <Tag color="GREEN">승인</Tag>
            ) : (
              <Tag color="GRAY">대기</Tag>
            )}
          </TagWrapper>
        )}
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
        {isProfessor ? (
          <FlexWrapper direction="row" gap={10}>
            <Button
              style={{ width: "max-content" }}
              onClick={professorApproveHandler}
              type={clubDetail.isProfessorSigned ? "disabled" : "default"}
            >
              {clubDetail.isProfessorSigned ? "승인 완료" : "승인"}
            </Button>
          </FlexWrapper>
        ) : (
          <FlexWrapper direction="row" gap={10}>
            <Button style={{ width: "max-content" }} onClick={deleteHandler}>
              삭제
            </Button>
            <Button style={{ width: "max-content" }} onClick={editHandler}>
              수정
            </Button>
          </FlexWrapper>
        )}
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default MyRegisterClubDetailFrame;
