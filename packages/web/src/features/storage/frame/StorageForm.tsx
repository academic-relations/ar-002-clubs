/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";

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
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { storageOrderSteps } from "@sparcs-clubs/web/constants/storage";

import StorageFormFirst from "../component/storageForm/StorageFormFirst";
import StorageFormSecond from "../component/storageForm/StorageFormSecond";
// import StorageFormThird from "./StorageFormThird";

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
  formCtx: ReturnType<typeof useForm<ApiSto001RequestBody>>;
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

const Step2Form = [
  StorageFormFirst,
  StorageFormSecond,
  //  StorageFormThird
];

const StorageForm: React.FC<StorageFormProps> = ({
  setAgreement,
  step,
  setStep,
  username,
  clubs,
  formCtx,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError } = useGetUserProfile();

  const {
    getValues,
    watch,
    reset,
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

  const CurrentForm = Step2Form[step - 1];

  const onPrev = useCallback(() => {
    if (step === 1) {
      setAgreement(false);
      return;
    }
    setStep(step - 1);
  }, [setAgreement, step, setStep]);

  const onNext = useCallback(() => {
    if (step === Step2Form.length) {
      submitHandler();
    }
    setStep(step + 1);
  }, [step, setStep, submitHandler]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <StepProcess steps={storageOrderSteps} activeStepIndex={step} />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FormProvider {...formCtx}>
          <form>
            <StorageFrameInner>
              <CurrentForm
                username={username}
                clubs={clubs}
                formCtx={formCtx}
              />
            </StorageFrameInner>

            <StyledButton>
              <Button onClick={onPrev}>이전</Button>
              <Button onClick={onNext} type={isValid ? "default" : "disabled"}>
                {step === Step2Form.length ? "신청" : "다음"}
              </Button>
            </StyledButton>
          </form>
        </FormProvider>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default StorageForm;

export type { StorageFormProps };
