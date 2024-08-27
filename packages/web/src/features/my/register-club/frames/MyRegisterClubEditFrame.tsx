import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiReg009RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import apiReg011 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import WarningInfo from "@sparcs-clubs/web/common/components/WarningInfo";
import usePutClubRegistration from "@sparcs-clubs/web/features/my/services/usePutClubRegistration";
import { MyClubRegistrationDetail } from "@sparcs-clubs/web/features/my/types/myClubRegistration";
import ActivityReportFrame from "@sparcs-clubs/web/features/register-club/components/ActivityReportFrame";
import AdvancedInformFrame from "@sparcs-clubs/web/features/register-club/components/AdvancedInformFrame";
import BasicInformFrame from "@sparcs-clubs/web/features/register-club/components/BasicInformFrame";
import ClubRulesFrame from "@sparcs-clubs/web/features/register-club/components/ClubRulesFrame";
import ProvisionalBasicInformFrame from "@sparcs-clubs/web/features/register-club/components/ProvisionalBasicInformFrame";

interface RegisterClubMainFrameProps {
  applyId: number;
  detail?: MyClubRegistrationDetail;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MyRegisterClubEditFrame: React.FC<RegisterClubMainFrameProps> = ({
  applyId,
  detail = undefined,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAgreed, setIsAgreed] = useState(false);

  const formCtx = useForm<ApiReg009RequestBody>({
    mode: "all",
    defaultValues: { ...detail },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formCtx;

  const { mutate, isSuccess } = usePutClubRegistration({
    applyId,
  });

  const title = useMemo(() => {
    switch (detail?.registrationTypeEnumId) {
      case RegistrationTypeEnum.Promotional:
        return "신규 등록";
      case RegistrationTypeEnum.Renewal:
        return "재등록";
      default:
        return "가등록";
    }
  }, [detail]);

  const type =
    detail?.registrationTypeEnumId ?? RegistrationTypeEnum.NewProvisional;

  const isProvisionalClub =
    type === RegistrationTypeEnum.NewProvisional ||
    type === RegistrationTypeEnum.ReProvisional;

  const submitHandler = useCallback(
    (data: ApiReg009RequestBody) => {
      mutate({ body: data });
    },
    [mutate],
  );

  useEffect(() => {
    if (isSuccess) {
      router.replace(`/my/register-club/${applyId}`);
      queryClient.invalidateQueries({
        queryKey: [apiReg011.url(applyId.toString())],
      });
    }
  }, [isSuccess, router, applyId, queryClient]);

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FlexWrapper direction="column" gap={60}>
          <PageHead
            items={[
              {
                name: `마이페이지`,
                path: `/my`,
              },
              {
                name: `동아리 등록`,
                path: `/my/register-club/${applyId}`,
              },
            ]}
            title={`동아리 ${title} 신청 수정`}
            enableLast
          />
          <FlexWrapper direction="column" gap={20}>
            {/* TODO. 등록 기간, 신청마감 동적처리  */}
            <Info text="현재는 2024년 봄학기 동아리 등록 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
            <WarningInfo>
              <Typography lh={24} color="BLACK">
                동아리 등록 구분(재등록 / 신규 등록 / 가등록) 변경 또는 가등록
                신청 구분 변경을 원할 경우, 해당 신청 내역을 삭제한 후 새로운
                신청을 해주시기 바랍니다
              </Typography>
            </WarningInfo>
          </FlexWrapper>
          {isProvisionalClub ? (
            <ProvisionalBasicInformFrame />
          ) : (
            <BasicInformFrame type={type} />
          )}
          <AdvancedInformFrame type={type} />
          {type === RegistrationTypeEnum.Promotional && <ActivityReportFrame />}
          <ClubRulesFrame
            isProvisional={type === RegistrationTypeEnum.NewProvisional}
            isAgreed={isAgreed}
            setIsAgreed={setIsAgreed}
          />
          <ButtonWrapper>
            <Button
              type="outlined"
              onClick={() => router.replace(`/my/register-club/${applyId}`)}
            >
              취소
            </Button>
            <Button
              buttonType="submit"
              type={isValid && isAgreed ? "default" : "disabled"}
            >
              저장
            </Button>
          </ButtonWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default MyRegisterClubEditFrame;