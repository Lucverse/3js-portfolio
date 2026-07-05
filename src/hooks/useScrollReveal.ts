import { useEffect, useRef, MutableRefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
}

/**
 * A reusable hook that observes an array of elements and adds the
 * 'in-view' CSS class when each one enters the viewport.
 * Also applies a staggered transition-delay for a cascade effect.
 */
function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
  deps: React.DependencyList = []
): MutableRefObject<(T | null)[]> {
  const { threshold = 0.1 } = options;
  const itemsRef = useRef<(T | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (!el.classList.contains('in-view')) {
              // Stagger each item by 120ms relative to its sibling index
              const allElements = itemsRef.current.filter(Boolean);
              const index = allElements.indexOf(el as T);
              el.style.transitionDelay = `${index * 0.12}s`;
              el.classList.add('in-view');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps]);

  return itemsRef;
}

export default useScrollReveal;
