import { action } from "@storybook/addon-actions";

import { Meta, StoryObj } from "@storybook/react";

import Modal from "../common/components/Modal";
import CancellableModalContent from "../common/components/Modal/CancellableModalContent";

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    isOpen: true,
  },
  render: function Render(args) {
    return (
      <Modal {...args}>
        <CancellableModalContent
          onConfirm={action("onConfirm")}
          onClose={action("onClose")}
        >
          공고를 삭제하면 복구할 수 없습니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    );
  },
};
