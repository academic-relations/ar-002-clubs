import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "../common/components/Button";
import AgreementModal, {
  AgreementModalProps,
} from "../common/components/Modal/AgreeModal";

import CancellableModalContent from "../common/components/Modal/CancellableModalContent";
import ConfirmModalContent from "../common/components/Modal/ConfirmModalContent";
import ErrorModal from "../common/components/Modal/ErrorModal";
import Modal from "../common/components/Modal/index";

const meta: Meta<typeof Modal> = {
  component: Modal,
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
          fontFamily: "'Material Icons'",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<
  AgreementModalProps & ButtonProps & { buttonText: string; modalText: string }
>;

export const AgreeModal: Story = {
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <AgreementModal
          {...args}
          isOpen={isOpen}
          onAgree={() => setIsOpen(false)}
          onDisagree={() => setIsOpen(false)}
        />
      </>
    );
  },
};

export const ConfirmModal: Story = {
  args: {
    buttonText: "제출",
    modalText: "제출을 완료했습니다.",
  },
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
  render: function Render({ buttonText, modalText, ...props }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
      setIsOpen(true);
    };

    return (
      <>
        <Button {...props} onClick={() => handleClick()}>
          {buttonText}
        </Button>
        <Modal isOpen={isOpen}>
          <ConfirmModalContent onConfirm={() => setIsOpen(false)}>
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

export const CancellableModal: Story = {
  args: {
    modalText: "공고를 삭제하면 복구할 수 없습니다. ㄱㅊ?",
    children: "삭제",
  },
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
  render: function Render({ modalText, ...props }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
      setIsOpen(true);
    };

    return (
      <>
        <Button {...props} onClick={handleClick}>
          {props.children}
        </Button>
        <Modal isOpen={isOpen}>
          <CancellableModalContent
            onConfirm={() => setIsOpen(false)}
            onClose={() => setIsOpen(false)}
          >
            {modalText}
          </CancellableModalContent>
        </Modal>
      </>
    );
  },
  argTypes: {
    modalText: {
      control: "text",
      description: "모달에 표시되는 텍스트",
    },
    children: {
      control: "text",
      description: "버튼에 표시되는 텍스트",
    },
  },
};

export const HandleErrorModal: Story = {
  args: {
    buttonText: "제출",
    modalText: "제출에 실패했습니다.",
  },
  parameters: {
    docs: {
      inlineStories: true,
    },
  },
  render: function Render({ buttonText, modalText, ...props }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
      setIsOpen(true);
    };

    return (
      <>
        <Button {...props} onClick={handleClick}>
          {buttonText}
        </Button>
        <ErrorModal
          isOpen={isOpen}
          onConfirm={() => setIsOpen(false)}
          message={modalText}
        />
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
