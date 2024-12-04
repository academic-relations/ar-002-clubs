import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

import { Meta, StoryObj } from "@storybook/react";

import RadioOption from "../common/components/Radio/RadioOption";

const meta: Meta<typeof RadioOption> = {
  component: RadioOption,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RadioOption>;

export const Primary: Story = {
  args: {
    children: "RadioOption",
    checked: false,
  },
  argTypes: {
    children: { control: "text" },
    checked: { control: "boolean" },
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<{ checked: boolean }>();
    const handleClick = () => {
      updateArgs({ checked: !checked });
      action("radio-click")(!checked);
    };
    return <RadioOption {...args} onClick={handleClick} />;
  },
};
