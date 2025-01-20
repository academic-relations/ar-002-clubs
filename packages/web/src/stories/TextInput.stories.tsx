import { useArgs } from "@storybook/preview-api";

import { Meta, StoryObj } from "@storybook/react";

import TextInput from "../common/components/Forms/TextInput";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {
    label: "TextInput",
    placeholder: "입력하세요.",
    errorMessage: "",
    area: false,
    disabled: false,
    value: "",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{ value: string }>();

    const handleChange = (newValue: string) => {
      updateArgs({ value: newValue });
    };

    return (
      <TextInput
        label={args.label}
        placeholder={args.placeholder}
        errorMessage={args.errorMessage}
        area={args.area}
        disabled={args.disabled}
        value={value}
        handleChange={handleChange}
      />
    );
  },
};
