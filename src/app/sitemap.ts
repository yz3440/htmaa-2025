import { getFilteredProjects } from "@/lib/mdx/project-getter";
export const baseUrl =
  "https://fab.cba.mit.edu/classes/863.25/people/YufengZhao";

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
