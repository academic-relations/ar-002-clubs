import { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
) => {
  const ref = useRef<T>(null);
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const clickHandler = (e: globalThis.MouseEvent) => {
      if (!(ref.current as HTMLElement)?.contains(e.target as HTMLElement)) {
        callbackRef.current();
      }
    };

    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return ref;
};

export default useOutsideClick;
