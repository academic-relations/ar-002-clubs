"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

:root {
  background: linear-gradient(180deg, #eafafc 0px, #ffffff 339.67px);
  min-height: 100vh;
  --next-font-family-pretendard: 'Pretendard', sans-serif;
  --next-font-family-nanum-square: 'NanumSquare', sans-serif;
  --next-font-family-raleway: 'Raleway', sans-serif;
}


.nanum-square-font {
  font-family: var(--next-font-family-nanum-square);
}

.pretendard-font {
  font-family: var(--next-font-family-pretendard);
}

.raleway-font {
  font-family: var(--next-font-family-raleway);
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

p,
body {
  margin: 0;
}

ul,
li {
  margin: 0;
  padding: 0;
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

.viewer-download {
  color: #fff;
  font-family: FontAwesome, serif;
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: center;
}
`;

export default GlobalStyle;
