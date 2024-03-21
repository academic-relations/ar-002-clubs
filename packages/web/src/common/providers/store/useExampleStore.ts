import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

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
          state.value += 1;
        }),
    })),
    {
      name: "example",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useExampleStore;
