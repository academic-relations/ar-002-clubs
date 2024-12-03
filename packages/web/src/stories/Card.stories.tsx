import Card, { CardProps } from "../common/components/Card";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    outline: true,
    padding: "8px",
    gap: 20,
  },
  argTypes: {
    outline: { control: "boolean" },
    gap: { control: "number" },
  },
  render: (props: CardProps) => (
    <Card {...props}>
      <div>SPARCS Clubs</div>
    </Card>
  ),
};
