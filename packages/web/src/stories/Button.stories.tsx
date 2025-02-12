import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "../common/components/Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (props: ButtonProps) => <Button {...props} />,
  args: {
    onClick: action("button-click"),
    children: "버튼",
    type: "default",
    buttonType: "button",
  },
  argTypes: {
    children: { control: "text" },
  },
};
