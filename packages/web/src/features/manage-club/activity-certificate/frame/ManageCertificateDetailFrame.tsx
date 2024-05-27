import React, { useState } from "react";
import styled from "styled-components";

import {
  FrameWrapper,
  SectionWrapper,
} from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import Card from "@sparcs-clubs/web/common/components/Card";
import Button from "@sparcs-clubs/web/common/components/Button";
import {
  ColumnTextWrapper,
  ProgressCheckSectionWrapper,
} from "@sparcs-clubs/web/common/components/ProgressCheckSection/ProgressCheckSectionWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import ProgressCheckSection from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import Info from "@sparcs-clubs/web/common/components/Info";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { useRouter } from "next/navigation";

const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
`;

const ActivityRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-end;
  width: 100%;
`;

const ManageCertificateDetailFrame = () => {
  const [rejectReason, setRejectReason] = useState("");
  const rejectButtonType = rejectReason !== "" ? "default" : "disabled";

  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/activity-certificate");
  };
  return (
    <FrameWrapper>
      <SectionWrapper>
        <BreadCrumb
          items={[
            { name: "대표 동아리 관리", path: "/manage-club" },
            {
              name: "활동확인서 발급 내역",
              path: "/manage-club/activity-certificate",
            },
          ]}
          enableLast
        />
        <PageTitle>활동확인서 발급 내역</PageTitle>
      </SectionWrapper>
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
              "동아리 대표자 승인 대기",
              "동아리 연합회 승인 대기",
              "발급 대기",
            ]}
            status={[Status.Approved]}
            dates={[new Date()]}
          />
          <Info text="동아리 대표자의 승인이 있어야 다음 단계로 넘어갈 수 있습니다. 반려 시 사유를 입력해야함" />
          <TextInput
            placeholder="반려 사유를 입력해주세요"
            label="반려 사유 (반려 시에만 입력)"
            area
            value={rejectReason}
            handleChange={setRejectReason}
          />
          <ButtonWrapper>
            <Button style={{ width: "max-content" }}>신청 승인</Button>
            <Button style={{ width: "max-content" }} type={rejectButtonType}>
              신청 반려
            </Button>
            {/* TODO: onClick 달기 */}
          </ButtonWrapper>
        </ProgressCheckSectionWrapper>
        {/* TODO: 아래 정보들 백 연결하기 */}
        <ColumnTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            신청자 정보
          </Typography>
          <ListContainer>
            <ListItem>이름: 이지윤</ListItem>
            <ListItem>학과: 전산학부</ListItem>
            <ListItem>학번: 20200510</ListItem>
            <ListItem>연락처: 010-0000-0000</ListItem>
          </ListContainer>
        </ColumnTextWrapper>
        <ColumnTextWrapper>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            활동확인서 발급 신청 정보{" "}
          </Typography>
          <ListContainer>
            <ListItem>
              동아리: 술박스(2021년 9월 ~ 2023년 6월, 2024년 3월 ~), 3매
            </ListItem>
            <ListItem>
              활동 기간: 2021년 9월 ~ 2023년 6월, 2024년 3월 ~
            </ListItem>
            <ListItem>발급 매수: 3매</ListItem>
            <ListItem>활동 내역</ListItem>
            <ActivityWrapper>
              <ActivityRow>
                <Typography
                  ff="PRETENDARD"
                  fw="REGULAR"
                  fs={16}
                  lh={20}
                  color="BLACK"
                >
                  2021년 9월 ~ 2021년 12월
                </Typography>
                <Typography
                  ff="PRETENDARD"
                  fw="REGULAR"
                  fs={16}
                  lh={20}
                  color="BLACK"
                >
                  신입생 세미나 이수
                </Typography>
              </ActivityRow>
              {/* TODO: 나중에 list로 활동 내역 추가 */}
            </ActivityWrapper>
          </ListContainer>
        </ColumnTextWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FrameWrapper>
  );
};
export default ManageCertificateDetailFrame;
