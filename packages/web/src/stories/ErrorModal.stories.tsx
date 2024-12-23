import { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "../common/components/Button";
import { errorHandler } from "../common/components/Modal/ErrorModal";

const meta: Meta<ButtonProps & { buttonText: string; modalText: string }> = {
  title: "Modal/ErrorModal",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    Story => (
      <div
        style={{
          padding: "16px",
          boxSizing: "border-box",
          height: "50vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<ButtonProps & { buttonText: string; modalText: string }>;

export const ErrorModal: Story = {
  args: {
    buttonText: "제출",
    modalText: "제출에 실패했습니다.",
  },
  parameters: {
    docs: {
      inlineStories: false,
    },
  },
  render: function Render({ buttonText, modalText, ...props }) {
    return (
      <Button {...props} onClick={() => errorHandler(modalText)}>
        {buttonText}
      </Button>
    );
  },
  argTypes: {
    buttonText: {
      control: "text",
      description: "버튼에 표시되는 텍스트",
    },
    modalText: {
      control: "text",
      description: "모달에 표시되는 텍스트",
    },
  },
};
