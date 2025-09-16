import { getFilteredProjects } from "@/lib/mdx/project-getter";
import { env } from "@/env.js";

export default async function sitemap() {
  const orderedVisibleProjects = getFilteredProjects({});
  const projects = orderedVisibleProjects.map((project) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/projects/${project.slug}`,
    lastModified: project.metadata.date,
  }));

  const routes = [""].map((route) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...projects];
}
