import React, { useEffect, useState } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import Select from "@sparcs-clubs/web/common/components/Select";

import DivisionSelect from "./_atomic/DivisionSelect";
import MonthSelect from "./_atomic/MonthSelect";
import YearSelect from "./_atomic/YearSelect";
import ProfessorInformFrame from "./ProfessorInformFrame";

interface BasicInformSectionProps {
  type: RegistrationTypeEnum;
}

const BasicInformFrame: React.FC<BasicInformSectionProps> = ({ type }) => {
  const isProvisional = type === RegistrationTypeEnum.Provisional;
  const isPromotional = type === RegistrationTypeEnum.Promotional;
  const isRenewal = type === RegistrationTypeEnum.Renewal;

  const [clubName, setClubName] = useState("");

  const [isCheckedClubName, setIsCheckedClubName] = useState(false);
  const [isCheckedProfessor, setIsCheckedProfessor] = useState(isPromotional);

  useEffect(() => {
    if (isRenewal && clubName.length > 0) {
      setIsCheckedProfessor(true);
    }
  }, [clubName.length, isRenewal]);

  // TODO. 지도교수 정보 가져오기
  const hasProfessorInfo = false;

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>기본 정보</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 20 }}>
        <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
          {isProvisional ? (
            <FormController
              name="krName"
              required
              renderItem={props => (
                <TextInput
                  {...props}
                  label="동아리명 (국문)"
                  placeholder="국문 동아리명을 입력해주세요"
                />
              )}
            />
          ) : (
            <Select
              label="동아리명 (국문)"
              placeholder="동아리명을 선택해주세요"
              // TODO. 신규등록, 재등록 가능한 동아리명 옵션 데이터 추가
              items={[
                { value: "1", label: "동아리1" },
                { value: "2", label: "동아리2" },
              ]}
              value={clubName}
              onChange={setClubName}
            />
          )}
          {isProvisional && (
            <FormController
              name="enName"
              required
              renderItem={props => (
                <TextInput
                  {...props}
                  label="동아리명 (영문)"
                  placeholder="영문 동아리명을 입력해주세요"
                />
              )}
            />
          )}
        </FlexWrapper>
        {(isProvisional || (!isProvisional && clubName.length > 0)) && (
          <CheckboxOption
            optionText={
              isProvisional
                ? "이전에 가동아리로 활동한 적이 있어요"
                : "동아리명을 변경하고 싶어요 "
            }
            checked={isCheckedClubName}
            onClick={() => setIsCheckedClubName(!isCheckedClubName)}
          />
        )}
        {!isProvisional && isCheckedClubName && (
          <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
            <FormController
              name="krName"
              required
              renderItem={props => (
                <TextInput
                  {...props}
                  label="신규 동아리명 (국문)"
                  placeholder="국문 동아리명을 입력해주세요"
                />
              )}
            />
            <FormController
              name="enName"
              required
              renderItem={props => (
                <TextInput
                  {...props}
                  label="신규 동아리명 (영문)"
                  placeholder="영문 동아리명을 입력해주세요"
                />
              )}
            />
          </FlexWrapper>
        )}
        <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
          <TextInput
            label="대표자 이름"
            // TODO. 대표자 이름 현재 로그인한 사람으로 변경
            placeholder="이지윤"
            disabled
          />
          {/* // TODO. 디비에 전화번호 있으면 기본값 넣기 */}
          <FormController
            name="phoneNumber"
            required
            renderItem={props => (
              <PhoneInput
                {...props}
                label="대표자 전화번호"
                placeholder="XXX-XXXX-XXXX"
              />
            )}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
          <YearSelect />
          {isProvisional && <MonthSelect />}
          <DivisionSelect isRenewal={isRenewal} />
        </FlexWrapper>
        <FormController
          name="kr활동분야"
          required
          renderItem={props => (
            <TextInput
              {...props}
              label="활동 분야 (국문)"
              placeholder="활동 분야를 입력해주세요"
            />
          )}
        />
        <FormController
          name="en활동분야"
          required
          renderItem={props => (
            <TextInput
              {...props}
              label="활동 분야 (영문)"
              placeholder="활동 분야를 입력해주세요"
            />
          )}
        />

        {(isProvisional ||
          (isRenewal && clubName.length > 0 && !hasProfessorInfo)) && (
          <CheckboxOption
            optionText="지도교수를 신청하겠습니다"
            checked={isCheckedProfessor}
            onClick={() => setIsCheckedProfessor(!isCheckedProfessor)}
          />
        )}
      </Card>
      {/* // TODO. 지도교수 정보 있는 경우 정보 보여주기 */}
      {isCheckedProfessor && <ProfessorInformFrame />}
    </FlexWrapper>
  );
};

export default BasicInformFrame;
