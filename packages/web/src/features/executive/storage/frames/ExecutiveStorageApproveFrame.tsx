import { useCallback, useEffect, useState } from "react";

import apiSto008, {
  ApiSto008RequestBody,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { errorHandler } from "@sparcs-clubs/web/common/components/Modal/ErrorModal";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useGetStorageApplication } from "../services/useGetStorageApplication";
import { usePatchStorageApplication } from "../services/usePatchStorageApplication";
import { usePostStorageContract } from "../services/usePostStorageContract";

const ExecutiveStorageApproveFrame = ({
  applicationId,
}: {
  applicationId: number;
}) => {
  const {
    data: applicationData,
    isLoading,
    isError,
    refetch,
  } = useGetStorageApplication(applicationId);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [rejectionDetail, setRejectionDetail] = useState("");

  const [isAgreed, setIsAgreed] = useState(false);

  const useHandleApprove = async () => {
    await usePatchStorageApplication({ applicationId }, { status: "approved" });
    setRejectionDetail("");
    refetch();
  };

  const useHandleReject = async () => {
    await usePatchStorageApplication(
      { applicationId },
      { status: "rejected", note: rejectionDetail },
    );
    setRejectionDetail("");
    refetch();
  };

  const useHandleShipp = async () => {
    await usePatchStorageApplication({ applicationId }, { status: "shipped" });
    refetch();
  };

  const formCtx = useForm<ApiSto008RequestBody>({
    mode: "all",
    defaultValues: {
      applicationId,
      endDate: applicationData?.desiredEndDate,
    },
  });

  const { control, setValue, getValues } = formCtx;

  useEffect(() => {
    if (applicationData) {
      setValue("studentId", applicationData.studentId);
    }
  }, [setValue, applicationData]);

  const { mutate: postStorageContract } = usePostStorageContract();

  const handleReceive = useCallback(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    postStorageContract(
      {
        body: {
          ...getValues(),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [apiSto008.url()] });
          router.refresh();
        },
        onError: () => errorHandler("신청서 작성에 실패하였습니다"),
      },
    );
  }, [getValues, postStorageContract, queryClient, router]);

  const handleCheckBox = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {applicationData?.status === "applied" ? (
        <Card gap={20} outline>
          <FlexWrapper gap={4} direction="column">
            <Typography
              fs={16}
              lh={20}
              fw="MEDIUM"
              style={{ marginLeft: 2, marginRight: 2 }}
            >
              반려 사유 (반려 시에만 입력)
            </Typography>
            <TextInput
              value={rejectionDetail}
              handleChange={setRejectionDetail}
              placeholder="내용"
              area
            />
          </FlexWrapper>
          <FlexWrapper gap={16} direction="row" style={{ marginLeft: "auto" }}>
            <Button onClick={useHandleApprove}>신청 승인</Button>
            <Button onClick={useHandleReject}>신청 반려</Button>
          </FlexWrapper>
        </Card>
      ) : (
        ""
      )}

      {applicationData?.status === "approved" ? (
        <Card gap={20} outline>
          <Typography fw="MEDIUM" fs={20} lh={24}>
            계약 정보
          </Typography>
          <FormProvider {...formCtx}>
            <form>
              <FlexWrapper direction="column" gap={12}>
                <FormController
                  name="numberOfBoxes"
                  required
                  control={control}
                  renderItem={props => (
                    <ItemNumberInput
                      {...props}
                      label="필요한 상자 수량"
                      placeholder="0개"
                      defaultValue={applicationData?.numberOfBoxes}
                    />
                  )}
                />
                <FormController
                  name="numberOfNonStandardItems"
                  required
                  control={control}
                  renderItem={props => (
                    <ItemNumberInput
                      {...props}
                      label="규격 외 물품 개수"
                      placeholder="0개"
                      defaultValue={applicationData?.nonStandardItems.length}
                    />
                  )}
                />
                <FormController
                  name="charge"
                  required
                  control={control}
                  renderItem={props => (
                    <ItemNumberInput
                      {...props}
                      label="요금"
                      placeholder="0원"
                      unit="원"
                      itemLimit={1000000}
                    />
                  )}
                />
                <FormController
                  name="zone"
                  required
                  control={control}
                  maxLength={255}
                  renderItem={props => (
                    <TextInput {...props} label="구역" placeholder="구역" />
                  )}
                />
                <CheckboxOption
                  optionText="동아리의 물품 보관에 대한 동의 및 요금 납부를 확인하였습니다."
                  checked={isAgreed}
                  onClick={handleCheckBox}
                />
                <Button
                  onClick={handleReceive}
                  type={isAgreed ? "default" : "disabled"}
                >
                  보관 완료
                </Button>
              </FlexWrapper>
            </form>
          </FormProvider>
        </Card>
      ) : (
        ""
      )}

      {applicationData?.status === "received" ? (
        <Button onClick={useHandleShipp}>출고 완료</Button>
      ) : (
        ""
      )}

      {applicationData?.status === "overdue" ? (
        <Card gap={20} outline>
          <CheckboxOption
            optionText="연체 요금 납부를 확인하였습니다."
            checked={isAgreed}
            onClick={handleCheckBox}
          />
          <Button
            onClick={useHandleShipp}
            type={isAgreed ? "default" : "disabled"}
          >
            출고 완료
          </Button>
        </Card>
      ) : (
        ""
      )}
    </AsyncBoundary>
  );
};

export default ExecutiveStorageApproveFrame;
