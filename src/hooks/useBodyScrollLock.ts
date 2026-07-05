import { useEffect } from "react";
import { lockBodyScroll } from "../lib/utils";

/**
 * Lock `document.body` scroll whenever `locked` is truthy, and
 * restore it when `locked` becomes falsy or the component unmounts.
 *
 * @example
 *   useBodyScrollLock(menuOpen);
 *   useBodyScrollLock(!!selectedProject);
 */
function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    lockBodyScroll(locked);
    // Always restore on unmount
    return () => lockBodyScroll(false);
  }, [locked]);
}

export default useBodyScrollLock;
