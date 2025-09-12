import { z } from "zod";
import { getAllProjects, type ProjectEntry } from "./parser";
import { type ProjectCategory } from "./project-metadata";

const FilterOptions = z.object({
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  noOverrideLink: z.boolean().optional(),
});

type FilterOptionsType = z.infer<typeof FilterOptions>;

export const getFilteredProjects = (filters: FilterOptionsType) => {
  let projects = getAllProjects();

  projects = projects.filter((project) => project.metadata.visible);

  if (filters.categories && filters.categories.length > 0) {
    const categories = filters.categories;
    projects = projects.filter((project) =>
      categories.every((category) =>
        project.metadata.categories.includes(category as ProjectCategory),
      ),
    );
  }

  if (filters.tags) {
    projects = projects.filter(
      (project) =>
        filters.tags?.every((tag) => project.metadata.tags?.includes(tag)) ??
        true,
    );
  }

  if (filters.featured) {
    projects = projects.filter((project) => project.metadata.featured);
  }

  if (filters.noOverrideLink) {
    projects = projects.filter((project) => !project.metadata.overrideLink);
  }

  const sortedProjects = projects.sort(sortProjects);
  return sortedProjects;
};

function sortProjects(a: ProjectEntry, b: ProjectEntry) {
  // first sort by featured, then date, then priority

  const dateA = new Date(a.metadata.date);
  const dateB = new Date(b.metadata.date);
  if (dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  } else {
    return a.metadata.priority! - b.metadata.priority!;
  }
}
