import { useArgs } from "@storybook/preview-api";

import { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "../common/components/Button";
import Modal from "../common/components/Modal";
import ConfirmModalContent from "../common/components/Modal/ConfirmModalContent";

const meta: Meta<ButtonProps & { buttonText: string; modalText: string }> = {
  title: "Modal/ConfirmModal",
  component: Button,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "props에 onClose를 전달하면 모달 밖 여백 클릭 시 모달 꺼짐",
      },
    },
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

export const ConfirmModal: Story = {
  args: {
    buttonText: "제출",
    modalText: "제출을 완료했습니다.",
  },
  parameters: {
    docs: {
      inlineStories: false,
    },
  },
  render: function Render({ buttonText, modalText, ...props }) {
    const [{ value }, updateArgs] = useArgs<{ value: boolean }>();

    const handleClick = () => {
      updateArgs({ value: true });
    };

    return (
      <>
        <Button {...props} onClick={() => handleClick()}>
          {buttonText}
        </Button>
        <Modal isOpen={value}>
          <ConfirmModalContent onConfirm={() => updateArgs({ value: false })}>
            {modalText}
          </ConfirmModalContent>
        </Modal>
      </>
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
