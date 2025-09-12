import { ProjectCard } from "@/components/project-block/project-card";
import { cn } from "@/lib/utils";
import { getFilteredProjects } from "@/lib/mdx/project-getter";
import Layout from "@/components/layout";

export default function Home() {
  const orderedVisibleProjects = getFilteredProjects({});

  const showMore = true;

  return (
    <Layout layoutContext="home">
      <div className="z-10 mx-1 mb-6">
        <div
          className={cn(
            "convex w-full rounded-lg px-4 py-2 md:py-1",
            "font-condensed",
          )}
        >
          [404] Well, you just reached a page that doesn&apos;t exist. Sorry
          about that. I guess I&apos;ll show you some projects instead.
        </div>
      </div>
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
