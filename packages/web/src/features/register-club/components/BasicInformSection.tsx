import React, { useState } from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

import ProfessorInformSection from "./ProfessorInformSection";

interface BasicInformSectionProps {
  isFirstApply?: boolean;
  isReapply?: boolean;
}

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
`;

const BasicInformSection: React.FC<BasicInformSectionProps> = ({
  isFirstApply = false,
  isReapply = false,
}) => {
  const [isCheckedClubName, setIsCheckedClubName] = useState(false);
  const [isCheckedProfessor, setIsCheckedProfessor] = useState(false);
  // TODO. 디비에 전화번호 있으면 기본값 넣기
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>기본 정보</SectionTitle>
      <Card outline gap={32} style={{ marginLeft: 20 }}>
        <RowWrapper>
          {isFirstApply ? (
            <TextInput
              label="동아리명 (국문)"
              placeholder="국문 동아리명을 입력해주세요"
            />
          ) : (
            <Select
              placeholder="동아리명을 선택해주세요"
              label="동아리명 (국문)"
              // TODO. 신규등록, 재등록 가능한 동아리명 옵션 데이터 추가
              items={[]}
            />
          )}
          {isFirstApply && (
            <TextInput
              label="동아리명 (영문)"
              placeholder="영문 동아리명을 입력해주세요"
            />
          )}
        </RowWrapper>
        <CheckboxOption
          optionText={
            isFirstApply
              ? "이전에 가동아리로 활동한 적이 있어요"
              : "동아리명을 변경하고 싶어요 "
          }
          checked={isCheckedClubName}
          onClick={() => setIsCheckedClubName(!isCheckedClubName)}
        />
        {!isFirstApply && isCheckedClubName && (
          <RowWrapper>
            <TextInput
              label="신규 동아리명 (국문)"
              placeholder="국문 동아리명을 입력해주세요"
            />
            <TextInput
              label="신규 동아리명 (영문)"
              placeholder="영문 동아리명을 입력해주세요"
            />
          </RowWrapper>
        )}
        <RowWrapper>
          <TextInput
            label="대표자 이름"
            // TODO. 대표자 이름 현재 로그인한 사람으로 변경
            placeholder="이지윤"
          />
          <PhoneInput
            label="대표자 전화번호"
            placeholder="XXX-XXXX-XXXX"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </RowWrapper>
        <RowWrapper>
          <Select
            label="설립 연도"
            placeholder="설립 연도를 선택해주세요"
            // TODO. 설립연도 데이터 추가
            items={[]}
          />
          {isFirstApply && (
            <Select
              label="설립 월"
              placeholder="설립 월을 선택해주세요"
              // TODO. 설립월 데이터 추가
              items={[]}
            />
          )}
          <Select
            label={isReapply ? "소속 분과" : "희망 분과"}
            placeholder={
              isReapply
                ? "소속 분과를 선택해주세요"
                : "희망 분과를 선택해주세요"
            }
            // TODO. 분과 데이터 추가
            items={[]}
          />
        </RowWrapper>
        <TextInput
          label="활동 분야 (국문)"
          placeholder="활동 분야를 입력해주세요"
        />
        <TextInput
          label="활동 분야 (영문)"
          placeholder="활동 분야를 입력해주세요"
        />
        <CheckboxOption
          optionText="지도교수를 신청하겠습니다"
          checked={isCheckedProfessor}
          onClick={() => setIsCheckedProfessor(!isCheckedProfessor)}
        />
      </Card>
      {isCheckedProfessor && <ProfessorInformSection />}
    </FlexWrapper>
  );
};

export default BasicInformSection;
