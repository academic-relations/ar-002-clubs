import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import {
  ListContainer,
  ListItem,
} from "@sparcs-clubs/web/common/components/ListItem";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import MyActivityCertificate from "@sparcs-clubs/web/features/my/activity-certificate/components/MyActivityCertificate";

const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
`;

const MyCertificateDetailFrame = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/my/activity-certificate");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          {
            name: "활동확인서 발급 내역",
            path: "/my/activity-certificate",
          },
        ]}
        title="활동확인서 발급 내역"
        enableLast
      />
      <Card outline gap={20}>
        <MyActivityCertificate
          status={ActivityCertificateOrderStatusEnum.Applied}
        />
        {/* TODO: 아래 정보들 백 연결하기 */}
        <FlexWrapper direction="column" gap={16}>
          <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
            신청자 정보
          </Typography>
          <ListContainer>
            <ListItem>이름: 이지윤</ListItem>
            <ListItem>학과: 전산학부</ListItem>
            <ListItem>학번: 20200510</ListItem>
            <ListItem>연락처: 010-0000-0000</ListItem>
          </ListContainer>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16}>
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
              <FlexWrapper direction="row" gap={12}>
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
              </FlexWrapper>
              {/* TODO: 나중에 list로 활동 내역 추가 */}
            </ActivityWrapper>
          </ListContainer>
        </FlexWrapper>
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default MyCertificateDetailFrame;
