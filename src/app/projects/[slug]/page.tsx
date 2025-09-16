import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getAllProjects } from "@/lib/mdx";
import { baseUrl } from "@/sitemeta";
import { ProjectCard } from "@/components/project-block/project-card";
import { getFilteredProjects } from "@/lib/mdx/project-getter";
import Layout from "@/components/layout";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = getFilteredProjects({ noOverrideLink: true });

  return projects.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const project = getFilteredProjects({ noOverrideLink: true }).find(
    (project) => project.slug === params.slug,
  );
  if (!project) {
    return;
  }

  const {
    title: projectTitle,
    date: publishedTime,
    description: description,
    image,
  } = project.metadata;

  const title = `${projectTitle}`;

  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/project/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getFilteredProjects({ noOverrideLink: true }).find(
    (post) => post.slug === params.slug,
  );
  if (!project) {
    return notFound();
  }

  const { metadata, content, slug, tableOfContents } = project;

  return (
    <Layout
      tableOfContents={metadata.tableOfContents ? tableOfContents : undefined}
      layoutContext="project-detail"
    >
      <div id="project-cards" className={cn(`flex flex-col px-2`)}>
        <section className="">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: metadata.title,
                datePublished: metadata.date,
                dateModified: metadata.date,
                description: metadata.description,
                image: metadata.image
                  ? `${baseUrl}${metadata.image}`
                  : `/og?title=${encodeURIComponent(metadata.title)}`,
                url: `${baseUrl}/blog/${slug}`,
                author: {
                  "@type": "Person",
                  name: "Yufeng Zhao",
                },
              }),
            }}
          />
          <div className="border-b border-dashed border-foreground/50">
            <ProjectCard
              metadata={metadata}
              slug={slug}
              layoutContext="project-detail"
            />
          </div>
          <article className="mt-6">
            <CustomMDX source={content} />
          </article>
        </section>
      </div>
    </Layout>
  );
}
