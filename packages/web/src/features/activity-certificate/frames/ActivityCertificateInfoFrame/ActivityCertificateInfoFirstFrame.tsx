import React, { useEffect } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";


import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select, {
  SelectItem,
} from "@sparcs-clubs/web/common/components/Forms/Select";

import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateFrameProps
> = ({
  activityCertificate,
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
  firstErrorStatus,
  setFirstErrorStatus,
}) => {
  const mockClubList: SelectItem[] = [
    { label: "동아리", value: "1", selectable: true },
    { label: "또다른동아리", value: "2", selectable: true },
    { label: "안되는동아리", value: "3", selectable: false },
  ];
  // TODO: 이름 전화번호 동아리 목록 백에서 받아오기

  useEffect(() => {
    if (
      !activityCertificate.clubId ||
      !activityCertificate.issuedNumber ||
      activityCertificate.krPhoneNumber.length < 13
    ) {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstFilled: false,
      });
    } else {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstFilled: true,
      });
    }
  }, [activityCertificate]);

  useEffect(() => {
    if (
      firstErrorStatus.hasClubIdError ||
      firstErrorStatus.hasIssuedNumberError ||
      firstErrorStatus.hasKrPhoneNumberError
    ) {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstNoError: false,
      });
    } else {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        firstNoError: true,
      });
    }
  }, [firstErrorStatus]);

  return (
    <Card outline gap={40}>
      <Select
        label="동아리 이름"
        items={mockClubList}
        // TODO - 아래 clubId를 넘겨줄 때 parseInt를 통해서 clubId 값을 받기 때문에 실제 items를 넣어줄 때는 value가 해당 동아리의 실제 clubId여야 함
        setErrorStatus={value =>
          JSON.stringify(firstErrorStatus) ===
          JSON.stringify({ ...firstErrorStatus, hasClubIdError: value })
            ? null
            : setFirstErrorStatus({
                ...firstErrorStatus,
                hasClubIdError: value,
              })
        }
        onSelect={value => {
          setActivityCertificate({
            ...activityCertificate,
            clubId: parseInt(value),
          });
        }}
        selectedValue={
          activityCertificate.clubId
            ? activityCertificate.clubId.toString()
            : undefined
        }
      />
      {/* TODO - 유저 동아리 목록 받아서 채우고 onchange 시 state 업데이트 */}
      <TextInput label="활동 기간" placeholder="" disabled />
      <ItemNumberInput
        label="발급 매수"
        placeholder="X개"
        setErrorStatus={value =>
          JSON.stringify(firstErrorStatus) ===
          JSON.stringify({ ...firstErrorStatus, hasIssuedNumberError: value })
            ? null
            : setFirstErrorStatus({
                ...firstErrorStatus,
                hasIssuedNumberError: value,
              })
        }
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
      <TextInput
        label="신청자 이름"
        placeholder={
          activityCertificate.applicant ? activityCertificate.applicant : ""
        }
        disabled
      />
      <TextInput
        label="신청자 학과"
        placeholder={
          activityCertificate.department ? activityCertificate.department : ""
        }
        disabled
      />
      <TextInput
        label="신청자 학번"
        placeholder={
          activityCertificate.studentNumber
            ? activityCertificate.studentNumber
            : ""
        }
        disabled
      />
      <PhoneInput
        label="신청자 전화번호"
        placeholder="010-XXXX-XXXX"
        value={activityCertificate.krPhoneNumber}
        setErrorStatus={value =>
          JSON.stringify(firstErrorStatus) ===
          JSON.stringify({ ...firstErrorStatus, hasKrPhoneNumberError: value })
            ? null
            : setFirstErrorStatus({
                ...firstErrorStatus,
                hasKrPhoneNumberError: value,
              })
        }
        onChange={changedText => {
          setActivityCertificate({
            ...activityCertificate,
            krPhoneNumber: changedText,
          });
        }}
      />
    </Card>
  );
};

export default ActivityCertificateInfoFirstFrame;
