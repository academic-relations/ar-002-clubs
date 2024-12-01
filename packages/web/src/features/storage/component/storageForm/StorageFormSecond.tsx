/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { useFieldArray, useFormContext } from "react-hook-form";

import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { maxNonStandardItems } from "@sparcs-clubs/web/constants/storage";

const StorageFormSecondInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const NonstandardItemRow = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
  flex-direction: row;
`;

const IconOuterFrameInner = styled.div`
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
`;

const IconInnerFrameInner = styled.div`
  padding: 8px;
  border-radius: 4px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: flex;
  cursor: pointer;
`;

const InfoInner = styled.div`
  display: flex;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--gray300, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const StorageFormSecond: React.FC = () => {
  const {
    watch,
    control,
    setValue,
    formState: { isValid },
  } = useFormContext<ApiSto001RequestBody>();

  const { fields, append, replace, move } = useFieldArray<
    ApiSto001RequestBody,
    "nonStandardItems"
  >({
    control,
    name: "nonStandardItems",
  });

  const nonStandardItems = watch("nonStandardItems");
  const desiredPickUpDate = watch("desiredPickUpDate");
  const desiredStartDate = watch("desiredStartDate");

  const [isNonStandardItemExists, setIsNonStandardItemExists] =
    useState<boolean>(false);

  const checkBoxHandler = () => {
    setIsNonStandardItemExists(!isNonStandardItemExists);
  };

  const handleAddNonStandardItem = () => {
    if (fields.length < 5) {
      append({
        fileId: "",
        name: "",
      });
    }
    // eslint-disable-next-line no-console
    console.log(1);
  };

  const handleRemoveNonStandardItem = (NonStandardItemId: string) => {
    if (fields.length > 1) {
      replace([
        ...fields.filter(
          nonStandardItem => nonStandardItem.id !== NonStandardItemId,
        ),
      ]);
    }
  };

  return (
    <StorageFormSecondInner>
      <Info text="활동확인서 발급이 완료되면 이메일 또는 문자를 통해 (방법은 동연에서 정해주세요) 연락이 갈 것이라는 안내 문구" />
      <Card outline gap={20}>
        <Typography fs={20} lh={24} fw="MEDIUM">
          창고 사용 신청 정보
        </Typography>
        <FormController
          name="numberOfBoxes"
          required
          control={control}
          renderItem={props => (
            <ItemNumberInput
              {...props}
              label="필요한 상자 수량"
              placeholder="0개"
            />
          )}
        />
        <FormController
          name="desiredPickUpDate"
          control={control}
          required
          renderItem={({ value, onChange }) => (
            <DateInput
              label="상자 수령 일시"
              selected={value}
              onChange={(data: Date | null) => onChange(data)}
            />
          )}
        />
        <GridView>
          <FormController
            name="desiredStartDate"
            control={control}
            required
            renderItem={({ value, onChange }) => (
              <DateInput
                label="보관 시작 일시"
                selected={value}
                rules={{
                  validate: {
                    order:
                      value > desiredPickUpDate ||
                      "보관 시작 일시는 상자 수령 일시 이전일 수 없습니다",
                  },
                }}
                onChange={(data: Date | null) => onChange(data)}
              />
            )}
          />
          <FormController
            name="desiredEndDate"
            control={control}
            required
            renderItem={({ value, onChange }) => (
              <DateInput
                label="보관 종료 일시"
                selected={value}
                rules={{
                  validate: {
                    order:
                      value > desiredStartDate ||
                      "보관 종료 일시는 보관 시작 일시 이전일 수 없습니다",
                  },
                }}
                onChange={(data: Date | null) => onChange(data)}
              />
            )}
          />
        </GridView>
        <CheckboxOption
          optionText="규격 외 물품이 존재합니다."
          checked={isNonStandardItemExists}
          onClick={checkBoxHandler}
        />
      </Card>

      {isNonStandardItemExists ? (
        <Card outline gap={20}>
          <Typography fs={20} lh={24} fw="MEDIUM">
            규격 외 물품 목록
          </Typography>
          {fields.map((field, index) => (
            <NonstandardItemRow key={field.id}>
              <FormController
                name={`nonStandardItems.${index}.name`}
                control={control}
                required
                renderItem={props => (
                  <TextInput {...props} placeholder="물품명을 작성해주세요" />
                )}
              />
              <FormController
                name={`nonStandardItems.${index}.fileId`}
                control={control}
                renderItem={({ value, onChange }) => (
                  <FileUpload
                    fileId={value}
                    placeholder="placeholder"
                    onChange={(fileId: string[]) => {
                      onChange(fileId[0]);
                    }}
                  />
                )}
              />
              <IconOuterFrameInner
                onClick={_e => handleRemoveNonStandardItem(field.id)}
              >
                <IconInnerFrameInner>
                  <Icon type="delete" size={16} />
                </IconInnerFrameInner>
              </IconOuterFrameInner>
            </NonstandardItemRow>
          ))}
          <IconButton
            type={
              !!nonStandardItems &&
              nonStandardItems.length < maxNonStandardItems
                ? "default"
                : "disabled"
            }
            onClick={handleAddNonStandardItem}
            icon="add"
          >
            규격 외 물품 추가
          </IconButton>
          <InfoInner>
            규격 외 물품은 최대 {maxNonStandardItems}개까지 추가 가능합니다
          </InfoInner>
        </Card>
      ) : (
        ""
      )}
    </StorageFormSecondInner>
  );
};

export default StorageFormSecond;
