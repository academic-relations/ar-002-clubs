import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const ActivityCertificateThirdFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const BasicInfoSummaryFrameInner = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  display: flex;
`;

const ActivityDescriptionSummaryFrameInner = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  display: inline-flex;
`;

const ActivityDescriptionSummaryRow = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  display: inline-flex;
`;

const ActivityCertificateInfoThirdFrame: React.FC<
  ActivityCertificateFrameProps
> = ({ activityCertificate }) => (
  <ActivityCertificateThirdFrameInner>
    <Card outline gap={20}>
      <BasicInfoSummaryFrameInner>
        <Typography
          key="orderUserInfo"
          type="p"
          style={{ whiteSpace: "pre-wrap", fontWeight: 500 }}
        >
          신청자 정보
        </Typography>
        <Typography
          key="orderUserName"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  이름: ${activityCertificate.applicant}`}
        </Typography>
        <Typography
          key="orderUserDepartment"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  학과: ${activityCertificate.department}`}
        </Typography>
        <Typography
          key="orderUserStudentNumber"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  학번: ${activityCertificate.studentNumber}`}
        </Typography>
        <Typography
          key="orderUserPhoneNumber"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  연락처: ${activityCertificate.krPhoneNumber}`}
        </Typography>
        <Typography
          key="orderInfo"
          type="p"
          style={{ whiteSpace: "pre-wrap", fontWeight: 500 }}
        >
          활동확인서 발급 신청 정보
        </Typography>
        <Typography
          key="orderInfoClub"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  동아리: ${activityCertificate.clubId!}`}{" "}
          {/* TODO - 실제 클럽 이름으로 바꾸기 */}
        </Typography>
        <Typography
          key="orderInfoDuration"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  활동 기간: ${activityCertificate.startMonth} ~ ${activityCertificate.endMonth}`}
          {/* TODO - DB 형식에 의거해서 startMonth endMonth 형식으로 있다면 포맷하고 string이라면 그냥 넣기 */}
        </Typography>
        <Typography
          key="orderInfoIssueCount"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  발급 매수: ${activityCertificate.issuedNumber!}매`}
        </Typography>
        <Typography
          key="orderInfoText"
          type="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {`  •  활동 내역`}
        </Typography>
        <ActivityDescriptionSummaryFrameInner>
          {activityCertificate.detail.map(activityDescription => (
            <ActivityDescriptionSummaryRow key={activityDescription.key}>
              {activityDescription.startMonth.split(".")[0] ===
                activityDescription.endMonth.split(".")[0] &&
              parseInt(activityDescription.startMonth.split(".")[1]) ===
                parseInt(activityDescription.endMonth.split(".")[1]) ? (
                <Typography
                  key={`${activityDescription.key}_start`}
                  type="p"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "200px",
                    textAlign: "center",
                  }}
                >
                  {`${activityDescription.startMonth.split(".")[0]}년 ${parseInt(activityDescription.startMonth.split(".")[1])}월`}
                </Typography>
              ) : (
                <Typography
                  key={`${activityDescription.key}_end`}
                  type="p"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "200px",
                    textAlign: "center",
                  }}
                >
                  {`${activityDescription.startMonth.split(".")[0]}년 ${parseInt(activityDescription.startMonth.split(".")[1])}월 ~ ${activityDescription.endMonth.split(".")[0]}년 ${parseInt(activityDescription.endMonth.split(".")[1])}월`}
                </Typography>
              )}

              <Typography
                key={`${activityDescription.key}_description`}
                type="p"
                style={{
                  whiteSpace: "pre-wrap",
                  flex: "1 1 0",
                }}
              >
                {activityDescription.description}
              </Typography>
            </ActivityDescriptionSummaryRow>
          ))}
        </ActivityDescriptionSummaryFrameInner>
      </BasicInfoSummaryFrameInner>
    </Card>
    <Info text="활동확인서 발급이 완료되면 이메일 또는 문자를 통해 (방법은 동연에서 정해주세요) 연락이 갈 것이라는 안내 문구" />
  </ActivityCertificateThirdFrameInner>
);

export default ActivityCertificateInfoThirdFrame;
