import { getFilteredProjects } from "@/lib/mdx/project-getter";
import Layout from "@/components/layout";
import HomeClient from "./page.client";
import Image from "next/image";
export const dynamic = "force-static";
export const revalidate = 3600;

export default function Home() {
  const orderedVisibleProjects = getFilteredProjects({});

  return (
    <Layout layoutContext="home">
      {/* Putting an image of me for Google to index */}
      <Image
        src="/about/2024_SPAM_2_crop_bw.jpg"
        alt="hero"
        width={1080}
        height={1080}
        className="sr-only pointer-events-none select-none"
        draggable={false}
      />
      <HomeClient projects={orderedVisibleProjects} />
    </Layout>
  );
}
