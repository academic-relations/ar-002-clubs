import { action } from "@storybook/addon-actions";

import Button, { ButtonProps } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

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
