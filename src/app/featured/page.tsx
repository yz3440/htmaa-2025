import { ProjectCard } from "@/components/project-block/project-card";
import { cn } from "@/lib/utils";
import { getFilteredProjects } from "@/lib/mdx/project-getter";
import Layout from "@/components/layout";

export default function Home() {
  const orderedVisibleProjects = getFilteredProjects({ featured: true });

  const showMore = true;

  return (
    <Layout layoutContext="home">
      <div
        id="project-cards"
        className={cn(
          `flex flex-col px-2`,
          !showMore && "md:grid md:grid-cols-2 md:gap-x-6",
        )}
      >
        {orderedVisibleProjects.map((project) => (
          <ProjectCard
            metadata={project.metadata}
            slug={project.slug}
            key={project.slug}
          />
        ))}
      </div>
    </Layout>
  );
}
