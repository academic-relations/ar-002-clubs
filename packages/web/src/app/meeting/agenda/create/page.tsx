"use client";

// 배포용 not found 페이지 (시작)
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import NewAgendaFrame from "@sparcs-clubs/web/features/meeting/agenda/create/frames/NewAgendaFrame";

// const AgendaCreate: React.FC = () => (
//   <FlexWrapper gap={60} direction="column">
//     <PageHead
//       items={[
//         { name: "의결기구", path: "/meeting" }, // TODO: figma 나오는대로 맞춰서
//         { name: "안건지", path: "/meeting/agenda" },
//         { name: "작성", path: "/meeting/agenda/create" },
//       ]}
//       title="안건지 작성하기"
//     />
//     <NewAgendaFrame />
//   </FlexWrapper>
// );

// export default AgendaCreate;
