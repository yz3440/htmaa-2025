"use client";

import { type ProjectMetadata } from "@/lib/mdx";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCollaboratorWebsite } from "@/lib/collaborators";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import { InlineLink } from "@/components/ui/inline-link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LayoutContext } from "@/components/layout";

interface ProjectFrontmattersProps {
  metadata: ProjectMetadata;
  slug: string;
  layoutContext?: LayoutContext;
}

export function ProjectFrontmatters({
  metadata,
  slug,
  layoutContext = "home",
}: ProjectFrontmattersProps) {
  const isProjectDetailPage = layoutContext === "project-detail";

  const openUrl = metadata.overrideLink ?? `/projects/${slug}`;

  const [showDetail, setShowDetail] = useState(isProjectDetailPage);
  const toggleDetailed = () => {
    setShowDetail(!showDetail);
  };

  return (
    <>
      {/* Description */}
      <FrontmatterSection selectable>
        <p className="text-base font-normal leading-tight md:font-sans md:text-sm xl:text-base xl:leading-tight">
          {metadata.description}
        </p>
      </FrontmatterSection>

      {/* Details Toggle */}
      {/* <div className="flex justify-end">
        <Button
          variant={"secondary"}
          size={"sm"}
          lighting={"convex-sm"}
          className={cn(
            "cursor-pointer leading-tight md:hidden",
            showDetail ? "hidden" : "block",
          )}
          onClick={toggleDetailed}
        >
          {"↓more↓"}
        </Button>
      </div> */}

      {/* Details */}
      <div
        className={cn(
          "flex flex-col overflow-hidden text-sm leading-tight transition-all md:h-auto",
          showDetail ? "h-auto" : "h-0",
        )}
      >
        {/* #1 Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <FrontmatterSection dimmed={!isProjectDetailPage} title="Tags">
            <p className={cn("font-normal lowercase italic")}>
              {metadata.tags.join(", ")}
            </p>
          </FrontmatterSection>
        )}

        {/* #2 Roles */}
        {metadata.roles && metadata.roles.length > 0 && (
          <FrontmatterSection dimmed={!isProjectDetailPage} title="Roles">
            <p className={cn("font-normal lowercase italic")}>
              {metadata.roles.join(", ") + "."}
            </p>
          </FrontmatterSection>
        )}

        {/* #3 Collaborators */}
        {metadata.collaborators && metadata.collaborators.length > 0 && (
          <FrontmatterSection
            dimmed={!isProjectDetailPage}
            title="Collaborators"
          >
            <p className={cn("font-normal")}>
              {metadata.collaborators.map((collaborator, i) => {
                const collaboratorLink = getCollaboratorWebsite(collaborator);
                let collaboratorSpan = (
                  <span key={collaborator}>{collaborator}</span>
                );
                if (collaboratorLink) {
                  collaboratorSpan = (
                    <InlineLink
                      key={collaborator}
                      href={collaboratorLink}
                      target="_blank"
                    >
                      {collaboratorSpan}
                    </InlineLink>
                  );
                }

                const trailingSpan = (
                  <span>
                    {i !== metadata.collaborators!.length - 1 ? ", " : "."}
                  </span>
                );

                return (
                  <span key={collaborator}>
                    {collaboratorSpan}
                    {trailingSpan}
                  </span>
                );
              })}
            </p>
          </FrontmatterSection>
        )}

        {/* #4 Contributors */}
        {metadata.contributors && metadata.contributors.length > 0 && (
          <FrontmatterSection
            dimmed={!isProjectDetailPage}
            title="Contributors"
          >
            <p className={cn("font-normal")}>
              {metadata.contributors.map((contributor, i) => {
                const contributorLink = getCollaboratorWebsite(contributor);

                let contributorSpan = (
                  <span key={contributor}>{contributor}</span>
                );

                const trailingSpan = (
                  <span>
                    {i !== metadata.contributors!.length - 1 ? ", " : "."}
                  </span>
                );

                if (contributorLink) {
                  contributorSpan = (
                    <InlineLink
                      key={contributor}
                      href={contributorLink}
                      target="_blank"
                    >
                      {contributorSpan}
                    </InlineLink>
                  );
                }
                return (
                  <span key={contributor}>
                    {contributorSpan}
                    {trailingSpan}
                  </span>
                );
              })}
            </p>
          </FrontmatterSection>
        )}

        {/* #5 Press */}
        {metadata.pressLinks && metadata.pressLinks.length > 0 && (
          <FrontmatterSection dimmed={!isProjectDetailPage} title="Press">
            <p className={cn("font-normal")}>
              {metadata.pressLinks.map((link, i) => {
                const trailingSpan = (
                  <span>
                    {i !== metadata.pressLinks!.length - 1 ? ", " : "."}
                  </span>
                );
                return (
                  <span key={link.url}>
                    <InlineLink key={link.url} href={link.url} target="_blank">
                      {link.title}
                    </InlineLink>
                    {trailingSpan}
                  </span>
                );
              })}
            </p>
          </FrontmatterSection>
        )}

        {/* #6 Featured In */}
        {metadata.featuredInLinks && metadata.featuredInLinks.length > 0 && (
          <FrontmatterSection dimmed={!isProjectDetailPage} title="Featured in">
            <p className={cn("font-normal")}>
              {metadata.featuredInLinks.map((link, i) => {
                const trailingSpan = (
                  <span>
                    {i !== metadata.featuredInLinks!.length - 1 ? ", " : "."}
                  </span>
                );
                return (
                  <span key={link.url}>
                    <InlineLink key={link.url} href={link.url} target="_blank">
                      {link.title}
                    </InlineLink>
                    {trailingSpan}
                  </span>
                );
              })}
            </p>
          </FrontmatterSection>
        )}
        {/* #7 Publication Links */}
        {metadata.publicationLinks && metadata.publicationLinks.length > 0 && (
          <FrontmatterSection
            dimmed={!isProjectDetailPage}
            title="Publications"
          >
            <p className={cn("font-normal")}>
              {metadata.publicationLinks.map((link, i) => {
                const trailingSpan = (
                  <span>
                    {i !== metadata.publicationLinks!.length - 1 ? ", " : "."}
                  </span>
                );
                return (
                  <span key={link.url}>
                    <InlineLink key={link.url} href={link.url} target="_blank">
                      {link.title}
                    </InlineLink>
                    {trailingSpan}
                  </span>
                );
              })}
            </p>
          </FrontmatterSection>
        )}

        {/* #8 Notes */}
        {metadata.notes && metadata.notes.length > 0 && (
          <FrontmatterSection dimmed={!isProjectDetailPage} title="Notes">
            <p className={cn("font-normal italic")}>
              <span className={cn("low-highlight")}>{metadata.notes}</span>
            </p>
          </FrontmatterSection>
        )}
        {/* #8 Links */}
        <section
          className={cn(
            "mt-6",
            isProjectDetailPage && "text-right md:text-left",
          )}
        >
          {metadata.videoLink && (
            <FrontmatterExternalLink href={metadata.videoLink} title="Watch" />
          )}
          {metadata.githubLink && (
            <FrontmatterExternalLink
              href={metadata.githubLink}
              title="Code on Github"
            />
          )}
          {metadata.socialMediaLink && (
            <FrontmatterExternalLink
              href={metadata.socialMediaLink}
              title="Social"
            />
          )}
          {metadata.externalLink && (
            <FrontmatterExternalLink
              href={metadata.externalLink}
              title="Access"
            />
          )}
        </section>
      </div>

      {/* Details Toggle */}
      <div className={cn(isProjectDetailPage && "hidden")}>
        {/* show less button in mobile */}
        {/* <div className="flex justify-end">
          <a
            className={`cursor-pointer text-sm leading-tight ${showDetail ? "block" : "hidden"} md:hidden`}
            onClick={() => {
              toggleDetailed();
            }}
          >
            {"↑less↑"}
          </a>
        </div> */}

        {/* show project link in mobile */}
        {/* <div className="mt-4 flex justify-end text-sm leading-tight md:hidden md:justify-start">
          <FrontmatterExternalLink href={openUrl} title="Project Details" />
        </div> */}
      </div>
    </>
  );
}

