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
    onChange: (
      e:
        | ChangeEvent<HTMLInputElement>
        | string
        | number
        | Date
        | FieldPathValue<TFieldValues, TName>
        | undefined,
    ) => void;
    onBlur: () => void;
    value: FieldPathValue<TFieldValues, TName>;
    hasError: boolean;
    errorMessage?: string;
  }) => ReactNode;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  required?: boolean;
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
