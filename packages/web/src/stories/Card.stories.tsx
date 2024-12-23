import Card from "../common/components/Card";

import type { Meta, StoryObj } from "@storybook/react";

interface StoryCardProps {
  outline: boolean;
  padding: number;
  gap: number;
}

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<StoryCardProps>;

export const Primary: Story = {
  args: {
    outline: true,
    padding: 8,
    gap: 20,
  },
  render: (props: StoryCardProps) => (
    <Card {...props} padding={`${props.padding}px`}>
      <div>SPARCS Clubs</div>
    </Card>
  ),
};
