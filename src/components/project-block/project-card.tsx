"use client";

import React from "react";
import { type ProjectMetadata } from "@/lib/mdx";
import { formatDate } from "@/lib/mdx";
import Link from "next/link";
// import { Link } from "next-view-transitions";
import { ProjectHero } from "./project-hero";
import { HoverEffectContainer } from "@/components/specialized-ui/hover-effect-container";
import { ProjectFrontmatters } from "./project-frontmatters";
import useNearComponent from "@/hooks/useNearComponent";
import { cn } from "@/lib/utils";
import { InlineLink } from "@/components/ui/inline-link";
import { type LayoutContext } from "@/components/layout";
import { ExternalLinkIcon } from "lucide-react";
interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  metadata: ProjectMetadata;
  slug: string;
  layoutContext?: LayoutContext;
}

export function ProjectCard({
  metadata,
  slug,
  layoutContext = "home",
  className,
  ...props
}: ProjectCardProps) {
  const projectLink = metadata.overrideLink ?? `/projects/${slug}`;

  const year = metadata.date.split("-")[0];

  const openUrl = metadata.overrideLink ?? `/projects/${slug}`;
  const openUrlTarget = metadata.overrideLink ? "_blank" : "";

  const TitleHeading = layoutContext === "home" ? "h2" : "h1";

  return (
    <div
      className={cn(
        `flex flex-col-reverse gap-0 border-t border-dashed border-foreground/50 pb-6 last:border-b-0`,
        "first:pt-0 md:grid md:grid-cols-12 md:gap-8 md:border-b md:border-t-0 md:pt-6",
        className,
      )}
      {...props}
    >
      {/* LEFT SECTION */}
      <div
        className={cn(
          "col-span-6 pt-4 md:pt-0 lg:col-span-8",
          layoutContext === "home" && "hidden md:block",
        )}
      >
        {/* PROJECT TITLE */}
        <TitleHeading className="font-condensed pb-2 text-lg font-bold md:text-lg">
          <InlineLink
            href={openUrl}
            target={openUrlTarget}
            className="group inline-flex items-center gap-2"
          >
            <span className={`tracking-tight`}>{metadata.title}</span>
            <ExternalLinkIcon
              className={cn(
                "mt-[2px] hidden size-3 -translate-x-4 text-yellow-500 opacity-0 transition-all duration-300",
                metadata.overrideLink && "inline",
                "group-hover:translate-x-0 group-hover:opacity-100",
              )}
            />
          </InlineLink>
        </TitleHeading>

        {/* PROJECT METADATA / FRONTMATTER */}
        <ProjectFrontmatters
          metadata={metadata}
          slug={slug}
          layoutContext={layoutContext}
        />
      </div>

      {/* MOBILE & HOME ONLY SHORT DESCRIPTION */}
      {layoutContext === "home" && (
        <TitleHeading className="pt-4 md:hidden">
          <InlineLink
            href={openUrl}
            target={openUrlTarget}
            className="font-condensed group inline-flex items-center gap-2 font-bold"
          >
            <span className={`tracking-tight`}>{metadata.title}</span>
          </InlineLink>
          <span> </span>
          <span className="font-condensed tracking-normal">
            {metadata.shortDescription ?? metadata.description}
          </span>
        </TitleHeading>
      )}

      {/* RIGHT SECTION */}
      <div className="col-span-6 pt-4 md:pt-0 lg:col-span-4">
        {/* TOP - PROJECT DATE & CATEGORY */}
        <div className="flex justify-between pb-2">
          <p className="font-condensed">{metadata.displayedDate ?? year}</p>
          <p className="font-condensed relative italic text-white">
            <span className="low-highlight">{metadata.displayedCategory}</span>
          </p>
        </div>
        {/* BOTTOM - PROJECT HERO IMAGE / VIDEO */}
        <Link href={openUrl} target={openUrlTarget}>
          <span className="sr-only">{metadata.title}</span>
          <HoverEffectContainer>
            <ProjectHero metadata={metadata} />
          </HoverEffectContainer>
        </Link>
      </div>
    </div>
  );
}
