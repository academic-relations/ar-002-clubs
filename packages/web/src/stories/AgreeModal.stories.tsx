import { useArgs } from "@storybook/preview-api";

import { Meta, StoryObj } from "@storybook/react";

import Button from "../common/components/Button";
import AgreementModal, {
  AgreementModalProps,
} from "../common/components/Modal/AgreeModal";

const meta: Meta<typeof AgreementModal> = {
  title: "Modal/AgreementModal",
  component: AgreementModal,
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

type Story = StoryObj<AgreementModalProps>;

export const AgreeModal: Story = {
  parameters: {
    docs: {
      inlineStories: false,
    },
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs<{
      isOpen: boolean;
    }>();

    return (
      <>
        <Button onClick={() => updateArgs({ isOpen: true })}>모달 열기</Button>
        <AgreementModal
          {...args}
          isOpen={isOpen}
          onAgree={() => updateArgs({ isOpen: false })}
          onDisagree={() => updateArgs({ isOpen: false })}
        />
      </>
    );
  },
};
