import React, { useMemo } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { useRouter } from "next/navigation";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RegistrationTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import MyRegisterClubAcfTable from "@sparcs-clubs/web/features/my/register-club/components/MyRegisterClubAcfTable";
import {
  mockMyClubRegisterAcf,
  mockMyClubRegisterDetail,
} from "@sparcs-clubs/web/features/my/services/_mock/mockMyClubRegisterDetail";

import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

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

const MyRegisterClubDetailFrame = () => {
  const router = useRouter();
  const professorEnumToText = (profEnum: ProfessorEnum) => {
    switch (profEnum) {
      case 1:
        return "조교수";
      case 2:
        return "부교수";
      case 3:
      default:
        return "정교수";
    }
  };
  const data = useMemo(() => mockMyClubRegisterAcf.items, []);

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
        enableLast
      />
      <Card outline gap={20}>
        {/* TODO: Add Progress */}
        <FlexWrapper direction="column" gap={16}>
          <TagWrapper>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              등록 구분
            </Typography>
            <Tag
              color={
                getTagDetail(
                  mockMyClubRegisterDetail.registrationTypeEnum,
                  RegistrationTypeTagList,
                ).color
              }
            >
              {
                getTagDetail(
                  mockMyClubRegisterDetail.registrationTypeEnum,
                  RegistrationTypeTagList,
                ).text
              }
            </Tag>
          </TagWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            기본 정보
          </Typography>
          <ListContainer>
            <ListItem>동아리: {mockMyClubRegisterDetail.clubNameKr}</ListItem>
            <ListItem>
              대표자 이름: {mockMyClubRegisterDetail.studentName}
            </ListItem>
            <ListItem>
              대표자 전화번호: {mockMyClubRegisterDetail.phoneNumber}
            </ListItem>
            <ListItem>
              설립 연도: {mockMyClubRegisterDetail.foundedYear}
            </ListItem>
            <ListItem>
              소속 분과: {mockMyClubRegisterDetail.clubDivision}
            </ListItem>
            <ListItem>
              활동 분야 (국문): {mockMyClubRegisterDetail.activityFieldKr}
            </ListItem>
            <ListItem>
              활동 분야 (영문): {mockMyClubRegisterDetail.activityFieldEn}
            </ListItem>
          </ListContainer>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            지도교수 정보
          </Typography>
          <ListContainer>
            <ListItem>성함: {mockMyClubRegisterDetail.professorName}</ListItem>
            <ListItem>
              직급:{" "}
              {professorEnumToText(mockMyClubRegisterDetail.professorEnum)}
            </ListItem>
            <ListItem>
              이메일: {mockMyClubRegisterDetail.professorEmail}
            </ListItem>
          </ListContainer>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            동아리 정보
          </Typography>
          <ListContainer>
            <ListItem>
              분과 정합성: {mockMyClubRegisterDetail.divisionConsistency}
            </ListItem>
            <ListItem>
              설립 목적: {mockMyClubRegisterDetail.foundationPurpose}
            </ListItem>
            <ListItem>
              주요 활동 계획: {mockMyClubRegisterDetail.activityPlan}
            </ListItem>
            {mockMyClubRegisterDetail.registrationTypeEnum ===
              RegistrationTypeEnum.Promotional && (
              <ListItem>활동계획서</ListItem>
            )}

            {mockMyClubRegisterDetail.registrationTypeEnum ===
              RegistrationTypeEnum.Promotional && (
              <ListItem>동아리 회칙</ListItem>
            )}

            <ListItem>(선택) 외부 강사 지도 계획서</ListItem>
          </ListContainer>
          {/* TODO: Add File Preview */}
          {mockMyClubRegisterDetail.registrationTypeEnum !==
            RegistrationTypeEnum.Renewal && (
            <FlexWrapper direction="column" gap={16}>
              <Typography
                ff="PRETENDARD"
                fw="MEDIUM"
                fs={16}
                lh={20}
                color="BLACK"
              >
                가등록 / 등록 취소 기간 활동 보고서 (총 {data.length}개)
              </Typography>
              <MyRegisterClubAcfTable
                clubRegisterAcfList={mockMyClubRegisterAcf}
              />
            </FlexWrapper>
          )}
          <TagWrapper>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              지도교수 승인
            </Typography>
            {mockMyClubRegisterDetail.professorConfirm ? (
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
        <FlexWrapper direction="row" gap={10}>
          <Button style={{ width: "max-content" }} onClick={() => {}}>
            삭제
          </Button>
          <Button style={{ width: "max-content" }} onClick={() => {}}>
            수정
          </Button>
        </FlexWrapper>
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default MyRegisterClubDetailFrame;
