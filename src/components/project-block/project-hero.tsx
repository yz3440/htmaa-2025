"use client";

import Image from "next/image";
import { type ProjectMetadata } from "@/lib/mdx";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, use, useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
interface ProjectHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  metadata: ProjectMetadata;
  playVideo?: boolean;
}

export function ProjectHero({
  metadata,
  playVideo,
  ...props
}: ProjectHeroProps) {
  const showPlaceHolder = !metadata.image && !metadata.video;
  const showVideo = metadata.video;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playVideo === undefined) return;
    if (playVideo) {
      void videoRef.current?.play();
    } else {
      void videoRef.current?.pause();
    }
  }, [playVideo]);

  // when mobile user go back and forth tabs, the video will pause.
  // when user comes back to the tab, the video will resume playing.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void videoRef.current?.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const { width } = useWindowSize();

  const aspectRatio = useMemo(() => {
    if (!width) return 1;
    if (width < 768) return 16 / 8.5; // md
    return 1;
  }, [width]);

  return (
    <AspectRatio
      className={cn("relative h-full w-full", props.className)}
      ratio={aspectRatio}
      {...props}
    >
      {showPlaceHolder && (
        // I want a box with two diagonal crosses
        <div className="h-full w-full bg-[#00FF00]"></div>
      )}
      {showVideo && (
        <picture>
          <video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full animate-fade select-none object-cover transition-all duration-700"
            muted
            controls={false}
            autoPlay
            loop
            playsInline
          >
            <source src={metadata.video} type="video/mp4" />
          </video>
          <Image
            className="pointer-events-none h-full w-full select-none object-cover"
            src={metadata.image ?? ""}
            width={720}
            height={720}
            alt={"Cover image for " + metadata.title}
            quality={25}
            priority
          />
        </picture>
      )}
      {!showPlaceHolder && !showVideo && (
        <Image
          className="h-full w-full object-cover"
          src={metadata.image}
          width={720}
          height={720}
          alt={"Cover image for " + metadata.title}
          quality={25}
          priority
        />
      )}
    </AspectRatio>
  );
}
