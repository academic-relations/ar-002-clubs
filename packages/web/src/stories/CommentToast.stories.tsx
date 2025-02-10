import { Meta, StoryObj } from "@storybook/react";

import CommentToast, {
  CommentToastProps,
} from "@sparcs-clubs/web/common/components/Toast/CommentToast";

const meta: Meta<typeof CommentToast> = {
  component: CommentToast,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof CommentToast>;

export const Primary: Story = {
  args: {
    title: "ToastToastToastToastToastToastToastToastToast",
    color: "green",
    reasons: Array.from({ length: 10 }, (_, i) => ({
      datetime: new Date(),
      reason: <div>reason {i + 1}</div>,
    })),
  },
  argTypes: {
    color: {
      control: "select",
      options: ["green", "yellow", "red"],
    },
  },
  render: function Render(args: CommentToastProps) {
    return <CommentToast key={args.color} {...args} />;
  },
};
