"use client";

// 배포용 not found 페이지 (시작)
import NotFound from "../not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import { env } from "@sparcs-clubs/web/env";
// import DemoComponent from "@sparcs-clubs/web/features/_example/components/DemoComponent";

// const Home = () => (
//   <div>
//     <h1>Home</h1>
//     <p>Welcome to SPARCS Clubs! This is an example api call!</p>
//     <p>
//       Currently, the mock mode is {env.NEXT_PUBLIC_API_MOCK_MODE ? "on" : "off"}
//     </p>
//     <DemoComponent />
//   </div>
// );

// export default Home;
