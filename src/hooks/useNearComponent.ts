import { useState, useEffect, useRef, type RefObject } from "react";

interface NearComponentOptions {
  threshold?: number;
}

function useNearComponent<T extends HTMLElement>(
  options: NearComponentOptions = {},
): [RefObject<T>, boolean] {
  const { threshold = 50 } = options;
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const isNearHorizontally =
          mouseX >= rect.left - threshold && mouseX <= rect.right + threshold;

        const isNearVertically =
          mouseY >= rect.top - threshold && mouseY <= rect.bottom + threshold;

        setIsNear(isNearHorizontally && isNearVertically);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [threshold]);

  return [ref, isNear];
}

export default useNearComponent;
