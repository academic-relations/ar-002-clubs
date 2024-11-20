import { Preview } from "@storybook/react";
import React from "react";

import GlobalStyle from "../src/styles/GlobalStyle";
import StoryProvider from "./StoryProvider";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <StoryProvider>
        <GlobalStyle />
        <Story />{" "}
      </StoryProvider>
    ),
  ],
};

export default preview;
