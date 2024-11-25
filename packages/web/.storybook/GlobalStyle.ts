"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  background: linear-gradient(180deg, #eafafc 0px, #ffffff 339.67px);
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

/* Default Font Styles */
* {
  color: #333333;
  font-weight: 400;
  font-family: var(--next-font-family-pretendard);
}

button {
  all: unset;
  cursor: pointer;
}

a {
  display: flex;
  text-decoration: none;
  color: inherit;
}

main {
  overflow-x: hidden;
  min-width: 320px;
}
`;

export default GlobalStyle;
