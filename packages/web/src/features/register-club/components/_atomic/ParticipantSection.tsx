import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetParticipants from "@sparcs-clubs/web/features/activity-report/services/useGetParticipants";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";
import { Duration } from "@sparcs-clubs/web/features/register-club/types/registerClub";

interface ParticipantSectionProps {
  clubId: number;
  formCtx: ReturnType<typeof useForm>;
}

const ParticipantSection: React.FC<ParticipantSectionProps> = ({
  clubId,
  formCtx,
}) => {
  const { watch } = formCtx;

  const durations: Duration[] = watch("durations");
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

  const initialParticipants: { studentId: number }[] = watch("participants");
  const [participants, setParticipants] = useState<Record<number, boolean>>({});
  useEffect(() => {
    if (data && initialParticipants) {
      setParticipants(
        initialParticipants.reduce((acc, participant) => {
          const index = data.students.findIndex(
            _data => _data.id === participant.studentId,
          );
          return { ...acc, [index]: true };
        }, {}),
      );
    }
  }, [data, initialParticipants]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <SelectParticipant
        data={data?.students ?? []}
        onChange={setParticipants}
        onSelected={selectList => {
          const participantIds = selectList.map(_data => ({
            studentId: +_data.id,
          }));
          formCtx.setValue("participants", participantIds);
          formCtx.trigger("participants");
        }}
        value={participants}
      />
    </AsyncBoundary>
  );
};

export default ParticipantSection;
