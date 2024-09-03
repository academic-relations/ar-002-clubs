import React from "react";

import { ApiAct007RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetParticipants from "@sparcs-clubs/web/features/activity-report/services/useGetParticipants";

import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";

interface ParticipantSectionProps {
  clubId: number;
}

const ParticipantSection: React.FC<ParticipantSectionProps> = ({ clubId }) => {
  const { watch, setValue } = useFormContext<ApiAct007RequestBody>();

  const durations = watch("durations");
  const startTerm = durations
    .map(d => d.startTerm)
    .reduce((a, b) => (a < b ? a : b));
  const endTerm = durations
    .map(d => d.endTerm)
    .reduce((a, b) => (a > b ? a : b));

  const { data, isLoading, isError } = useGetParticipants({
    clubId,
    startTerm,
    endTerm,
  });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <SelectParticipant
        data={data?.students ?? []}
        onSelected={selectList => {
          const participantIds = selectList.map(_data => ({
            studentId: +_data.id,
          }));
          setValue("participants", participantIds);
        }}
      />
    </AsyncBoundary>
  );
};

export default ParticipantSection;
