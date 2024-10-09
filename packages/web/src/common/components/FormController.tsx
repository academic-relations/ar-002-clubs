import { ChangeEvent, ReactNode, useCallback } from "react";

import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

interface FormControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control?: Control<TFieldValues>;
  rules?: Omit<RegisterOptions<TFieldValues, TName>, "required" | "disabled">;
  renderItem: (args: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    onChange: (
      e:
        | ChangeEvent<HTMLInputElement>
        | string
        | number
        | Date
        | FieldPathValue<TFieldValues, TName>
        | null
        | undefined,
    ) => void;
    onBlur: () => void;
    value: FieldPathValue<TFieldValues, TName>;
    hasError: boolean;
    errorMessage?: string;
  }) => ReactNode;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

// TODO. maxLength rule 추가,
function FormController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  renderItem,
  defaultValue,
  ...props
}: FormControllerProps<TFieldValues, TName>) {
  const requiredMessage = "필수값입니다.";
  const maxLengthMessage = `최대 ${props.maxLength}자까지 가능합니다.`;
  const minLengthMessage = `최소 ${props.minLength}자 이상이어야 합니다.`;
  const patternMessage = "정해진 형식에 맞지 않습니다.";

  const isValidLength = (length: number | undefined) =>
    length !== undefined && length > 0;

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: {
        value: props.required ?? false,
        message: requiredMessage,
      },
      maxLength: isValidLength(props.maxLength)
        ? {
            value: props.maxLength as number,
            message: maxLengthMessage,
          }
        : undefined,
      minLength: isValidLength(props.minLength)
        ? {
            value: props.minLength as number,
            message: minLengthMessage,
          }
        : undefined,
      pattern:
        props.pattern !== undefined
          ? { value: props.pattern, message: patternMessage }
          : undefined,
    },
    defaultValue,
  });

  return renderItem({
    ...props,
    onChange: useCallback(e => onChange(e), [onChange]),
    onBlur: () => {
      onBlur();
    },
    value,
    hasError: !!error?.message,
    errorMessage: error?.message,
  });
}

export default FormController;
