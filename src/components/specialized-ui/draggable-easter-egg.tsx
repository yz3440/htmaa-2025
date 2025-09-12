"use client";

import { useState } from "react";
import { motion, useDragControls } from "motion/react";
import { type PointerEvent } from "react";
import useBreakPoint from "@/hooks/useBreakPoint";
import { cn } from "@/lib/utils";

interface DraggableEasterEggProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function DraggableEasterEgg({
  className,
  style,
}: DraggableEasterEggProps) {
  const [isDragging, setIsDragging] = useState(false);
  // const { md } = useBreakPoint();
  return (
    <>
      <motion.div
        drag={true}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        className={cn("hidden md:block", className)}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(25,25,25,0) 65%, rgba(25,25,25,0) 70%)",
          cursor: isDragging ? "grabbing" : "grab",
          ...style,
        }}
      />
      <div
        className={cn("md:hidden", className)}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(25,25,25,0) 65%, rgba(25,25,25,0) 70%)",
          ...style,
        }}
      ></div>
    </>
  );
}
