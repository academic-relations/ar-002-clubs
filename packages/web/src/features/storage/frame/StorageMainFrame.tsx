/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";

import apiSto001, {
  ApiSto001RequestBody,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { errorHandler } from "@sparcs-clubs/web/common/components/Modal/ErrorModal";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import { storageOrderSteps } from "@sparcs-clubs/web/constants/storage";

import StorageFormFirst from "../component/storageForm/StorageFormFirst";
import StorageFormSecond from "../component/storageForm/StorageFormSecond";
import StorageFormThird from "../component/storageForm/StorageFormThird";
import StorageNotice from "../component/StorageNotice";

import useCreateStorage from "../service/useCreateStorage";

interface StorageFormProps {
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  clubs: Array<{
    id: ApiSto001RequestBody["clubId"];
    name_kr: string;
    name_en: string;
  }>;
}

const StorageFrameInner = styled.div`
  margin-bottom: 60px;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Step2Form = [StorageFormFirst, StorageFormSecond, StorageFormThird];

const StorageMainFrame: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [agreement, setAgreement] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);

  const { data, isLoading, isError } = useGetUserProfile();

  const formCtx = useForm<ApiSto001RequestBody>({
    mode: "all",
    defaultValues: {
      studentPhoneNumber: "010-5105-4707",
      numberOfBoxes: 0,
    },
  });

  const {
    getValues,
    setValue,
    formState: { isValid },
  } = formCtx;

  const { mutate: postStorage, isPending: isPostStorage } = useCreateStorage();

  const submitHandler = useCallback(() => {
    postStorage(
      {
        body: {
          ...getValues(),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [apiSto001.url()] });
          router.replace(`/storage`);
        },
        onError: () => errorHandler("신청서 작성에 실패하였습니다"),
      },
    );
  }, [getValues, queryClient, router, postStorage]);

  const CurrentForm = Step2Form[activeStep - 1];

  const onPrev = useCallback(() => {
    if (activeStep === 1) {
      setAgreement(false);
      return;
    }
    setActiveStep(activeStep - 1);
  }, [setAgreement, activeStep, setActiveStep]);

  const onNext = useCallback(() => {
    if (activeStep === Step2Form.length) {
      submitHandler();
    }
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep, submitHandler]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          {
            name: `창고 신청`,
            path: `/storage`,
          },
        ]}
        title="창고 신청"
      />

      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {agreement ? (
          <FormProvider {...formCtx}>
            <form>
              <FlexWrapper direction="column" gap={60}>
                <StepProcess
                  steps={storageOrderSteps}
                  activeStepIndex={activeStep}
                />
                <StorageFrameInner>
                  <CurrentForm
                    username={
                      data?.name ?? "유저정보로부터 이름을 가져오지 못했습니다."
                    }
                    clubs={data?.clubs ?? []}
                  />
                </StorageFrameInner>
                <StyledButton>
                  <Button onClick={onPrev}>이전</Button>
                  <Button
                    onClick={onNext}
                    type={isValid ? "default" : "disabled"}
                  >
                    {activeStep === Step2Form.length ? "신청" : "다음"}
                  </Button>
                </StyledButton>
              </FlexWrapper>
            </form>
          </FormProvider>
        ) : (
          <StorageNotice setAgreement={setAgreement} />
        )}
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default StorageMainFrame;

export type { StorageFormProps };
