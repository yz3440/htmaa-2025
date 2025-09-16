import { getFilteredProjects } from "@/lib/mdx/project-getter";
import { baseUrl } from "@/sitemeta";

export default async function sitemap() {
  const orderedVisibleProjects = getFilteredProjects({});
  const projects = orderedVisibleProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.metadata.date,
  }));

  const routes = ["", "/featured", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...projects];
}
