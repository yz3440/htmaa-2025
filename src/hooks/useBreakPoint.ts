"use client";

import { useMediaQuery } from "@uidotdev/usehooks";

interface BreakPoints {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  "2xl": boolean;
}

const useBreakPoint = (): BreakPoints => {
  const sm = useMediaQuery("(min-width: 640px)");
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const xl = useMediaQuery("(min-width: 1280px)");
  const xxl = useMediaQuery("(min-width: 1536px)");

  // Return default values if not on client
  if (typeof window === "undefined") {
    return {
      sm: false,
      md: false,
      lg: false,
      xl: false,
      "2xl": false,
    };
  }

  return {
    sm,
    md,
    lg,
    xl,
    "2xl": xxl,
  };
};

export default useBreakPoint;
