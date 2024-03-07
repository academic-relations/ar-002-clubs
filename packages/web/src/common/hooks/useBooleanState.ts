import { useCallback, useState } from "react";

const useBooleanState = () => {
  const [booleanState, setBooleanState] = useState<boolean>(false);

  const toggleVisible = useCallback(() => {
    setBooleanState(prev => !prev);
  }, []);

  return [booleanState, setBooleanState, toggleVisible] as const;
};
export default useBooleanState;
