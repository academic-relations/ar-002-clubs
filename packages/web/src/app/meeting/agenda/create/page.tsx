"use client";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import NewAgendaFrame from "@sparcs-clubs/web/features/meeting/agenda/create/frames/NewAgendaFrame";

const AgendaAddPage: React.FC = () => (
  <FlexWrapper gap={60} direction="column">
    <PageHead
      items={[
        { name: "의결기구", path: "/meeting" }, // TODO: figma 나오는대로 맞춰서
        { name: "안건지", path: "/meeting/agenda" },
        { name: "작성", path: "/meeting/agenda/create" },
      ]}
      title="안건지 작성하기"
    />
    <NewAgendaFrame />
  </FlexWrapper>
);

export default AgendaAddPage;
