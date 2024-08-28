import React, { useEffect, useMemo, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import useGetClubsForPromotional from "../services/useGetClubsForPromotional";
import useGetClubsForRenewal from "../services/useGetClubsForRenewal";

import ClubNameSelect from "./_atomic/ClubNameSelect";
import DivisionSelect from "./_atomic/DivisionSelect";
import YearSelect from "./_atomic/YearSelect";
import ProfessorInformFrame from "./ProfessorInformFrame";

interface BasicInformSectionProps {
  type: RegistrationTypeEnum;
  editMode?: boolean;
}

const BasicInformFrame: React.FC<BasicInformSectionProps> = ({
  type,
  editMode = false,
}) => {
  const isRenewal = type === RegistrationTypeEnum.Renewal;

  const [isCheckedProfessor, setIsCheckedProfessor] = useState(true);

  const { watch, control, resetField, setValue } =
    useFormContext<ApiReg001RequestBody>();
  const clubId = watch("clubId");

  const {
    data: promotionalList,
    isLoading: isLoadingPromotional,
    isError: isErrorPromotional,
  } = useGetClubsForPromotional();
  const {
    data: renewalList,
    isLoading: isLoadingRenewal,
    isError: isErrorRenewal,
  } = useGetClubsForRenewal();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetUserProfile();

  const isLoading = isRenewal ? isLoadingRenewal : isLoadingPromotional;
  const isError = isRenewal ? isErrorRenewal : isErrorPromotional;
  const clubList = isRenewal ? renewalList : promotionalList;

  const professorInfo = useMemo(() => {
    if (clubId == null) return undefined;
    return clubList?.clubs.find(club => club.id === clubId)?.professor;
  }, [clubId, clubList]);

  useEffect(() => {
    if (professorInfo == null || !isCheckedProfessor) {
      resetField("professor.email");
      resetField("professor.name");
      resetField("professor.professorEnumId");
      setValue("professor", undefined);

      return;
    }
    setValue("professor", professorInfo);
  }, [professorInfo, resetField, setValue, isCheckedProfessor]);

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
          <ClubNameSelect clubList={clubList?.clubs} editMode={editMode} />
          <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
            <YearSelect />
            <DivisionSelect isRenewal={isRenewal} />
          </FlexWrapper>
          <FormController
            name="activityFieldKr"
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
            name="activityFieldEn"
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

          {isRenewal && clubId != null && professorInfo == null && (
            <CheckboxOption
              optionText="지도교수를 신청하겠습니다"
              checked={isCheckedProfessor}
              onClick={() => {
                setIsCheckedProfessor(!isCheckedProfessor);
              }}
            />
          )}
        </Card>
        {(!isRenewal || (isCheckedProfessor && clubId != null)) && (
          <ProfessorInformFrame />
        )}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default BasicInformFrame;