function FrontmatterSection({
  children,
  dimmed,
  title,
  selectable = false,
  className,
}: {
  children: React.ReactNode;
  dimmed?: boolean;
  title?: string;
  selectable?: boolean;
  className?: string;
}) {
  const titleHeader = title ? (
    <h3 className="font-condensed text-lg font-bold leading-tight md:text-base xl:text-lg xl:leading-tight">
      {title}
    </h3>
  ) : null;

  return (
    <section
      className={cn(
        "pb-4",
        dimmed && "opacity-100 transition-all hover:opacity-100 md:opacity-50",
        !selectable && "select-none",
        className,
      )}
    >
      {titleHeader}
      {children}
    </section>
  );
}

function FrontmatterExternalLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const shouldTargetBlank = href.startsWith("http");

  return (
    <span className="mr-2">
      <InlineLink href={href} target={shouldTargetBlank ? "_blank" : ""}>
        <Button size={"sm"} variant={"accent"} className="group">
          <div className="flex items-center gap-1">
            {/* <div className="group-hover:animate-spin">{"→"}</div> */}
            <div className="-ml-1">
              <ArrowRight
                size={12}
                className="my-auto group-hover:animate-spin"
              />
            </div>
            <div className="group-hover:white-glow-text-md my-auto -translate-y-[1px] underline group-hover:text-green-500 group-hover:no-underline">
              {title}
            </div>
          </div>
        </Button>
      </InlineLink>
    </span>
  );
}
