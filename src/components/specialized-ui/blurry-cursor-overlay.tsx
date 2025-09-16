"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Image } from "@/components/image";
interface BlurryCursorOverlayProps {
  size?: number;
}

interface Position {
  x: number;
  y: number;
}

const BlurryCursorOverlay = ({ size = 512 }: BlurryCursorOverlayProps) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursorPosition = useMemo(() => {
    return {
      x: position.x,
      y: position.y,
    };
  }, [position]);

  return (
    <div ref={ref} className="select-none">
      <Image
        src="/cursor-overlay.png"
        alt="blurry cursor overlay"
        className="pointer-events-none fixed -z-10 hidden object-contain md:block"
        width={size}
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${cursorPosition.x - size * 0.5}px`,
          top: `${cursorPosition.y - size * 0.5}px`,
        }}
      />
    </div>
  );
};

export default BlurryCursorOverlay;
