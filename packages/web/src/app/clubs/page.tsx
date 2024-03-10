"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import styled from "styled-components";

import clubsData from "./data/clubs";

const ClubsInner = styled.div`
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Clubs = () => (
  <main>
    <UseClientProvider>
      <ClubsInner>{clubsData.toString()}</ClubsInner>
    </UseClientProvider>
  </main>
);

export default Clubs;
