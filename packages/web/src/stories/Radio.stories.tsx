import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

import Radio from "../common/components/Radio";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Radio> = {
  component: Radio,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    label: "Radio",
    value: "option1",
    direction: "column",
    gap: "12px",
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "radio", options: ["option1", "option2"] },
    direction: { control: "radio", options: ["row", "column"] },
    gap: { control: "text" },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<{ value: string }>();
    const handleChange = (newValue: string) => {
      updateArgs({ value: newValue });
      action("radio-change")(newValue);
    };
    return (
      <Radio {...args} value={value} onChange={handleChange}>
        <Radio.Option value="option1">Option 1</Radio.Option>
        <Radio.Option value="option2">Option 2</Radio.Option>
      </Radio>
    );
  },
};
