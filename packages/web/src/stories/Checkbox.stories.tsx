import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

import CheckboxOption from "../common/components/CheckboxOption";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckboxOption> = {
  component: CheckboxOption,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxOption>;

export const Primary: Story = {
  args: {
    optionText: "CheckboxOption",
    checked: false,
  },
  argTypes: {
    optionText: { control: "text" },
    checked: { control: "boolean" },
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<{ checked: boolean }>();
    const handleClick = () => {
      updateArgs({ checked: !checked });
      action("checkbox-click")(!checked);
    };
    return <CheckboxOption {...args} onClick={handleClick} />;
  },
};
