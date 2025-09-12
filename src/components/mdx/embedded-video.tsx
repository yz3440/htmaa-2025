"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbeddedVideoProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  caption?: string;
  glow?: boolean;
}
export function EmbeddedVideo({
  src,
  caption,
  glow = true,
  ...props
}: EmbeddedVideoProps) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <section
      className={cn(
        "relative -mx-4 my-6 mb-8 overflow-hidden rounded-lg md:mx-6",
        glow && "hover:white-glow-lg transition-all duration-500",
        props.className,
      )}
      {...props}
    >
      <div className="group aspect-video w-full">
        {hasWindow && (
          <ReactPlayer
            url={src}
            // light
            width="100%"
            height="100%"
            controls={true}
            playIcon={
              <Play
                size={48}
                fill="#fff"
                className="opacity-50 transition-opacity group-hover:opacity-100"
              />
            }
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  color: "white",
                  controls: 1,
                },
              },
              vimeo: {
                playerOptions: {
                  title: 1,
                  byline: 0,
                  portrait: 0,
                  color: "ffffff",
                  colors: ["#000000", "#FFC400", "#FF6D00", "#FF0000"],
                  loop: 1,
                },
              },
            }}
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 -z-10 h-full w-full animate-pulse bg-black/50 p-4 text-white"></div>
    </section>
  );
}
