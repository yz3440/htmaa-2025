"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AutoMediaVideoProps {
  src: string;
  showProgress?: boolean;
  className?: string;
}

export const AutoMediaVideo = ({
  src,
  showProgress = false,
  className,
}: AutoMediaVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      <video
        ref={videoRef}
        className="w-full rounded-lg object-cover"
        autoPlay
        playsInline
        loop
        muted
      >
        <source src={src} type="video/mp4" />
      </video>
      {showProgress && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-background/20">
          <div
            className="white-glow-lg h-full bg-foreground/50 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
