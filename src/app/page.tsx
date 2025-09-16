import { getFilteredProjects } from "@/lib/mdx/project-getter";
import Layout from "@/components/layout";
import HomeClient from "./page.client";
export const dynamic = "force-static";
export const revalidate = 3600;

export default function Home() {
  const orderedVisibleProjects = getFilteredProjects({});

  return (
    <Layout layoutContext="home">
      <HomeClient projects={orderedVisibleProjects} />
    </Layout>
  );
}
