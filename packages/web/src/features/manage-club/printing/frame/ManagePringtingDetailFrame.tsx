import React from "react";
import { SectionWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import Card from "@sparcs-clubs/web/common/components/Card";
import Button from "@sparcs-clubs/web/common/components/Button";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import {
  ColumnTextWrapper,
  ProgressCheckSectionWrapper,
  RowTextWrapper,
} from "@sparcs-clubs/web/common/components/ProgressCheckSection/ProgressCheckSectionWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import Info from "@sparcs-clubs/web/common/components/Info";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";

const ManagePrintingDetailFrame = () => (
  <SectionWrapper>
    <BreadCrumb
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "홍보물 인쇄 내역", path: "/manage-club/printing-business" },
      ]}
      enableLast
    />
    <PageTitle>홍보물 인쇄 내역</PageTitle>
    <Card outline gap={20}>
      {/* TODO: 너무 길다면.. 나중에 컴포넌트로 따로 빼기 */}
      <ProgressCheckSectionWrapper>
        <Typography
          ff="PRETENDARD"
          fw="MEDIUM"
          fs={16}
          lh={20}
          color="BLACK"
          style={{ width: "100%" }}
        >
          신청 상태
        </Typography>
        <ProgressCheckSection
          labels={[
            "신청 완료",
            "동아리 연합회 승인 대기",
            "대여 대기",
            "반납 대기",
          ]}
          status={[Status.Approved]}
          dates={[new Date()]}
        />
        <Info text="승인이 완료되기 전까지 신청을 취소할 수 있습니다" />
        <Button style={{ width: "max-content" }}>신청 취소</Button>
        {/* TODO: onClick 달기 */}
      </ProgressCheckSectionWrapper>
      {/* TODO: 아래 정보들 백 연결하기 */}
      <ColumnTextWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          신청자 정보
        </Typography>
        <ListContainer>
          <ListItem>동아리: 술박스</ListItem>
          <ListItem>담당자: 이지윤</ListItem>
          <ListItem>연락처: 010-0000-0000</ListItem>
        </ListContainer>
      </ColumnTextWrapper>
      <ColumnTextWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          대여 물품
        </Typography>
        <ListContainer>
          <ListItem>A3용지 3매</ListItem>
          <ListItem>A4용지 3매</ListItem>
          <ListItem>
            색상: 컬러 / 크기: 용지에 맞춤 / 마무리 작업: 없음
          </ListItem>
        </ListContainer>
      </ColumnTextWrapper>
      <ColumnTextWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          인쇄 목적
        </Typography>
        <ListContainer>
          <ListItem>
            대충 어떤 목적을 적었겠죠? 이게 아주아주 길어질 수도 있으려나 일단
            이 정도의 길이는 될 수 있을 것 같아요
          </ListItem>
        </ListContainer>
      </ColumnTextWrapper>
      <RowTextWrapper>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          수령 일시
        </Typography>
        <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
          2024년 3월 11일 (월) 21:00
        </Typography>
      </RowTextWrapper>
    </Card>
    <Button style={{ width: "max-content" }}>목록으로 돌아가기</Button>
  </SectionWrapper>
);
export default ManagePrintingDetailFrame;
