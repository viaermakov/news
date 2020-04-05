import React from "react";

interface IParams {
  root?: Element;
  rootMargin?: string;
  threshold?: number;
  onIntersect: () => void;
}

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement>,
  { threshold, root, rootMargin, onIntersect }: IParams
) => {
  const [hasBeenVisible, setHasBeenVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function init() {
      if (typeof window !== "undefined" && !window.IntersectionObserver) {
        await import("intersection-observer" as any).then(() => {
          // eslint-disable-next-line no-console
          console.log("IntersectionObserver polyfill injected.");
        });
      }
    }
    init();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0) {
          setHasBeenVisible(true);
          onIntersect();
        }
        return;
      },
      {
        threshold: threshold || 0,
        root: root || null,
        rootMargin: rootMargin || "0%",
      }
    );

    if (ref.current && !hasBeenVisible) {
      observer.observe(ref.current);
    }
  });
};
