import { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  exception: React.RefObject<HTMLElement | null> | null,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event: MouseEvent | TouchEvent) {
      const clickedInsideMain =
        ref.current && ref.current.contains(event.target as Node);
      const clickedInsideException =
        exception &&
        exception.current &&
        exception.current.contains(event.target as Node);
      if (!(clickedInsideMain || clickedInsideException)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, callback, exception, enabled]);
}
