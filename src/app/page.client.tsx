"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-block/project-card";
import { type ProjectEntry } from "@/lib/mdx/parser";
import { Button } from "@/components/ui/button";
import { ShuffleIcon } from "lucide-react";
import { InlineLink } from "@/components/ui/inline-link";
import { useSearch } from "@/components/search-context";

export default function HomeClient({ projects }: { projects: ProjectEntry[] }) {
  const { search, setSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value when search changes externally (e.g., nav click)
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== search) {
      inputRef.current.value = search;
    }
  }, [search]);
  const filteredProjects = projects.filter((project) => {
    const projectText =
      project.metadata.title +
      " " +
      project.metadata.description +
      " " +
      (project.metadata.shortDescription ?? "") +
      " " +
      project.metadata.categories.join(" ") +
      " " +
      (project.metadata.displayedCategory ?? "") +
      " " +
      (project.metadata.displayedDate ?? "") +
      " " +
      (project.metadata.year ?? "") +
      " " +
      (project.metadata.collaborators ?? []).join(" ") +
      " " +
      (project.metadata.roles ?? []).join(" ") +
      " " +
      (project.metadata.contributors ?? []).join(" ") +
      " " +
      (project.metadata.tags ?? []).join(" ") +
      " " +
      project.slug;

    const projectTextLower = projectText.toLowerCase();

    return projectTextLower.includes(search.toLowerCase());
  });

  const allPossibleCategories = useMemo(() => {
    return projects.map((project) => project.metadata.categories).flat();
  }, [projects]);

  const allPossibleSlugs = useMemo(() => {
    return projects.map((project) => project.slug);
  }, [projects]);

  const randomProject = useCallback(() => {
    return allPossibleSlugs[
      Math.floor(Math.random() * allPossibleSlugs.length)
    ];
  }, [allPossibleSlugs]);

  const [nextRandomProject, setNextRandomProject] = useState(randomProject());

  const [searchBarInteracted, setSearchBarInteracted] = useState(false);

  return (
    <>
      <div className="sticky top-6 z-10 mx-1 mb-6 flex items-center justify-between gap-2">
        <input
          ref={inputRef}
          type="search"
          defaultValue={search}
          placeholder={
            searchBarInteracted
              ? "Just kidding, this is a search bar"
              : "This might not be a search bar"
          }
          className={cn(
            "concave w-full rounded-full bg-background px-4 py-2 md:py-1",
            "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500",
            "text-foreground placeholder:text-foreground/50",
            "font-condensed",
          )}
          onFocus={() => {
            setSearchBarInteracted(true);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div id="project-cards" className={cn(`flex flex-col px-2`)}>
        {filteredProjects.map((project) => (
          <ProjectCard
            id={project.slug}
            className={cn(
              filteredProjects.includes(project)
                ? ""
                : "hidden md:hidden lg:hidden",
              "scroll-mt-12",
            )}
            metadata={project.metadata}
            slug={project.slug}
            key={project.slug}
          />
        ))}
      </div>
    </>
  );
}
