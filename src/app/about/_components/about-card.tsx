"use client";

import React from "react";
import { type ProjectMetadata } from "@/lib/mdx";
import { formatDate } from "@/lib/mdx";
import Link from "next/link";
// import { ProjectHero } from "./project-hero";
import { HoverEffectContainer } from "@/components/specialized-ui/hover-effect-container";
// import { ProjectFrontmatters } from "./project-frontmatters";
import { cn } from "@/lib/utils";
import { InlineLink } from "@/components/ui/inline-link";
import { type LayoutContext } from "@/components/layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image } from "@/components/image";
import { AboutFrontmatters } from "./about-frontmatters";

export function AboutCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `flex flex-col-reverse gap-0 border-t border-dashed border-foreground/50 pb-6 last:border-0`,
        "first:pt-0 md:grid md:grid-cols-12 md:gap-8 md:border-b md:border-t-0 md:pt-6",
        className,
      )}
    >
      {/* LEFT SECTION */}
      <div className="col-span-6 pt-4 md:pt-0 lg:col-span-8">
        {/* PROJECT TITLE */}
        <h1 className="font-condensed pb-2 text-lg font-bold md:text-lg">
          <InlineLink href="/about">
            <span className={``}>Yufeng Zhao</span>
          </InlineLink>
        </h1>

        {/* PROJECT METADATA / FRONTMATTER */}
        <AboutFrontmatters />
      </div>

      {/* RIGHT SECTION */}
      <div className="col-span-6 pt-4 md:pt-0 lg:col-span-4">
        {/* TOP - PROJECT DATE & CATEGORY */}
        <div className="font-condensed flex justify-between pb-2">
          <h2>1998 - present</h2>
          <h2 className="relative italic">
            <span className="low-highlight backdrop-blur-sm">person</span>
          </h2>
        </div>
        {/* BOTTOM - PROJECT HERO IMAGE / VIDEO */}
        <Link href="/about" className="cursor-help">
          <HoverEffectContainer>
            <AspectRatio ratio={1}>
              <Image
                src="/about/yufengzhao.jpg"
                alt="hero"
                width={1080}
                height={1080}
                className="select-none object-cover saturate-[0.2] transition-all duration-300 hover:animate-hue-spin"
                draggable={false}
              />
            </AspectRatio>
          </HoverEffectContainer>
        </Link>
      </div>
    </div>
  );
}
