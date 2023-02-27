import { useRef } from "react";

export function useFocus<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const setFocus = () => ref?.current?.focus?.();
  const isFocused = document.activeElement === ref.current;

  return [ref, setFocus, isFocused] as const;
}
