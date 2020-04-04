import React from "react";

interface IParams {
  root?: Element;
  rootMargin?: string;
  threshold?: number;
}

async function init() {
  if (typeof window !== "undefined" && !window.IntersectionObserver) {
    await import("intersection-observer" as any).then(() => {
      // eslint-disable-next-line no-console
      console.log("IntersectionObserver polyfill injected.");
    });
  }
}

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement>,
  { threshold, root, rootMargin }: IParams
) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [hasBeenVisible, setHasBeenVisible] = React.useState<boolean>(false);
  const [entry, setEntry] = React.useState(null);

  init();

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      if (entries[0].intersectionRatio > 0) {
        setHasBeenVisible(true);
        setIsVisible(true);
        setEntry(entry);

        observerInstance.unobserve(ref.current as Element);
      }
      return;
    },
    {
      threshold: threshold || 0,
      root: root || null,
      rootMargin: rootMargin || "0%",
    }
  );

  React.useEffect(() => {
    if (ref.current && !hasBeenVisible) {
      observer.observe(ref.current);
    }
  });

  return [isVisible, entry];
};
