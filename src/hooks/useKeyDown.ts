import { useEffect } from "react";

interface UseKeyDownOptions {
  /** Require Ctrl to be held simultaneously (default false) */
  ctrl?: boolean;
}

/**
 * Attach a `keydown` listener on `window` for a specific key, optionally
 * gating on a modifier. The listener is only registered when `active` is true.
 *
 * @param key      The `KeyboardEvent.key` value to listen for, e.g. `"Escape"` or `"\`"`
 * @param handler  Callback invoked when the key (+ modifiers) is pressed
 * @param active   When false the listener is removed / not added (default true)
 * @param options  Optional modifier flags
 *
 * @example
 *   // Close modal on Escape
 *   useKeyDown("Escape", onClose, !!project);
 *
 *   // Toggle terminal on Ctrl+`
 *   useKeyDown("`", () => setIsOpen(p => !p), true, { ctrl: true });
 */
function useKeyDown(
  key: string,
  handler: (e: KeyboardEvent) => void,
  active = true,
  options: UseKeyDownOptions = {},
): void {
  const { ctrl = false } = options;

  useEffect(() => {
    if (!active) return;

    const listener = (e: KeyboardEvent) => {
      if (ctrl && !e.ctrlKey) return;
      if (e.key === key) handler(e);
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler, active, ctrl]);
}

export default useKeyDown;
