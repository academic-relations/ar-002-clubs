"use client";

import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { getTemporaryClubSubfeature } from "../services/getTemporaryClubSubfeature";

const DemoComponent: React.FC = () => {
  const { data, isLoading, isError, refetch } = getTemporaryClubSubfeature(
    "1",
    "2",
    "3",
    "4",
  );

  return (
    <div>
      <h1>Demo Component</h1>
      <p>This is a demo component</p>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <div>
          Name: {data?.name} Age: {data?.age}
        </div>
      </AsyncBoundary>
      <button type="button" onClick={() => refetch}>
        Refetch
      </button>
    </div>
  );
};

export default DemoComponent;
