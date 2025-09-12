"use client";

import { useState, useEffect } from "react";

export default function useIsGPUGood() {
  const [isGPUGood, setIsGPUGood] = useState(false);

  const checkDevicePerformance = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return false;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    // console.log("debugInfo", debugInfo);
    if (!debugInfo) return false;

    const renderer = gl.getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL,
    ) as string;
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;

    // console.log("renderer", renderer);
    // console.log("vendor", vendor);

    // Simple heuristic to determine if the device is powerful enough
    const isPowerful =
      /NVIDIA|AMD|Intel/i.test(renderer) && /NVIDIA|AMD|Intel/i.test(vendor);

    return isPowerful;
  };

  useEffect(() => {
    setIsGPUGood(checkDevicePerformance());
  }, []);

  return isGPUGood;
}
