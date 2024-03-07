"use client";

import ExampleComponent from "@sparcs-clubs/web/common/components/ExampleComponent";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

const Home = () => (
  <main>
    <UseClientProvider>
      <ExampleComponent>
        Welcome to SPARCS Clubs! The frontend is working well!
      </ExampleComponent>
    </UseClientProvider>
  </main>
);

export default Home;
