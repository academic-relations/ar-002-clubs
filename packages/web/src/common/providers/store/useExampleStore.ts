import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ExampleState {
  value: number;
  increment: () => void;
}

const useExampleStore = create(
  persist(
    immer<ExampleState>(set => ({
      value: 0,
      increment: () =>
        set(state => {
          state.value += 1; // eslint-disable-line no-param-reassign
        }),
    })),
    {
      name: "example",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useExampleStore;
