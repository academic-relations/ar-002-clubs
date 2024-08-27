import React, { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import useGetClubsForReProvisional from "../services/useGetClubsForReProvisional";

import ClubNameField from "./_atomic/ClubNameField";
import DivisionSelect from "./_atomic/DivisionSelect";
import MonthSelect from "./_atomic/MonthSelect";
import YearSelect from "./_atomic/YearSelect";
import ProfessorInformFrame from "./ProfessorInformFrame";

const ProvisionalBasicInformFrame: React.FC<{ editMode?: boolean }> = ({
  editMode = false,
}) => {
  const [isCheckedProfessor, setIsCheckedProfessor] = useState(false);
  const [isReProvisional, setIsReProvisional] = useState(false);

  const { control, resetField, setValue } = useFormContext();

  const { data, isLoading, isError } = useGetClubsForReProvisional();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetUserProfile();

  useEffect(() => {
    if (!isCheckedProfessor) {
      resetField("professor.email");
      resetField("professor.name");
      resetField("professor.professorEnumId");
      setValue("professor", undefined);
    }
  }, [resetField, setValue, isCheckedProfessor]);

  return (
    <AsyncBoundary
      isLoading={isLoading || isLoadingProfile}
      isError={isError || isErrorProfile}
    >
      <FlexWrapper direction="column" gap={40}>
        <SectionTitle>기본 정보</SectionTitle>
        <Card outline gap={32} style={{ marginLeft: 20 }}>
          <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
            <TextInput
              label="대표자 이름"
              placeholder={profile?.name ?? ""}
              disabled
            />
            <FormController
              name="phoneNumber"
              required
              control={control}
              defaultValue={profile?.phoneNumber}
              minLength={13}
              renderItem={props => (
                <PhoneInput
                  {...props}
                  label="대표자 전화번호"
                  placeholder="XXX-XXXX-XXXX"
                />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={4}>
            <FlexWrapper
              direction="row"
              gap={8}
              style={{ width: "100%", marginLeft: 2 }}
            >
              <Typography fw="MEDIUM" color="BLACK">
                가등록 신청 구분
              </Typography>
              <Typography fs={14} color="GRAY.600">
                * 동아리 신청이 처음이라면 가등록(신규), 이전에 동아리로 활동한
                적이 있다면 가등록(재)를 선택해주세요
              </Typography>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={16} style={{ width: "100%" }}>
              <Button
                type={isReProvisional ? "outlined" : "default"}
                style={{ width: "100%" }}
                onClick={() => setIsReProvisional(false)}
              >
                가등록(신규)
              </Button>
              <Button
                type={isReProvisional ? "default" : "outlined"}
                style={{ width: "100%" }}
                onClick={() => setIsReProvisional(true)}
              >
                가등록(재)
              </Button>
            </FlexWrapper>
          </FlexWrapper>
          <ClubNameField
            clubList={isReProvisional ? data?.clubs : []}
            editMode={editMode}
          />
          <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
            <YearSelect isProvisional />
            <MonthSelect />
            <DivisionSelect />
          </FlexWrapper>
          <FormController
            name="kr활동분야"
            required
            control={control}
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
            control={control}
            renderItem={props => (
              <TextInput
                {...props}
                label="활동 분야 (영문)"
                placeholder="활동 분야를 입력해주세요"
              />
            )}
          />
          <CheckboxOption
            optionText="지도교수를 신청하겠습니다"
            checked={isCheckedProfessor}
            onClick={() => {
              setIsCheckedProfessor(!isCheckedProfessor);
            }}
          />
        </Card>
        {isCheckedProfessor && <ProfessorInformFrame />}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ProvisionalBasicInformFrame;