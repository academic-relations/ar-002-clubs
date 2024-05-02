import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";

import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select from "@sparcs-clubs/web/common/components/Forms/Select";

import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateFrameProps
> = ({
  activityCertificate,
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
}) => {
  useEffect(() => {
    // if (!activityCertificate.info.clubId) {
    //   // TODO - 에러 메세지
    // } else if (
    //   !activityCertificate.info.startMonth ||
    //   !activityCertificate.info.endMonth
    // ) {
    //   // TODO - 에러 메세지
    // } else
    if (
      activityCertificate.issuedNumber === null ||
      Number.isNaN(activityCertificate.issuedNumber)
    ) {
      // TODO - 에러 메세지
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstFilled: false,
      });
      // } else if (!activityCertificate.info.applicant) {
      //   // TODO - 에러 메세지
      // } else if (!activityCertificate.info.department) {
      //   // TODO - 에러 메세지
      // } else if (!activityCertificate.info.studentNumber) {
      //   // TODO - 에러 메세지
    }
    // 지금 5/2/2024 오후 9시 51분 기준으로 fix 위해 임시 주석 처리
    //
    // else if (
    //   activityCertificate.krPhoneNumber === "" ||
    //   phoneInputEval(activityCertificate.krPhoneNumber) !== ""
    // ) {
    //   setActivityCertificateProgress({
    //     ...activityCertificateProgress,
    //     firstFilled: false,
    //   });
    // }
    else {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstFilled: true,
      });
    }
  }, [activityCertificate]);

  return (
    <StyledCard type="outline">
      <Select label="동아리 이름" items={[]} />{" "}
      {/* TODO - 유저 동아리 목록 받아서 채우고 onchange 시 state 업데이트 */}
      <TextInput label="활동 기간" placeholder="" disabled />
      <ItemNumberInput
        label="발급 매수"
        placeholder="X개"
        value={
          activityCertificate?.issuedNumber
            ? String(activityCertificate?.issuedNumber)
            : undefined
        }
        handleChange={changedNumber => {
          setActivityCertificate({
            ...activityCertificate,
            issuedNumber: parseInt(changedNumber),
          });
        }}
      />
      <TextInput label="신청자 이름" placeholder="" disabled />
      <TextInput label="신청자 학과" placeholder="" disabled />
      <TextInput label="신청자 학번" placeholder="" disabled />
      <PhoneInput
        label="신청자 전화번호"
        placeholder="010-XXXX-XXXX"
        value={activityCertificate.krPhoneNumber}
        onChange={changedText => {
          setActivityCertificate({
            ...activityCertificate,
            krPhoneNumber: changedText,
          });
        }}
      />
    </StyledCard>
  );
};

export default ActivityCertificateInfoFirstFrame;
